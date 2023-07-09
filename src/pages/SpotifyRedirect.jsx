import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthStore from "../Stores/Auth";

export default function SpotifyRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.location.href.split("#")[1].split("=")[1].split("&")[0];

    AuthStore.update((state) => {
      state.token = token;
    });

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const authData = {
      token,
      expires: expiryDate,
    };

    localStorage.setItem("auth", JSON.stringify(authData));

    navigate("/");
  }, []);

  return <p>success</p>;
}
