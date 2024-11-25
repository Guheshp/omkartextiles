import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import logo from './logo.svg';
import AllProducts from './components/AllProducts';
import Body from './components/Body';

function Main() {
  return (
    <div className="border px-0 md:px-10 lg:px-20 sm:px-0">
      <Navbar />
      <Body />
      {/* <Outlet /> */}
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
    }
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
