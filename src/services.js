async function fetchSpotify(endpoint) {
  const { token } = JSON.parse(localStorage.getItem("auth"));

  const baseUrl = "https://api.spotify.com/v1";
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (err) {
    console.log(`error fetching ${endpoint}`, err);
    throw err;
  }
}

export async function fetchProfile() {
  return await fetchSpotify("/me");
}

export async function fetchFollowedArtists() {
  return await fetchSpotify("/me/following");
}

export async function fetchUserTopSongs() {
  const res = await fetchSpotify("/me/top/tracks");
  return res.items;
}

export async function fetchUserTopArtists() {
  const res = await fetchSpotify("/me/top/artists");
  return res.items;
}

export async function fetchArtist(artistId) {
  return await fetchSpotify(`/artists/${artistId}`);
}

export async function fetchArtistTopSongs(artistId) {
  const res = await fetchSpotify(`/artists/${artistId}/top-tracks?market=US`);
  return res.tracks;
}

export async function fetchThisIsPlaylist(artistName) {
  const searchResult = await fetchSpotify(`/search?q=This is ${artistName}&limit=1&type=playlist`);
  const playlistData = searchResult.playlists.items[0];

  const playlist = await fetchSpotify(`/playlists/${playlistData.id}`);

  return playlist.tracks.items;
}

export async function fetchSeveralArtists(artistIds) {
  const result = await fetchSpotify(`/artists?ids=${artistIds.join(",")}`);
  return result.artists;
}
