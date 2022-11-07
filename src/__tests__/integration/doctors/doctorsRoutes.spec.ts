import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import request from "supertest";
import {
  mockedDoctors,
  mockedMissingProperties,
  mockedInvalidAge,
  mockedInvalidCrm,
  mockedInvalidStates,
  mockedNulledProperties,
} from "../../mocks/doctors/index";
import {
  ISpecialtyRequest,
  ISpecialtyUpdate,
} from "../../../interfaces/specialty/index";

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

  test("POST /doctors - Should be able to create a new Doctor", async () => {
    const specialty = await request(app)
      .post<ISpecialtyUpdate>("/specialties")
      .send({ name: "Cardiologista" });

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
  });

  test("POST /doctors - Should not be able to create a Doctor that already exists", async () => {
    const response = await request(app).post("/doctors").send(mockedDoctors[0]);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("message");
  });

  test("POST /doctors - Should not be able to create a Doctor with invalid CRM. CRM must have 2 letters and 6 numbers", async () => {
    const response = await request(app)
      .post("/doctors")
      .send(mockedInvalidCrm[0]);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("message");

    const response2 = await request(app)
      .post("/doctors")
      .send(mockedInvalidCrm[1]);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("message");
  });

  test("POST /doctors - Should not be able to create a Doctor with invalid Age. Age cannot be 0 or greater than 99", async () => {
    const response = await request(app)
      .post("/doctors")
      .send(mockedInvalidAge[0]);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("message");

    const response2 = await request(app)
      .post("/doctors")
      .send(mockedInvalidAge[1]);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("message");
  });

  test("POST /doctors - Should not be able to create a Doctor with invalid States. State must be a string with length = 2", async () => {
    const response = await request(app)
      .post("/doctors")
      .send(mockedInvalidStates[0]);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("message");

    const response2 = await request(app)
      .post("/doctors")
      .send(mockedInvalidStates[1]);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("message");
  });

  mockedMissingProperties.forEach((mocked) => {
    test(`POST /doctors - Should not be able to create a Doctor without '${mocked.missingProp}' property`, async () => {
      const response = await request(app).post("/doctors").send(mocked);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body).toHaveProperty("message");
    });
  });

  mockedNulledProperties.forEach((mocked) => {
    test(`POST /doctors - Should not be able to create a Doctor with empty '${mocked.nulledProp}' value`, async () => {
      const response = await request(app).post("/doctors").send(mocked);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body).toHaveProperty("message");
    });
  });
});
