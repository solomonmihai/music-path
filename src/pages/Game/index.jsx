import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import AuthStore from "../../Stores/Auth";
import { fetchProfile } from "../../services";
import UserTag from "./UserTag";
import SongTag from "./SongTag";
import Spinner from "./Spinner";
import { GameRound } from "./utils";
import ArtistTag from "./ArtistTag";

export default function Game() {
  const token = AuthStore.useState((s) => s.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const [userData, setUserData] = useState(null);
  const [gameArtists, setGameArtists] = useState(null);

  useEffect(() => {
    fetchProfile().then((data) => setUserData(data));
  }, []);

  useEffect(() => {
    async function genGame() {
      const game = new GameRound();
      return await game.gen();
    }

    genGame().then((res) => {
      setGameArtists(res);
    });
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <UserTag userData={userData} />
      <div className="mt-6">
        <p className="mb-2 text-2xl font-bold font-kanit text-p-4">starting artist is ...</p>
        {!gameArtists ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <ArtistTag artistData={gameArtists.starting} />
            <p className="mb-2 text-2xl font-bold font-kanit text-p-4">find your way to ...</p>
            <ArtistTag artistData={gameArtists.target} />
          </>
        )}
      </div>
    </div>
  );
}
