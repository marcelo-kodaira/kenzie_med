import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAdmin,
  mockedUser,
  mockedUserActive,
  mockedUserActiveLogin,
  mockedUserLogin,
} from "../../mocks/users";
import { ILogin } from "../../../interfaces/login";
import { IUserRequest } from "../../../interfaces/user";

const mockedInactiveUser: IUserRequest = {
  name: "Daniel",
  email: "marcelo@mail.com",
  isAdmin: false,
  password: "abcdefg",
  age: 30,
  CPF: "12345678911",
  sex: "Masculino",
  img: "htttp://",
  address: {
    district: "Rua São Vicente",
    city: "São Paulo",
    number: 89,
    state: "SP",
    zipCode: "121556",
  },
};

const mockedInactiveUserLogin: ILogin = {
  email: "marcelo@mail.com",
  password: "abcdefg",
};

describe("Testing /LOGIN/USERS routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUserActive);
    await request(app).post("/users").send(mockedAdmin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login -  should be able to login with the user", async () => {
    const response = await request(app).post("/login/users").send(mockedAdmin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /login -  Should not be able to login with the user with incorrect password or email", async () => {
    const response = await request(app).post("/login/users").send({
      email: "danielgalvan@mail.com",
      password: "abcdef",
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /login -  Should not be able to login with the user with incorrect password or email", async () => {
    const response = await request(app).post("/login/users").send({
      email: "marcelo@mail.com",
      password: "123456",
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /login -  Should not be able to login with  user with isActive = false", async () => {
    const res = await request(app).post("/users").send(mockedInactiveUser);
    const response = await request(app)
      .post("/login/users")
      .send(mockedInactiveUserLogin);
    await request(app)
      .delete(`/users/${res.body.id}`)
      .set("Authorization", `Bearer ${response.body.token}`);

    const answer = await request(app)
      .post("/login/users")
      .send(mockedInactiveUserLogin);
    expect(answer.body).toHaveProperty("message");
    expect(answer.status).toBe(403);
  });
});
