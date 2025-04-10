import { Suspense, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {   adminRoutes } from "./routes";
 
import { useDispatch, useSelector } from "react-redux"; 
 
 
import AdminLayout from "./layout/AdminLayout";
import AdminLogin from "./pages/auth/AdminLogin";
 

const Router = () => {
 
  
 
  return (
    <Routes>
   

   
     <Route path="/" element={<AdminLogin/>}/>
  
  {
  // userRole?.user?.role === "admin" &&
   (
        <Route path="/" element={<AdminLayout />}>
          {adminRoutes.map((route, i) => (
            <Route
              key={`admin-${i}`}
              path={route.path}
              element={
                <Suspense fallback={<div id="preloader">
  <div id="loader" className="loader">
    <div className="loader-container">
      <div className="loader-icon">
        <img src="/fav.png" alt="Preloader" />
      </div>
    </div>
  </div>
</div>
}>
                  <route.element />
                </Suspense>
              }
            />
          ))}
        </Route>
      )}
    </Routes>
  );
};

export default Router;
