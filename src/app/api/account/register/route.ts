import Joi from 'joi';

import { usersRepo } from '@/helpers/server';
import { apiHandler } from '@/helpers/server/api';

module.exports = apiHandler({
    POST: register
});

async function register(req: Request) {
    const body = await req.json();
    await usersRepo.create(body);
}

register.schema = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});
