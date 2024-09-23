import { create } from 'zustand'
import Repository from "../../../types/repository";
import api from "../api";
import { SortOrder } from "antd/es/table/interface";
import User from "../../../types/user";
import { notification } from "antd";
import errors from "../../../utils/errors";

type Params = {
    page: number,
    per_page: number,
    sort?: string,
    direction?: SortOrder,

}

type Action = {
    star: ({ name, owner }: { name: string, owner: string }) => void
    unStar: ({ name, owner }: { name: string, owner: string }) => void,
    fetch: (params?: Params) => void,
    fetchOne: ({ name, owner }: { name: string, owner: string }) => void,
    stared: ({ name, owner }: { name: string, owner: string }) => void,
    setParams: (params: Params) => void,
    setFilters: (filters: { [key in keyof Repository]: string }) => void
}

type State = {
    repositories: Repository[],
    repository?: Repository,
    params: Params,
    total: number,
    filters: {
        [key in keyof Repository]: string
    }
}

const useRepository = create<State & Action>((set, get) => {
    return ({
        repositories: [],
        total: 0,
        params: {
            page: 1,
            per_page: 10,

        },
        filters: {} as { [key in keyof Repository]: string },
        setParams: (params: Params) => {
            set({ params });
        },
        setFilters: (filters: { [key in keyof Repository]: string }) => {
            set({ filters });
        },
        fetchOne: async ({ name, owner }) => {
            const { data, error } = await api.getOne({ name, owner }) as { data: Repository, error: any };
            if (error) {
                notification.error({
                    message: "Getting Repository",
                    description: errors[error?.message]
                })
            } else {
                set({
                    repository: data
                });
            }

        },
        fetch: async () => {
            let total_pages = 0;
            const { data, headers, error } = await api.get({
                ...get().params,
                ...(get().params.direction && {
                    direction: (get().params.direction === 'ascend' ? 'asc' : 'desc') as any
                }),
            }) as { data: Repository[], headers: any, error: any };
            if (headers.get('Link')) {
                const links = headers.get('Link').split(',');
                const lastLink = links.find((link: string) => link.includes('last'));
                if (lastLink) {
                    const lastPage = lastLink.match(/page=(\d+)/);
                    if (lastPage) {
                        total_pages = parseInt(lastPage[1]);
                    }
                } else {
                    total_pages = get().params.page;
                }

            }
            if (error) {
                notification.error({
                    message: "Getting Repositories",
                    description: errors[error?.message]
                })
            } else {

                set({
                    repositories: data, total: total_pages * get().params.per_page,
                });
            }
        },
        stared: async ({ name, owner }) => {
            const { error } = await api.starred({ name, owner }) as { data: User[], error: any };
            set({
                repository: {
                    ...get().repository,
                    stared: error === undefined
                } as Repository
            });
        },
        star: async ({ name, owner }: { name: string, owner: string }) => {
            const { error } = await api.star({ name, owner }) as { data: User[], error: any };
            if (!error) {
                set({
                    repository: {
                        ...get().repository,
                        stared: true
                    } as Repository
                });
            } else {
                notification.error({
                    message: "Star",
                    description: errors[error?.message]
                })
            }
        },
        unStar: async ({ name, owner }: { name: string, owner: string }) => {
            const { error } = await api.unStar({ name, owner }) as { data: User[], error: any };
            if (!error) {
                set({
                    repository: {
                        ...get().repository,
                        stared: false
                    } as Repository
                });
            } else {
                notification.error({
                    message: "Unstar",
                    description: errors[error?.message]
                })
            }
        },
    })
})


export default useRepository;
