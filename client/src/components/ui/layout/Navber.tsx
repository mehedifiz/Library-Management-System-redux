import { Link } from 'react-router';

const Navber = () => {
  return (
   <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-white text-xl font-bold">
          Library
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link  to={"/books"}
               
              className="text-white hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-300"
            >
              Books
            </Link>
          </li>
          <li>
            <Link 
              to="/borrow" 
              className="text-white hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-300"
            >
              Borrow
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navber;