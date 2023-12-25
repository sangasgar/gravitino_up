import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Role } from 'src/modules/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from 'src/modules/person/entities/person.entity';
import { CreatePersonDto, UpdatePersonDto } from 'src/modules/person/dto';
import { Group } from 'src/modules/group/entities/group.entity';
import { Sequelize } from 'sequelize-typescript';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { RolePermission } from '../roles_permissions/entities/roles_permission.entity';
import { AppError } from 'src/common/constants/error';
import { Op } from 'sequelize';
import { StatusUserResponse, UserResponse } from './response';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        @InjectModel(Person) private personRepository: typeof Person,
        @InjectModel(RolePermission) private rolePermissionRepository: typeof RolePermission,
        private readonly historyService: TransactionHistoryService,
        private sequelize: Sequelize,
    ) { }

    async create(user: CreateUserDto): Promise<UserResponse> {
        try {
            const transaction = await this.sequelize.transaction();

            const login = user.login.toLowerCase();
            user.login = login;
            user.password = await bcrypt.hash(user.password, 10);

            const createPersonDto = new CreatePersonDto();
            createPersonDto.last_name = user.last_name;
            createPersonDto.first_name = user.first_name;
            createPersonDto.patronymic = user.patronymic;
            createPersonDto.gender = user.gender;
            createPersonDto.phone = user.phone;

            const newPerson = await this.personRepository.create(createPersonDto, { transaction: transaction });

            user.person_id = newPerson.person_id;
            const newUser = await this.userRepository.create(user, { transaction: transaction }).catch((error) => {
                let errorMessage = error.message;
                let errorCode = HttpStatus.BAD_REQUEST;
                if (error.original.code === "23505") {
                    errorMessage = AppError.USER_LOGIN_EXISTS;
                    errorCode = HttpStatus.CONFLICT;
                }

                throw new HttpException(errorMessage, errorCode);
            });

            await transaction.commit();

            const historyDto = {
                "user_id": newUser.user_id,
                "comment": `Создан пользователь #${newUser.user_id} (person_id: ${newUser.person_id})`,
            }
            await this.historyService.create(historyDto);

            return {
                user_id: newUser.user_id,
                ...user,
            };
        } catch (error) {
            if (error.code === 409) {
                throw new Error(error.message);
            } else {
                throw new Error(error);
            }
        }
    }

    async update(updatedUser: UpdateUserDto, user_id: number): Promise<UserResponse> {
        try {
            const transaction = await this.sequelize.transaction();

            if (updatedUser.login != undefined) {
                const login = updatedUser.login.toLowerCase();
                updatedUser.login = login;
            }

            if (updatedUser.password != undefined) {
                updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
            }

            const user = await this.findById(updatedUser.user_id);
            const person_id = user.person.person_id;
            const foundPerson = await this.personRepository.findOne({ where: { person_id } });
            if (foundPerson == null) {
                throw new HttpException(AppError.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
            }

            const updatePersonDto = new UpdatePersonDto();
            updatePersonDto.last_name = updatedUser.last_name;
            updatePersonDto.first_name = updatedUser.first_name;
            updatePersonDto.patronymic = updatedUser.patronymic;
            updatePersonDto.gender = updatedUser.gender;

            await foundPerson.update(updatePersonDto, { transaction: transaction })

            let foundUser = null;
            await this.userRepository.update({ ...updatedUser }, { where: { user_id: updatedUser.user_id }, transaction: transaction });

            foundUser = await this.userRepository.findOne({ where: { user_id: updatedUser.user_id } });

            if (foundUser) {
                const historyDto = {
                    "user_id": user_id,
                    "comment": `Изменен пользователь #${foundUser.user_id}`,
                }
                await this.historyService.create(historyDto);
            }

            await transaction.commit();

            return foundUser;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findAll() {
        try {
            const foundUsers = await this.userRepository.findAll(
                {
                    include: [Role, Organization, Person, Group],
                    attributes: { exclude: ['password', 'organization_id', 'role_id', 'person_id', 'group_id'] }
                }
            );
            return foundUsers;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findOne(user_id: number): Promise<boolean> {
        try {
            const result = await this.userRepository.findOne({ where: { user_id } });

            if (result) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error);
        }
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

    async remove(id: number, user_id: number): Promise<StatusUserResponse> {
        try {
            const transaction = await this.sequelize.transaction();

            const user = await this.userRepository.findOne({ where: { user_id: id }, attributes: { exclude: ['password'] } });

            const deleteUser = await this.userRepository.destroy({ where: { user_id: id }, transaction: transaction });
            const deletePerson = await this.personRepository.destroy({ where: { person_id: user.person_id }, transaction: transaction });

            if (deleteUser && deletePerson) {
                const historyDto = {
                    "user_id": user_id,
                    "comment": `Удален пользователь #${id}`,
                }
                await this.historyService.create(historyDto);

                await transaction.commit();

                return { status: true };
            }

            return { status: false };
        } catch (error) {
            throw new Error(error);
        }
    }
}
