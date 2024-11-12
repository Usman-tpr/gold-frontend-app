import React from "react";
import Root from "../pages/Root";
import homePageRoutes from "./homePageRoutes";
import authRoutes from "./authRoutes";
import ProtectedRoute from "../ProtectedRoute";
import userDashboardRoutes from "./userDashboardRoutes";
import singleProductRoute from "./singleProductRoute";
import searchProductRoutes from "./searchProductRoutes";


const mainRoutes = [
  {
    path: "/",
    element: <Root/>,
    children: [
        ...homePageRoutes,
        ...authRoutes,
        ...singleProductRoute,
        ...searchProductRoutes,
        {
          path: "/user-dashboard/",
          element: <ProtectedRoute />, 
          children: [
              ...userDashboardRoutes
            // {
            //   path: "*", // Catch all unmatched routes
            //   element: <FourOFourPage />, // Render the NotFound component
            // },
          ],
        },
    ],
  },
];

export default mainRoutes;
