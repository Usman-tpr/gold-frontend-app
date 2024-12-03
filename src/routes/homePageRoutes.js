
import HomePage from "../pages/frontend-pages/HomePage";
import ShopPage from "../pages/frontend-pages/ShopPage";



const homePageRoutes = [
    {  
        index: true,
        element: <HomePage />,
    },
    {  
        path: '/shop',
        element: <ShopPage />,
    },

];

export default homePageRoutes;