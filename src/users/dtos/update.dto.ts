import { User } from '@app/users/users.entity';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UpdateDto extends User {
  @Exclude()
  password: string;
  @Exclude()
  email: string;
  @IsOptional()
  name: string;
}
