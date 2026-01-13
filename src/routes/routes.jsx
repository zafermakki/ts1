import { createBrowserRouter } from "react-router-dom";
import FormPage from "../pages/FormPage";
import EditPage from "../pages/EditPage";
import SummaryPage from "../pages/SummaryPage";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <FormPage />
    },
    {
        path: "/edit",
        element: <EditPage />
    },
    {
        path: "/summary",
        element: <SummaryPage />
    }
])