import { auth } from '@/helpers/server';
import { apiHandler } from '@/helpers/server/api';

module.exports = apiHandler({
    GET: getAuth
});

async function getAuth() {
    return await auth.isAuthenticated();
}