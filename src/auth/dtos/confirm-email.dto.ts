import { IsString } from 'class-validator';

export class ConfirmEmailDto {
  @IsString()
  code: string;
}
