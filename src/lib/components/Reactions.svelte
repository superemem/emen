<script>
	export let slug;

	// List emoji yang bisa dipakai
	const allowedEmojis = ['❤️', '👍', '😂', '🤯', '🤔'];

	// State & helpers
	let storageKey = '';
	let reactionCounts = {};
	let hasReacted = false;

	// Supaya hanya akses localStorage di browser, bukan SSR!
	function safelyGetLocalStorage(key) {
		if (typeof window !== 'undefined') {
			return localStorage.getItem(key);
		}
		return null;
	}
	function safelySetLocalStorage(key, value) {
		if (typeof window !== 'undefined') {
			localStorage.setItem(key, value);
		}
	}

	// Reaktif jika slug berubah
	$: storageKey = `reacted_${slug}`;

	// INIT state dari localStorage tiap slug berubah
	$: {
		// Init kosong dulu
		reactionCounts = {};
		for (const emoji of allowedEmojis) reactionCounts[emoji] = 0;

		const saved = safelyGetLocalStorage(storageKey);
		if (saved) {
			try {
				reactionCounts = JSON.parse(saved);
				hasReacted = true;
			} catch (err) {
				hasReacted = false;
				// kalau error parse, clear key-nya biar ga error lagi
				safelySetLocalStorage(storageKey, JSON.stringify(reactionCounts));
			}
		} else {
			hasReacted = false;
		}
	}

	function handleReactionClick(emoji) {
		if (hasReacted) return;
		reactionCounts = { ...reactionCounts, [emoji]: reactionCounts[emoji] + 1 };
		hasReacted = true;
		safelySetLocalStorage(storageKey, JSON.stringify(reactionCounts));
	}
</script>

<div class="reaction-wrapper" style="margin-top:2rem">
	{#if !hasReacted}
		{#each allowedEmojis as emoji}
			<button
				class="reaction-item"
				on:click={() => handleReactionClick(emoji)}
				title={`Beri reaksi ${emoji}`}
			>
				<span class="emoji-char">{emoji}</span>
				<span class="count">{reactionCounts[emoji]}</span>
			</button>
		{/each}
	{:else}
		<p class="mb-2 text-sm text-slate-500">Terima kasih sudah memberi reaksi!</p>
		<div>
			{#each allowedEmojis as emoji}
				<span style="margin-right:1rem">
					{emoji} <small>({reactionCounts[emoji]})</small>
				</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	.reaction-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
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
		transition: all 0.2s ease-in-out;
		margin: 0 0.5rem;
	}
	.reaction-item:hover {
		transform: translateY(-2px) scale(1.05);
		border-color: #94a3b8;
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
