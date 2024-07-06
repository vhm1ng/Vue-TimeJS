import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state: () => {
    return {
      imgLoadStatus: false,
      innerWidth: null,
      coverType: "0",
      siteStartShow: false,
      musicClick: false,
      musicIsOk: false,
      musicVolume: 0,
      musicOpenState: false,
      backgroundShow: false,
      boxOpenState: false,
      mobileOpenState: false,
      mobileFuncState: false,
      setOpenState: false,
      playerState: false,
      playerTitle: null,
      playerArtist: null,
      playerLrc: "Đang tải lời bài hát",
      playerLrcShow: true,
      footerBlur: true,
      playerAutoplay: false,
      playerLoop: "all",
      playerOrder: "list",
    };
  },
  getters: {
    getPlayerLrc(state) {
      return state.playerLrc;
    },
    getPlayerData(state) {
      return {
        name: state.playerTitle,
        artist: state.playerArtist,
      };
    },
    getInnerWidth(state) {
      return state.innerWidth;
    },
  },
  actions: {
    setInnerWidth(value) {
      this.innerWidth = value;
      if (value >= 720) {
        this.mobileOpenState = false;
        this.mobileFuncState = false;
      }
    },
    setPlayerState(value) {
      this.playerState = !value;
    },
    setPlayerLrc(value) {
      this.playerLrc = value;
    },
    setPlayerData(title, artist) {
      this.playerTitle = title;
      this.playerArtist = artist;
    },
    setImgLoadStatus(value) {
      this.imgLoadStatus = value;
    },
  },
  persist: {
    key: "data",
    storage: window.localStorage,
    paths: [
      "coverType",
      "musicVolume",
      "siteStartShow",
      "musicClick",
      "playerLrcShow",
      "footerBlur",
      "playerAutoplay",
      "playerLoop",
      "playerOrder",
    ],
  },
});
