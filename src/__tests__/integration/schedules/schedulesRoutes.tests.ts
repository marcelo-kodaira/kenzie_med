import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedUser,
  mockedAdmin,
  mockedUserLogin,
  mockedAdminLogin,
} from "../../mocks/users";
import {
  mockedCreateDoctor,
  mockedCreateSpeciality,
  mockedLoginDoctor,
} from "../../mocks/schedules";

describe("/schedules", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/specialties").send(mockedCreateSpeciality);
    await request(app).post("/doctors").send(mockedCreateDoctor);
    await request(app).post("/users").send(mockedAdmin);
    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /schedules - DOCTOR - Should be able to create a schedule", async () => {
    const doctorLoginResponse = await request(app)
      .post("/login/doctors")
      .send(mockedLoginDoctor);

    const adminloginReponse = await request(app)
      .post("/login/users")
      .send(mockedAdminLogin);
    const doctor = await request(app)
      .get("/doctors")
      .set("Authorization", `Bearer ${adminloginReponse.body.token}`);

    const scheduleCreate = {
      type: "consulta",
      description: "consulta",
      doctorsID: doctor.body[0].id,
      hour: "18:00",
      date: "12/11/2022",
    };

    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
      .send(scheduleCreate);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("isAvailable");
    expect(response.body.isAvailable).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("POST /schedules - ADMIN - Should be able to create a schedule", async () => {
    const adminloginReponse = await request(app)
      .post("/login/users")
      .send(mockedAdminLogin);
    const doctor = await request(app)
      .get("/doctors")
      .set("Authorization", `Bearer ${adminloginReponse.body.token}`);

    const scheduleCreate = {
      type: "consulta",
      description: "consulta",
      doctorsID: doctor.body[0].id,
      hour: "18:00",
      date: "01/06/2023",
    };

    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${adminloginReponse.body.token}`)
      .send(scheduleCreate);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("isAvailable");
    expect(response.body.isAvailable).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("POST /schedules - USER - Should not be able to create a schedule", async () => {
    const userloginReponse = await request(app)
      .post("/login/users")
      .send(mockedUserLogin);

    const adminloginReponse = await request(app)
      .post("/login/users")
      .send(mockedAdminLogin);
    const doctor = await request(app)
      .get("/doctors")
      .set("Authorization", `Bearer ${adminloginReponse.body.token}`);

    const scheduleCreate = {
      type: "consulta",
      description: "consulta",
      doctorsID: doctor.body[0].id,
      hour: "19:00",
      date: "12/11/2022",
    };

    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userloginReponse.body.token}`)
      .send(scheduleCreate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /schedules - Schedule already exists", async () => {
    const adminloginReponse = await request(app)
      .post("/login/users")
      .send(mockedAdminLogin);
    const doctor = await request(app)
      .get("/doctors")
      .set("Authorization", `Bearer ${adminloginReponse.body.token}`);

    const doctorLogin = await request(app)
      .post("/login/doctors")
      .send(mockedLoginDoctor);

    const scheduleCreate = {
      type: "consulta",
      description: "consulta",
      doctorsID: doctor.body[0].id,
      hour: "18:00",
      date: "12/11/2022",
    };

    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${doctorLogin.body.token}`)
      .send(scheduleCreate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /schedules/edit/:id - DOCTORS -  Should not be able to edit schedule without authentication", async () => {
    const doctorLoginResponse = await request(app)
      .post("/login/doctors")
      .send(mockedLoginDoctor);

    const schedulesToBeEdit = await request(app)
      .get("/schedules/doctors")
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);

    const response = await request(app).patch(
      `/schedules/edit/${schedulesToBeEdit.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH  /schedules/edit/:id -  DOCTORS - Should not be able to edit schedule with invalid id", async () => {
    const loginResponse = await request(app)
      .post("/login/doctors")
      .send(mockedLoginDoctor);

    const response = await request(app)
      .patch(`/schedules/edit/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH  /schedules/edit/:id - DOCTORS -  Must be able to edit schedule ", async () => {
    const doctorLoginResponse = await request(app)
      .post("/login/doctors")
      .send(mockedLoginDoctor);
    const scheduleToBeEdit = await request(app)
      .get("/schedules/doctors")
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/schedules/edit/${scheduleToBeEdit.body[0].id}`)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  test("PATCH /schedules/:id -  USER - Should not be able to schedule without authentication", async () => {
    const loginUserResponse = await request(app)
      .post("/login/users")
      .send(mockedUserLogin);
    const doctor = await request(app).get("/doctors");

    const schedulesToBeScheduleByUser = await request(app)
      .get(`/doctors/${doctor.body[0].id}/schedules`)
      .set("Authorization", `Bearer ${loginUserResponse.body.token}`);

    const response = await request(app).patch(
      `/schedules/${schedulesToBeScheduleByUser.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH  /schedules/:id -  USER - Should not be able to schedule with invalid id", async () => {
    const loginUserResponse = await request(app)
      .post("/login/users")
      .send(mockedUserLogin);

    const response = await request(app)
      .patch(`/schedules/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${loginUserResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH  /schedules/:id - USER -  Must be able to schedule ", async () => {
    const loginUserResponse = await request(app)
      .post("/login/users")
      .send(mockedUserLogin);

    const doctor = await request(app).get("/doctors");

    const scheduleToBeEdit = await request(app)
      .get(`/doctors/${doctor.body[0].id}/schedules`)
      .set("Authorization", `Bearer ${loginUserResponse.body.token}`);

    const response = await request(app)
      .patch(`/schedules/${scheduleToBeEdit.body[0].id}`)
      .set("Authorization", `Bearer ${loginUserResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  test("DELETE /schedules/:id -  USER - Should not be able to cancel a schedule without authentication", async () => {
    const loginUserResponse = await request(app)
      .post("/login/users")
      .send(mockedUserLogin);
    const doctor = await request(app).get("/doctors");

    const schedulesToBeCancelByUser = await request(app)
      .get(`/doctors/${doctor.body[0].id}/schedules`)
      .set("Authorization", `Bearer ${loginUserResponse.body.token}`);

    const response = await request(app).delete(
      `/schedules/${schedulesToBeCancelByUser.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE  /schedules/:id -  USER - Should not be able to cancel schedule with invalid id", async () => {
    const loginUserResponse = await request(app)
      .post("/login/users")
      .send(mockedUserLogin);

    const response = await request(app)
      .delete(`/schedules/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${loginUserResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE  /schedules/:id - USER -  Must be able to cancel schedule ", async () => {
    const loginUserResponse = await request(app)
      .post("/login/users")
      .send(mockedUserLogin);
    const doctor = await request(app).get("/doctors");
    const schedulesToBeCancelByUser = await request(app)
      .get(`/doctors/${doctor.body[0].id}/schedules`)
      .set("Authorization", `Bearer ${loginUserResponse.body.token}`);

    const response = await request(app)
      .delete(`/schedules/${schedulesToBeCancelByUser.body[0].id}`)
      .set("Authorization", `Bearer ${loginUserResponse.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  test("GET /schedules - USER ADMIN -  Must be able to list schedules", async () => {
    const adminLoginResponse = await request(app)
      .post("/login/users")
      .send(mockedAdminLogin);

    const response = await request(app)
      .get("/schedules")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(2);
  });

  test("GET /schedules -  Should not be able to list schedules without authentication", async () => {
    const response = await request(app).get("/schedules");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /schedules -  Should not be able to list schedules not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login/users")
      .send(mockedUserLogin);
    const response = await request(app)
      .get("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /schedules - USER -  Should  be able to list or schedules", async () => {
    const userLoginResponse = await request(app)
      .post("/login/users")
      .send(mockedUserLogin);

    const response = await request(app)
      .get("/schedules/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
  });

  test("GET /schedules -  DOCTOR - Should  be able to list or schedules ", async () => {
    const userLoginResponse = await request(app)
      .post("/login/doctors")
      .send(mockedLoginDoctor);
    const response = await request(app)
      .get("/schedules/doctors")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveLength(2);
  });

  test("GET /schedules - USER -  Should not be able to list or schedules  without authentication", async () => {
    const response = await request(app).get("/schedules/users");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /schedules -  DOCTOR - Should not be able to list or schedules  without authentication", async () => {
    const response = await request(app).get("/schedules/doctors");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
