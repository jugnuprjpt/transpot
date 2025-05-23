import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./common/login-form";
// import Social from "./common/social";
import useDarkMode from "@/hooks/useDarkMode";
import { ToastContainer } from "react-toastify";

// image import
import LogoWhite from "@/assets/images/logo/logo.png";
import Logo from "@/assets/images/logo/logo.png";
import Illustration from "@/assets/images/auth/ils1.jpg";

const login = () => {
  const [isDark] = useDarkMode();
  return (
    <>
      <ToastContainer />
      <div className="loginwrapper">
        <div className="lg-inner-column">
          <div className="left-column relative z-[1]">
            <div className="ltr:pl-20 rtl:pr-20 mt-24">
              <Link to="/">
                <img src={isDark ? LogoWhite : Logo} alt="" className="" />
                <div className="w-fit">
                  <h4>
                    Unlock your Loader
                    <span className="text-slate-800 dark:text-slate-400 font-bold ml-3">
                      Experience
                    </span>
                  </h4>
                </div>
              </Link>
            </div>
            <div className="absolute left-0 2xl:bottom-[-160px] h-full w-full z-[-1]">
              <img
                src={Illustration}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="right-column relative">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link to="/">
                    <img
                      src={isDark ? LogoWhite : Logo}
                      alt=""
                      className="mx-auto"
                    />
                  </Link>
                </div>
                <div className="text-center 2xl:mb-10 mb-4">
                  <h4 className="font-medium">Sign in</h4>
                  <div className="text-slate-500 text-base">
                    Sign in to your account to start using Transpoat Loading
                  </div>
                </div>
                <LoginForm />
                {/* <div className="relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6">
                  <div className="absolute inline-block bg-white dark:bg-slate-800 dark:text-slate-400 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm text-slate-500 font-normal">
                    Or continue with
                  </div>
                </div> */}
                {/* <div className="max-w-[242px] mx-auto mt-8 w-full">
                  <Social />
                </div> */}
                {/* <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm">
                  Don’t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                    Sign up
                  </Link>
                </div> */}
              </div>
              <div className="auth-footer text-center">
                Copyright 2024, Transport All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
