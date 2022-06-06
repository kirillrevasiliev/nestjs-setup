import { User } from '@app/user/user.entity';
import { EmailService } from '@app/email/email.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthMailService {
  constructor(private emailService: EmailService) {}

  async sendEmailConfirmation(user: User, url: string) {
    await this.emailService.sendMail({
      to: user.email,
      subject: 'Confirm your Email',
      template: 'confirmation',
      context: {
        name: user.username,
        url,
      },
    });
  }

  async sendResetPasswordConfirmation(user: User, url: string) {
    await this.emailService.sendMail({
      to: user.email,
      subject: 'Rest your password',
      template: 'reset-password',
      context: {
        name: user.username,
        url,
      },
    });
  }
}
