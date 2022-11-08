import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedDoctors } from "../../mocks/doctors";



describe("/login", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        const response = await request(app).post('/doctors').send(mockedDoctors[0])

        await request(app).delete(`/doctors/${response.body.id}`).send(mockedDoctors[0])
        await request(app).post('/doctors').send(mockedDoctors[1])
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /login/doctor -  Should be able to login with the doctor", async () => {
        const response = await request(app).post("/login/doctors").send({
            email: "oktwo@mail.com",
            password: "123456"
        });
        
        expect(response.body).toHaveProperty("token")
        expect(response.status).toBe(200)
     
    })

    test("POST /login -  Should not be able to login with the user with incorrect email", async () => {
        const response = await request(app).post("/login/doctors").send({
            email: "incorrect@mail.com",
            password: "123456"
        });

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("POST /login -  should not be able to login with the user with incorrect password",async () => {
        const response = await request(app).post("/login/doctors").send({
            email: "okone@mail.com",
            password: "IncorrectPassword"
        });

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("POST /login -  Should not be able to login with  user with isActive = false",async () => {
        const response = await request(app).post("/login/doctors").send({
            email: "okone@mail.com",
            password: "123456"
        });

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

})