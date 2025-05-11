import { lazy } from "react";

export const adminRoutes = [
  {
    path: "/",
    exact: true,
    element: lazy(() => import("./pages/admin/Dashboard.jsx")),
  },
  {
    path: "/admin/dashboard",
    exact: true,
    element: lazy(() => import("./pages/admin/Dashboard.jsx")),
  },
  {
    path: "/admin/users",
    exact: true,
    element: lazy(() => import("./pages/Users/UsersManagement.jsx")),
  },
  {
    path: "/admin/businesses",
    exact: true,
    element: lazy(() => import("./pages/business/BusinessListings.jsx")),
  },
  {
    path: "/admin/businessinfo/:id",
    exact: true,
    element: lazy(() => import("./pages/business/BusinessPage.jsx")),
  },
  // {
  //   path: "/admin/business/:id",
  //   exact: true,
  //   element: lazy(() => import("./pages/editBusiness/EditBusiness.jsx")),
  // },
  {
    path: "/admin/services",
    exact: true,
    element: lazy(() => import("./pages/services/Services.jsx")),
  },
  {
    path: "/admin/amenities",
    exact: true,
    element: lazy(() => import("./pages/amenities/Amenity.jsx")),
  },
  {
    path: "/admin/categories",
    exact: true,
    element: lazy(() => import("./pages/categories/Category.jsx")),
  },
  {
    path: "/admin/blogs",
    exact: true,
    element: lazy(() => import("./pages/business/BlogPage.jsx")),
  },
  {
    path: "/admin/settings",
    exact: true,
    element: lazy(() => import("./pages/business/settings.jsx")),
  },
];
