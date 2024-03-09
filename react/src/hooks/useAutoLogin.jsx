import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { getToken } from "../service/storageService";

const useAutoLogin = () => {
  const dispatch = useDispatch();

  return async (skipTokenTest = false) => {
    try {
      const token = getToken();

      if (!token || typeof token !== "string") {
        return;
      }

      const dataFromToken = jwtDecode(token);

      if (skipTokenTest) {
        const response = await axios.get(`/users/${dataFromToken._id}`);
        console.log("API response:", response.data);
      }

      dispatch(authActions.login(dataFromToken));
    } catch (err) {

      localStorage.clear();
    }
  };
};

export default useAutoLogin;
