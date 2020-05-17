import { MigrationInterface, QueryRunner } from 'typeorm';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

export class SeedDatabase1589646799482 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    console.log('IN MIGRATION');
    const readInterface = readline.createInterface({
      input: fs.createReadStream(path.resolve(__dirname, '../dump.txt')),
      output: process.stdout,
    });
    // const commands = fs.readFileSync(, 'utf8').split('\n');

    readInterface.on('line', (line) => {
      queryRunner.query(line);
    });

    // commands.forEach((line) => {
    //   console.log('EXECUTING LINE');
    //   console.log(line);
    //   queryRunner.query(line);
    // });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.dropDatabase('pokemon');
  }
}
