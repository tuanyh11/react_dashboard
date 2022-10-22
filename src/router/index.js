import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorMapping,
  Product,
  Category,
  UpdateProduct,
  Combo,
  UserRole,
  Users,
  CreateUser,
  UpdateUser,
} from "../pages";
import DefaultLayout from "../Layout/DefaultLayout";
import EmptyLayout from "../Layout/EmptyLayout";
import Login from "../pages/Login";
import ProductAdd from "../pages/Product/ProductAdd";

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
    path: "/customers",
    element: Customers,
    layout: DefaultLayout,
  },

  {
    path: "/create-product",
    element: ProductAdd,
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

  // app
  // {
  //     path: '/kanban',
  //     element: Kanban,
  //     layout: DefaultLayout
  // },
  // {
  //     path: '/editor',
  //     element: Editor,
  //     layout: DefaultLayout
  // },
  // {
  //     path: '/calendar',
  //     element: Calendar,
  //     layout: DefaultLayout
  // },
  // {
  //     path: '/color-picker',
  //     element: ColorPicker,
  //     layout: DefaultLayout
  // },

  // charts
  // {
  //     path: '/line',
  //     element: Line,
  //     layout: DefaultLayout
  // },

  // {
  //     path: '/area',
  //     element: ColorPicker,
  //     layout: Area
  // },

  // {
  //     path: '/bar',
  //     element: Bar,
  //     layout: DefaultLayout
  // },

  // {
  //     path: '/pie',
  //     element: Pie,
  //     layout: DefaultLayout
  // },

  // {
  //     path: '/financial',
  //     element: Financial,
  //     layout: DefaultLayout
  // },

  // {
  //     path: '/color-mapping',
  //     element: ColorMapping,
  //     layout: DefaultLayout
  // },

  // {
  //     path: '/pyramid',
  //     element: Pyramid,
  //     layout: DefaultLayout
  // },
  // {
  //     path: '/stacked',
  //     element: Stacked,
  //     layout: DefaultLayout
  // }
];

export const publicRoutes = [
  {
    path: "/login",
    element: Login,
    layout: EmptyLayout,
  },
];
