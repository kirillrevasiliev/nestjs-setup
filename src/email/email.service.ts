import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { User } from '@app/users/users.entity';

@Injectable()
export class EmailService {
  protected from: string;

  constructor(private mailerService: MailerService) {}

  async sendEmailConfirmation(user: User, url: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Confirm your Email',
      template: 'confirmation',
      context: {
        name: user.username,
        url,
      },
    });
  }
}
