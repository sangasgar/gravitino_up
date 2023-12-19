import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Facility } from "src/modules/facility/entities/facility.entity";
import { OrderStatus } from "src/modules/order_status/entities/order_status.entity";
import { Organization } from "src/modules/organization/entities/organization.entity";
import { OrderPriority } from "src/modules/priority/entities/priority.entity";
import { Task } from "src/modules/task/entities/task.entity";
import { User } from "src/modules/users/entities/user.entity";

@Table
export class Order extends Model<Order> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    order_id: number

    @ForeignKey(type => Task)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    task_id: number;

    @ApiProperty({
        type: () => Task,
        example: {
            task_id: 1,
            name: 'Название',
            description: 'Описание',
            category_id: 1,
            work_type: 'Тип работы'
        },
        description: 'Задача'
    })
    @BelongsTo(type => Task)
    task: Task;

    @ForeignKey(type => Facility)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    facility_id: number;

    @ApiProperty({
        type: () => Facility,
        example: {
            facility_id: 1,
            name: 'Название',
            city: 'Город',
            address: "Адрес",
            checkpoint_id: 1
        },
        description: 'Объект обслуживания'
    })
    @BelongsTo(type => Facility)
    facility: Facility;

    @ForeignKey(type => Organization)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    organization_id: number;

    @ApiProperty({
        type: () => Organization,
        example: {
            organization_id: 1,
            organization_name: 'ООО',
            phone: '79001234567',
            address: 'г. Москва',
            email: 'email@example.com',
            ogrn: '',
            inn: '',
            kpp: '',
            okpo: ''
        },
        description: 'Организация'
    })
    @BelongsTo(type => Organization)
    organization: Organization;

    @ForeignKey(type => User)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    executor_id: number;

    @BelongsTo(type => User, "executor_id")
    executor: User;

    @ForeignKey(type => User)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    creator_id: number;

    @BelongsTo(type => User, "creator_id")
    creator: User;

    @ForeignKey(type => OrderStatus)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    status_id: number;

    @BelongsTo(type => OrderStatus)
    status: OrderStatus;

    @Column
    planned_datetime: Date

    @Column
    task_end_datetime: Date

    @ForeignKey(type => OrderPriority)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    priority_id: number;

    @BelongsTo(type => OrderPriority)
    priority: OrderPriority;
}