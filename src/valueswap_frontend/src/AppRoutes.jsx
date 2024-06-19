import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage.jsx";

const AppRoutes = [

    {
        path: "/",
        page: <LandingPage />,
    },
    {
        path: "/dex-swap",
        page: <HomePage />,
    },
    {
        path: "/dex-swap/*",
        page: <HomePage />,
    }


]


export default AppRoutes;