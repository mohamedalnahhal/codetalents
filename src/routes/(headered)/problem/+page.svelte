<script lang="ts">
	import Tooltip from '$lib/components/ui/Tooltip.svelte';
	import CodeEditor from '$lib/components/utils/CodeEditor.svelte';
	import ArrowLeftIcon from '$lib/icons/regular/ArrowLeftIcon.svelte';
	import InfoCircleIcon from '$lib/icons/regular/InfoCircleIcon.svelte';
	import { onMount } from 'svelte';

	let right_c: HTMLDivElement;
	let isResizing = false;

	onMount(()=>{
		document.addEventListener("mousemove", (e) => {
			if (!isResizing || right_c == null) return;
			const containerWidth = right_c.parentElement?.offsetWidth ?? 0;
			const newLeftWidth = e.clientX + (right_c.parentElement?.offsetLeft ?? 0);
			const minWidth = 450; // prevent shrinking too small

			if (newLeftWidth > minWidth && newLeftWidth < containerWidth - minWidth) {
				right_c.style.width = `calc(${(containerWidth - newLeftWidth)*100/containerWidth}% - 12px)`;
			}
		});
		document.addEventListener("mouseup", () => {
			isResizing = false;
		});
	})
</script>

<!-- <div class="w-[100dvw] /**h-[100svh]*/ flex min-[520px]:items-center justify-center"> -->
<div
	class="p-4 flex-row flex gap-1 h-[calc(100svh-3.5rem)]"
>
			<div class="max-h-full h-full overflow-y-auto overflow-x-clip flex-1 border border-primary-hairline bg-under-primary rounded-lg text-green-950!" dir="ltr">

					<!-- <div class="px-4 flex flex-col gap-2 justify-between bg-primary text-on-primary rounded-t-lg"> -->
						<div class="w-full flex flex-row items-center justify-between gap-2 sticky z-50 top-0 shadow-[0_2px_3px_rgba(0,0,0,0.08)] bg-primary-s1 text-on-primary rounded-t-lg pl-4 pr-3 pt-2 pb-3">
							<!-- <div class="flex flex-row items-center gap-2"> -->
								<div class="flex flex-row items-center gap-2">
									<h1 class="font-bold text-xl">Twin Polynomials</h1>
									<Tooltip placement="right" delay={200}>
										<svelte:fragment slot="content">
											<strong>Solve Rate</strong> 43.2%<br/>92 Solves / 213 Attempts
										</svelte:fragment>
										<InfoCircleIcon class="w-4 cursor-pointer" />
									</Tooltip>
									<div class="bg-primary-s2 rounded-full px-2 py-1 text-sm font-semibold">50 pts</div>
								</div>
							<!-- </div> -->
							<div class="flex flex-row gap-1 items-center">
								<button class="cursor-pointer p-1 hover:bg-primary-s2 transition-all rounded-md">
									<ArrowLeftIcon class="w-6 rotate-180"/>
								</button>
								<button class="cursor-pointer p-1 hover:bg-primary-s2 transition-all rounded-md">
									<ArrowLeftIcon class="w-6"/>
								</button>
							</div>
						</div>
						<div class="w-full flex flex-col text-sm bg-primary-s1 border-t border-on-primary text-on-primary px-4 p-2">
							<p class="time-limit">
								<span class="italic">Time Limit per Test: </span>
								<span class="font-bold">2 seconds</span> 
							</p>
							<p class="memory-limit">
								<span class="italic">Memory Limit per Test: </span>
								<span class="font-bold">256 MB</span>
							</p>
						</div>
					<!-- </div> -->
				<div class="problem-statement overflow-x-auto">
					<div class="p-4">
						<p>
							A polynomial <span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-1-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;f&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;(&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;)&lt;/mo&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mn&gt;0&lt;/mn&gt;&lt;/msub&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;/msub&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;/msub&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;/msup&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mo&gt;&amp;#x2026;&lt;/mo&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/msub&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/msup&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								>
								<span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo
											>=</mo
										><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><msub><mi>a</mi><mn>1</mn></msub><mi
											>x</mi
										><mo>+</mo><msub><mi>a</mi><mn>2</mn></msub><msup><mi>x</mi><mn>2</mn></msup><mo
											>+</mo
										><mo>…</mo><mo>+</mo><msub><mi>a</mi><mi>n</mi></msub><msup
											><mi>x</mi><mi>n</mi></msup
										></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-1">
