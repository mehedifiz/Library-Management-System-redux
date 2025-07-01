import App from "@/App";
import Allboks from "@/page/Allboks";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);


export default router ;