<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
  import ace from "ace-builds";
  import "$lib/ace-codetalents-theme/ace-theme-codetalents.js";
  import "$lib/ace-codetalents-theme/modes/mode-codetalents_cpp.js";
  import "$lib/ace-codetalents-theme/modes/mode-codetalents_java.js";
  import "$lib/ace-codetalents-theme/modes/mode-codetalents_python.js";
  import "ace-builds/src-noconflict/ext-language_tools";
	import { Button } from '$lib';
	import Select from '../form/Select.svelte';

	/** @default = 'cpp' */
	export let lang: string = 'cpp';

	let className: string | undefined = undefined;
	export { className as class };

  let editorEl: HTMLElement;
  let editor: ace.Editor | null;

  $:if(lang && editor){
    editor.session.setMode(`ace/mode/codetalents_${lang}`);
  }

	onMount(() => {
    //@ts-ignore
    document.forms["problem_solution_form"].lang.value = lang;
    ace.config.set("basePath", "/node_modules/ace-builds/src-noconflict");
    editor = ace.edit(editorEl, {
      mode: `ace/mode/codetalents_${lang}`,
      theme: "ace/theme/codetalents",
      fontSize: 15,
      useWorker: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
      liveAutocompletionDelay: 200
    });
	});

  onDestroy(() => {
    editor?.destroy();
    editor = null;
  });

  function submitSend(event: Event, test?: boolean){
    //@ts-ignore
    document.forms["send_solution_form"].code.value = editor?.getValue();
    //@ts-ignore
    document.forms["send_solution_form"].lang.value = lang;
    //@ts-ignore
    if(test) document.forms["send_solution_form"].test.checked = true;
    //@ts-ignore
    document.forms["send_solution_form"].submit();
  }
</script>

<form hidden name="send_solution_form" method="post" action="">
  <input type="text" name="problem_id" value="4ds3s33df42al1ul330s">
  <input type="text" name="code">
  <input type="text" name="lang">
  <input type="checkbox" name="test">
</form>
<form on:submit|preventDefault={submitSend} name="problem_solution_form" action="" class="flex flex-col max-h-full h-full overflow-hidden">
  <div dir="ltr" class="relative group text-sm text-under-primary selection:bg-primary-s1/40! selection:text-[currentColor]! {className ?? ""}">
    <div class="p-1 font-bold rounded-t-lg bg-primary-s1 text-on-primary">
      <Select title="language" align="left" placeholder="Language" name="lang" class="h-6 text-xs! font-bold! p-1! px-2! gap-2 text-on-primary! bg-primary-s1! hover:bg-primary-s2! data-[open=true]:bg-primary-s2! border-none" bind:value={lang} options={[
        {label:"cpp", value:"cpp"},
        {label:"java", value:"java"},
        {label:"python", value:"python"},
      ]} />
    </div>
    <div class="w-full h-[calc(100%-2rem)] rounded-b-lg bg-code-surface-1" bind:this={editorEl}></div>
  </div>
  <div class="pt-2">
    <div class="ml-auto flex flex-row items-end gap-2">
      <Button on:click={(e)=>{submitSend(e, true)}} type="button" style="secondry" class="font-bold bg-primary-s1 hover:bg-primary-s2">Test</Button>
      <Button type="submit" class="font-bold">Submit</Button>
    </div>
  </div>
</form>