f(x) = a_0 + a_1x + a_2x^2 + \ldots + a_nx^n
							</script>
							is called a valid polynomial of degree
							<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-2-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>n</mi></math></span
								></span
							><script type="math/tex" id="MathJax-Element-2">
								n;
							</script>
							if and only if <span class="MathJax_Preview" style="color: inherit;"></span>
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-3-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;i&lt;/mi&gt;&lt;/msub&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><msub><mi>a</mi><mi>i</mi></msub></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-3">
								a_i;
							</script>
							is a non-negative integer for all
							<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-4-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mn&gt;0&lt;/mn&gt;&lt;mo&gt;&amp;#x2264;&lt;/mo&gt;&lt;mi&gt;i&lt;/mi&gt;&lt;mo&gt;&amp;#x2264;&lt;/mo&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								>
								<span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mn>0</mn><mo>≤</mo><mi>i</mi><mo>≤</mo><mi>n</mi></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-4">
0 \le i \le n
							</script>
							and
							<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-5-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/msub&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								>
                <span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><msub><mi>a</mi><mi>n</mi></msub></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-5">
								a_n;
							</script>
							is not <span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-6-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mn&gt;0&lt;/mn&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"><mn>0</mn></math></span
								></span
							><script type="math/tex" id="MathJax-Element-6">
								0;
							</script>.
						</p>
						<p>
							For a valid polynomial <span class="MathJax_Preview" style="color: inherit;"
							></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-7-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;f&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;(&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;)&lt;/mo&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mn&gt;0&lt;/mn&gt;&lt;/msub&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;/msub&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;/msub&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;/msup&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mo&gt;&amp;#x2026;&lt;/mo&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/msub&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/msup&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								>
                <span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo
											>=</mo
										><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><msub><mi>a</mi><mn>1</mn></msub><mi
											>x</mi
										><mo>+</mo><msub><mi>a</mi><mn>2</mn></msub><msup><mi>x</mi><mn>2</mn></msup><mo
											>+</mo
										><mo>…</mo><mo>+</mo><msub><mi>a</mi><mi>n</mi></msub><msup
											><mi>x</mi><mi>n</mi></msup
										></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-7">
