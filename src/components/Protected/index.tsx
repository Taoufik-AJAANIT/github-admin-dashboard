import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import Routes from "../../types/routes";
import storage from "../../utils/storage";
import StorageKeys from "../../types/storage-keys";
import { Spin } from "antd";
import useUser from "../../state";

function Protected() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { setUser } = useUser();

    useEffect(() => {
        async function checkAuth() {
            setLoading(true)
            const accessToken = storage.get(StorageKeys.ACCESS_TOKEN);
            if (!accessToken) {
                navigate(Routes.LOGIN, { replace: true });
                return;
            }
            const { error, data } = await api.get({
                url: `${process.env.REACT_APP_GITHUB_API_BASE_URL}/user`,
            })
            setUser(data);
            if (error) {
                navigate(Routes.LOGIN, { replace: true });
            }
            setLoading(false);
        }

        checkAuth()

    }, [navigate, setUser]);

    if (loading) {
        return <Spin/>
    }
    return <Outlet/>


}

export default Protected;
