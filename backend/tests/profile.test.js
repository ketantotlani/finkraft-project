const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
let dbConfig = require('../database/db');

require("dotenv").config();
/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(dbConfig.db);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /profile [positive]", () => {
    it("get all profiles", async () => {
        let limit = 10, offset = 0;
        const res = await request(app).get(`/profile/?limit=${limit}&offset=${offset}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.profile.length).toBeGreaterThan(0);
    });
});



describe("GET /profile [negative]", () => {
    it("get all profiles", async () => {
        let limit = 0, offset = -10;
        const res = await request(app).get(`/profile/?limit=${limit}&offset=${offset}`);
        expect(res.statusCode).toBe(500);
    });
});

