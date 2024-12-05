
import GroomPage from "../pages/frontend-pages/GroomPage";
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
    {  
        path: '/groom',
        element: <GroomPage />,
    },

];

export default homePageRoutes;