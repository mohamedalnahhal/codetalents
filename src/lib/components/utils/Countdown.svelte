<script lang="ts">
  interface props {  
    /** Accept: ISO datetime, timestamp number, or JS Date*/
    target: string | number | Date,
    refreshRate?: number,
    showDays?: boolean,
    leadingZeros?: boolean
  }

  let {
    target,
    refreshRate = 1000,
    showDays = true,
    leadingZeros = true
  } : props = $props();

  let remaining = $state({
    total: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  let timer: NodeJS.Timeout | number | undefined;

  function parseTarget(): Date {
    if (target instanceof Date) return target;
    if (typeof target === "number") return new Date(target);
    if (typeof target === "string") {
      const parsed = new Date(target);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return new Date(NaN);
  }

  function pad(x: number) {
    return leadingZeros && x < 10 ? `0${x}` : String(x);
  }

  function updateRemaining() {
    const t = parseTarget();
    const now = Date.now();

    const diff = Math.max(0, t.getTime() - now);
    const seconds = Math.floor(diff / 1000);

    remaining = {
      total: diff,
      days: Math.floor(seconds / 86400),
      hours: Math.floor((seconds % 86400) / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60
    };

    if (diff <= 0) {
      clearTimer();
    }
  }

  function clearTimer() {
    if (timer) clearInterval(timer);
    timer = undefined;
  }

  /** Reactive lifecycle using effect() */
  $effect(() => {
    clearTimer();
    updateRemaining(); // update immediately

    timer = setInterval(() => updateRemaining(), refreshRate);

    return () => clearTimer();
  });
</script>

<!-- TailwindCSS v4.1 utilities -->
<div class="flex items-center gap-2 text-gray-800">
  {#if showDays}
    <div class="flex flex-col items-center rounded-lg bg-gray-200 px-3 py-2 min-w-12">
      <div class="font-bold text-lg">{pad(remaining.days)}</div>
      <div class="text-[10px] uppercase opacity-70 tracking-wide">Days</div>
    </div>
    <span class="font-bold text-lg opacity-80">:</span>
  {/if}

  <div class="flex flex-col items-center rounded-lg bg-gray-200 px-3 py-2 min-w-12">
    <div class="font-bold text-lg">{pad(remaining.hours)}</div>
    <div class="text-[10px] uppercase opacity-70 tracking-wide">Hours</div>
  </div>

  <span class="font-bold text-lg opacity-80">:</span>

  <div class="flex flex-col items-center rounded-lg bg-gray-200 px-3 py-2 min-w-12">
    <div class="font-bold text-lg">{pad(remaining.minutes)}</div>
    <div class="text-[10px] uppercase opacity-70 tracking-wide">Mins</div>
  </div>

  <span class="font-bold text-lg opacity-80">:</span>

  <div class="flex flex-col items-center rounded-lg bg-gray-200 px-3 py-2 min-w-12">
    <div class="font-bold text-lg">{pad(remaining.seconds)}</div>
    <div class="text-[10px] uppercase opacity-70 tracking-wide">Secs</div>
  </div>
</div>