f(x) = a_0 + a_1x + a_2x^2 + \ldots + a_nx^n
							</script>
							of degree <span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-8-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>n</mi></math></span
								></span
							><script type="math/tex" id="MathJax-Element-8">
								n;
							</script>, its <span class="tex-font-style-it">twin polynomial</span>
							<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-9-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;g&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;(&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;)&lt;/mo&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mi>g</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo
										></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-9">
								g(x);
							</script>
							is defined as: <span class="MathJax_Preview" style="color: inherit;"></span>
						</p>
						<div class="MathJax_Display" style="text-align: center;">
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<span
								class="MathJax"
								id="MathJax-Element-10-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot; display=&quot;block&quot;&gt;&lt;mi&gt;g&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;(&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;)&lt;/mo&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;munderover&gt;&lt;mo&gt;&amp;#x2211;&lt;/mo&gt;&lt;mrow class=&quot;MJX-TeXAtom-ORD&quot;&gt;&lt;mi&gt;i&lt;/mi&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;mn&gt;0&lt;/mn&gt;&lt;/mrow&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/munderover&gt;&lt;mi&gt;i&lt;/mi&gt;&lt;mo&gt;&amp;#x22C5;&lt;/mo&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mrow class=&quot;MJX-TeXAtom-ORD&quot;&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;i&lt;/mi&gt;&lt;/msub&gt;&lt;/mrow&gt;&lt;/msup&gt;&lt;/math&gt;"
								role="presentation"
								style="text-align: center; position: relative;"
								><span class="MJX_Assistive_MathML MJX_Assistive_MathML_Block" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"
										><mi>g</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo
											>=</mo
										><munderover
											><mo>∑</mo><mrow class="MJX-TeXAtom-ORD"><mi>i</mi><mo>=</mo><mn>0</mn></mrow
											><mi>n</mi></munderover
										><mi>i</mi><mo>⋅</mo><msup
											><mi>x</mi><mrow class="MJX-TeXAtom-ORD"
												><msub><mi>a</mi><mi>i</mi></msub></mrow
											></msup
										></math
									></span
								></span
							>
						</div>
						<script type="math/tex; mode=display" id="MathJax-Element-10">
 g(x) = \sum_{i=0}^n i \cdot x^{a_i}
						</script>
						For example, for <span class="MathJax_Preview" style="color: inherit;"></span>
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <span
							class="MathJax"
							id="MathJax-Element-11-Frame"
							tabindex="0"
							data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;f&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;(&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;)&lt;/mo&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mn&gt;3&lt;/mn&gt;&lt;/msup&gt;&lt;/math&gt;"
							role="presentation"
							style="position: relative;"
							><span class="MJX_Assistive_MathML" role="presentation"
								><math xmlns="http://www.w3.org/1998/Math/MathML"
									><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo
										>=</mo
									><mn>1</mn><mo>+</mo><mn>2</mn><mi>x</mi><mo>+</mo><mn>2</mn><msup
										><mi>x</mi><mn>3</mn></msup
									></math
								></span
							></span
						><script type="math/tex" id="MathJax-Element-11">
f(x) = 1 + 2x + 2x^3
						</script>, its <span class="tex-font-style-it">twin polynomial</span> is:
						<p><span class="MathJax_Preview" style="color: inherit;"></span></p>
						<div class="MathJax_Display" style="text-align: center;">
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<span
								class="MathJax"
								id="MathJax-Element-12-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot; display=&quot;block&quot;&gt;&lt;mi&gt;g&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;(&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;)&lt;/mo&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;mn&gt;0&lt;/mn&gt;&lt;mo&gt;&amp;#x22C5;&lt;/mo&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mrow class=&quot;MJX-TeXAtom-ORD&quot;&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;/mrow&gt;&lt;/msup&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;mo&gt;&amp;#x22C5;&lt;/mo&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mrow class=&quot;MJX-TeXAtom-ORD&quot;&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;/mrow&gt;&lt;/msup&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;mo&gt;&amp;#x22C5;&lt;/mo&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mrow class=&quot;MJX-TeXAtom-ORD&quot;&gt;&lt;mn&gt;0&lt;/mn&gt;&lt;/mrow&gt;&lt;/msup&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mn&gt;3&lt;/mn&gt;&lt;mo&gt;&amp;#x22C5;&lt;/mo&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mrow class=&quot;MJX-TeXAtom-ORD&quot;&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;/mrow&gt;&lt;/msup&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;mn&gt;0&lt;/mn&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;/msup&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mn&gt;3&lt;/mn&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;/msup&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mn&gt;4&lt;/mn&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;/msup&gt;&lt;/math&gt;"
								role="presentation"
								style="text-align: center; position: relative;"
								><span class="MJX_Assistive_MathML MJX_Assistive_MathML_Block" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"
										><mi>g</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo
											>=</mo
										><mn>0</mn><mo>⋅</mo><msup
											><mi>x</mi><mrow class="MJX-TeXAtom-ORD"><mn>1</mn></mrow></msup
										><mo>+</mo><mn>1</mn><mo>⋅</mo><msup
											><mi>x</mi><mrow class="MJX-TeXAtom-ORD"><mn>2</mn></mrow></msup
										><mo>+</mo><mn>2</mn><mo>⋅</mo><msup
											><mi>x</mi><mrow class="MJX-TeXAtom-ORD"><mn>0</mn></mrow></msup
										><mo>+</mo><mn>3</mn><mo>⋅</mo><msup
											><mi>x</mi><mrow class="MJX-TeXAtom-ORD"><mn>2</mn></mrow></msup
										><mo>=</mo><mn>2</mn><mo
											>+</mo
										><mn>4</mn><msup><mi>x</mi><mn>2</mn></msup></math
									></span
								></span
							>
						</div>
						<script type="math/tex; mode=display" id="MathJax-Element-12">
 g(x) = 0 \cdot x^{1} + 1 \cdot x^{2} + 2 \cdot x^{0} + 3 \cdot x^{2} = 0+x^2+2+3x^2= 2 + 4x^2
						</script>
						<p>
							A valid polynomial <span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-13-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;f&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;(&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;)&lt;/mo&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo
										></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-13">
								f(x);
							</script>
							of degree <span class="MathJax_Preview" style="color: inherit;"></span>
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-14-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>n</mi></math></span
								></span
							><script type="math/tex" id="MathJax-Element-14">
								n;
							</script>
							is called <span class="tex-font-style-it">cool</span> if and only if
							<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-15-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;f&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;(&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;)&lt;/mo&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;mi&gt;g&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;(&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;)&lt;/mo&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo
											>=</mo
										><mi>g</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo
										></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-15">
