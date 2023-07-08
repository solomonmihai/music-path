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

    navigate("/");
  }, []);

  return <p>success</p>;
}
