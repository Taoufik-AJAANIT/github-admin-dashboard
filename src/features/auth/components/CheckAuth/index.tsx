import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../../utils/api";
import Routes from "../../../../types/routes";
import { Spin } from "antd";

function CheckAuth() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function checkAuth() {
            setLoading(true)
            const { data } = await api.get({
                url: `${process.env.REACT_APP_GITHUB_API_BASE_URL}/user`,
            })
            if (data) {
                navigate(Routes.HOME, { replace: true });
            }
            setLoading(false)
        }

        checkAuth()

    }, [navigate])

    if (loading) return <Spin/>
    return <Outlet/>
}

export default CheckAuth;
