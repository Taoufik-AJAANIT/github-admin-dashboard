import routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routes);

function Router() {
  return <RouterProvider router={router}/>;
}

export default Router;

