import Joi from 'joi'; 
import { usersRepo } from '@/helpers/server';
import { apiHandler } from '@/helpers/server/api';

module.exports = apiHandler({
    GET: getAll,
    POST: create
});

async function getAll() {
    return await usersRepo.getAll();
}

async function create(req: Request) {
    const body = await req.json();
    await usersRepo.create(body);
}

create.schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});