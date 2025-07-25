<script>
	import { supabase } from '$lib/supabaseClient.js'; // Atur path sesuai projectmu
	export let slug;

	// Daftar emoji yang boleh direaksi user
	const allowedEmojis = ['❤️', '👍', '😂', '🤯', '🤔'];
	let reactionCounts = {};
	let isLoading = true;
	let hasReacted = false;
	$: storageKey = `reacted_${slug}`;

	// Ambil data reaksi ketika slug berubah
	$: if (slug) fetchReactions();

	$: console.log('[DEBUG] Reactions slug:', slug);

	async function fetchReactions() {
		isLoading = true;
		console.log('[DEBUG] Mulai fetch reaction', slug);
		const base = {};
		for (const emoji of allowedEmojis) base[emoji] = 0;
		reactionCounts = base;

		const { data, error } = await supabase
			.from('reactions')
			.select('emoji, count')
			.eq('slug', slug);

		console.log('[DEBUG] Hasil query:', { data, error });

		if (error) {
			console.error('[DEBUG] ERROR fetchReactions:', error);
			isLoading = false;
			return;
		}

		if (data) {
			for (const item of data) {
				if (reactionCounts.hasOwnProperty(item.emoji)) {
					reactionCounts[item.emoji] = item.count;
				}
			}
		}
		isLoading = false;
		console.log('[DEBUG] isLoading after fetch:', isLoading);
	}

	async function handleReactionClick(emoji) {
		if (hasReacted || isLoading) return;

		hasReacted = true;
		if (typeof window !== 'undefined') localStorage.setItem(storageKey, 'true');
		reactionCounts = { ...reactionCounts, [emoji]: reactionCounts[emoji] + 1 };

		// Kirim increment ke Supabase pakai RPC function
		const { error } = await supabase.rpc('increment_reaction', {
			p_slug: slug,
			p_emoji: emoji
		});

		if (error) {
			reactionCounts = { ...reactionCounts, [emoji]: reactionCounts[emoji] - 1 };
			hasReacted = false;
			if (typeof window !== 'undefined') localStorage.removeItem(storageKey);
			alert('Gagal mengirim reaksi: ' + error.message);
		} else {
			// Fetch ulang biar count pasti akurat (opsional)
			fetchReactions();
		}
	}
</script>

<div class="reaction-wrapper" style="margin-top:2rem">
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
		{#if hasReacted}
			<p class="mt-2 text-sm text-slate-500">Terima kasih sudah memberi reaksi!</p>
		{/if}
	{/if}
</div>

<style>
	.reaction-wrapper {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		justify-content: center;
	}
	.reaction-item {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background-color: #f1f5f9;
		border: 1px solid #e2e8f0;
		padding: 6px 14px;
		border-radius: 20px;
		font-family: sans-serif;
		transition: all 0.2s;
		font-size: 1rem;
	}
	.reaction-item:not(:disabled):hover {
		transform: translateY(-2px) scale(1.05);
		border-color: #94a3b8;
		background-color: #e0e7ef;
		cursor: pointer;
	}
	.reaction-item:disabled {
		cursor: not-allowed;
		opacity: 0.75;
	}
	.emoji-char {
		font-size: 1.1rem;
		line-height: 1;
	}
	.count {
		font-size: 0.875rem;
		font-weight: 500;
		color: #475569;
	}
</style>
