import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import logo from './logo.svg';
import AllProducts from './components/AllProducts';
import Body from './components/Body';
import CategoryProducts from './components/CategoryProducts';
import { NewArrivals } from './components/ProductCard';
import NewArrivalsProducts from './components/NewArrivalsProducts';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails';
import productsRoutes from './routes/productsRoutes';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';

function Main() {
  const location = useLocation();
  const isProductDetailsRoute = location.pathname.startsWith('/productdetails');
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
      path: "/product/:id",
      element: <SingleProduct />
    },
    {
      path: "/newarrivals",
      element: <NewArrivalsProducts />
    },
    {
      path: "/cart",
      element: <Cart />
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
