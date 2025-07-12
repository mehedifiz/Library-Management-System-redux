import { Outlet } from "react-router";
import Navber from "./components/ui/layout/Navber";
import Footer from "./components/ui/layout/Footer";
 

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <Navber />
      </header>

      
      <main className="flex-1 w-full">
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>

      </main>

     
      <footer className="bg-gray-900 text-white mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default App;