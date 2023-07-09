import { fetchThisIsPlaylist, fetchUserTopArtists, fetchSeveralArtists } from "../../services";

export class GameRound {
  constructor() {
    this.pickedSongs = [];
    this.pickedArtists = [];
  }

  async pickStartingArtist() {
    const topUserArtists = await fetchUserTopArtists();
    const artist = randomFromArr(topUserArtists);
    this.pickedArtists.push(artist.id);
    return artist;
  }

  async getArtistsFromPlaylist(playlist) {
    const artists = playlist.map(({ track }) => track.artists).flat();

    const arrIds = artists.map((a) => a.id);

    const artistsFiltered = artists.filter(
      ({ id }, index) => !arrIds.includes(id, index + 1) && !this.pickedArtists.includes(id)
    );

    const artistsDetails = await fetchSeveralArtists(artistsFiltered.map(({ id }) => id));

    const artistsByPopularity = artistsDetails.sort((a, b) => a.popularity < b.popularity);

    return artistsByPopularity;
  }

  async pickNextArtist(artist) {
    // TODO: if playlist does not exist, pick another artist
    const thisIsPlaylist = await fetchThisIsPlaylist(artist.name);

    const playlistArtists = await this.getArtistsFromPlaylist(thisIsPlaylist);

    const nextArtist = randomFromArr(playlistArtists.slice(0, 3));

    this.pickedArtists.push(nextArtist.id);

    return nextArtist;
  }

  pickNextArtistChain(startingArtist, numOfIterations) {
    if (numOfIterations == 0) {
      return Promise.resolve(startingArtist);
    }

    return this.pickNextArtist(startingArtist).then((nextArtist) => {
      console.log("chain", nextArtist);
      return this.pickNextArtistChain(nextArtist, numOfIterations - 1);
    });
  }

  async gen() {
    const pathLength = 3;

    const starting = await this.pickStartingArtist();

    const target = await this.pickNextArtistChain(starting, pathLength);

    return { starting, target };
  }
}

function randomFromArr(arr) {
  return arr[Math.floor(Math.random() * (arr.length - 1))];
}
