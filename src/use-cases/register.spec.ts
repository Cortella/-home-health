import { describe, expect, test, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare, hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { ApiError } from "../errors/ApiError";
import { beforeEach } from "vitest";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });
  it("should be able to register", async () => {
    const { user } = await sut.execute({
      email: "jE2wZ@example.com",
      name: "John Doe",
      birth_date: new Date(),
      blood_type: "A_PLUS",
      document: "12345678901",
      chronic_dialies: ["teste, ola"],
      role: "NORMAL",
      password: "123456",
    })

    expect(user?.email).toEqual(expect.any(String));
  });

  it("should hash user password upon rgistration", async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);

    const { user } = await sut.execute({
      email: "jE2wZ@example.com",
      name: "John Doe",
      birth_date: new Date(),
      blood_type: "A_PLUS",
      document: "12345678901",
      chronic_dialies: ["teste, ola"],
      role: "NORMAL",
      password: "123456",
    })

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be alble to register with same email twice", async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);

    const email = "johndoe@example.com";
    const { user } = await sut.execute({
      email: email,
      name: "John Doe",
      birth_date: new Date(),
      blood_type: "A_PLUS",
      document: "12345678901",
      chronic_dialies: ["teste, ola"],
      role: "NORMAL",
      password: await hash("123456", 6),
    })

    await expect(async() =>
    sut.execute({
      email: email,
      name: "John Doe",
      birth_date: new Date(),
      blood_type: "A_PLUS",
      document: "12345678901",
      chronic_dialies: ["teste, ola"],
      role: "NORMAL",
      password: await hash("123456", 6),
    })
    ).rejects.toBeInstanceOf(ApiError);
  });
});
