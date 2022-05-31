import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendMail(options: ISendMailOptions) {
    return this.mailerService.sendMail(options);
  }
}
