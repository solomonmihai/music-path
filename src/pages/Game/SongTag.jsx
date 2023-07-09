import React from "react";

export default function SongTag({ songData }) {
  return (
    <div className="flex flex-row items-center justify-center p-2 font-bold cursor-default">
      <div>
        <img src={songData.album.images[1].url} className="w-12 h-auto mr-2 rounded-full" alt="artist profile" />
      </div>
      <div className="flex flex-col text-left">
        <p className="text-2xl font-bold">{songData.name}</p>
        <div className="flex flex-wrap gap-1">
          {songData.artists.map((artist) => (
            <span key={artist.id} className="px-3 text-sm font-normal bg-gray-700 rounded-full">{artist.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
