import { UsersRepository } from "../repositories/users-repository";
import { prisma } from "../lib/prisma";
import { hash } from "bcryptjs";
import { Prisma, User } from "@prisma/client";
import { ApiError } from "../errors/ApiError";
import { STATUS_CODE } from "../utils/status-code";
interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  document?: string
  birth_date: Date
  chronic_dialies: string[]
  blood_type?: "A_PLUS" | "B_PLUS" | "AB" | "O"
  role: "ADMIN" | "NORMAL" | "DOCTOR" | "RESPONSABLE"
}

interface RegisterUseCaseResponse {
  user: User;
}
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(data?.password, 6);
    const createUserData = { ...data, password_hash }
    const userAlreadyExists = await this.usersRepository.findUserByEmail(data?.email);

    if (!!userAlreadyExists) throw new ApiError("User already exists!", STATUS_CODE.CONFLICT);

    const user = await this.usersRepository.create(createUserData);

    return { user };
  }
}
