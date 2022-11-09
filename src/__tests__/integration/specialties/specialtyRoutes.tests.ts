import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import app from "../../../app"
import request from "supertest"
import { mockedSpecialty } from "../../mocks/specialties/index"
import { mockedAdmin, mockedAdminLogin } from "../../mocks/users"

describe("Testing /SPECIALTIES routes", () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during DataSource initialization", err)
      })
    await request(app).post("/users").send(mockedAdmin)
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("POST /specialties - Must be able tro create a specialties", async () => {
    const resToken = await request(app).post("/login/users").send(mockedAdminLogin)
    const response = await request(app).post("/specialties").set("Authorization", `Bearer ${resToken.body.token}`).send(mockedSpecialty)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
  })

  test("GET /specialties -  Must be able to list specialties", async () => {
    const response = await request(app).get("/specialties")

    expect(response.body).toHaveLength(1)
    expect(response.status).toBe(200)
  })

  test("GET /specialties/:id/doctors -  Must be able to list specialties by id", async () => {
    const specialty = await request(app).get("/specialties")
    const response = await request(app).get(`/specialties/${specialty.body[0].id}/doctors`)

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.status).toBe(200)
  })
})
