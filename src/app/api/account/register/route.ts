import joi from 'joi';

import { usersRepo } from '@/helpers/server';
import { apiHandler } from '@/helpers/server/api';

module.exports = apiHandler({
    POST: register
});

async function register(req: Request) {
    const body = await req.json();
    await usersRepo.create(body);
}

register.schema = joi.object({
    firstname: joi.string(),
    lastname: joi.string(),
    email: joi.string().required(),
    password: joi.string().min(6).required(),
});
