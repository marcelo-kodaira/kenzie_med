import { MigrationInterface, QueryRunner } from "typeorm";

export class updateagedoctor1667534864994 implements MigrationInterface {
    name = 'updateagedoctor1667534864994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "age"`);
    }

}
