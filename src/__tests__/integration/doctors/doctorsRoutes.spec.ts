import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import request from "supertest";
import Specialties from "../../../entities/specialty.entity";
import Doctors from "../../../entities/doctor.entity";
import Addresses from "../../../entities/address.entity";
import {
  mockedDoctors,
  mockedMissingProperties,
  mockedInvalidAge,
  mockedInvalidCrm,
  mockedInvalidStates,
  mockedNulledProperties,
} from "../../mocks/doctors/index";
import Users from "../../../entities/user.entity";
import { mockedAdmin } from "../../mocks/users";
import { IDoctor } from "../../../interfaces/doctor/index";
import * as jwt from "jsonwebtoken";

describe("Testing /DOCTORS routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during DataSource initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /doctors - Should be able to create a new Doctor. Three doctors are created here.", async () => {
    const specialtyRepository = AppDataSource.getRepository(Specialties);
    const specialty = specialtyRepository.create({ name: "Cardiologista" });
    await specialtyRepository.save(specialty);

    const addressesRepository = AppDataSource.getRepository(Addresses);
    const address = addressesRepository.create(mockedDoctors[0].address);
    await addressesRepository.save(address);

    const response = await request(app).post("/doctors").send(mockedDoctors[0]);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("CRM");
    expect(response.body).toHaveProperty("specialties");
    expect(response.body).toHaveProperty("sex");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("address");
    expect(response.body).not.toHaveProperty("password");

    await request(app).post("/doctors").send(mockedDoctors[1]);
    await request(app).post("/doctors").send(mockedDoctors[2]);
  });

  test("POST /doctors - Should not be able to create a Doctor that already exists", async () => {
    const response = await request(app).post("/doctors").send(mockedDoctors[0]);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /doctors - Should not be able to create a Doctor with invalid CRM. CRM must have 2 letters and 6 numbers", async () => {
    const response = await request(app)
      .post("/doctors")
      .send(mockedInvalidCrm[0]);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");

    const response2 = await request(app)
      .post("/doctors")
      .send(mockedInvalidCrm[1]);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /doctors - Should not be able to create a Doctor with invalid Age. Age cannot be 0 or greater than 99", async () => {
    const response = await request(app)
      .post("/doctors")
      .send(mockedInvalidAge[0]);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");

    const response2 = await request(app)
      .post("/doctors")
      .send(mockedInvalidAge[1]);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /doctors - Should not be able to create a Doctor with invalid States. State must be a string with length = 2", async () => {
    const response = await request(app)
      .post("/doctors")
      .send(mockedInvalidStates[0]);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");

    const response2 = await request(app)
      .post("/doctors")
      .send(mockedInvalidStates[1]);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  mockedMissingProperties.forEach((mocked) => {
    test(`POST /doctors - Should not be able to create a Doctor without '${mocked.missingProp}' property`, async () => {
      const response = await request(app).post("/doctors").send(mocked);
      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty("message");
    });
  });

  mockedNulledProperties.forEach((mocked) => {
    test(`POST /doctors - Should not be able to create a Doctor with empty '${mocked.nulledProp}' value`, async () => {
      const response = await request(app).post("/doctors").send(mocked);
      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty("message");
    });
  });

  test("GET /doctors - Should be able to list all doctors. Three doctors are expected", async () => {
    const response = await request(app).get("/doctors");
    expect(response.status).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(3);
  });

  test("GET /doctors/:id - Should be able to fetch a specific doctor.", async () => {
    const doctors = await request(app).get("/doctors");
    const response = await request(app).get(`/doctors/${doctors.body[0].id}`);
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("CRM");
    expect(response.body).toHaveProperty("specialties");
    expect(response.body).toHaveProperty("sex");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("address");
    expect(response.body).not.toHaveProperty("password");
  });

  test("GET /doctors/:id - Should not be able to fetch a specific doctor with invalid ID.", async () => {
    const response = await request(app).get(`/doctors/f32f921994f9fqf`);
    expect(response.status).toBe(404);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("id");
    expect(response.body).not.toHaveProperty("name");
    expect(response.body).not.toHaveProperty("email");
    expect(response.body).not.toHaveProperty("CRM");
    expect(response.body).not.toHaveProperty("specialties");
    expect(response.body).not.toHaveProperty("sex");
    expect(response.body).not.toHaveProperty("age");
    expect(response.body).not.toHaveProperty("isActive");
    expect(response.body).not.toHaveProperty("createdAt");
    expect(response.body).not.toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("address");
    expect(response.body).not.toHaveProperty("password");
  });

  test("GET /doctors/profile - Should be able to fetch information of the logged doctor", async () => {
    const doctorsRepository = AppDataSource.getRepository(Doctors);
    const loggedDoctor = await doctorsRepository.findOne({
      where: { CRM: mockedDoctors[0].CRM },
    });
    const token = jwt.sign({ crm: loggedDoctor!.CRM }, "secret_key", {
      subject: loggedDoctor!.id,
      expiresIn: "2h",
    });
    const response = await request(app)
      .get(`/doctors/profile`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("CRM");
    expect(response.body).toHaveProperty("specialties");
    expect(response.body).toHaveProperty("sex");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("password");
    expect(response.body.name).toBe("Mr. Correct One");
    expect(response.body.isActive).toBe(true);
  });

  test("DELETE /doctors/:id - Should be able to soft delete target doctor", async () => {
    const doctorsRepository = AppDataSource.getRepository(Doctors);
    const loggedDoctor = await doctorsRepository.findOne({
      where: { CRM: mockedDoctors[0].CRM },
    });
    const token = jwt.sign({ crm: loggedDoctor!.CRM }, "secret_key", {
      subject: loggedDoctor!.id,
      expiresIn: "2h",
    });
    const response = await request(app)
      .delete(`/doctors/${loggedDoctor!.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(204);

    const deletedDoctor = await doctorsRepository.findOne({
      where: { CRM: mockedDoctors[0].CRM },
    });

    expect(deletedDoctor!).toHaveProperty("id");
    expect(deletedDoctor!).toHaveProperty("name");
    expect(deletedDoctor!).toHaveProperty("email");
    expect(deletedDoctor!).toHaveProperty("CRM");
    expect(deletedDoctor!).toHaveProperty("sex");
    expect(deletedDoctor!).toHaveProperty("age");
    expect(deletedDoctor!).toHaveProperty("isActive");
    expect(deletedDoctor!).toHaveProperty("createdAt");
    expect(deletedDoctor!).toHaveProperty("updatedAt");
    expect(deletedDoctor!).toHaveProperty("address");
    expect(deletedDoctor!).toHaveProperty("password");
    expect(deletedDoctor!.name).toBe("Mr. Correct One");
    expect(deletedDoctor!.isActive).toBe(false);
  });

  test("DELETE /doctors/:id - Should not be able to soft delete target doctor with invalid ID", async () => {
    const doctorsRepository = AppDataSource.getRepository(Doctors);
    const loggedDoctor = await doctorsRepository.findOne({
      where: { CRM: mockedDoctors[1].CRM },
    });
    const token = jwt.sign({ crm: loggedDoctor!.CRM }, "secret_key", {
      subject: loggedDoctor!.id,
      expiresIn: "2h",
    });
    const response = await request(app)
      .delete(`/doctors/fwepfwpefokwpfokpq3okfpokf`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");

    const deletedDoctor = await doctorsRepository.findOne({
      where: { CRM: mockedDoctors[1].CRM },
    });

    expect(deletedDoctor!).toHaveProperty("id");
    expect(deletedDoctor!).toHaveProperty("name");
    expect(deletedDoctor!).toHaveProperty("email");
    expect(deletedDoctor!).toHaveProperty("CRM");
    expect(deletedDoctor!).toHaveProperty("sex");
    expect(deletedDoctor!).toHaveProperty("age");
    expect(deletedDoctor!).toHaveProperty("isActive");
    expect(deletedDoctor!).toHaveProperty("createdAt");
    expect(deletedDoctor!).toHaveProperty("updatedAt");
    expect(deletedDoctor!).toHaveProperty("address");
    expect(deletedDoctor!).toHaveProperty("password");
    expect(deletedDoctor!.name).toBe("Mr. Correct Two");
    expect(deletedDoctor!.isActive).toBe(true);
  });

  test("DELETE /doctors/:id - Should not be able to soft delete target doctor without authentication", async () => {
    const doctorsRepository = AppDataSource.getRepository(Doctors);
    const loggedDoctor = await doctorsRepository.findOne({
      where: { CRM: mockedDoctors[1].CRM },
    });
    const response = await request(app).delete(`/doctors/${loggedDoctor!.id}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /doctors/:id - Should be able to update target doctor", async () => {
    const doctorsRepository = AppDataSource.getRepository(Doctors);
    const loggedDoctor = await doctorsRepository.findOne({
      where: { CRM: mockedDoctors[1].CRM },
    });
    const token = jwt.sign({ crm: loggedDoctor!.CRM }, "secret_key", {
      subject: loggedDoctor!.id,
      expiresIn: "2h",
    });
    const response = await request(app)
      .patch(`/doctors/${loggedDoctor!.id}`)
      .send({
        name: "Mr. Always Correct",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("CRM");
    expect(response.body).toHaveProperty("specialties");
    expect(response.body).toHaveProperty("sex");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("password");
  });

  const proibido = [
    "id",
    "CRM",
    "specialties",
    "isActive",
    "createdAt",
    "updatedAt",
  ];
  proibido.forEach((property) => {
    test(`PATCH /doctors/:id - Should be not be able to update target doctor's property '${property}'`, async () => {
      const doctorsRepository = AppDataSource.getRepository(Doctors);
      const loggedDoctor = await doctorsRepository.findOne({
        where: { CRM: mockedDoctors[1].CRM },
      });
      const token = jwt.sign({ crm: loggedDoctor!.CRM }, "secret_key", {
        subject: loggedDoctor!.id,
        expiresIn: "2h",
      });
      const response = await request(app)
        .patch(`/doctors/${loggedDoctor!.id}`)
        .send({
          [property]: "this is just a dummy",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body[property]).not.toBe("this is just a dummy");
    });
  });

  test("PATCH /doctors/:id - Should be not be able to update target doctor without authentication ", async () => {
    const doctorsRepository = AppDataSource.getRepository(Doctors);
    const loggedDoctor = await doctorsRepository.findOne({
      where: { CRM: mockedDoctors[1].CRM },
    });
    const response = await request(app).patch(`/doctors/fpowkefpokpofkw`).send({
      name: "Mr. Always Correct",
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("id");
    expect(response.body).not.toHaveProperty("name");
    expect(response.body).not.toHaveProperty("email");
    expect(response.body).not.toHaveProperty("CRM");
    expect(response.body).not.toHaveProperty("specialties");
    expect(response.body).not.toHaveProperty("sex");
    expect(response.body).not.toHaveProperty("age");
    expect(response.body).not.toHaveProperty("isActive");
    expect(response.body).not.toHaveProperty("createdAt");
    expect(response.body).not.toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("address");
    expect(response.body).not.toHaveProperty("password");
  });

  test("PATCH /doctors/:id - Should be not be able to update target doctor with invalid ID ", async () => {
    const doctorsRepository = AppDataSource.getRepository(Doctors);
    const loggedDoctor = await doctorsRepository.findOne({
      where: { CRM: mockedDoctors[1].CRM },
    });

    const token = jwt.sign({ crm: loggedDoctor!.CRM }, "secret_key", {
      subject: loggedDoctor!.id,
      expiresIn: "2h",
    });
    const response = await request(app)
      .patch(`/doctors/fpowkefpokpofkw`)
      .send({
        name: "Mr. Always Correct",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("id");
    expect(response.body).not.toHaveProperty("name");
    expect(response.body).not.toHaveProperty("email");
    expect(response.body).not.toHaveProperty("CRM");
    expect(response.body).not.toHaveProperty("specialties");
    expect(response.body).not.toHaveProperty("sex");
    expect(response.body).not.toHaveProperty("age");
    expect(response.body).not.toHaveProperty("isActive");
    expect(response.body).not.toHaveProperty("createdAt");
    expect(response.body).not.toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("address");
    expect(response.body).not.toHaveProperty("password");
  });

  test("PATCH /doctors/:id - Should be able to update target being Adm ", async () => {
    const doctorsRepository = AppDataSource.getRepository(Doctors);
    const targetDoctor = await doctorsRepository.findOne({
      where: { CRM: mockedDoctors[1].CRM },
    });
    const usersRepository = AppDataSource.getRepository(Users);
    const newAdmin = usersRepository.create({
      name: "Daniel",
      email: "daniel2@mail.com",
      isAdmin: true,
      password: "123456",
      age: 30,
      CPF: "12345678912",
      sex: "Masculino",
      img: "htttp://",
      address: {
        district: "Rua São Vicente",
        city: "São Paulo",
        number: 89,
        state: "SP",
        zipCode: "121556",
      },
    });
    await usersRepository.save(newAdmin);
    const loggedAdmin = await usersRepository.findOne({
      where: { CPF: mockedAdmin.CPF },
    });
    const token = jwt.sign({ isAdmin: loggedAdmin!.isAdmin }, "secret_key", {
      subject: loggedAdmin!.id,
      expiresIn: "2h",
    });
    const response = await request(app)
      .patch(`/doctors/${targetDoctor!.id}`)
      .send({
        name: "Mr. Always Correct",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("CRM");
    expect(response.body).toHaveProperty("specialties");
    expect(response.body).toHaveProperty("sex");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("password");
  });

  test("PATCH /doctors/:id - Should not be able to update target with invalid ID, being Adm ", async () => {
    const usersRepository = AppDataSource.getRepository(Users);
    const loggedAdmin = await usersRepository.findOne({
      where: { CPF: mockedAdmin.CPF },
    });
    const token = jwt.sign({ isAdmin: loggedAdmin!.isAdmin }, "secret_key", {
      subject: loggedAdmin!.id,
      expiresIn: "2h",
    });
    const response = await request(app)
      .patch(`/doctors/fpowkefpokpofkw`)
      .send({
        name: "Mr. Always Correct",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("id");
    expect(response.body).not.toHaveProperty("name");
    expect(response.body).not.toHaveProperty("email");
    expect(response.body).not.toHaveProperty("CRM");
    expect(response.body).not.toHaveProperty("specialties");
    expect(response.body).not.toHaveProperty("sex");
    expect(response.body).not.toHaveProperty("age");
    expect(response.body).not.toHaveProperty("isActive");
    expect(response.body).not.toHaveProperty("createdAt");
    expect(response.body).not.toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("address");
    expect(response.body).not.toHaveProperty("password");
  });
});
