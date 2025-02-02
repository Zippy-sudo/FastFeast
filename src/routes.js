import HomePage from "./pages/HomePage";
import RestaurantPage from "./pages/RestaurantPage";
import ItemPage from "./pages/ItemPage";
import ErrorPage from "./pages/ErrorPage";
import ItemsFromRestaurantPage from "./pages/ItemsFromRestaurantsPage";
import OrderPage from "./pages/OrderPage";
import ReviewsPage from "./pages/ReviewsPage";

const routes = [
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/restaurants",
        element: <RestaurantPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/items",
        element: <ItemPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/itemsfromrestaurant/*",
        element: <ItemsFromRestaurantPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/myCart",
        element: <OrderPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/myReviews",
        element: <ReviewsPage/>,
        errorElement: <ErrorPage/>
    }
];

export default routes;