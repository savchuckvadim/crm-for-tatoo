import { MailerService } from '@nestjs-modules/mailer';

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as path from 'path';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail', // или SMTP-сервер
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendEmailConfirmation(to: string, token: string) {
    const filePath = path.join(__dirname, './templates/confirm-email.hbs');
    const source = fs.readFileSync(filePath, 'utf8');
    const template = handlebars.compile(source);

    const html = template({
      name: to.split('@')[0],
      url: `https://your-app.com/auth/confirm-email/${token}`,
    });

    await this.transporter.sendMail({
      from: '"Your App" <no-reply@yourapp.com>',
      to,
      subject: 'Подтверждение email',
      html,
    });
  }

  async sendPasswordReset(to: string, token: string) {
    const filePath = path.join(__dirname, './templates/confirm-email.hbs');
    const source = fs.readFileSync(filePath, 'utf8');
    const template = handlebars.compile(source);

    const html = template({
      name: to.split('@')[0],
      url: `https://your-app.com/auth/confirm-email/${token}`,
    });

    await this.transporter.sendMail({
      from: '"Your App" <no-reply@yourapp.com>',
      to,
      subject: 'Подтверждение email',
      html,
    });
  }
}
