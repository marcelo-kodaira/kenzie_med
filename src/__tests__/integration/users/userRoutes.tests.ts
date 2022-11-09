import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import { mockedUser, mockedAdmin, mockedUserInvalidCpf, mockedUserCpfAlredyExist, mockedUserLogin, mockedAdminLogin, mockedUserActive } from "../../mocks/users"

describe("Testing /USERS routes", () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("POST /users - Must be able tro create a user", async () => {
    const response = await request(app).post("/users").send(mockedUser)

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("CPF")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("age")
    expect(response.body).toHaveProperty("sex")
    expect(response.body).toHaveProperty("img")
    expect(response.body).toHaveProperty("isAdmin")
    expect(response.body).toHaveProperty("address")
    expect(response.body).toHaveProperty("isActive")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")
    expect(response.body).not.toHaveProperty("password")
    expect(response.body.name).toEqual("Daniel")
    expect(response.body.email).toEqual("daniel@mail.com")
    expect(response.body.isAdmin).toEqual(false)
    expect(response.body.isActive).toEqual(true)
    expect(response.status).toBe(201)
  })

  test("POST /users - Should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUser)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(400)
  })

  test("POST /users - Should not be able to create a user that CPF already exists", async () => {
    const response = await request(app).post("/users").send(mockedUserCpfAlredyExist)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(400)
  })

  test("POST /users - Should not be able to create a user that CPF is invalid", async () => {
    const response = await request(app).post("/users").send(mockedUserInvalidCpf)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(400)
  })

  test("GET /users - Must be able to list users", async () => {
    await request(app).post("/users").send(mockedAdmin)
    const adminLoginResponse = await request(app).post("/login/users").send(mockedAdminLogin)
    const response = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

    expect(response.body).toHaveLength(2)
  })

  test("GET /users/profile - Must be able to list user himself", async () => {
    await request(app).post("/users").send(mockedAdmin)
    const adminLoginResponse = await request(app).post("/login/users").send(mockedAdminLogin)
    const response = await request(app).get("/users/profile").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("password")
    expect(response.body).toHaveProperty("CPF")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("age")
    expect(response.body).toHaveProperty("sex")
    expect(response.body).toHaveProperty("img")
    expect(response.body).toHaveProperty("isAdmin")
    expect(response.body).toHaveProperty("address")
    expect(response.body).toHaveProperty("isActive")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")
    expect(response.body).toHaveProperty("schedules")
    expect(response.body.name).toEqual("Daniel")
    expect(response.body.email).toEqual("daniel2@mail.com")
    expect(response.body.isAdmin).toEqual(true)
    expect(response.body.isActive).toEqual(true)
    expect(response.status).toBe(200)
  })

  test("GET /users - Should not be able to list users without authentication", async () => {
    const response = await request(app).get("/users")

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test("GET /users - Should not be able to list users not being admin", async () => {
    const userLoginResponse = await request(app).post("/login/users").send(mockedUserLogin)
    const response = await request(app).get("/users").set("Authorization", `Bearer ${userLoginResponse.body.token}`)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test("DELETE /users/:id - Should not be able to delete user without authentication", async () => {
    const adminLoginResponse = await request(app).post("/login/users").send(mockedAdminLogin)
    const UserTobeDeleted = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

    const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test("DELETE /users/:id - Must be able to soft delete user", async () => {
    await request(app).post("/users").send(mockedAdmin)

    const adminLoginResponse = await request(app).post("/login/users").send(mockedAdminLogin)
    const UserTobeDeleted = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

    const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    const findUser = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    expect(response.status).toBe(204)
    expect(findUser.body[0].isActive).toBe(false)
  })

  test("DELETE /users/:id - Shouldn't be able to delete user with isActive = false", async () => {
    await request(app).post("/users").send(mockedAdmin)

    const adminLoginResponse = await request(app).post("/login/users").send(mockedAdminLogin)
    const userTobeDeleted = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

    const response = await request(app).delete(`/users/${userTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message")
  })

  test("DELETE /users/:id - Should not be able to delete user with invalid id", async () => {
    await request(app).post("/users").send(mockedUserActive)

    const userLoginResponse = await request(app).post("/login/users").send(mockedAdminLogin)

    const response = await request(app).delete("/users/adc961a1-e82a-4392-98b8-8b6687a73586").set("Authorization", `Bearer ${userLoginResponse.body.token}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message")
  })

  test("DELETE /users/:id - Should not be able to delete another user without Admin permission", async () => {
    await request(app).post("/users").send(mockedUserActive)

    const userLoginResponse = await request(app).post("/login/users").send(mockedUserActive)

    const response = await request(app).delete(`/users/adc961a1-e82a-4392-98b8-8b6687a73586`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  })

  test("PATCH /users/:id - Should not be able to update user without authentication", async () => {
    const adminLoginResponse = await request(app).post("/login/users").send(mockedAdminLogin)
    const userTobeUpdate = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    const response = await request(app).patch(`/users/${userTobeUpdate.body[0].id}`)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test("PATCH /users/:id - Should not be able to update user with invalid id", async () => {
    const newValues = { name: "Daniel Galvan", email: "danielgalvan@mail.com" }
    const adminLoginResponse = await request(app).post("/login/users").send(mockedAdminLogin)

    await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

    const response = await request(app).patch(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(newValues)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(404)
  })

  test("PATCH /users/:id - Should not be able to update isAdmim field value", async () => {
    const newValues = { isAdmin: false }

    const admingLoginResponse = await request(app).post("/login/users").send(mockedAdminLogin)

    const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", `Bearer ${admingLoginResponse.body.token}`)
    const userTobeUpdateId = userTobeUpdateRequest.body[0].id

    const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization", `Bearer ${admingLoginResponse.body.token}`).send(newValues)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(400)
  })

  test("PATCH /users/:id - Should not be able to update id field value", async () => {
    const newValues = { id: false }

    const admingLoginResponse = await request(app).post("/login/users").send(mockedAdminLogin)

    const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", `Bearer ${admingLoginResponse.body.token}`)
    const userTobeUpdateId = userTobeUpdateRequest.body[0].id

    const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization", `Bearer ${admingLoginResponse.body.token}`).send(newValues)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(400)
  })

  test("PATCH /users/:id - Should not be able to update CPF field value", async () => {
    const newValues = { CPF: "12345678911" }

    const admingLoginResponse = await request(app).post("/login/users").send(mockedAdminLogin)

    const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", `Bearer ${admingLoginResponse.body.token}`)
    const userTobeUpdateId = userTobeUpdateRequest.body[0].id

    const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization", `Bearer ${admingLoginResponse.body.token}`).send(newValues)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(400)
  })

  test("PATCH /users/:id - Should not be able to update another user without adm permission", async () => {
    const newValues = { name: "Alejandro" }

    await request(app).post("/users").send(mockedUserActive)

    const userLoginResponse = await request(app).post("/login/users").send(mockedUserActive)
    const admingLoginResponse = await request(app).post("/login/users").send(mockedAdminLogin)
    const userToken = `Bearer ${userLoginResponse.body.token}`
    const adminToken = `Bearer ${admingLoginResponse.body.token}`

    const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", adminToken)
    const userTobeUpdateId = userTobeUpdateRequest.body[0].id

    const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization", userToken).send(newValues)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test("PATCH /users/:id - Should be able to update user", async () => {
    const newValues = { name: "Galvan", email: "galvandaniel@mail.com" }

    const admingLoginResponse = await request(app).post("/login/users").send(mockedAdminLogin)
    const token = `Bearer ${admingLoginResponse.body.token}`

    const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", token)
    const userTobeUpdateId = userTobeUpdateRequest.body[0].id

    const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization", token).send(newValues)

    expect(response.status).toBe(200)
    expect(response.body.name).toEqual("Galvan")
    expect(response.body.email).toEqual("galvandaniel@mail.com")
    expect(response.body).not.toHaveProperty("password")
  })
})
