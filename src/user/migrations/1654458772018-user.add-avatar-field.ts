import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UserAddAvatarField1654458772018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'avatarId',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('user', 'avatarId');
  }
}
