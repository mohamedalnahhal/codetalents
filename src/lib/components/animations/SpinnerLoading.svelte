<script lang="ts">
  export let spin: boolean = false;
  /**
   * @default "border-current before:border-current before:border-2"
   */
  export let color: string = "border-current before:border-current before:border-2";
  /**
   * @default 2
   */
  export let border_width: number = 2;

  let className: string | undefined = undefined;
  export {className as class};
</script>

<span class={className} style="width: 1rem; height: 1rem; --border-width: {border_width}px;">
  <span class="loader {color} {spin?'spin':''}">
  </span>
  {#if !spin}
  <div class="w-full h-full relative -top-full right-0">
    <div class="absolute {color} w-[0.3rem] rounded top-0.25 left-3/4 origin-right rotate-[60deg] -translate-x-full" style="border-top-width: {border_width}px;"></div>
    <div class="absolute {color} w-[0.3rem] rounded top-0.25 left-3/4 origin-right -rotate-[45deg] -translate-x-full -translate-y-1/2" style="border-bottom-width: {border_width}px;"></div>
  </div>
  {/if}
</span>

<style>
  .loader {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
  }
  .loader.spin {
    animation: rotate 1.5s ease-in-out infinite;
  }
  .loader::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border-width: var(--border-width);
    border-style: solid;
    clip-path: polygon(50% 50%, 75% 0, 0 0, 0 100%, 100% 100%, 100% 50%);
  }
  .loader.spin::before {
    animation: prixClipFix 2s linear infinite;
  }

  @keyframes rotate {
    100% {transform: rotate(360deg)}
  }

  @keyframes prixClipFix {
    0% {clip-path:polygon(50% 50%,0 25%,25% 0,25% 0,25% 0,25% 0)}
    12.5% {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
    25% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
    37.5% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
    50% {clip-path:polygon(50% 50%,25% 0,100% 0,100% 100%,0 100%,0 25%)}
    62.5% {clip-path:polygon(50% 50%,100% 0,100% 0,100% 100%,0 100%,0 0)}
    75% {clip-path:polygon(50% 50%,100% 100%,100% 100%,100% 100%,0 100%,0 0)}
    87.5% {clip-path:polygon(50% 50%,0 100%,0 100%,0 100%,0 100%,0 0)}
    100% {clip-path:polygon(50% 50%,0 25%,0 25%,0 25%,0 25%,25% 0)}
  }
</style>