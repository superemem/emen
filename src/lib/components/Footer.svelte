<!-- File: src/lib/components/Footer.svelte -->

<script>
	import { Linkedin, Instagram } from '@lucide/svelte';
	const currentYear = new Date().getFullYear();
</script>

<footer class="mt-20 border-t border-slate-200 dark:border-slate-800">
	<div class="container mx-auto flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
		<p class="text-sm text-slate-600 dark:text-slate-400">
			&copy; {currentYear} Emen. All rights reserved.
		</p>
		<div class="flex items-center gap-4">
			<a
				href="https://linkedin.com/in/emenn"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
				class="text-slate-500 transition-colors hover:text-slate-800 dark:hover:text-white"
			>
				<Linkedin size={20} />
			</a>
			<a
				href="https://instagram.com/super.emen"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Instagram"
				class="text-slate-500 transition-colors hover:text-slate-800 dark:hover:text-white"
			>
				<Instagram size={20} />
			</a>
		</div>
	</div>
</footer>
