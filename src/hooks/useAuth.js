import { useSelector, useDispatch } from "react-redux";

const useAuth = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const logout = () => {
    dispatch({ type: "auth/handleLogout", payload: false });
    // You might want to clear any tokens or user data here
    window.localStorage.removeItem("isAuth");
  };

  return { isAuth, logout };
};

export default useAuth;
