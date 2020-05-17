import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1589645862323 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createDatabase('pokemon', true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.dropDatabase('pokemon');
  }
}
