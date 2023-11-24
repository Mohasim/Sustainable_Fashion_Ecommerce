import Joi from "joi";
import { apiHandler } from "@/helpers/server/api";
import { cartRepo } from "@/helpers/server";
import { headers } from "next/headers";

module.exports = apiHandler({
    PUT: removeFromCart,
});

async function removeFromCart(req: Request) {
    const body = await req.json();
    const userId= headers().get('userId') ||'';
    return await cartRepo.removeFromCart(userId, body.productId);
}

