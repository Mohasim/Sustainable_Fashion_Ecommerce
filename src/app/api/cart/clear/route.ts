import { apiHandler } from "@/helpers/server/api";
import { cartRepo } from "@/helpers/server";
import { headers } from "next/headers";

module.exports = apiHandler({
    DELETE: _clearCart
});

async function _clearCart(req: Request) {
    const userId= headers().get('userId') ||'';
    return await cartRepo.clearCart(userId);
}