import { describe, test, expect } from "@jest/globals";
import chaiHttp from "chai-http";
import chai from "chai";

import server from "../app";

chai.use(chaiHttp);

describe("TESTING API", () => {
  //   afterAll(async () => {});

  test("GET /api/v1/tasks", async () => {
    const response = await chai.request(server).get("/api/v1/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status_code");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.status_code).toBe(200);
    expect(response.body.message).toBe("SUCCESS GET ALL DATA TASK");
  });

  test("GET task by id /api/v1/tasks/:id", async () => {
    const response = await chai
      .request(server)
      .get("/api/v1/tasks/ae449b7e-edc6-45e2-8491-042b850d0e29");
    try {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status_code");
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("data");
      expect(response.body.status_code).toBe(200);
      expect(response.body.message).toBe("SUCCESS GET DATA TASK");
    } catch (error) {
      expect(response.status).toBe(404);
    }
  });

  test("POST /api/v1/task", async () => {
    const response = await chai.request(server).post("/api/v1/task").send({
      title: "TOMORROW MEET WITH CLIENT",
      completed: false,
      description: "Remember this important we meet tomorrow",
    });

    try {
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("status_code");
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("data");
      expect(response.body.status_code).toBe(201);
      expect(response.body.message).toBe("SUCCESS CREATED NEW TASK");
      expect(response.body.data.title).toBe("TOMORROW MEET WITH CLIENT");
      expect(response.body.data.completed).toBe(false);
      expect(response.body.data.description).toBe(
        "Remember this important we meet tomorrow"
      );
    } catch (error) {
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Oops! validation error");
    }
  });

  test("PATCH /api/v1/tasks/:id", async () => {
    const response = await chai
      .request(server)
      .patch("/api/v1/tasks/0bf60790-535a-4979-a3ad-1c988372fe7c")
      .send({
        title: "UPDATED Meeting with big boss",
        completed: true,
        description: "Update description",
      });

    try {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status_code");
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("data");
      expect(response.body.status_code).toBe(200);
      expect(response.body.message).toBe("SUCCESS UPDATED TASK");
      expect(response.body.data.title).toBe("UPDATED Meeting with big boss");
      expect(response.body.data.completed).toBe(true);
      expect(response.body.data.description).toBe("Update description");
    } catch (error) {
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Oops! validation error");
    }
  });

  test("DELETE /api/v1/tasks/:id", async () => {
    const response = await chai
      .request(server)
      .delete("/api/v1/tasks/dffde958-830a-4b85-add5-bf60688ff834");

    try {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status_code");
      expect(response.body).toHaveProperty("message");
      expect(response.body.status_code).toBe(200);
      expect(response.body.message).toBe("SUCCESS DELETE 1 TASK");
    } catch (error) {
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Oops! data not found");
    }
  });
});
