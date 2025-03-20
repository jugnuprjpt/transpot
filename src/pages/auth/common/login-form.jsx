import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
import loginModel from "./loginModal";
import { loginService } from "../../../_services/loginService";
import {
  ShowErrorToast,
  ShowSuccessToast,
} from "../../components/ToastMessage/ToastMessage";
import axios from "axios";
import { http } from "../../../_apiConfig/http";
const schema = yup
  .object({
    login_user_id: yup.string().required("User Id is Required"),
    password: yup.string().required("Please Enter Valid password"),
  })
  .required();
const LoginForm = () => {
  const [formData, setFormData] = useState(loginModel);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });

  useEffect(() => {
    setValue("login_user_id", formData.login_user_id);
    setValue("password", formData.password);
  }, [formData, setValue]);

  const handleOnchange = (e) => {
    let name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const navigate = useNavigate();
  // const onSubmit = (data) => {
  //   const user = users.find(
  //     (user) => user.email === data.email && user.password === data.password
  //   );
  //   if (user) {
  //     dispatch(handleLogin(true));
  //     setTimeout(() => {
  //       navigate("/dashboard");
  //     }, 1500);
  //   } else {
  //     toast.error("Invalid credentials", {
  //       position: "top-right",
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await loginService.login(formData);

      if (res.Success === true) {
        ShowSuccessToast("Login Successfully");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
        localStorage.setItem("token", res?.Data?.token);

        // fetchModuleMaster(res.Data.role_id);
      } else {
        ShowErrorToast("something went wrong");
      }

      // setResponse(res.data);
    } catch (error) {
      console.error("Error:", error);
      // setResponse({ error: "Request failed" });
    }
  };

  // const onSubmit = async () => {
  //   setIsLoading(true);
  //   const loginForm = {
  //     login_user_id: formData.login_user_id,
  //     password: formData.password,
  //   };

  //   console.log(loginForm, "res........");
  //   const res = await loginService.login(loginForm);

  //   setIsLoading(false);
  //   if (res.Success) {
  //     ShowSuccessToast("Login Successfully");
  //     setTimeout(() => {
  //       navigate("/dashboard");
  //     }, 1500);
  //     // localStorage.setItem("token", res.Data.token);

  //     // fetchModuleMaster(res.Data.role_id);
  //   } else {
  //     ShowErrorToast("something went wrong");
  //   }
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="login_user_id"
        label="User Id"
        type="text"
        placeholder="User Id"
        register={register}
        error={errors.login_user_id}
        className="h-[48px]"
        onChange={handleOnchange}
      />

      <Textinput
        type="password"
        name="password"
        label="passwrod"
        placeholder="Password"
        register={register}
        error={errors.password}
        className="h-[48px]"
        onChange={handleOnchange}
        hasicon={true}
      />

      <button className="btn btn-dark block w-full text-center">Sign in</button>
    </form>
  );
};

export default LoginForm;
