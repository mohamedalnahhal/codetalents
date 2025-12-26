<script lang="ts">
  import { onMount } from 'svelte';
	import Tooltip from '../ui/Tooltip.svelte';

  export let events: CalendarEvent[] | undefined = undefined; // Prop for the currently selected date
  let className: string | undefined = undefined;
  export {className as class}

  interface CalendarEvent {
    name: string,
    starts: Date,
    ends: Date
  }

  let currentDate = new Date(); // Internal state for the displayed month/year
  let now = new Date(); // Internal state for the displayed month/year
  let daysInMonth: any[] = [];
  let firstDayOfMonth = 0;

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
  }

  function updateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    daysInMonth = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);
    firstDayOfMonth = getFirstDayOfMonth(year, month);
  }

  function prevMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    updateCalendar();
  }

  function nextMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    updateCalendar();
  }

  function isSameDay(d1: Date, d2: Date) {
		return (
			d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getDate() === d2.getDate()
		);
	}

  function dayEvents(year: number, month: number, day: number): { name: string; label: string }[] {
    if(!events) return [];
		const date = new Date(year, month, day);
		return events
			.filter((e) => {
				const fromDay = new Date(e.starts.getFullYear(), e.starts.getMonth(), e.starts.getDate());
				const toDay = new Date(e.ends.getFullYear(), e.ends.getMonth(), e.ends.getDate());
				return date >= fromDay && date <= toDay;
			})
			.map((e) => {
				const startTime = `${String(e.starts.getHours()).padStart(2, '0')}:${String(e.starts.getMinutes()).padStart(2, '0')}`;
				const endTime = `${String(e.ends.getHours()).padStart(2, '0')}:${String(e.ends.getMinutes()).padStart(2, '0')}`;
				if (isSameDay(e.starts, date) && isSameDay(e.ends, date)) {
          return { name: e.name, label: `${startTime} - ${endTime}` };
				} else if (isSameDay(e.starts, date)) {
					return { name: e.name, label: `Starts at ${startTime}` };
				} else if (isSameDay(e.ends, date)) {
					return { name: e.name, label: `Ends at ${endTime}` };
				} else {
					return { name: e.name, label: `All day` };
				}
			});
	}

  onMount(() => {
    updateCalendar();
  });

  $: currentDate, updateCalendar(); // Re-run updateCalendar when currentDate changes
</script>

<div class="bg-under-primary rounded-lg border-primary-hairline p-3 text-on-primary {className??""}">
  <div class="flex flex-row gap-3 justify-between px-2 items-center mb-2 text-sm">
    <button class="hover:bg-primary-s1 px-2 rounded-md cursor-pointer" on:click={prevMonth}>&lt;</button>
    <h2 class="font-semibold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
    <button class="hover:bg-primary-s1 px-2 rounded-md cursor-pointer" on:click={nextMonth}>&gt;</button>
  </div>

  <div class="grid grid-cols-7 text-center text-xs gap-1 mb-2">
    {#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
      <div>{day}</div>
    {/each}
  </div>

  <div class="grid grid-cols-7 text-center text-xs gap-1">
    {#each Array(firstDayOfMonth) as _}
      <div class="invisible"></div>
    {/each}
    {#each daysInMonth as day}
      {@const dEvents = dayEvents(currentDate.getFullYear(), currentDate.getMonth(), day)}
      
      {#if dEvents.length > 0}
      <Tooltip class="text-left" placement="bottom" delay={200}>
        <div
          class="cursor-pointer h-6 w-6 p-1 rounded-full hover:bg-primary-s2 bg-primary-s1 {now.getDate() === day && now.getMonth() === currentDate.getMonth() && now.getFullYear() === currentDate.getFullYear() ? 'border border-primary-s1' : ''}"
        >
          <span>{day}</span>
        </div>
        <svelte:fragment slot="content">
          <strong>Events</strong>
          <ul>
            {#each dEvents as ev}
              <li class="event-item mt-1">
                <span class="font-semibold">{ev.name}</span><br />
                <small>{ev.label}</small>
              </li>
            {/each}
          </ul>
        </svelte:fragment>
      </Tooltip>
      {:else}
      <div
        class="cursor-pointer h-6 w-6 p-1 rounded-full hover:bg-primary-s1 {now.getDate() === day && now.getMonth() === currentDate.getMonth() && now.getFullYear() === currentDate.getFullYear() ? 'border border-primary-s1' : ''}"
      >
      <span>{day}</span>
      </div>
      {/if}
    {/each}
  </div>
</div>