import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667818198993 implements MigrationInterface {
    name = 'createTables1667818198993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "FK_5c574df0411029a350c429d97c1"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "REL_5c574df0411029a350c429d97c"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "specialtiesId"`);
        await queryRunner.query(`ALTER TABLE "specialties" ADD "doctorsId" uuid`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "UQ_1d3f2ce0203dadc22bab6787da4" UNIQUE ("CRM")`);
        await queryRunner.query(`ALTER TABLE "specialties" ADD CONSTRAINT "FK_29f9b9826f0a311b1a1293e300b" FOREIGN KEY ("doctorsId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specialties" DROP CONSTRAINT "FK_29f9b9826f0a311b1a1293e300b"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "UQ_1d3f2ce0203dadc22bab6787da4"`);
        await queryRunner.query(`ALTER TABLE "specialties" DROP COLUMN "doctorsId"`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "specialtiesId" integer`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "REL_5c574df0411029a350c429d97c" UNIQUE ("specialtiesId")`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "FK_5c574df0411029a350c429d97c1" FOREIGN KEY ("specialtiesId") REFERENCES "specialties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
