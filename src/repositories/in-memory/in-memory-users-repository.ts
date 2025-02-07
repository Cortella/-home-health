import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {

  public items: User[] = [];
  async create(
    data: Prisma.UserCreateInput
  ): Promise<User> {
   if (!data.id)
    data.id = randomUUID();
    const user = data as User
   this.items.push(user);

   return user
  }
  
  async findUserByEmail(
    email: string
  ): Promise<User | null> {
   const user = this.items.find((item) => item.email === email);

   if(!user) return null;

   return user
  }

  async findUserById(
    userId: string
  ): Promise<User | null> {
   const user = this.items.find((item) => item.id === userId);

   if(!user) return null;

   return user
  }
}
