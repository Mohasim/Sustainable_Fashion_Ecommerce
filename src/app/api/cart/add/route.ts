import Joi from "joi";
import { apiHandler } from "@/helpers/server/api";
import { cartRepo } from "@/helpers/server";
import { usersRepo } from "@/helpers/server";
import { headers } from "next/headers";

module.exports = apiHandler({
    PUT: addToCart
});

async function addToCart(req: Request) {
    const body = await req.json();
    return await cartRepo.addToCart(body.productId, body.quantity);
}