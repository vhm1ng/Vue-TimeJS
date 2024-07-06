<template>
  <APlayer
    v-if="playList[0]"
    ref="player"
    :audio="playList"
    :autoplay="store.playerAutoplay"
    :theme="theme"
    :autoSwitch="false"
    :loop="store.playerLoop"
    :order="store.playerOrder"
    :volume="volume"
    :showLrc="true"
    :listFolded="listFolded"
    :listMaxHeight="listMaxHeight"
    :noticeSwitch="false"
    @play="onPlay"
    @pause="onPause"
    @timeupdate="onTimeUp"
    @error="loadMusicError"
  />
</template>

<script setup>
import { MusicOne, PlayWrong } from "@icon-park/vue-next";
import { getPlayerList } from "@/api";
import { mainStore } from "@/store";
import APlayer from "@worstone/vue-aplayer";

const store = mainStore();

const player = ref(null);

const playList = ref([]);

const playIndex = ref(0);

const props = defineProps({
  theme: {
    type: String,
    default: "#efefef",
  },
  volume: {
    type: Number,
    default: 0.7,
    validator: (value) => {
      return value >= 0 && value <= 1;
    },
  },
  songServer: {
    type: String,
    default: "netease",
  },
  songType: {
    type: String,
    default: "playlist",
  },
  songId: {
    type: String,
    default: "7452421335",
  },
  listFolded: {
    type: Boolean,
    default: false,
  },
  listMaxHeight: {
    type: Number,
    default: 420,
  },
});

const listHeight = computed(() => {
  return props.listMaxHeight + "px";
});

onMounted(() => {
  nextTick(() => {
    try {
      getPlayerList(props.songServer, props.songType, props.songId).then((res) => {
        console.log(res);
        store.musicIsOk = true;

        playList.value = res;
        console.log("Tải nhạc đã hoàn tất");
        console.log(playList.value);
        console.log(playIndex.value, playList.value.length, props.volume);
      });
    } catch (err) {
      console.error(err);
      store.musicIsOk = false;
      ElMessage({
        message: "Trình phát không tải được",
        grouping: true,
        icon: h(PlayWrong, {
          theme: "filled",
          fill: "#efefef",
        }),
      });
    }
  });
});

const onPlay = () => {
  console.log("Phát nhạc");
  playIndex.value = player.value.aplayer.index;
  store.setPlayerState(player.value.audioRef.paused);
  store.setPlayerData(playList.value[playIndex.value].name, playList.value[playIndex.value].artist);
  ElMessage({
    message: store.getPlayerData.name + " - " + store.getPlayerData.artist,
    grouping: true,
    icon: h(MusicOne, {
      theme: "filled",
      fill: "#efefef",
    }),
  });
};

const onPause = () => {
  store.setPlayerState(player.value.audioRef.paused);
};

const onTimeUp = () => {
  let lyrics = player.value.aplayer.lyrics[playIndex.value];
  let lyricIndex = player.value.aplayer.lyricIndex;
  if (!lyrics || !lyrics[lyricIndex]) {
    return;
  }
  let lrc = lyrics[lyricIndex][1];
  if (lrc === "Loading") {
    lrc = "Đang tải lời bài hát";
  } else if (lrc === "Not available") {
    lrc = "Tải lời bài hát không thành công";
  }
  store.setPlayerLrc(lrc);
};

const playToggle = () => {
  player.value.toggle();
};

const changeVolume = (value) => {
  player.value.setVolume(value, false);
};

const changeSong = (type) => {
  type === 0 ? player.value.skipBack() : player.value.skipForward();
  nextTick(() => {
    player.value.play();
  });
};

const toggleList = () => {
  player.value.toggleList();
};

const loadMusicError = () => {
  let notice = "";
  if (playList.value.length > 1) {
    notice = "Đã xảy ra lỗi khi phát bài hát. Trình phát sẽ phát bài hát tiếp theo sau 2 giây.";
  } else {
    notice = "Đã xảy ra lỗi khi phát bài hát";
  }
  ElMessage({
    message: notice,
    grouping: true,
    icon: h(PlayWrong, {
      theme: "filled",
      fill: "#efefef",
      duration: 2000,
    }),
  });
  console.error(
    "Phát nhạc: " + player.value.aplayer.audio[player.value.aplayer.index].name + " Đã xảy ra lỗi",
  );
};

defineExpose({ playToggle, changeVolume, changeSong, toggleList });
</script>

<style lang="scss" scoped>
.aplayer {
  width: 80%;
  border-radius: 6px;
  font-family: "HarmonyOS_Regular", sans-serif !important;
  :deep(.aplayer-body) {
    background-color: transparent;
    .aplayer-pic {
      display: none;
    }
    .aplayer-info {
      margin-left: 0;
      background-color: #ffffff40;
      border-color: transparent !important;
      .aplayer-music {
        flex-grow: initial;
        margin-bottom: 2px;
        overflow: initial;
        .aplayer-title {
          font-size: 16px;
          margin-right: 6px;
        }
        .aplayer-author {
          color: #efefef;
        }
      }
      .aplayer-lrc {
        text-align: left;
        margin: 7px 0 6px 6px;
        height: 44px;
        mask: linear-gradient(
          #fff 15%,
          #fff 85%,
          hsla(0deg, 0%, 100%, 0.6) 90%,
          hsla(0deg, 0%, 100%, 0)
        );
        -webkit-mask: linear-gradient(
          #fff 15%,
          #fff 85%,
          hsla(0deg, 0%, 100%, 0.6) 90%,
          hsla(0deg, 0%, 100%, 0)
        );
        &::before,
        &::after {
          display: none;
        }
        p {
          color: #efefef;
        }
        .aplayer-lrc-current {
          font-size: 0.95rem;
          margin-bottom: 4px !important;
        }
      }
      .aplayer-controller {
        display: none;
      }
    }
  }
  :deep(.aplayer-list) {
    margin-top: 6px;
    height: v-bind(listHeight);
    background-color: transparent;
    ol {
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      li {
        border-color: transparent;
        &.aplayer-list-light {
          background: #ffffff40;
          border-radius: 6px;
        }
        &:hover {
          background: #ffffff26 !important;
          border-radius: 6px !important;
        }
        .aplayer-list-index,
        .aplayer-list-author {
          color: #efefef;
        }
      }
    }
  }
}
</style>
