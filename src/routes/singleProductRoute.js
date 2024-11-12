import SingleProductPage from "../pages/frontend-pages/SingleProductPage";



const singleProductRoute = [
    {  
        path: "/:slug",
        element: <SingleProductPage />,
    },

];

export default singleProductRoute;