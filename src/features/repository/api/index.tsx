import api from "../../../utils/api";
import { Params } from "../../../types/get-config";

const repositoryApi = {
    get: (params: Params) => api.get({
        url: `${process.env.REACT_APP_GITHUB_API_BASE_URL}/user/repos`,
        params
    }),
    getOne: ({ name, owner }: { name: string, owner: string }) => api.get({
        url: `${process.env.REACT_APP_GITHUB_API_BASE_URL}/repos/${owner}/${name}`,
    }),
    starred: ({ name, owner }: { name: string, owner: string }) => api.get({
        url: `${process.env.REACT_APP_GITHUB_API_BASE_URL}/user/starred/${owner}/${name}`,
    }),
    star: ({ name, owner }: { name: string, owner: string }) => api.put({
        url: `${process.env.REACT_APP_GITHUB_API_BASE_URL}/user/starred/${owner}/${name}`,
    }),
    unStar: ({ name, owner }: { name: string, owner: string }) => api.delete({
        url: `${process.env.REACT_APP_GITHUB_API_BASE_URL}/user/starred/${owner}/${name}`,
    }),

}


export default repositoryApi;
