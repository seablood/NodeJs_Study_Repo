import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column({nullable: true})
    password: string;

    @Column()
    username: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdDate: Date = new Date(); // 기본 값 설정

    @Column({nullable: true})
    providerId: string;
}