import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthStore from "../Stores/Auth";

const spotifyAuthUrl = "https://accounts.spotify.com/authorize";
const spotifyClientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const spotifyAuthScopes = ["user-follow-read", "user-top-read"];

const spotifyAuthURL = `${spotifyAuthUrl}?client_id=${spotifyClientID}&redirect_uri=${redirectUri}&response_type=token&show_dialog=false&scope=${spotifyAuthScopes
  .map((scope) => scope + " ")
  .join("")
  .trim()}`;

export default function Landing() {
  const navigate = useNavigate();

  const authData = localStorage.getItem("auth");

  useEffect(() => {
    if (!authData) {
      return;
    }

    const { token, expires } = JSON.parse(authData);
    const tokenExpired = Date.parse(expires) < Date.parse(new Date().toString());

    if (!tokenExpired) {
      AuthStore.update((state) => {
        state.token = token;
      });
      navigate("/");
    } else {
      localStorage.removeItem("auth");
    }
  }, [authData]);

  return (
    <div className="pt-[20%]">
      <h1 className="font-bold cursor-default font-kanit text-7xl text-p-4">music path</h1>
      <a
        className="inline-block px-6 py-3 mt-10 text-2xl font-bold rounded-full cursor-pointer bg-p-4 text-p-1"
        href={spotifyAuthURL}
      >
        sign in with spotify
      </a>
    </div>
  );
}
