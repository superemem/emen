<!-- File: src/lib/components/Accordion.svelte -->

<script>
	import { ChevronDown } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	let { title, jobTitle, period, details } = $props();
	let isOpen = $state(false);

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<!-- PERUBAHAN DI SINI: tambahkan bg-white dan shadow-md -->
<div class="mb-4 overflow-hidden rounded-xl bg-white shadow-md">
	<button
		onclick={toggle}
		class="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-50"
		aria-expanded={isOpen}
	>
		<div class="flex flex-col md:flex-row md:items-center md:gap-4">
			<h3 class="font-bold text-slate-900">{title}</h3>
			<p class="text-sm text-slate-600 md:text-base">{jobTitle}</p>
		</div>
		<div class="flex items-center gap-4">
			<span class="hidden text-sm text-slate-500 md:inline">{period}</span>
			<ChevronDown
				class="text-slate-500 transition-transform duration-300 {isOpen ? 'rotate-180' : ''}"
				size={20}
			/>
		</div>
	</button>

	{#if isOpen}
		<div transition:slide={{ duration: 300 }} class="border-t border-slate-200 bg-white p-4">
			<div class="prose prose-sm max-w-none">
				{@html details}
			</div>
		</div>
	{/if}
</div>
