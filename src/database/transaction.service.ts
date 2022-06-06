import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';

@Injectable()
export class TransactionService {
  constructor(private readonly connection: Connection) {}

  public async transaction<T>(handler: (params: { queryRunner: QueryRunner }) => any): Promise<T> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await handler({ queryRunner });
      await queryRunner.commitTransaction();

      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      Logger.error(err);

      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
