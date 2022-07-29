import { DEFAULT_NAMING } from "../utils/constants";

export const loginQuery = `query log($login: String!, $password: String!) {
    login(login: $login, password: $password)
  }`;

export const registerQuery = `mutation register($login: String!, $password: String!) {
    createUser (login: $login, password: $password) {
        _id login 
    }
  }`;

export const getTracksQuery = `query getTracks($query: String){
    TrackFind(query: $query) {
      _id url originalFileName
      id3 {
        title
        artist
        album
        year
        genre
        trackNumber
      }
    }
  }`;

export const getTracksCountQuery = `query tracksCount($query: String){
    TrackCount(query: $query)
  }`;

export const deleteTrackById = `mutation deleteTrack($id: ID!) {
    TrackDelete(track: {_id: $id}) {
      _id
    }
  }`;

export const getPlaylistsQuery = `query getPlaylists($query: String) {
    PlaylistFind(query: $query) {
      _id
      name
      description
      tracks {
        _id
        originalFileName
        url
        id3 {
          title
        }
      }
    }
  }`;

const { PLAYLIST_NAME, PLAYLIST_DESCRIPTION } = DEFAULT_NAMING;
export const createPlaylistQuery = `mutation {
   PlaylistUpsert(playlist: {name: "${PLAYLIST_NAME}", description: "${PLAYLIST_DESCRIPTION}"}) {
      _id
    }
  }`;

export const getPlaylistsCountQuery = `query playlistsCount($query: String){
    PlaylistCount(query: $query)
  }`;

export const getPlaylistByIdQuery = `query playlistFindById($query: String) {
    PlaylistFindOne(query: $query) {
      name
      description
      tracks {
        _id
        originalFileName
        id3 {
          title
        }
      }
    }
}`;

export const upsertPlaylistInfoQuery = `mutation upsertPlaylistInfo($query: PlaylistInput) {
    PlaylistUpsert(playlist: $query) {
      name
      description
      tracks {
        _id
        originalFileName
        id3 {
          title
        }
      }
    }
}`;

export const getIdsInPlaylistQuery = `query getTracksId($query: String) {
    PlaylistFindOne(query: $query) {
      tracks {
        _id
      }
    }
}`;

export const changePasswordQuery = `mutation changePassword($login: String!, $password: String!, $newPassword: String!) {
  changePassword(login: $login, password: $password, newPassword: $newPassword) {
    _id
  }
}`;
