import ManageCart from "../components/user-dashboard-components/manage-cart/ManageCart";
import MainUserDashboardPage from "../pages/user-dashboard-pages/main-dashboard-page/MainUserDashboardPage";
import MyDealsPage from "../pages/user-dashboard-pages/manage-deals/MyDealsPage";
import AllProductsPage from "../pages/user-dashboard-pages/manage-products/AllProductsPage";
import ProductCreationPage from "../pages/user-dashboard-pages/manage-products/ProductCreationPage";

const userDashboardRoutes = [
    {  
        index: true,
        element: <MainUserDashboardPage />,
    },
    {
        path: "manage-product/add-product",
        element: <ProductCreationPage />,
    },
    {
        path: "manage-product",
        element: <AllProductsPage />,
    },
    {
        path: "manage-deals",
        element: <MyDealsPage />,
    },
    {
        path: "manage-cart",
        element: <ManageCart />,
    },

];

export default userDashboardRoutes;