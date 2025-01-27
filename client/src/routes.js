import HomePage from "./pages/HomePage"
import ErrorPage from "./pages/ErrorPage"

const routes = [
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />
    }
];

export default routes;