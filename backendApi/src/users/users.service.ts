import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Organization } from 'src/organization/entities/organization.entity';
import { InjectModel } from '@nestjs/sequelize';
import { PersonService } from 'src/person/person.service';
import { Person } from 'src/person/entities/person.entity';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';
import { UpdatePersonDto } from 'src/person/dto/update-person.dto';
import { Group } from 'src/group/entities/group.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        @InjectModel(Person) private personRepository: typeof Person,
        @InjectModel(Role) private roleRepository: typeof Role,
        @InjectModel(Organization) private organizationRepository: typeof Organization,
        @InjectModel(Group) private groupRepository: typeof Group,
        private sequelize: Sequelize,
    ) { }

    async create(user: CreateUserDto) {
        let result

        await this.sequelize.transaction(async trx => {
            const transactionHost = { transaction: trx };

            const role_id = user.role_id;
            const role = await this.roleRepository.findOne({ where: { role_id } })

            if (!role) {
                return Promise.reject(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        message: 'Роль не найдена!'
                    }
                )
            }

            const organization_id = user.organization_id;
            const organization = await this.organizationRepository.findOne({ where: { organization_id } });

            if (!organization) {
                return Promise.reject(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        message: 'Организация не найдена!'
                    }
                )
            }

            var group;
            if (user.group_id != undefined) {
                const group_id = user.group_id;
                group = await this.groupRepository.findOne({ where: { group_id } });

                if (group == null) {
                    return Promise.reject(
                        {
                            statusCode: HttpStatus.NOT_FOUND,
                            message: 'Группа не найдена!'
                        }
                    )
                }
            }

            const login = user.login.toLowerCase();
            user.login = login;
            user.password = await bcrypt.hash(user.password, 10);

            const createPersonDto = new CreatePersonDto();
            createPersonDto.last_name = user.last_name;
            createPersonDto.first_name = user.first_name;
            createPersonDto.patronymic = user.patronymic;
            createPersonDto.gender = user.gender;
            createPersonDto.phone = user.phone;

            const personResult = await this.personRepository.create(user, transactionHost)

            user.person_id = personResult.dataValues.person_id

            result = await this.userRepository.create(user, transactionHost).catch((error) => {
                let errorMessage = error.message;
                let errorCode = HttpStatus.BAD_REQUEST;
                if (error.original.code === "23505") {
                    errorMessage = "Пользователь с таким логином уже существует.";
                    errorCode = 409;
                }

                throw new HttpException(errorMessage, errorCode);
            });
        })

        return result
    }

    async update(updatedUser: UpdateUserDto) {
        let result
        await this.sequelize.transaction(async trx => {
            const transactionHost = { transaction: trx };

            const id = updatedUser.user_id;
            const foundUser = await this.userRepository.findOne({ where: { user_id: id }, include: [Person, Group] });

            if (foundUser == null) {
                return Promise.reject(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        message: 'Пользователь не найден!'
                    }
                )
            }

            var role;
            if (updatedUser.role_id != undefined) {
                const role_id = updatedUser.role_id;
                role = await this.roleRepository.findOne({ where: { role_id } });

                if (role == null) {
                    return Promise.reject(
                        {
                            statusCode: HttpStatus.NOT_FOUND,
                            message: 'Роль не найдена!'
                        }
                    )
                }
            }

            var organization;
            if (updatedUser.organization_id != undefined) {
                const organization_id = updatedUser.organization_id;
                organization = await this.organizationRepository.findOne({ where: { organization_id } });

                if (organization == null) {
                    return Promise.reject(
                        {
                            statusCode: HttpStatus.NOT_FOUND,
                            message: 'Организация не найдена!'
                        }
                    )
                }
            }

            var group;
            if (updatedUser.group_id != undefined) {
                const group_id = updatedUser.group_id;
                group = await this.groupRepository.findOne({ where: { group_id } });

                if (group == null) {
                    return Promise.reject(
                        {
                            statusCode: HttpStatus.NOT_FOUND,
                            message: 'Группа не найдена!'
                        }
                    )
                }
            }

            if (updatedUser.login != undefined) {
                const login = updatedUser.login.toLowerCase();
                updatedUser.login = login;
            }

            if (updatedUser.password != undefined) {
                updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
            }

            const person_id = foundUser.person.person_id;
            const foundPerson = await this.personRepository.findOne({ where: { person_id } });

            if (foundPerson == null) {
                return Promise.reject(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        message: 'Данные пользователя не найдены!'
                    }
                )
            }

            const updatePersonDto = new UpdatePersonDto();
            updatePersonDto.last_name = updatedUser.last_name;
            updatePersonDto.first_name = updatedUser.first_name;
            updatePersonDto.patronymic = updatedUser.patronymic;
            updatePersonDto.gender = updatedUser.gender;

            await foundPerson.update(updatePersonDto, transactionHost).catch((error) => {
                let errorMessage = error.message;
                let errorCode = HttpStatus.BAD_REQUEST;

                throw new HttpException(errorMessage, errorCode);
            });

            result = await foundUser.update(updatedUser, transactionHost).catch((error) => {
                let errorMessage = error.message;
                let errorCode = HttpStatus.BAD_REQUEST;
                if (error.original.code === "23505") {
                    errorMessage = "Пользователь с таким логином уже существует.";
                    errorCode = 409;
                }

                throw new HttpException(errorMessage, errorCode);
            });
        })

        return result
    }

    async findAll(): Promise<User[]> {
        const result = await this.userRepository.findAll({ include: [Role, Organization, Person, Group], attributes: { exclude: ['password', 'organization_id', 'role_id', 'person_id', 'group_id'] } })

        return result;
    }

    async findById(id: number) {
        const result = await this.userRepository.findOne({ include: [Role, Organization, Person, Group], where: { user_id: id }, attributes: { exclude: ['password', 'organization_id', 'role_id', 'person_id', 'group_id'] } })

        if (result != null) {
            return result;
        } else {
            return Promise.reject({
                statusCode: HttpStatus.NOT_FOUND,
                message: "Пользователь не найден!"
            });
        }
    }

    async findByLogin(login: string) {
        const result = await this.userRepository.findOne({ include: [Role, Organization, Person, Group], where: { login }, attributes: { exclude: ['organization_id', 'role_id', 'person_id', 'group_id'] } })

        if (result != null) {
            return result;
        } else {
            return Promise.reject({
                statusCode: HttpStatus.NOT_FOUND,
                message: "Пользователь не найден!"
            });
        }
    }

    async remove(id: number) {
        const result = await this.userRepository.findOne({ where: { user_id: id }, include: [Person], attributes: { exclude: ['password', 'organization_id', 'role_id', 'person_id', 'group_id'] } });

        if (result == null) {
            return Promise.reject(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Пользователь не найден!'
                }
            )
        } else {
            const person_id = result.person.person_id;
            await this.userRepository.destroy({ where: { user_id: id } });
            await this.personRepository.destroy({ where: { person_id } });

            return { statusCode: 200, message: 'Данные пользователя успешно удалены!' };
        }
    }

    // async logIn(login: string, password: string) {
    //     const foundUser = await this.userRepository.createQueryBuilder('user')
    //         .leftJoinAndSelect('user.role', 'role')
    //         .leftJoinAndSelect('user.organization', 'organization')
    //         .where('user.login = :login', { login: login })
    //         .getOne();

    //     if (foundUser == null) {
    //         return Promise.reject(
    //             {
    //                 statusCode: 404,
    //                 message: 'Пользователь не найден!'
    //             }
    //         );
    //     }

    //     return await bcrypt.compare(password, foundUser.password);
    // }
}
