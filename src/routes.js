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
    path: "/admin/businesses",
    exact: true,
    element: lazy(() => import("./pages/business/BusinessListings.jsx")),
  } ,
  {
    path: "/admin/business/:id",
    exact: true,
    element: lazy(() => import("./pages/editBusiness/EditBusiness.jsx")),
  } ,
  {
    path: "/admin/services",
    exact: true,
    element: lazy(() => import("./pages/services/Services.jsx")),
  } ,
  {
    path: "/admin/amenities",
    exact: true,
    element: lazy(() => import("./pages/amenities/Amenity.jsx")),
  } 
];
