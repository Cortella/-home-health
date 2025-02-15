import { describe, expect, test, it, beforeEach } from "vitest";
import { compare, hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { ApiError } from "../errors/ApiError";
import { GetUserProfileUseCase } from "./get-user-profile";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      email: "jE2wZ@example.com",
      name: "John Doe",
      birth_date: new Date(),
      blood_type: "A_PLUS",
      document: "12345678901",
      chronic_dialies: ["teste, ola"],
      role: "NORMAL",
      password_hash: await hash("123456", 6)
    });
    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user?.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ApiError);
  });
});
