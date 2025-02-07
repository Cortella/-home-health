import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../errors/ApiError";
import { STATUS_CODE } from "../../../utils/status-code";
import { makeGetUserProfileUseCase } from "../../../use-cases/factories/make-get-user-profile-use-case";

export async function getUserProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase();

    const { user } = await getUserProfileUseCase.execute({
      userId: request.user.sub,
    });

    return reply.status(STATUS_CODE.OK).send(user);
  } catch (e) {
    if (e instanceof ApiError) {
      return reply.status(e?.statusCode).send({ message: e?.message });
    }
    return reply.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send();
  }
}
