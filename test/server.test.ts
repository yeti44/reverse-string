import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/server.js";

const app = createApp();

describe("reverse-string API", () => {
  it("reports health", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("reverses via GET query", async () => {
    const res = await request(app).get("/api/reverse").query({ text: "hello" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ input: "hello", reversed: "olleh" });
  });

  it("reverses via POST body", async () => {
    const res = await request(app).post("/api/reverse").send({ text: "world" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ input: "world", reversed: "dlrow" });
  });

  it("rejects a missing GET parameter", async () => {
    const res = await request(app).get("/api/reverse");
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTypeOf("string");
  });

  it("serves the frontend page", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("Reverse String");
  });
});
