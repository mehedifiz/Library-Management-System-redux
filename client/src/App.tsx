import { Outlet } from "react-router";
// import { Button } from "./components/ui/button";
import Navbar from "./components/ui/layout/Navber";
import Allboks from "./page/Allboks";

const App = () => {
  return (
    <div>

      <Navbar/>

      <Outlet/>
      
    <Allboks/>



      
    </div>
  );
};

export default App;