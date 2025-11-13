import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom';
import './index.css'

import { RouterProvider } from 'react-router-dom';
import Home from './routes/Home.jsx';
import About from './routes/About.jsx';
import Layout from './routes/layouts/Layout.jsx';
import AdminLayout from './routes/layouts/AdminLayout.jsx';
import Dashboard from './routes/admin/Dashboard.jsx';
import SingleProduct from './routes/SingleProduct.jsx';
import SingleBlog from './routes/SingleBlog.jsx';
import AddToCart from './routes/AddToCart.jsx';
import Products from './routes/admin/Products.jsx';
import Users from './routes/admin/Users.jsx';
import Categories from './routes/admin/Categories.jsx';
import Blogs from './routes/admin/Blogs.jsx';
import Orders from './routes/admin/Orders.jsx';
import AddProducts from './routes/admin/AddProducts.jsx';
import AddUsers from './routes/admin/AddUsers.jsx';
import AddCategories from './routes/admin/AddCategories.jsx';
import AddBlogs from './routes/admin/AddBlogs.jsx';
import Contact from './routes/Contact.jsx';
import EditCategories from './routes/admin/EditCategories.jsx';
import EditProduct from './routes/admin/EditProduct.jsx';
import SingleCategories from './routes/SingleCategories.jsx';
import Blog from './routes/Blog.jsx';
import Shop from './routes/Shop.jsx';

import { Provider } from 'react-redux';
import { store } from './stores/index.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './routes/Login.jsx';
import UserProfile from './routes/users/UserProfile.jsx';
import UserOrders from './routes/users/UserOrders.jsx';
import EditBlogs from './routes/admin/EditBlogs.jsx';
import CheckOut from './routes/users/CheckOut.jsx';
import UserProfileLayout from './routes/layouts/UserProfileLayout.jsx';
import UserDashboard from './routes/users/UserDashboard.jsx';
import Hero from './routes/admin/Hero.jsx';
import AddHero from './routes/admin/AddHero.jsx';
import EditHero from './routes/admin/EditHero.jsx';
import Register from './routes/Register.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
// import Search from './components/Search.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/blogs", element: <Blog /> },
      { path: "/shop", element: <Shop /> },
      
      { path: "/addtocart", element: <AddToCart /> },
      { path: "/product/:id", element: <SingleProduct /> },
      { path: "/blog/:id", element: <SingleBlog /> },
      { path: "/category/:id", element: <SingleCategories /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/loading", element: <LoadingSpinner /> },
      {
        path: "checkout", element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <CheckOut />
          </ProtectedRoute>
        )
      },


      {
        path: "user/",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <UserProfileLayout />
          </ProtectedRoute>
        ),

        children:[
          {path:"profile" , element:<UserProfile />},
          {path:"dashboard" , element:<UserDashboard />},
          {path:"orders" , element:<UserOrders />},
        ]
      },
      


    ]
  },

  {
    path: "/admin",
    element:
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />,
      </ProtectedRoute>,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "users", element: <Users /> },
      { path: "categories", element: <Categories /> },
      { path: "orders", element: <Orders /> },
      { path: "blogs", element: <Blogs /> },
      { path: "heroes", element: <Hero /> },
      { path: "products/addproducts", element: <AddProducts /> },
      { path: "users/addusers", element: <AddUsers /> },
      { path: "categories/addcategories", element: <AddCategories /> },
      { path: "blogs/addblogs", element: <AddBlogs /> },
      { path: "heroes/addheroes", element: <AddHero /> },
      { path: "categories/edit/:id", element: <EditCategories /> },
      { path: "products/edit/:id", element: <EditProduct /> },
      { path: "blogs/edit/:id", element: <EditBlogs /> },
      { path: "heroes/edit/:id", element: <EditHero /> },



    ]
  },


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
