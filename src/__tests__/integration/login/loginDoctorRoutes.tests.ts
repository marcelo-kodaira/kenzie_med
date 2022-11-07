// import { DataSource } from "typeorm";
// import AppDataSource from "../../../data-source";
// import request from "supertest"
// import app from "../../../app";
// import { mockedUser } from "../../mocks/users";
// // import { mockedAdmin, mockedAdminLogin} from "../../mocks"


// describe("/login", () => {
//     let connection: DataSource

//     beforeAll(async() => {
//         await AppDataSource.initialize().then((res) => {
//             connection = res
//         }).catch((err) => {
//             console.error("Error during Data Source initialization", err)
//         })

//         await request(app).post('/users').send(mockedUser)
//     })

//     afterAll(async() => {
//         await connection.destroy()
//     })

//     test("POST /login/doctor -  Should be able to login with the doctor", async () => {
//         const response = await request(app).post("/login").send();
        
//         expect(response.body).toHaveProperty("token")
//         expect(response.status).toBe(200)
     
//     })

//     test("POST /login -  Should not be able to login with the user with incorrect password or email", async () => {
//         const response = await request(app).post("/login").send({
//             email: "felipe@mail.com",
//             password: "1234567"
//         });

//         expect(response.body).toHaveProperty("message")
//         expect(response.status).toBe(403)
             
//     })

//     test("POST /login -  should not be able to login with the user with incorrect password or email",async () => {
//         const response = await request(app).post("/login").send({
//             email: "felipe@mail.com",
//             password: "1234567"
//         });

//         expect(response.body).toHaveProperty("message")
//         expect(response.status).toBe(403)
             
//     })

// })