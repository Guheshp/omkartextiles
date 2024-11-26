import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import logo from './logo.svg';
import AllProducts from './components/AllProducts';
import Body from './components/Body';
import CategoryProducts from './components/CategoryProducts';
import { NewArrivals } from './components/ProductCard';
import NewArrivalsProducts from './components/NewArrivalsProducts';
import Footer from './components/Footer';

function Main() {
  return (
    <div>
      <div className="border px-0 md:px-10 lg:px-20 sm:px-0">
        <Navbar />
        <Body />
        {/* <Outlet /> */}
      </div>
      <Footer />
    </div>



  )
}

const appRouter = createBrowserRouter([{
  path: "/",
  element: <Main />,
  children: [
    {
      path: "/",
      element: <AllProducts />
    },
    {
      path: "/products/:id",
      element: <CategoryProducts />
    },
    {
      path: "/newarrivals",
      element: <NewArrivalsProducts />
    },

  ]
}])

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
