import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/modules/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { InjectModel } from '@nestjs/sequelize';
import { PersonService } from 'src/modules/person/person.service';
import { Person } from 'src/modules/person/entities/person.entity';
import { CreatePersonDto } from 'src/modules/person/dto/create-person.dto';
import { UpdatePersonDto } from 'src/modules/person/dto/update-person.dto';
import { Group } from 'src/modules/group/entities/group.entity';
import { Sequelize } from 'sequelize-typescript';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { RolePermission } from '../roles_permissions/entities/roles_permission.entity';
import { AppError } from 'src/common/constants/error';
import { AppStrings } from 'src/common/constants/strings';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        @InjectModel(Person) private personRepository: typeof Person,
        @InjectModel(Role) private roleRepository: typeof Role,
        @InjectModel(RolePermission) private rolePermissionRepository: typeof RolePermission,
        @InjectModel(Organization) private organizationRepository: typeof Organization,
        @InjectModel(Group) private groupRepository: typeof Group,
        private readonly historyService: TransactionHistoryService,
        private sequelize: Sequelize,
    ) { }

    async create(user: CreateUserDto) {
        let result;

        await this.sequelize.transaction(async trx => {
            const transactionHost = { transaction: trx };

            const role_id = user.role_id;
            const role = await this.roleRepository.findOne({ where: { role_id } })

            if (!role) {
                throw new HttpException(AppError.ROLE_NOT_FOUND, HttpStatus.BAD_REQUEST);
            }

            const organization_id = user.organization_id;
            const organization = await this.organizationRepository.findOne({ where: { organization_id } });

            if (!organization) {
                throw new HttpException(AppError.ORGANIZATION_NOT_FOUND, HttpStatus.BAD_REQUEST);
            }

            if (user.group_id != undefined) {
                const group = await this.groupRepository.findOne({ where: { group_id: user.group_id } });

                if (group == null) {
                    throw new HttpException(AppError.GROUP_NOT_FOUND, HttpStatus.BAD_REQUEST);
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

            const personResult = await this.personRepository.create(user, transactionHost).catch((error) => {
                let errorMessage = error.message;
                let errorCode = HttpStatus.BAD_REQUEST;

                throw new HttpException(errorMessage, errorCode);
            });

            user.person_id = personResult.dataValues.person_id;

            result = await this.userRepository.create(user, transactionHost).catch((error) => {
                let errorMessage = error.message;
                let errorCode = HttpStatus.BAD_REQUEST;
                if (error.original.code === "23505") {
                    errorMessage = AppError.USER_LOGIN_EXISTS;
                    errorCode = HttpStatus.CONFLICT;
                }

                throw new HttpException(errorMessage, errorCode);
            });

            const historyDto = {
                "user_id": result.user_id,
                "comment": `Создан пользователь #${result.user_id}`,
            }
            await this.historyService.create(historyDto);
        })

        return result;
    }

    async update(updatedUser: UpdateUserDto, user_id: number) {
        let result;

        await this.sequelize.transaction(async trx => {
            const transactionHost = { transaction: trx };

            const id = updatedUser.user_id;
            const foundUser = await this.userRepository.findOne({ where: { user_id: id }, include: [Person, Group] });

            if (foundUser == null) {
                throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            if (updatedUser.role_id != undefined) {
                const role = await this.roleRepository.findOne({ where: { role_id: updatedUser.role_id } });
                if (role == null) {
                    throw new HttpException(AppError.ROLE_NOT_FOUND, HttpStatus.BAD_REQUEST);
                }
            }

            if (updatedUser.organization_id != undefined) {
                const organization = await this.organizationRepository.findOne({ where: { organization_id: updatedUser.organization_id } });
                if (organization == null) {
                    throw new HttpException(AppError.ORGANIZATION_NOT_FOUND, HttpStatus.BAD_REQUEST);
                }
            }

            if (updatedUser.group_id != undefined) {
                const group = await this.groupRepository.findOne({ where: { group_id: updatedUser.group_id } });

                if (group == null) {
                    throw new HttpException(AppError.GROUP_NOT_FOUND, HttpStatus.BAD_REQUEST);
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
                throw new HttpException(AppError.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
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
                    errorMessage = AppError.USER_LOGIN_EXISTS;
                    errorCode = HttpStatus.CONFLICT;
                }

                throw new HttpException(errorMessage, errorCode);
            });

            const historyDto = {
                "user_id": user_id,
                "comment": `Изменен пользователь #${result.user_id}`,
            }
            await this.historyService.create(historyDto);
        })

        return result;
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
                message: AppError.USER_NOT_FOUND
            });
        }
    }

    async findUser({ user_id = -1, login = '' }: { user_id?: number, login?: string }): Promise<boolean> {
        try {
            const foundUser = await this.userRepository.findOne({ where: { [Op.or]: [{ user_id: user_id }, { login: login }] } });

            if (foundUser) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async findByLogin(login: string): Promise<any> {
        try {
            const result = await this.userRepository.findOne({ include: [Person], where: { login }, attributes: { exclude: ['person_id'] } })

            if (result != null) {
                const userRoles = await this.rolePermissionRepository.findAll({ where: { role_id: result.role_id }, attributes: { exclude: ['role_permission_id', 'role_id', 'createdAt', 'updatedAt'] } });
                const permissions = [];
                userRoles.forEach(element => {
                    permissions.push(element.dataValues);
                });

                return { user_id: result.user_id, login: result.login, permissions, password: result.password, };
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async remove(id: number, user_id: number) {
        await this.sequelize.transaction(async trx => {
            const result = await this.userRepository.findOne({ where: { user_id: id }, include: [Person], attributes: { exclude: ['password', 'organization_id', 'role_id', 'person_id', 'group_id'] } });

            if (result == null) {
                return Promise.reject(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        message: AppError.USER_NOT_FOUND
                    }
                )
            }

            const person_id = result.person.person_id;
            await this.userRepository.destroy({ where: { user_id: id }, transaction: trx }).catch((error) => {
                let errorMessage = error.message;
                let errorCode = HttpStatus.BAD_REQUEST;

                throw new HttpException(errorMessage, errorCode);
            });
            await this.personRepository.destroy({ where: { person_id }, transaction: trx }).catch((error) => {
                let errorMessage = error.message;
                let errorCode = HttpStatus.BAD_REQUEST;

                throw new HttpException(errorMessage, errorCode);
            });

            const historyDto = {
                "user_id": user_id,
                "comment": `Удален пользователь #${id}`,
            }
            await this.historyService.create(historyDto);
        });

        return { statusCode: 200, message: AppStrings.SUCCESS_ROW_DELETE };
    }
}
