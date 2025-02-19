import { NavLink } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2 max-w-lg w-full px-4 py-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mt-3 text-lg text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className="mt-5">
        <NavLink
          to="/"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none transition duration-300"
        >
          Go Back Home
        </NavLink>
      </div>
    </div>
  );
}

export default PageNotFound;
