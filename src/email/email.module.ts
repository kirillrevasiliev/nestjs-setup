import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('email.host'),
          service: configService.get<string>('email.emailService'),
          auth: {
            user: configService.get<string>('email.emailFrom'),
            pass: configService.get<string>('email.password'),
          },
        },
        defaults: {
          from: `${configService.get<string>('email.nameFrom')} <${configService.get<string>('email.emailFrom')}>`,
        },
        template: {
          dir: configService.get<string>('email.templateDir'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
