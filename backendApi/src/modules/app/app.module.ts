import { Module } from '@nestjs/common';
import { FileTypeModule } from '../file_type/file_type.module';
import { FileType } from '../file_type/entities/file_type.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderStatus } from '../order_status/entities/order_status.entity';
import { OrderStatusModule } from '../order_status/order_status.module';
import { Organization } from '../organization/entities/organization.entity';
import { OrganizationModule } from '../organization/organization.module';
import { Role } from '../roles/entities/role.entity';
import { RolesModule } from '../roles/roles.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { PersonModule } from '../person/person.module';
import { Person } from '../person/entities/person.entity';
import { ReportModule } from '../report/report.module';
import { Report } from '../report/entities/report.entity';
import { OrganizationTypeModule } from '../organization_type/organization_type.module';
import { OrganizationType } from '../organization_type/entities/organization_type.entity';
import { GroupModule } from '../group/group.module';
import { Group } from '../group/entities/group.entity';
import { TaskModule } from '../task/task.module';
import { Task } from '../task/entities/task.entity';
import { FacilityModule } from '../facility/facility.module';
import { Facility } from '../facility/entities/facility.entity';
import { PriorityModule } from '../priority/priority.module';
import { OrderPriority } from '../priority/entities/priority.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderModule } from '../order/order.module';
import configuration from 'src/config/configuration';
import { Auth } from '../auth/entities/auth.entity';
import { Category } from '../category/entities/category.entity';
import { Checkpoint } from '../checkpoint/entities/checkpoint.entity';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { CheckpointModule } from '../checkpoint/checkpoint.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        username: configService.get('db_username'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        autoLoadModels: true,
        logging: true,
        synchronize: true,
        models: [
          User,
        Auth,
        Person,
        Role,
        Group,
        Organization,
        OrganizationType,
        Task,
        Category,
        OrderStatus,
        OrderPriority,
        Checkpoint,
        Facility,
        FileType,
        Report,
        ],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    PersonModule,
    RolesModule,
    GroupModule,

    OrganizationModule,
    OrganizationTypeModule,

    OrderStatusModule,
    PriorityModule,

    TaskModule,
    CategoryModule,

    CheckpointModule,
    FacilityModule,

    FileTypeModule,
    ReportModule,
    OrderModule,
  ],
})
export class AppModule { }
