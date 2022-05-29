import { EntityManager, Repository } from 'typeorm';
import * as unique from 'uniqid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Token } from './tokens.entity';

@Injectable()
export class TokensService {
  get repository() {
    return this.repo;
  }

  constructor(
    @InjectRepository(Token)
    private readonly repo: Repository<Token>,
  ) {}

  async generate(type: Token['type'], userId: number) {
    await this.repo.delete({ type, user: { id: userId } });
    return this.repo.save({ type, code: unique(), user: { id: userId } });
  }

  async verify(userId: number, code: Token['code'], manager: EntityManager) {
    const token = await manager.findOneOrFail(Token, { code, user: { id: userId } });

    await manager.delete(Token, token.id);

    return token;
  }
}
