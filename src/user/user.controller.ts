import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { Auth } from '@app/auth/decorators/auth.decorator';
import { Acl } from '@app/acl/acl.guard';
import { AuthUser } from '@app/auth/decorators/auth.user.decorator';

import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateDto } from './dtos/update.dto';
import { ROLES } from './user.constants';

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
      decorators: [Acl(ROLES.Admin), Auth()],
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

  @Post('avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Auth()
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@AuthUser() currentUser: User, @UploadedFile() file: Express.Multer.File) {
    return this.service.addAvatar(currentUser, file.buffer, file.originalname);
  }
}
