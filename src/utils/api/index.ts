import instance from "./axios";
import getConfig from "../../types/get-config";
import storage from "../storage";
import StorageKeys from "../../types/storage-keys";
import PutConfig from "../../types/put-config";
import DeleteConfig from "../../types/delete-config";

const api = {
    async get({ url, params, authenticated = true }: getConfig) {
        let data;
        let headers;
        let error;
        try {
            const result = await instance.get(url, {
                params: params,
                method: 'GET',
                headers: {
                    'Authorization': authenticated ? `Bearer ${storage.get(StorageKeys.ACCESS_TOKEN)}` : null,
                }
            })
            data = result.data;
            headers = result.headers;
        } catch (e) {
            error = e;
        }

        return { data, error, headers };
    },
    async put({ url, payload }: PutConfig) {
        let data;
        let headers;
        let error;
        try {
            const result = await instance.put(url, payload,{
                headers: {
                    'Authorization': `Bearer ${storage.get(StorageKeys.ACCESS_TOKEN)}`,
                    Accept: 'application/vnd.github+json',
                }
            })
            data = result.data;
            headers = result.headers;
        } catch (e) {
            error = e;
        }

        return { data, error, headers };
    },
    async delete({ url }: DeleteConfig) {
        let data;
        let headers;
        let error;
        try {
            const result = await instance.delete(url, {
                headers: {
                    'Authorization': `Bearer ${storage.get(StorageKeys.ACCESS_TOKEN)}`,
                }
            })
            data = result.data;
            headers = result.headers;
        } catch (e) {
            error = e;
        }

        return { data, error, headers };
    }
};

export default api;
