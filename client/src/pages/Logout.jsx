import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setCurrUser } = useContext(userContext);

  useEffect(() => {
    setCurrUser(null);
    navigate("/login");
  }, [navigate, setCurrUser]);

  return null;
};

export default Logout;
