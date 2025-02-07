import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest";
import { STATUS_CODE } from "../../../utils/status-code";
import { createAndAuthUser } from "../../../utils/test/create-and-auth-user";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to Profile", async () => {
    const { token } = await createAndAuthUser(app);
    const response = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(STATUS_CODE.OK);
  });
});