f(x) = g(x)
							</script>. In other words, a valid polynomial of degree
							<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-16-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>n</mi></math></span
								></span
							><script type="math/tex" id="MathJax-Element-16">
								n;
							</script> is cool if and only if its twin polynomial equals itself.
						</p>
						<p>
							You are given an incomplete valid polynomial <span
								class="MathJax_Preview"
								style="color: inherit;"
							></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-17-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;f&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;(&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;)&lt;/mo&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mn&gt;0&lt;/mn&gt;&lt;/msub&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;/msub&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;/msub&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;/msup&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mo&gt;&amp;#x2026;&lt;/mo&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/msub&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/msup&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo
											>=</mo
										><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><msub><mi>a</mi><mn>1</mn></msub><mi
											>x</mi
										><mo>+</mo><msub><mi>a</mi><mn>2</mn></msub><msup><mi>x</mi><mn>2</mn></msup><mo
											>+</mo
										><mo>…</mo><mo>+</mo><msub><mi>a</mi><mi>n</mi></msub><msup
											><mi>x</mi><mi>n</mi></msup
										></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-17">
f(x) = a_0 + a_1x + a_2x^2 + \ldots + a_nx^n
							</script>
							of degree <span class="MathJax_Preview" style="color: inherit;"></span>
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<span
								class="MathJax"
								id="MathJax-Element-18-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>n</mi></math></span
								></span
							><script type="math/tex" id="MathJax-Element-18">
								n;
							</script>. Some of <span class="MathJax_Preview" style="color: inherit;"></span>
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<span
								class="MathJax"
								id="MathJax-Element-19-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;i&lt;/mi&gt;&lt;/msub&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								>
								<span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><msub><mi>a</mi><mi>i</mi></msub></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-19">
								a_i;
							</script>
							have been determined, while others have not been determined.
							<span class="tex-font-style-bf">Additionally</span>, it is guaranteed that
							<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-20-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mn&gt;0&lt;/mn&gt;&lt;/msub&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><msub><mi>a</mi><mn>0</mn></msub></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-20">
								a_0;
							</script>
							and <span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-21-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/msub&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><msub><mi>a</mi><mi>n</mi></msub></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-21">
								a_n;
							</script> <span class="tex-font-style-bf">are not determined</span>.
						</p>
						<p>
							Please count the number of <span class="tex-font-style-it">cool</span> valid
							polynomials of degree
							<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-22-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								>
								<span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>n</mi></math></span
								></span
							><script type="math/tex" id="MathJax-Element-22">
								n;
							</script>
							that can be found by determining all undetermined
							<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-23-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;i&lt;/mi&gt;&lt;/msub&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><msub><mi>a</mi><mi>i</mi></msub></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-23">
								a_i;
							</script>'s. Since the answer may be large, you need to output it modulo
							<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-24-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;mspace width=&quot;thinmathspace&quot; /&gt;&lt;mn&gt;000&lt;/mn&gt;&lt;mspace width=&quot;thinmathspace&quot; /&gt;&lt;mn&gt;000&lt;/mn&gt;&lt;mspace width=&quot;thinmathspace&quot; /&gt;&lt;mn&gt;007&lt;/mn&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mn>1</mn><mspace width="thinmathspace"></mspace><mn>000</mn><mspace
											width="thinmathspace"
										></mspace><mn>000</mn><mspace width="thinmathspace"></mspace><mn>007</mn></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-24">
