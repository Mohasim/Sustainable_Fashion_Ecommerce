import Joi from "joi";
import { apiHandler } from "@/helpers/server/api";
import { cartRepo } from "@/helpers/server";
import { usersRepo } from "@/helpers/server";
import { headers } from "next/headers";

module.exports = apiHandler({
    GET: getByUserId,
    POST: create
});

async function getByUserId(req: Request) {
    const userId= headers().get('userId') ||'';
    return await cartRepo.getUserCart(userId);
}

async function create(req: Request) {
    const body = await req.json();
    return await cartRepo.addToCart( body.productId, body.quantity);
}