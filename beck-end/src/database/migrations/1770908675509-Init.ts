import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1770908675509 implements MigrationInterface {
  name = 'Init1770908675509';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "userId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(50) NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "userId" integer, CONSTRAINT "FK_7d339708f0fa8446e3c4128dea9" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_history"("id", "title", "text", "createdAt", "userId") SELECT "id", "title", "text", "createdAt", "userId" FROM "history"`,
    );
    await queryRunner.query(`DROP TABLE "history"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_history" RENAME TO "history"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "history" RENAME TO "temporary_history"`,
    );
    await queryRunner.query(
      `CREATE TABLE "history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "userId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "history"("id", "title", "text", "createdAt", "userId") SELECT "id", "title", "text", "createdAt", "userId" FROM "temporary_history"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_history"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "history"`);
  }
}