1\,000\,000\,007
							</script>.
						</p>
					</div>
					<div class="p-4 input-specification">
						<div class="font-bold">Input</div>
						<p>
							Each test contains multiple test cases. The first line contains the number of test
							cases <span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-25-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;t&lt;/mi&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>t</mi></math></span
								></span
							><script type="math/tex" id="MathJax-Element-25">
								t;
							</script>
							(<span class="MathJax_Preview" style="color: inherit;"></span>
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<span
								class="MathJax"
								id="MathJax-Element-26-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;mo&gt;&amp;#x2264;&lt;/mo&gt;&lt;mi&gt;t&lt;/mi&gt;&lt;mo&gt;&amp;#x2264;&lt;/mo&gt;&lt;msup&gt;&lt;mn&gt;10&lt;/mn&gt;&lt;mn&gt;4&lt;/mn&gt;&lt;/msup&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mn>1</mn><mo>≤</mo><mi>t</mi><mo>≤</mo><msup><mn>10</mn><mn>4</mn></msup
										></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-26">
1 \le t \le 10^4
							</script>). The description of the test cases follows.
						</p>
						<p>
							For each test case, the first line contains an integer <span
								class="MathJax_Preview"
								style="color: inherit;"
							></span>
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<span
								class="MathJax"
								id="MathJax-Element-27-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>n</mi></math></span
								></span
							><script type="math/tex" id="MathJax-Element-27">
								n;
							</script>
							(<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-28-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;mo&gt;&amp;#x2264;&lt;/mo&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;mo&gt;&amp;#x2264;&lt;/mo&gt;&lt;mn&gt;4&lt;/mn&gt;&lt;mo&gt;&amp;#x22C5;&lt;/mo&gt;&lt;msup&gt;&lt;mn&gt;10&lt;/mn&gt;&lt;mn&gt;5&lt;/mn&gt;&lt;/msup&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mn>1</mn><mo>≤</mo><mi>n</mi><mo>≤</mo><mn>4</mn><mo>⋅</mo><msup
											><mn>10</mn><mn>5</mn></msup
										></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-28">
1 \leq n \leq 4 \cdot 10^5
							</script>).
						</p>
						<p>
							The second line contains <span class="MathJax_Preview" style="color: inherit;"
							></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-29-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mi>n</mi><mo>+</mo><mn>1</mn></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-29">
								n + 1;
							</script>
							integers <span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-30-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mn&gt;0&lt;/mn&gt;&lt;/msub&gt;&lt;mo&gt;,&lt;/mo&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;/msub&gt;&lt;mo&gt;,&lt;/mo&gt;&lt;mo&gt;&amp;#x2026;&lt;/mo&gt;&lt;mo&gt;,&lt;/mo&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/msub&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation">
									<math xmlns="http://www.w3.org/1998/Math/MathML"
										><msub><mi>a</mi><mn>0</mn></msub><mo>,</mo><msub><mi>a</mi><mn>1</mn></msub><mo
											>,</mo
										><mo>…</mo><mo>,</mo><msub><mi>a</mi><mi>n</mi></msub></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-30">
