// import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// import { MailService } from './mail/mail.service';
// import { compare } from 'bcryptjs';
// import { LoginDto, RegisterDto } from './dto/auth.dto';
// import { UserService } from '../user/user.service';
// import { AuthMethod, User, UserRole } from '@crm/prisma/generated/prisma';
// import { Request } from 'express';

// @Injectable()
// export class AuthService {
//   constructor(
//      private userService: UserService,
//   ) {}

//   async register(req: Request, dto: RegisterDto) {
//     const isEmailExists = await this.userService.findByEmail(dto.email);
//     if (isEmailExists) {
//       throw new BadRequestException('Email already exists');
//     }

//     const user = await this.userService.createUser(
//       dto.email, 
//       dto.password,
//        dto.name, 
//        dto.surname, 
//        '' ,
//       UserRole.USER,
//       AuthMethod.EMAIL,
//       false
//     );
//     return await this.saveSession(req, user);
//   }

//   async login(req: Request, dto: LoginDto) {
//       const user = await this.userService.findByEmail(dto.email);
//       if (!user || !user.password) {
//         throw new NotFoundException('User not found. Please check your email and password.');
//       }
//       const isPasswordValid = await compare(dto.password, user.password);
//       if (!isPasswordValid) {
//         throw new UnauthorizedException('Invalid credentials. Please check your email and password.');
//       }
//       return await this.saveSession(req, user);
//   }

//   async logout(req: Request): Promise<void> {
//     return new Promise((resolve, reject) => {
//        req.session.destroy((err) => {
//          if (err) {
//            return reject(
//           new InternalServerErrorException('Failed to logout. Check session parameters')
//          );
//          }
//          resolve();
//        });
//     });
//   }
  
//   async forgotPassword(email: string) {
  
  
//     return { message: 'Reset token sent' };
//   }
  
//   async resetPassword(token: string, newPassword: string) {

//     return { message: 'Password reset successfully' };
//   }
//   async confirmEmail(token: string) {

//     return { message: 'Email confirmed successfully' };
//   }

//     private async saveSession(req: Request, user: User) {
//       return new Promise((resolve, reject) => {
//         req.session.userId = user.id;
//         req.session.save((err) => {
//           if (err) {
//             return reject(
//               new InternalServerErrorException('Failed to save session. Check session parameters')
//             );
//           }
//           resolve({user});
//         });
//         resolve({user});
//       });
// }

  
// }





//JWT
// @Injectable()
// export class AuthService {
//   constructor(
//     // @InjectRepository(User) private userRepo: Repository<User>,
//     private jwtService: JwtService,
//     private mailService: MailService,
//   ) {}

//   async register(name: string, email: string, password: string) {
//     const hashedPassword = await hash(password, 10);
//     const emailConfirmToken = this.jwtService.sign({ email });

//     // const user = this.userRepo.create({
//     //   name,
//     //   email,
//     //   password: hashedPassword,
//     //   emailConfirmToken,
//     // });

//     // await this.userRepo.save(user);
//     // await this.mailService.sendEmailConfirmation(email, emailConfirmToken);

//     return { message: 'Registration successful, please verify email.' };
//   }

//   async login(email: string, password: string) {
//     // const user = await this.userRepo.findOne({ where: { email } });
//     // if (!user || !(await bcrypt.compare(password, user.password))) {
//     //   throw new BadRequestException('Invalid credentials');
//     // }
  
//     // if (!user.isEmailConfirmed) {
//     //   throw new BadRequestException('Email not confirmed');
//     // }
  
//     // const token = this.jwtService.sign({ sub: user.id, email });
//     return { token: 'token' };
//   }

//   async forgotPassword(email: string) {
//     // const user = await this.userRepo.findOne({ where: { email } });
//     // if (!user) throw new BadRequestException('User not found');
  
//     // const resetPasswordToken = this.jwtService.sign({ email }, { expiresIn: '1h' });
//     // user.resetPasswordToken = resetPasswordToken;
  
//     // await this.userRepo.save(user);
//     // await this.mailService.sendPasswordReset(email, resetPasswordToken);
  
//     return { message: 'Reset token sent' };
//   }
  
//   async resetPassword(token: string, newPassword: string) {
//     // const payload = this.jwtService.verify(token);
//     // const user = await this.userRepo.findOne({ where: { email: payload.email, resetPasswordToken: token } });
//     // if (!user) throw new BadRequestException('Invalid token');
  
//     // user.password = await bcrypt.hash(newPassword, 10);
//     // user.resetPasswordToken = '';
  
//     // await this.userRepo.save(user);
//     return { message: 'Password reset successfully' };
//   }
//   async confirmEmail(token: string) {
//     // const payload = this.jwtService.verify(token);
//     // const user = await this.userRepo.findOne({ where: { email: payload.email } });
//     // if (!user) throw new BadRequestException('Invalid token');

//     // user.isEmailConfirmed = true;
//     // user.emailConfirmToken = '';

//     // await this.userRepo.save(user);
//     return { message: 'Email confirmed successfully' };
// }

  
// }
