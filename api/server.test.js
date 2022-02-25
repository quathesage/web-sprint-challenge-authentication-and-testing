const request = require("supertest")
const server = require("../api/server")
const db = require("../data/dbConfig")

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe("Auth Tests", () => {
  test("Successful Registration returns 200", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "Qua", password: "ashdfgasdojuhif" })
    expect(res.status).toBe(200)
  })
  test("Welcomes New User", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "Qua", password: "ashdfgasdojuhif" })
    expect(res.body.message).toBe("Welcome, Qua")
  })
  test("Successful Login", async () => {
    const res = await request(server).post("/api/auth/login").send({
      username: "Quavo",
      password: "isadfhoasdjfnj",
    })
    expect(res.status).toBe(200)
  })
  test("401 if wrong info", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "Qua", password: "assadfasdf" })
    expect(res.status).toBe(401)
  })
})