a_0, a_1, \ldots, a_n
							</script>
							(<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-31-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mo&gt;&amp;#x2212;&lt;/mo&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;mo&gt;&amp;#x2264;&lt;/mo&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;i&lt;/mi&gt;&lt;/msub&gt;&lt;mo&gt;&amp;#x2264;&lt;/mo&gt;&lt;msup&gt;&lt;mn&gt;10&lt;/mn&gt;&lt;mn&gt;9&lt;/mn&gt;&lt;/msup&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mo>−</mo><mn>1</mn><mo>≤</mo><msub><mi>a</mi><mi>i</mi></msub><mo>≤</mo><msup
											><mn>10</mn><mn>9</mn></msup
										></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-31">
-1 \leq a_i \leq 10^9
							</script>). Here, <span class="MathJax_Preview" style="color: inherit;"></span>
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<span
								class="MathJax"
								id="MathJax-Element-32-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;i&lt;/mi&gt;&lt;/msub&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;mo&gt;&amp;#x2212;&lt;/mo&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><msub><mi>a</mi><mi>i</mi></msub><mo>=</mo><mo>−</mo><mn>1</mn></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-32">
								a_i = -1;
							</script>
							means
							<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-33-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;i&lt;/mi&gt;&lt;/msub&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								>
								<span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><msub><mi>a</mi><mi>i</mi></msub></math
									></span
								></span
							>
							<script type="math/tex" id="MathJax-Element-33">
								a_i;
							</script>
							has not been determined, while
							<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-34-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;i&lt;/mi&gt;&lt;/msub&gt;&lt;mo&gt;&amp;#x2260;&lt;/mo&gt;&lt;mo&gt;&amp;#x2212;&lt;/mo&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
							>
							<span class="MJX_Assistive_MathML" role="presentation">
									<math xmlns="http://www.w3.org/1998/Math/MathML"
										><msub><mi>a</mi><mi>i</mi></msub><mo>≠</mo><mo>−</mo><mn>1</mn></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-34">
a_i \neq -1
							</script>
							means <span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-35-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;i&lt;/mi&gt;&lt;/msub&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><msub><mi>a</mi><mi>i</mi></msub></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-35">
								a_i;
							</script> has been determined as its value.
						</p>
						<p>
							<span class="tex-font-style-bf"
								>It is guaranteed that <span class="MathJax_Preview" style="color: inherit;"
								></span>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <span
									class="MathJax"
									id="MathJax-Element-36-Frame"
									tabindex="0"
									data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mn&gt;0&lt;/mn&gt;&lt;/msub&gt;&lt;/math&gt;"
									role="presentation"
									style="position: relative;"
									><span class="MJX_Assistive_MathML" role="presentation"
										><math xmlns="http://www.w3.org/1998/Math/MathML"
											><msub><mi>a</mi><mn>0</mn></msub></math
										></span
									></span
								><script type="math/tex" id="MathJax-Element-36">
									a_0;
								</script>
								and <span class="MathJax_Preview" style="color: inherit;"></span>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <span
									class="MathJax"
									id="MathJax-Element-37-Frame"
									tabindex="0"
									data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/msub&gt;&lt;/math&gt;"
									role="presentation"
									style="position: relative;"
									><span class="MJX_Assistive_MathML" role="presentation"
										><math xmlns="http://www.w3.org/1998/Math/MathML"
											><msub><mi>a</mi><mi>n</mi></msub></math
										></span
									></span
								><script type="math/tex" id="MathJax-Element-37">
									a_n;
								</script>
								are always <span class="MathJax_Preview" style="color: inherit;"></span>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <span
									class="MathJax"
									id="MathJax-Element-38-Frame"
									tabindex="0"
									data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mo&gt;&amp;#x2212;&lt;/mo&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;/math&gt;"
									role="presentation"
									style="position: relative;"
									><span class="MJX_Assistive_MathML" role="presentation"
										><math xmlns="http://www.w3.org/1998/Math/MathML"><mo>−</mo><mn>1</mn></math
										></span
									></span
								><script type="math/tex" id="MathJax-Element-38">
									-1;
								</script> in the input.</span
							>
						</p>
						<p>
							It is guaranteed that the sum of <span class="MathJax_Preview" style="color: inherit;"
							></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-39-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>n</mi></math></span
								></span
							><script type="math/tex" id="MathJax-Element-39">
								n;
							</script>
							over all test cases does not exceed
							<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-40-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mn&gt;4&lt;/mn&gt;&lt;mo&gt;&amp;#x22C5;&lt;/mo&gt;&lt;msup&gt;&lt;mn&gt;10&lt;/mn&gt;&lt;mn&gt;5&lt;/mn&gt;&lt;/msup&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mn>4</mn><mo>⋅</mo><msup><mn>10</mn><mn>5</mn></msup></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-40">
