<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
  import ace from "ace-builds";
  import "$lib/ace-codetalents-theme/ace-theme-codetalents.js";
  import "$lib/ace-codetalents-theme/modes/mode-codetalents_cpp.js";
  import "$lib/ace-codetalents-theme/modes/mode-codetalents_java.js";
  import "$lib/ace-codetalents-theme/modes/mode-codetalents_python.js";
  import "ace-builds/src-noconflict/ext-language_tools";

	/** @default = 'cpp' */
	export let lang: string = 'cpp';
  export let code: string;
  export let fontSize = 15;
  export let ariaLabel: string | undefined = undefined;

	let className: string | undefined = undefined;
	export { className as class };

  let editorEl: HTMLElement;
  let editor: ace.Editor | null;

  $:if(lang && editor){
    editor.session.setMode(`ace/mode/codetalents_${lang}`);
  }

  $: if((code || code == "") && editor){
    editor.setValue(code, -1);
  }

	onMount(() => {
    ace.config.set("basePath", "/node_modules/ace-builds/src-noconflict");
    editor = ace.edit(editorEl, {
      mode: `ace/mode/codetalents_${lang}`,
      theme: "ace/theme/codetalents",
      fontSize,
      readOnly: true,
      textInputAriaLabel: ariaLabel
    });
    editor.setValue(code, -1);
    editor.textInput.text.tabIndex = -1;
	});

  onDestroy(() => {
    editor?.destroy();
    editor = null;
  });
</script>

<div dir="ltr" class="relative group text-sm rounded-xl text-under-primary selection:bg-primary-s1/40! selection:text-[currentColor]! {className ?? ""}">
  <div class="py-2 px-3 text-xs font-bold rounded-t-xl bg-primary-s1 text-on-primary">
    {lang}
  </div>
  <div class="w-full h-[calc(100%-2rem)] bg-code-surface-1 rounded-b-xl border border-t-0 border-primary-hairline" bind:this={editorEl}></div>
</div>