<template>
<v-container>
    <v-row class="mt-5">
      <v-col cols="12" lg="9">
        <v-sheet color="bg darken-1" elevation="3" class="pa-5 rounded-t-xl rounded-b-lg">
          <div class="d-flex align-center mb-3">
            <v-icon class="mr-2">$mdi-twitch</v-icon>
            <h3>Live Stream</h3>
          </div>

          <v-responsive :aspect-ratio="16/9">
            <v-fade-transition>
              <div v-show="twitchReady"
                ref="twitchEmbed"
                style="aspect-ratio: 16/9;"
                class="elevation-2 rounded"
              ></div>
            </v-fade-transition>
          </v-responsive>
        </v-sheet>
      </v-col>
      <v-col cols="12" lg="3">
        <v-sheet color="bg darken-1" elevation="3" height="100%" class="pa-5 rounded-t-xl rounded-b-lg d-flex flex-column">
          <div class="d-flex align-center mb-3">
            <v-icon class="mr-2">$mdi-chat</v-icon>
            <h3>Chat</h3>
          </div>

          <iframe
            v-if="twitchReady && twitchOptions.channel"
            class="elevation-2 rounded"
            frameborder="0"
            scrolling="yes"
            ref="twitchChatEmbed"
            id="twitchChatEmbed"
            :src="`https://www.twitch.tv/embed/${twitchOptions.channel}/chat?darkpopout&parent=${twitchOptions.parent[0]}`"
            height="100%"
            width="100%"
            theme="dark">
          </iframe>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import { useScriptTag } from "@vueuse/core";

const twitchReady = ref<boolean>(false);
const twitchEmbed = ref<HTMLElement | null>();
const twitchPlayer = ref<any>();
const twitchOptions = {
  channel: "pwnyytv",
  width: "100%",
  height: "100%",
  theme: "dark",
};

useScriptTag(
  "https://player.twitch.tv/js/embed/v1.js",
  (el: HTMLScriptElement) => {
    nextTick(() => initTwitch());
  }
);
function initTwitch() {
  twitchPlayer.value = new Twitch.Player(twitchEmbed.value, twitchOptions);
  twitchPlayer.value.addEventListener(Twitch.Player.READY, () => {
    twitchReady.value = true;
    twitchPlayer.value.play();
  });
}
</script>

<style scoped>
.twitch-embed {
  display: flex;
  justify-content: center;
  align-items: start;
}

.player {
  flex: 0 0 auto;
}

.chat {
  flex: 0 0 auto;
  margin-left: 10px;
}
</style>