4 \cdot 10^5
							</script>.
						</p>
					</div>
					<div class="p-4 output-specification">
						<div class="font-bold">Output</div>
						<p>
							For each test case, output the number of <span class="tex-font-style-it">cool</span>
							valid polynomials of degree
							<span class="MathJax_Preview" style="color: inherit;"></span>
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<span
								class="MathJax"
								id="MathJax-Element-41-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;n&lt;/mi&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>n</mi></math></span
								></span
							><script type="math/tex" id="MathJax-Element-41">
								n;
							</script>
							found by determining the undetermined
							<span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-42-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;msub&gt;&lt;mi&gt;a&lt;/mi&gt;&lt;mi&gt;i&lt;/mi&gt;&lt;/msub&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><msub><mi>a</mi><mi>i</mi></msub></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-42">
								a_i;
							</script>'s, modulo <span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-43-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;mspace width=&quot;thinmathspace&quot; /&gt;&lt;mn&gt;000&lt;/mn&gt;&lt;mspace width=&quot;thinmathspace&quot; /&gt;&lt;mn&gt;000&lt;/mn&gt;&lt;mspace width=&quot;thinmathspace&quot; /&gt;&lt;mn&gt;007&lt;/mn&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mn>1</mn><mspace width="thinmathspace"></mspace><mn>000</mn>
										<mspace width="thinmathspace"></mspace><mn>000</mn><mspace width="thinmathspace"
										></mspace><mn>007</mn></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-43">
1\,000\,000\,007
							</script>.
						</p>
					</div>
					<div class="p-4 sample-tests">
						<div class="font-bold mb-4">Example</div>
						<div class="sample-test h-full flex flex-row items-stretch">
							<div class="input flex-1 flex flex-col">
								<div class="font-bold mb-2">
									Input
								</div>
								<pre id="id008304908996947412" class="border rounded-l-sm border-primary-s2 p-1 pl-2 grow"><div
										class="test-example-line test-example-line-even test-example-line-0">6</div><div
										class="test-example-line test-example-line-odd test-example-line-1"
										style="">1</div><div
										class="test-example-line test-example-line-odd test-example-line-1"
										style="">-1 -1</div><div
										class="test-example-line test-example-line-even test-example-line-2"
										style="">2</div><div
										class="test-example-line test-example-line-even test-example-line-2"
										style="">-1 2 -1</div><div
										class="test-example-line test-example-line-odd test-example-line-3"
										style="">2</div><div
										class="test-example-line test-example-line-odd test-example-line-3"
										style="">-1 -1 -1</div><div
										class="test-example-line test-example-line-even test-example-line-4"
										style="">3</div><div
										class="test-example-line test-example-line-even test-example-line-4"
										style="">-1 -1 3 -1</div><div
										class="test-example-line test-example-line-odd test-example-line-5"
										style="">3</div><div
										class="test-example-line test-example-line-odd test-example-line-5"
										style="">-1 2 3 -1</div><div
										class="test-example-line test-example-line-even test-example-line-6"
										style="">5</div><div
										class="test-example-line test-example-line-even test-example-line-6"
										style="">-1 -1 -1 1 0 -1</div></pre>
							</div>
							<div class="output flex-1 flex flex-col">
								<div class="font-bold mb-2">
									Output
								</div>
								<pre id="id002931259579952936" class="border rounded-r-sm border-l-0 border-primary-s2 p-1 pl-2 grow"><div
										class="test-example-line test-example-line-odd test-example-line-1"
										style="">1</div><div
										class="test-example-line test-example-line-even test-example-line-2"
										style="">1</div><div
										class="test-example-line test-example-line-odd test-example-line-3"
										style="">3</div><div
										class="test-example-line test-example-line-even test-example-line-4"
										style="">2</div><div
										class="test-example-line test-example-line-odd test-example-line-5"
										style="">0</div><div
										class="test-example-line test-example-line-even test-example-line-6"
										style="">3</div></pre>
							</div>
						</div>
					</div>
					<div class="p-4 note">
						<div class="font-bold">Note</div>
						<p>
							In the first test case, only <span class="MathJax_Preview" style="color: inherit;"
							></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-44-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;f&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;(&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;)&lt;/mo&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo
											>=</mo
										><mi>x</mi></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-44">
