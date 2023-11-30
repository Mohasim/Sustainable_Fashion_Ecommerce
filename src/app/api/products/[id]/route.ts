import Joi from "joi";
import { apiHandler } from "@/helpers/server/api";
import { productRepo } from "@/helpers/server";

module.exports = apiHandler({
    GET: getById,
    PUT: update,
    DELETE: _delete,
});

async function getById(req: Request, { params: { id } }: any) {
    return await productRepo.getById(id);
}

async function update(req: Request, { params: { id } }: any) {
    const body = await req.json();
    await productRepo.update(id, body);
}

update.schema = Joi.object({
    name: Joi.string(),
    price: Joi.number(),
    description: Joi.string(),
    image: Joi.string(),
    brand: Joi.string(),
    category: Joi.string(),
    countInStock: Joi.number(),
    rating: Joi.number(),
    numReviews: Joi.number(),
    reviews: Joi.array(),
});

async function _delete(req: Request, { params: { id } }: any) {
    await productRepo.delete(id);
}