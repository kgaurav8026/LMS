import axios from "axios";
import react from "react";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const getCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          serverUrl + "/api/user/getcurrentuser",
          {
            withCredentials: true,
          }
        );
        if (!response.status === 200) {
          throw new Error("Failed to fetch current user");
        }
        const data = response.data;
        dispatch(setUserData(data.user));
      } catch (error) {
        console.error(error);
        dispatch(setUserData(null));
      }
    };
    fetchCurrentUser();
  }, []);
};

export default getCurrentUser;
