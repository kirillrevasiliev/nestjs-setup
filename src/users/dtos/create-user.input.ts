import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  name?: string;
}
