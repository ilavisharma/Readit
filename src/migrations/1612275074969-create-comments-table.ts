import {MigrationInterface, QueryRunner} from "typeorm";

export class createCommentsTable1612275074969 implements MigrationInterface {
    name = 'createCommentsTable1612275074969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "identifier" character varying NOT NULL, "body" character varying NOT NULL, "username" character varying NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_83ec7e014529deacbf751c0e8f" ON "comment" ("identifier") `);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_6cdd91efa7b8c6432dea46c0fbd" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_6cdd91efa7b8c6432dea46c0fbd"`);
        await queryRunner.query(`DROP INDEX "IDX_83ec7e014529deacbf751c0e8f"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
