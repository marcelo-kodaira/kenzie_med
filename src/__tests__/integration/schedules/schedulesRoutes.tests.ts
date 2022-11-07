import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedUser, mockedAdmin, mockedUserInvalidCpf, mockedUserCpfAlredyExist, mockedUserLogin, mockedAdminLogin, mockedUserActive } from "../../mocks/users";
import { mockedDoctors } from "../../mocks/doctors";
import { mockedSchedule } from "../../mocks/schedules";

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

		await request(app).post('/doctors').send(mockedDoctors[0])
        await request(app).post('/users').send(mockedAdmin)             
	});

	afterAll(async () => {
		await connection.destroy();
	});

    test("POST /schedules - User admin - Should be able to create a schedule", async () => {
		const adminLoginResponse = await request(app).post("/login/users").send(mockedAdminLogin);
		const doctor = await request(app).get("/doctors")

		const scheduleCreate = {
			type: "consulta",
			description: "consulta",
			doctorsID: doctor.body[0].id,
			hour: "18:00",
			date: "12/11/2022"
		}
		const response = await request(app).post("/schedules").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(scheduleCreate);
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

    test("POST /schedules - User comum - Should not be able to create a schedule", async () => {
		const doctor = await request(app).get("/doctors")

		const scheduleCreate = {
			type: "consulta",
			description: "consulta",
			doctorsID: doctor.body[0].id,
			hour: "18:00",
			date: "12/11/2022"
		}
//############################################################
		const response = await request(app).post("/schedules").send(scheduleCreate);
		
		expect(response.body).toHaveProperty("message");		
		expect(response.status).toBe(404);
	});

	test("POST /schedules - Doctor Should be able to create a schedule", async () => {
		
		const response = await request(app).post("/schedules").send(mockedSchedule);
		
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

	test("POST /schedules - Schedule already exists", async () => {
		const response = await request(app).post("/schedules").send(mockedSchedule);		

		expect(response.body).toHaveProperty("message");		    
		expect(response.status).toBe(400);
	});

	test("PATCH /schedules/edit/:id -  Should not be able to edit schedule without authentication", async () => {
		const adminLoginResponse = await request(app).post("/login/doctors").send(mockedDoctors[0]);
		const schedulesToBeEdit = await request(app).get("/schedules/doctors").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		const response = await request(app).patch(`/schedules/edit/${schedulesToBeEdit.body[0].id}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("PATCH  /schedules/edit/:id -  DOCTORS - Should not be able to edit schedule with invalid id", async () => {
        await request(app).post("/schedules").send(mockedDoctors[0])

        const loginResponse = await request(app).post("/login/doctors").send(mockedDoctors[0]);
        
        const response = await request(app).patch(`/schedules/edit/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    });

	test("PATCH  /schedules/edit/:id - DOCTORS -  Must be able to edit schedule ", async () => {
        await request(app).post("/schedules").send(mockedDoctors[0])

        const doctorLoginResponse = await request(app).post("/login/doctors").send(mockedDoctors[0]);
        const scheduleToBeEdit = await request(app).get("/schedules/doctors").set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)

        const response = await request(app).patch(`/schedules/edit/${scheduleToBeEdit.body[0].id}`).set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
        expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(200)     
    });


	test("PATCH /schedules/:id -  USER - Should not be able to schedule without authentication", async () => {
		const loginUserResponse = await request(app).post("/login/users").send(mockedUserActive);
		const schedulesToBeScheduleByUser = await request(app).get("/schedules/doctor/:id").set("Authorization", `Bearer ${loginUserResponse.body.token}`);

		const response = await request(app).patch(`/schedules/${schedulesToBeScheduleByUser.body[0].id}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("PATCH  /schedules/:id -  USER - Should not be able to schedule with invalid id", async () => {
        await request(app).post("/schedules").send(mockedUserActive)

        const loginResponse = await request(app).post("/login/users").send(mockedUserActive);
        
        const response = await request(app).patch(`/schedules/edit/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    });

	test("PATCH  /schedules/edit/:id - USER -  Must be able to schedule ", async () => {
        await request(app).post("/schedules").send(mockedUserActive)

        const loginResponse = await request(app).post("/login/users").send(mockedUserActive);
        const scheduleToBeEdit = await request(app).get("/schedules/doctors/:id").set("Authorization", `Bearer ${loginResponse.body.token}`)

        const response = await request(app).patch(`/schedules/${scheduleToBeEdit.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(200)     
    });

	test("DELETE /schedules/:id -  USER - Should not be able to cancel a schedule without authentication", async () => {
		const loginUserResponse = await request(app).post("/login/users").send(mockedUserActive);
		const schedulesToBeCancelByUser = await request(app).get("/schedules/doctor/:id").set("Authorization", `Bearer ${loginUserResponse.body.token}`);

		const response = await request(app).delete(`/schedules/${schedulesToBeCancelByUser.body[0].id}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("DELETE  /schedules/:id -  USER - Should not be able to cancel schedule with invalid id", async () => {
        await request(app).post("/schedules").send(mockedUserActive)

        const loginResponse = await request(app).post("/login/users").send(mockedUserActive);
        
        const response = await request(app).delete(`/schedules/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    });

	test("DELETE  /schedules/:id - USER -  Must be able to cancel schedule ", async () => {
        await request(app).post("/schedules").send(mockedUserActive)

        const loginResponse = await request(app).post("/login/users").send(mockedUserActive);
        const schedulesToBeCancelByUser = await request(app).get("/schedules/doctors/:id").set("Authorization", `Bearer ${loginResponse.body.token}`)

        const response = await request(app).delete(`/schedules/${schedulesToBeCancelByUser.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(200)     
    });

	test("DELETE /schedules/delete/:id -  USER - Should not be able to delete a schedule without authentication", async () => {
		const loginUserResponse = await request(app).post("/login/users").send(mockedUserActive);
		const scheduleToBeDeleted = await request(app).get("/schedules/doctor/:id").set("Authorization", `Bearer ${loginUserResponse.body.token}`);

		const response = await request(app).delete(`/schedules/delete/${scheduleToBeDeleted.body[0].id}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("DELETE /schedules/delete/:id-  USER - Should not be able to delete schedule with invalid id", async () => {
        await request(app).post("/schedules").send(mockedUserActive)

        const loginResponse = await request(app).post("/login/users").send(mockedUserActive);
        
        const response = await request(app).delete(`/schedules/delete/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    });

	test("DELETE  /schedules/delete/:id - USER ADMIN -  Must be able to delete schedule ", async () => {
        await request(app).post("/schedules").send(mockedAdminLogin)

        const loginResponse = await request(app).post("/login/users").send(mockedAdminLogin);
        const scheduleToBeDeleted = await request(app).get("/schedules/doctors/:id").set("Authorization", `Bearer ${loginResponse.body.token}`)

        const response = await request(app).delete(`/schedules/delete/${scheduleToBeDeleted.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(200)     
    });

	test("DELETE  /schedules/delete/:id - DOCTOR -  Must be able to delete schedule ", async () => {
        await request(app).post("/schedules").send(mockedDoctors[0])

        const loginResponse = await request(app).post("/login/users").send(mockedDoctors[0]);
        const scheduleToBeDeleted = await request(app).get("/schedules/doctors/:id").set("Authorization", `Bearer ${loginResponse.body.token}`)

        const response = await request(app).delete(`/schedules/delete/${scheduleToBeDeleted.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(200)     
    });

	test("GET /schedules -  Must be able to list schedules", async () => {
		await request(app).post("/schedules").send(mockedAdmin);
		const adminLoginResponse = await request(app).post("/login/users").send(mockedAdminLogin);
		const response = await request(app).get("/schedules").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		expect(response.body).toHaveLength(2);
	});

	test("GET /schedules -  Should not be able to list schedules without authentication", async () => {
		const response = await request(app).get("/schedules");

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("GET /schedules -  Should not be able to list schedules not being admin", async () => {
		const userLoginResponse = await request(app).post("/login/users").send(mockedUserLogin);
		const response = await request(app).get("/schedules").set("Authorization", `Bearer ${userLoginResponse.body.token}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

});