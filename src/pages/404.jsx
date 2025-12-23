import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ErrorImage from "@/assets/images/all-img/404-2.svg";

function Error() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  
  const errorContent = (
    <div className={`flex flex-col justify-center items-center text-center py-20 ${!isAuth ? 'min-h-screen dark:bg-slate-900' : ''}`}>
      <img src={ErrorImage} alt="" />
      <div className="max-w-[546px] mx-auto w-full mt-12">
        <h4 className="text-slate-900 mb-4 dark:text-white">Page not found</h4>
        <div className="dark:text-white text-base font-normal mb-10">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </div>
      </div>
      <div className="max-w-[300px] mx-auto w-full">
        <Link
          to={isAuth ? "/dashboard" : "/"}
          className="btn btn-dark dark:bg-slate-800 block text-center"
        >
          {isAuth ? "Go to dashboard" : "Go to homepage"}
        </Link>
      </div>
    </div>
  );

  return errorContent;
}

export default Error;
