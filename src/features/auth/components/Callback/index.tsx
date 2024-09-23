import { useEffect } from "react";
import { Spin } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../../utils/api";
import storage from "../../../../utils/storage";
import StorageKeys from "../../../../types/storage-keys";

function Callback() {

    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const navigate = useNavigate();

    useEffect(() => {
        async function getAccessToken() {
            const { data } = await api.get({
                url: process.env.REACT_APP_GITHUB_TOKEN_URL + code,
                authenticated: false
            }) as {
                data: {
                    access_token: string
                }
            };
            if (data && data.access_token) {
                storage.set(StorageKeys.ACCESS_TOKEN, data.access_token);
                navigate('/home', { replace: true });
            }
        }

        getAccessToken();
    }, [code, navigate])


    return <Spin/>;


}

export default Callback;
