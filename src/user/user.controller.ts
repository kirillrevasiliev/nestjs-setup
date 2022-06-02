import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Auth } from '@app/auth/decorators/auth.decorator';

import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateDto } from './dtos/update.dto';

@Crud({
  model: {
    type: User,
  },
  dto: {
    update: UpdateDto,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
    getOneBase: {
      decorators: [Auth()],
    },
    getManyBase: {
      decorators: [Auth()],
    },
    deleteOneBase: {
      decorators: [Auth()],
    },
    updateOneBase: {
      decorators: [Auth()],
    },
  },
  query: {
    sort: [
      {
        field: 'id',
        order: 'ASC',
      },
    ],
  },
})
@ApiBearerAuth()
@Controller('users')
@ApiTags('Users')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