f(x) = x
							</script> satisfies the condition above.
						</p>
						<p>
							In the second test case, only <span class="MathJax_Preview" style="color: inherit;"
							></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-45-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;f&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;(&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;)&lt;/mo&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;/msup&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								>
								<span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo
											>=</mo
										><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>2</mn><mi>x</mi></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-45">
f(x) = x^2 + 2x
							</script> satisfies the condition above.
						</p>
						<p>
							In the third test case, <span class="MathJax_Preview" style="color: inherit;"
							></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-46-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;f&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;(&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;)&lt;/mo&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;/msup&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo
											>=</mo
										><mn>2</mn><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mi>x</mi></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-46">
f(x) = 2x^2 + x
							</script>, <span class="MathJax_Preview" style="color: inherit;"></span>
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-47-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;f&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;(&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;)&lt;/mo&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;/msup&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo
											>=</mo
										><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>2</mn><mi>x</mi></math
									></span
								></span
							><script type="math/tex" id="MathJax-Element-47">
f(x) = x^2 + 2x
							</script>, and <span class="MathJax_Preview" style="color: inherit;"></span>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <span
								class="MathJax"
								id="MathJax-Element-48-Frame"
								tabindex="0"
								data-mathml="&lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;&gt;&lt;mi&gt;f&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;(&lt;/mo&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mo stretchy=&quot;false&quot;&gt;)&lt;/mo&gt;&lt;mo&gt;=&lt;/mo&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;msup&gt;&lt;mi&gt;x&lt;/mi&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;/msup&gt;&lt;mo&gt;+&lt;/mo&gt;&lt;mn&gt;1&lt;/mn&gt;&lt;/math&gt;"
								role="presentation"
								style="position: relative;"
								><span class="MJX_Assistive_MathML" role="presentation"
									><math xmlns="http://www.w3.org/1998/Math/MathML"
										><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo
											>=</mo
										><mn>2</mn><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>1</mn></math
									></span
								></span
							>
							<script type="math/tex" id="MathJax-Element-48">
f(x) = 2x^2 + 1
							</script> satisfy the condition above.
						</p>
					</div>
				</div>
			</div>
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<div role="separator" aria-roledescription="resizer" on:mousedown={() => {isResizing = true;}} class="w-2 bg-under-primary hover:bg-primary-s1 transition-colors rounded-xs cursor-col-resize"></div>
			<div bind:this={right_c} class="w-1/2 h-full max-h-full">
				<CodeEditor class="w-full max-h-full h-full overflow-hidden"></CodeEditor>
			</div>
</div>
<!-- </div> -->
