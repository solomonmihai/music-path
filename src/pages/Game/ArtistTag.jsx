import React from "react";

export default function ArtistTag({ artistData }) {
  return (
    <div className="flex items-center justify-center p-4 font-bold cursor-default">
      <img
        src={artistData.images ? artistData.images[1].url : ""}
        className="mr-2 border-4 rounded-full shadow-inner w-14 border-p-3 aspect-square"
        alt="user profile"
      />
      <p className="text-2xl font-kanit">{artistData.name}</p>
    </div>
  );
}
