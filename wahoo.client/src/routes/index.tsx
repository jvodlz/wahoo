import {
    createBrowserRouter,
    // createRoutesFromElements,
    // Route,
    RouterProvider
} from "react-router-dom"

// Pages
import Login from "../pages/Login.tsx"
import Register from "../pages/Register.tsx"
import Erreur from "../pages/Erreur";
import Wahoo from "../pages/Wahoo.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

const Routes = () => {
    const router = createBrowserRouter(
        [
            {
                path: "/",
                element: <Login />,
                errorElement: <Erreur />
            },
            {
                path: "*",
                element: <Erreur />,
            },
            {
                path: "/login",
                element: <Login />,
                errorElement: <Erreur />,
            },
            {
                path: "/register",
                element: <Register />,
                errorElement: <Erreur />,
            },
            {
                path: "/wahoo",
                element: <ProtectedRoute />,
                errorElement: <Erreur />,
                children: [
                    {
                        path: "/wahoo",
                        element: <Wahoo />
                    }
                ]
            }
        ]
    );

    return <RouterProvider router={router} />
}

export default Routes;
