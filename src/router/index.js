import {
  Ecommerce,
  Orders,
  Employees,
  Product,
  Category,
  UpdateProduct,
  Combo,
  UserRole,
  Users,
  CreateUser,
  UpdateUser,
  CreateProduct
} from "../pages";
import DefaultLayout from "../Layout/DefaultLayout";
import EmptyLayout from "../Layout/EmptyLayout";
import Login from "../pages/Login";

export const privateRoutes = [
  /* dashboard  */
  {
    path: "/",
    element: Ecommerce,
    layout: DefaultLayout,
  },
  {
    path: "/ecommerce",
    element: Ecommerce,
    layout: DefaultLayout,
  },

  // pages
  {
    path: "/orders",
    element: Orders,
    layout: DefaultLayout,
  },
  {
    path: "/employees",
    element: Employees,
    layout: DefaultLayout,
  },

  {
    path: "/create-product",
    element: CreateProduct,
    layout: DefaultLayout,
  },

  {
    path: "/product",
    element: Product,
    layout: DefaultLayout,
  },

  {
    path: "/category",
    element: Category,
    layout: DefaultLayout,
  },

  {
    path: "/update_product/:id",
    element: UpdateProduct,
    layout: DefaultLayout,
  },

  {
    path: "/combo",
    element: Combo,
    layout: DefaultLayout,
  },

  {
    path: "/user-role",
    element: UserRole,
    layout: DefaultLayout,
  },

  // user

  {
    path: "/users",
    element: Users,
    layout: DefaultLayout,
  },

  {
    path: "/create-user",
    element: CreateUser,
    layout: DefaultLayout,
  },

  {
    path: "/update-user/:id",
    element: UpdateUser,
    layout: DefaultLayout,
  },
];

export const publicRoutes = [
  {
    path: "/login",
    element: Login,
    layout: EmptyLayout,
  },
];
