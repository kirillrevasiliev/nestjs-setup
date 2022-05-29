import { User } from '@app/users/users.entity';
import { Exclude } from 'class-transformer';
import { IsEmpty } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

export class UpdateDto extends PickType(User, ['username', 'gender']) {
  @Exclude()
  @IsEmpty()
  password: string;

  @Exclude()
  @IsEmpty()
  email: string;

  @Exclude()
  @IsEmpty()
  isEmailConfirmed: boolean;
}
