import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedAdmin, mockedUser, mockedUserActive, mockedUserActiveLogin, mockedUserLogin } from "../../mocks/users";



describe("/login", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        const response = await request(app).post('/users').send(mockedUser)
        await request(app).delete(`/users/${response.body.id}`).send(mockedUser)

        await request(app).post('/users').send(mockedUserActive)
        await request(app).post('/users').send(mockedAdmin)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /login -  should be able to login with the user",async () => {
        const response = await request(app).post("/login/users").send(mockedUserActiveLogin);
        
        expect(response.body).toHaveProperty("token")
        expect(response.status).toBe(200)
     
    })

    test("POST /login -  Should not be able to login with the user with incorrect password or email",async () => {
        const response = await request(app).post("/login/users").send({
            email: "danielgalvan@mail.com",
            password: "abcdef"
        });

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("POST /login -  Should not be able to login with the user with incorrect password or email",async () => {
        const response = await request(app).post("/login/users").send({
            email: "marcelo@mail.com",
            password: "123456"
        });

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("POST /login -  Should not be able to login with  user with isActive = false",async () => {
        const response = await request(app).post("/login/users").send(mockedUserLogin);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

})