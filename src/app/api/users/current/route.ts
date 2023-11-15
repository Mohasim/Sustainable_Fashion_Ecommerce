import { usersRepo } from '@/helpers/server';
import { apiHandler } from '@/helpers/server/api';

module.exports = apiHandler({
    GET: getCurrent
});

async function getCurrent() {
    return await usersRepo.getCurrent();
}