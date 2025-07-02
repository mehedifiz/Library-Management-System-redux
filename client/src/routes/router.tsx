import App from "@/App";
import Allboks from "@/page/Allboks";
import Borrow from "@/page/Borrow";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
          path:"/books",
        element:<Allboks/>

      },
      {
        path:"/borrow",
        element:<Borrow/>
      }
    ]
  }, 
]);


export default router ;