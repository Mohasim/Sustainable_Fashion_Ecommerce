import Joi from "joi";
import { apiHandler } from "@/helpers/server/api";
import { cartRepo } from "@/helpers/server";
import { usersRepo } from "@/helpers/server";
import { headers } from "next/headers";

module.exports = apiHandler({
    PUT: addToCart
});

async function addToCart(req: Request) {
    const userId= headers().get('userId') ||'';
    const body = await req.json();
    if (!body.productId) {
        throw new Error("productId is required");
    }
    if (body.quantity < 1) {
        return await cartRepo.removeFromCart(userId, body.productId);
    }
    return await cartRepo.addToCart(body.productId, body.quantity);
}