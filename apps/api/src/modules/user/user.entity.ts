// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// @Entity('users')
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     name: string;

//     @Column({ unique: true })
//     email: string;

//     @Column({ nullable: true })
//     password: string;

//     @Column({ default: false })
//     isEmailConfirmed: boolean;

//     @Column({ nullable: true })
//     emailConfirmToken: string;

//     @Column({ nullable: true })
//     resetPasswordToken: string;

//     @CreateDateColumn()
//     createdAt: Date;

//     @UpdateDateColumn()
//     updatedAt: Date;
// }
