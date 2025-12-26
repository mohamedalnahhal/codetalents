<script lang="ts">
	import { enhance } from '$app/forms';
  import {Button, CheckboxInput, GithubLogo, GoogleLogo, Hr, SearchInput, DragDropInput} from '$lib';
	import RangeInput from '$lib/components/form/RangeInput.svelte';
	import CodeBlock from '$lib/components/utils/CodeBlock.svelte';
	import { formatTimeClock } from '$lib/utils/format.js';

  let avatar : any;
  let isDeveloper : any;
  let skills : Set<string> = new Set<string>([
    "HTML 5", 
    "CSS 3", 
    "JavaScript",
    "JQuery", 
    "React", 
    "Angular", 
    "Vue", 
    "Svelte", 
    "MySql", 
    "Sqlite", 
    "SQL", 
    "NodeJS", 
    "PHP", 
    "Nuxt", 
    "SvelteKit", 
    "Next"
  ]);
  let selectedSkills : Set<string> = new Set<string>();
</script>

  <div class="p-8 /w-[32rem] max-[520px]:p-5 max-w-full min-[520px]:rounded-3xl min-[520px]:shadow-lg shadow-shadow-color">
    <img width="100" class="mb-4" src="./icons/svgs/Logo.svg" alt="Logo" />
    <section>
      <div class="mb-7">
        <h1 class="text-on-bg text-2xl mb-2">
          قم بتعيين صورة لك
        </h1>
        <p class="text-on-bg-trans text-[15px]">اسحب وافلت صورة او اضغط في الاسفل  لاختيار صورة</p>
      </div>
      <RangeInput oneside min={0} max={23.983333333333333333} init_max={12} label_reneder={(input)=>formatTimeClock(input*3600)} class="mb-4"/>
      <!-- <AudioPlayer /> -->
      <form method="post" enctype="multipart/form-data" action="?/setAvatar" class="flex flex-col gap-[0.986rem]" use:enhance>
        <!-- <SetAvatarInput name="avatar" bind:files={avatar}/> -->
        <DragDropInput multiple max={5} height="h-80"/>
        <CodeBlock lang="javascript">{`const MAX_I = 43123943; //max value for i
let i = 0;
i += 32;
while(i < MAX_I){
  i += Math.log(i, 2)*32;
}
console.log('Result: '+i);`}</CodeBlock>
        <CodeBlock lang="typescript">{`interface FormatOption {
  res?: number | undefined,
  decimalPoints?: number | undefined,
  extraDecimalPoints?: number | undefined,
  roundMethod?: '\\ttrunc' | 'round\\n' | \`\\thaha \${valid? 'valid\\n':'not-valid\\n'} no.\\n\`
}

const regex = /#?(?!\\s)[_$a-zA-Z\\xA0-\\uFFFF](?:(?!\\s)[$\\w\\xA0-\\uFFFF])*(?=\\s*(?:\\.\\s*(?:apply|bind|call)\\s*)?\\()/;

const valid = true;
let v2 = valid? true : false;

type DataUnit = 'Bytes' | 'KB' | 'MB' | 'GB' | 'TB';

const DataUnits = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

export type Formated = { number?: number, unit: string, extra?: { number?: number, unit: string }[] };

export interface FormatDataOption extends FormatOption {
  minUnit?: DataUnit | undefined,
  maxUnit?: DataUnit | undefined,
  fixedUnit?: DataUnit | undefined
}

const defaultFormatDataOptions : FormatDataOption = { res: 0, minUnit: 'Bytes', maxUnit: 'TB', decimalPoints: 2, roundMethod: 'round' };
export function formatData(bytes: string | number, options: FormatDataOption = defaultFormatDataOptions): Formated {
  const minUnit = DataUnits.indexOf((options.minUnit === undefined? defaultFormatDataOptions.minUnit : options.minUnit)!);
  const maxUnit = DataUnits.indexOf((options.maxUnit === undefined? defaultFormatDataOptions.maxUnit : options.maxUnit)!);
  const res = Math.max(0, Math.min(4, (options.res === undefined ? defaultFormatDataOptions.res : options.res)!));
  const decimalPoints = Math.pow(10, (options.decimalPoints === undefined ? defaultFormatDataOptions.decimalPoints : options.decimalPoints)!);
  const extraDecimalPoints = options.extraDecimalPoints ? Math.pow(10, options.extraDecimalPoints) : 1;
  const roundMethod = options.roundMethod ? options.roundMethod : defaultFormatDataOptions.roundMethod!;
  const rn = (typeof bytes === "string") ? parseInt(bytes as string) : bytes as number;
  let n = Math.abs(rn);
  let unit;
  let remainders: { number: number, unit: string }[] | undefined = undefined;
  if (options.fixedUnit) {
    let unitIndex = DataUnits.indexOf(options.fixedUnit);
    if (unitIndex > -1) {
      n = n / Math.pow(1024, (unitIndex + 1));
      unit = options.fixedUnit;
    } else {
      throw new Error("Unvalid Fixed Unit");
    }
  }
  else {
    remainders = [];
    n = n / Math.pow(1024, minUnit);
    let i = minUnit;
    while (i < maxUnit && n / 1024 >= 1) {
      let extraN = n % 1024;
      if (extraN) {
        remainders.push({ number: (Math[roundMethod]((extraN) + Number.EPSILON) * extraDecimalPoints) / extraDecimalPoints, unit: DataUnits[i]});
      }
      if (remainders.length > res) {
        remainders.shift();
        for (let j = 0; j < remainders.length; j++) {
          if (!remainders[j].number) remainders.shift();
        }
        n = n / 1024;
      }
      else n = Math.floor(n / 1024);
      i++;
    }
    unit = DataUnits[i];
    remainders.reverse();
  }
  
  return {number:(Math[roundMethod]((n * (rn < 0? -1 : 1) + Number.EPSILON) * decimalPoints) / decimalPoints), unit, extra: remainders};
}
`}</CodeBlock>
        <CodeBlock lang="css">{`@tailwind base;
@tailwind components;
@tailwind utilities;

@import './src/thomani-code-syntax.css';

html * {
  scrollbar-width: thin;
  scrollbar-color: #46694E transparent;
}

/*

Atom One Dark by Daniel Gamage
Original One Dark Syntax theme from https://github.com/atom/one-dark-syntax

base:    #282c34
mono-1:  #abb2bf
mono-2:  #818896
mono-3:  #5c6370
hue-1:   #56b6c2
hue-2:   #61aeee
hue-3:   #c678dd
hue-4:   #98c379
hue-5:   #e06c75
hue-5-2: #be5046
hue-6:   #d19a66
hue-6-2: #e6c07b

*/
.token.base {
  color: #d9fad7;
}
.token.comment {
  color: #5a7765 !important;
  font-style: italic
}
.token.keyword {
  color: #72ea79;
}
.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e06c75
}
.token.string {
  color: #e8a6a6
}
.token.constant {
  color: #faff8f;
}
.token.property {
  color: #efc793;
}
.token.operator {
  color: #0fb382;
}
.token.punctuation {
  color: #6da76d;
}
.token.number{
  color: #92c3c6;
}
.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #61aeee
}
.token.class-name {
  color: #faff8f
}
.token.function  {
  color: #8ffff3
}
.hljs-emphasis {
  font-style: italic
}
.hljs-strong {
  font-weight: bold
}
.hljs-link {
  text-decoration: underline
}`}</CodeBlock>
        <!-- <CodeBlock minmal break_words={false} with_lines={false} lang="html" class="h-60">{`<!doctype html>
<html lang="ar" dir="rtl">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/icons/svgs/favicon.svg\\n" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="stylesheet" href="%sveltekit.assets%/output.css">
		<title>ثماني</title>
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
`}</CodeBlock>
        <CodeBlock break_words={false} with_lines={false} lang="regex">{`/#?(?!\\s)[_$a-zA-Z\\xA0-\\uFFFF](?:(?!\\s)[$\\w\\xA0-\\uFFFF])*(?=\\s*(?:\\.\\s*(?:apply|bind|call)\\s*)?\\()/`}</CodeBlock> -->
        <div class="mt-3">
          <Button>{avatar? "التالي" : "لاحقاً"}</Button>
        </div>
      </form>
    </section>
  </div>