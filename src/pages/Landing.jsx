import React from "react";

const spotifyAuthUrl = "https://accounts.spotify.com/authorize";
const spotifyClientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const spotifyAuthScopes = [];

const spotifyAuthURL = `${spotifyAuthUrl}?client_id=${spotifyClientID}&redirect_uri=${redirectUri}&response_type=token&show_dialog=false&scope=${spotifyAuthScopes
  .map((scope) => scope + " ")
  .join("")
  .trim()}`;

export default function Landing() {
  return (
    <div className="container max-w-lg mx-auto text-center h-screen pt-[20%]">
      <h1 className="font-bold font-kanit text-7xl text-p-4 cursor-default">music path</h1>
      <a
        className="inline-block cursor-pointer mt-10 text-2xl font-bold bg-p-4 text-p-1 px-6 py-3 rounded-full"
        href={spotifyAuthURL}
      >
        sign in with spotify
      </a>
    </div>
  );
}
