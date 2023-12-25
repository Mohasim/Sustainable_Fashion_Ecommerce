import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';

import { useFetch } from '@/helpers/client';

export { useUserService };

// user state store
const initialState = {
    users: undefined,
    user: undefined,
    currentUser: undefined
};
const userStore = create<IUserStore>(() => initialState);

function useUserService(): IUserService {
    // const alertService = useAlertService();
    const fetch = useFetch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const apiurl=process.env.NEXT_PUBLIC_BASE_API_URL;
    console.log('apiurl',apiurl);

    const { users, user, currentUser } = userStore();

    return {
        users,
        user,
        currentUser,
        login: async (email, password) => {
            
            const currentUser = await fetch.post(`${apiurl}/api/account/login`, { email, password });
            userStore.setState({ ...initialState, currentUser });

            // get return url from query parameters or default to '/'
            const returnUrl = searchParams.get('returnUrl') || '/';
            router.push(returnUrl);
        },
        logout: async () => {
            await fetch.post(`${apiurl}/api/account/logout`);
            router.push('/signin');
        },
        register: async (user) => {
            await fetch.post(`${apiurl}/api/account/register`, user);
            router.push('/signin');
            
        },
        getAll: async () => {
            userStore.setState({ users: await fetch.get(`${apiurl}/api/users`) });
        },
        getById: async (id) => {
            userStore.setState({ user: undefined });
            userStore.setState({ user: await fetch.get(`${apiurl}/api/users/${id}`) });
        },
        getCurrent: async () => {
            if (!currentUser) {
                userStore.setState({ currentUser: await fetch.get(`${apiurl}/api/users/current`) });
            }
        },
        create: async (user) => {
            await fetch.post(`${apiurl}/api/users`, user);
        },
        update: async (id, params) => {
            await fetch.put(`${apiurl}/api/users/${id}`, params);

            // update current user if the user updated their own record
            if (id === currentUser?.id) {
                userStore.setState({ currentUser: { ...currentUser, ...params } })
            }
        },
        isAuthenticated: async () => {
            return await fetch.get(`${apiurl}/api/users/authenticate`);
        },
        delete: async (id) => {
            // set isDeleting prop to true on user
            userStore.setState({
                users: users!.map(x => {
                    if (x.id === id) { x.isDeleting = true; }
                    return x;
                })
            });

            // delete user
            const response = await fetch.delete(`${apiurl}/api/users/${id}`);

            // remove deleted user from state
            userStore.setState({ users: users!.filter(x => x.id !== id) });

            // logout if the user deleted their own record
            if (response.deletedSelf) {
                router.push('/signin');
            }
        }
    }
};

// interfaces

interface IUser {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isDeleting?: boolean
}

interface IUserStore {
    users?: IUser[],
    user?: IUser,
    currentUser?: IUser
}

interface IUserService extends IUserStore {
    login: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    register: (user: IUser) => Promise<void>,
    getAll: () => Promise<void>,
    getById: (id: string) => Promise<void>,
    getCurrent: () => Promise<void>,
    create: (user: IUser) => Promise<void>,
    update: (id: string, params: Partial<IUser>) => Promise<void>,
    isAuthenticated: () => Promise<boolean>,
    delete: (id: string) => Promise<void>
}
