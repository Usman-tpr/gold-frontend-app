import { createBrowserRouter, RouterProvider } from "react-router-dom";
import mainRoutes from "./routes/mainRoutes";

const router = createBrowserRouter(mainRoutes);

  function App() {
    return (
      <>
        <RouterProvider router={router} />
      </>
    );
  }

export default App;
