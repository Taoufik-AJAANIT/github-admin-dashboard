import Login from "../features/auth/components/Login";
import { RouteObject } from "react-router-dom";
import Dashboard from "../components/Layout/Dashboard";
import Public from "../components/Layout/Public";
import Callback from "../features/auth/components/Callback";
import Routes from "../types/routes";
import Protected from "../components/Protected";
import CheckAuth from "../features/auth/components/CheckAuth";
import RepositoryList from "../features/repository/components/List";
import RepositoryDetails from "../features/repository/components/Details";

const routes: RouteObject[] = [
    {
        id: "root",
        path: Routes.LOGIN,
        Component: Public,
        children: [
            {
                Component: CheckAuth,
                children: [
                    {
                        Component: Login,
                        index: true,
                    }
                ]
            },
            {
                path: Routes.CALLBACK,
                Component: Callback
            }
        ],
    },
    {
        id: "home",
        path: Routes.HOME,
        Component: Protected,
        children: [
            {
                Component: Dashboard,
                children: [
                    {
                        Component: RepositoryList,
                        index: true,
                    },
                    {
                        Component: RepositoryDetails,
                        path: `${Routes.HOME}/:owner/:name`,
                    }
                ]
            },
        ],
    }
]

export default routes;
