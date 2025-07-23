<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient.js';

	export let slug;

	// 1. Definisikan emoji yang diizinkan untuk reaksi
	const allowedEmojis = ['❤️', '👍', '😂', '🤯', '🤔'];

	// State untuk menyimpan jumlah: { '❤️': 10, '👍': 5, '😂': 0, ... }
	let reactionCounts = {};
	let hasReacted = false;
	let isLoading = true;

	const storageKey = `reacted_${slug}`;

	onMount(async () => {
		// Cek localStorage apakah user sudah pernah bereaksi di post ini
		if (localStorage.getItem(storageKey)) {
			hasReacted = true;
		}

		// Ambil data reaksi dari Supabase
		const { data } = await supabase.from('reactions').select('emoji, count').eq('slug', slug);

		// Inisialisasi hitungan awal untuk semua emoji yang diizinkan
		const counts = {};
		for (const emoji of allowedEmojis) {
			counts[emoji] = 0; // Set semua ke 0 dulu
		}

		// Update hitungan berdasarkan data dari Supabase
		if (data) {
			for (const item of data) {
				// Pastikan hanya emoji yang ada di `allowedEmojis` yang dihitung
				if (counts.hasOwnProperty(item.emoji)) {
					counts[item.emoji] = item.count;
				}
			}
		}

		reactionCounts = counts;
		isLoading = false;
	});

	// GANTI FUNGSI INI
	async function handleReactionClick(emoji) {
		console.log('React:', { slug, emoji });
		if (hasReacted || isLoading) return;
		hasReacted = true;
		localStorage.setItem(storageKey, 'true');
		reactionCounts = { ...reactionCounts, [emoji]: reactionCounts[emoji] + 1 };

		const { error, data } = await supabase.rpc('react_emoji', { p_slug: slug, p_emoji: emoji });
		if (error) {
			console.error('Gagal mengirim reaksi:', error);
			reactionCounts = { ...reactionCounts, [emoji]: reactionCounts[emoji] - 1 };
			hasReacted = false;
			localStorage.removeItem(storageKey);
			alert('Gagal react: ' + error.message);
		} else {
			console.log('RPC sukses:', data);
		}
	}
</script>

<div class="reaction-wrapper">
	{#if isLoading}
		<p class="text-slate-500 dark:text-slate-400">Memuat reaksi...</p>
	{:else}
		{#each allowedEmojis as emoji}
			<button
				class="reaction-item"
				on:click={() => handleReactionClick(emoji)}
				disabled={hasReacted}
				title={hasReacted ? 'Anda sudah memberi reaksi' : `Beri reaksi ${emoji}`}
			>
				<span class="emoji-char">{emoji}</span>
				<span class="count">{reactionCounts[emoji]}</span>
			</button>
		{/each}
	{/if}
</div>

<style>
	.reaction-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.75rem; /* 12px */
		flex-wrap: wrap;
	}
	.reaction-item {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background-color: #f1f5f9; /* slate-100 */
		border: 1px solid #e2e8f0; /* slate-200 */
		padding: 6px 14px;
		border-radius: 20px;
		font-family: sans-serif;
		transition: all 0.2s ease-in-out;
	}
	.dark .reaction-item {
		background-color: #334155; /* slate-700 */
		border-color: #475569; /* slate-600 */
	}

	/* Styling saat belum di-disable */
	.reaction-item:not(:disabled) {
		cursor: pointer;
	}
	.reaction-item:not(:disabled):hover {
		transform: translateY(-2px) scale(1.05);
		border-color: #94a3b8; /* slate-400 */
	}
	.dark .reaction-item:not(:disabled):hover {
		border-color: #64748b; /* slate-500 */
	}

	/* Styling saat sudah di-disable (sudah vote) */
	.reaction-item:disabled {
		cursor: not-allowed;
		opacity: 0.8;
	}

	.emoji-char {
		font-size: 1.1rem; /* 18px */
		line-height: 1;
	}
	.count {
		font-size: 0.875rem; /* 14px */
		font-weight: 500;
		color: #475569; /* slate-600 */
	}
	.dark .count {
		color: #cbd5e1; /* slate-300 */
	}
</style>
