import { MigrationInterface, QueryRunner } from "typeorm"

export class migrations1667929628723 implements MigrationInterface {
  name = "migrations1667929628723"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "district" character varying NOT NULL, "zipCode" character varying(8) NOT NULL, "number" integer NOT NULL, "state" character varying(2) NOT NULL, "city" character varying NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "CPF" character varying(11) NOT NULL, "age" integer NOT NULL, "sex" character varying NOT NULL, "img" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isAdmin" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "addressId" uuid, CONSTRAINT "UQ_954a4b53f7bc859b195a27e1a77" UNIQUE ("CPF"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "date" date NOT NULL, "hour" TIME NOT NULL, "type" character varying NOT NULL, "description" character varying NOT NULL, "isAvailable" boolean NOT NULL DEFAULT true, "userId" uuid, "doctorId" uuid, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`CREATE TABLE "specialties" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "doctorsId" uuid, CONSTRAINT "PK_ba01cec5aa8ac48778a1d097e98" PRIMARY KEY ("id"))`)
    await queryRunner.query(
      `CREATE TABLE "doctors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "CRM" character varying(11) NOT NULL, "sex" character varying NOT NULL, "age" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "addressId" uuid, CONSTRAINT "UQ_1d3f2ce0203dadc22bab6787da4" UNIQUE ("CRM"), CONSTRAINT "REL_ad816aa66aa42fad408b1b7d76" UNIQUE ("addressId"), CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_fb7ad28e0dd40050c93fec0b7ca" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "specialties" ADD CONSTRAINT "FK_29f9b9826f0a311b1a1293e300b" FOREIGN KEY ("doctorsId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "FK_ad816aa66aa42fad408b1b7d762" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "FK_ad816aa66aa42fad408b1b7d762"`)
    await queryRunner.query(`ALTER TABLE "specialties" DROP CONSTRAINT "FK_29f9b9826f0a311b1a1293e300b"`)
    await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_fb7ad28e0dd40050c93fec0b7ca"`)
    await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`)
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`)
    await queryRunner.query(`DROP TABLE "doctors"`)
    await queryRunner.query(`DROP TABLE "specialties"`)
    await queryRunner.query(`DROP TABLE "schedules"`)
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP TABLE "addresses"`)
  }
}
