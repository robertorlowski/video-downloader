<template>
  <div class="discover-banner max-w-full text-white pl-8 rounded-bl-lg pt-4 mb-8 flex">
    <div class="w-1/2 flex-1">
      <h1 class="font-normal mb-2">Video Downloader</h1>
      <h3 class="font-normal w-64 leading-normal text-grey-lighter">{{title}}</h3>
    </div>
    <div class="w-1/2 py-1 px-1 pr-12 text-white text-right">
      <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 20 20"
      >
        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

