import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import SpotifyRedirect from "./pages/SpotifyRedirect";
import Game from "./pages/Game";

const spotifyRedirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const spotifyRedirectPath = new URL(spotifyRedirectUri).pathname;

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Landing />,
  },
  {
    path: spotifyRedirectPath,
    element: <SpotifyRedirect />,
  },
  {
    path: "/",
    element: <Game />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);

export default function App() {
  return (
    <div className="container max-w-lg mx-auto text-center h-screen p-4">
      <RouterProvider router={router} />
    </div>
  );
}
