import { MigrationInterface, QueryRunner } from "typeorm";

export class entities1667332830880 implements MigrationInterface {
    name = 'entities1667332830880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_954a4b53f7bc859b195a27e1a77" UNIQUE ("CPF")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_954a4b53f7bc859b195a27e1a77"`);
    }

}
