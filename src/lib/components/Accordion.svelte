<script>
	import { ChevronDown } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	// Props yang akan diterima oleh komponen ini
	let { title, jobTitle, period, details } = $props();

	// Menggunakan Svelte 5 Runes untuk state
	let isOpen = $state(false);

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div class="mb-4 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
	<button
		onclick={toggle}
		class="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
		aria-expanded={isOpen}
	>
		<div class="flex flex-col md:flex-row md:items-center md:gap-4">
			<h3 class="font-bold text-slate-800 dark:text-slate-100">{title}</h3>
			<p class="text-sm text-slate-600 md:text-base dark:text-slate-400">{jobTitle}</p>
		</div>
		<div class="flex items-center gap-4">
			<span class="hidden text-sm text-slate-500 md:inline">{period}</span>
			<ChevronDown
				class="transition-transform duration-300 {isOpen ? 'rotate-180' : ''}"
				size={20}
			/>
		</div>
	</button>

	{#if isOpen}
		<div
			transition:slide={{ duration: 300 }}
			class="border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50"
		>
			<div class="prose prose-sm dark:prose-invert max-w-none">
				{@html details}
			</div>
		</div>
	{/if}
</div>
