<script lang="ts">
	// Svelte 5 — no heavy JS needed for this static page
	import {
		ChartBar,
		Gauge,
		BarChart2,
		Settings,
		Shield,
		MessageSquare,
		CheckCircle,
		ChevronDown
	} from '@lucide/svelte';

	// Services data - improved structure
	const services = [
		{
			icon: ChartBar,
			title: 'Dashboard Looker Studio',
			desc: 'Rancang, bangun, dan optimasi dashboard interaktif untuk marketing, sales, dan operasional.',
			points: [
				'KPI mapping & data contracts',
				'Custom theme, filter, dan controls',
				'Auto-refresh & scheduled email reports'
			]
		},
		{
			icon: ChartBar,
			title: 'Data Visualization',
			desc: 'Ubah data mentah jadi visual yang jelas dan bisa diambil keputusannya dengan cepat.',
			points: [
				'Exploratory charts & trend analysis',
				'Storytelling layout yang engaging',
				'Design system yang konsisten'
			]
		},
		{
			icon: Gauge,
			title: 'Analytics & Insight',
			desc: 'Analisis mendalam untuk tren, anomali, dan peluang bisnis: dari funnel sampai cohort.',
			points: [
				'Problem framing yang tepat sasaran',
				'Hypothesis-driven analysis',
				'Actionable recommendations'
			]
		},
		{
			icon: Settings,
			title: 'Data Pipeline (Lightweight)',
			desc: 'ETL ringan untuk Sheet → Looker Studio tanpa setup yang ribet.',
			points: [
				'Automated connector & scheduling',
				'Data quality checks & validation',
				'Versioned data models'
			]
		}
	];

	const steps = [
		{
			n: 1,
			title: 'Discovery',
			text: 'Audit singkat data sources dan tujuan bisnis. Tentukan KPI utama dan prioritas dashboard.'
		},
		{
			n: 2,
			title: 'NDA Sign',
			text: 'Tanda Tangan Non-Disclosure Agreement jika dibutuhkan.'
		},
		{
			n: 3,
			title: 'Design & Build',
			text: 'Design Dashboard dan Setup data connection, implementasi data model, dan build dashboard sesuai design.'
		},
		{
			n: 4,
			title: 'Review',
			text: 'User acceptance testing bersama tim, iterasi cepat, dan dokumentasi penggunaan.'
		},
		{
			n: 5,
			title: 'Handover',
			text: 'Training penggunaan dashboard, video walkthrough, dan opsi maintenance support.'
		}
	];

	const faqs = [
		{
			q: 'Berapa lama waktu pengerjaan 1 dashboard?',
			a: 'Rata-rata 5–10 hari kerja tergantung jumlah data sources dan kompleksitas KPI yang dibutuhkan. Dashboard sederhana bisa 3-5 hari, yang kompleks sampai 2 minggu.'
		},
		{
			q: 'Bisa bekerja dengan data sensitif perusahaan?',
			a: 'Bisa. Saya menggunakan akses terbatas, data masking untuk field sensitif, dan hanya mengambil data yang benar-benar diperlukan untuk dashboard.'
		},
		{
			q: 'Kalau belum punya BigQuery atau data warehouse?',
			a: 'Tidak masalah! Bisa mulai dari Google Sheets atau database sederhana dulu. Nanti bisa di-scale ke BigQuery saat bisnis sudah berkembang.'
		},
		{
			q: 'Apakah termasuk training tim untuk menggunakan dashboard?',
			a: 'Ya, termasuk session training dan video tutorial. Tim akan diajari cara baca dashboard, filter data, dan troubleshooting basic.'
		},
		{
			q: 'Bagaimana dengan maintenance dan update dashboard?',
			a: 'Ada opsi maintenance contract atau bisa one-time update. Biasanya dashboard stabil dan minimal maintenance, kecuali ada perubahan business logic.'
		}
	];

	// Contact functions
	const whatsapp = (msg = 'Halo, saya mau konsultasi layanan dashboard dan visualisasi data.') =>
		`https://wa.me/6281945140191?text=${encodeURIComponent(msg)}`;

	const email = 'halo@emen.web.id';

	// FAQ state management
	let openFaq = -1;

	const toggleFaq = (index: number) => {
		openFaq = openFaq === index ? -1 : index;
	};
</script>

<svelte:head>
	<title>Layanan Dashboard Looker Studio & Data Visualization | Emen</title>
	<meta
		name="description"
		content="Layanan profesional pembuatan dashboard Looker Studio, visualisasi data, dan analisis bisnis. Bantu tim Anda mengambil keputusan lebih cepat dengan data yang jelas dan actionable."
	/>
	<meta
		name="keywords"
		content="dashboard looker studio, data visualization, business intelligence, analytics indonesia"
	/>

	<!-- Open Graph -->
	<meta property="og:title" content="Layanan Dashboard Looker Studio & Data Visualization" />
	<meta
		property="og:description"
		content="Dashboard yang jelas, keputusan yang tepat. Layanan profesional untuk UMKM sampai Enterprise."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="id_ID" />

	<!-- Preconnect for performance -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

	<!-- Structured Data -->
	<script type="application/ld+json">
		{JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Service',
			name: 'Dashboard Looker Studio & Data Visualization Services',
			description: 'Layanan profesional pembuatan dashboard interaktif dan visualisasi data untuk keputusan bisnis yang lebih cepat dan tepat.',
			provider: {
				'@type': 'Person',
				name: 'Irfan Mursyidin',
				email: 'halo@emen.web.id',
				telephone: '+6281945140191'
			},
			areaServed: {
				'@type': 'Country',
				name: 'Indonesia'
			},
			offers: [
				{
					'@type': 'Offer',
					name: 'Starter Package',
					description: 'Dashboard inti untuk UMKM dengan single data source',
					priceSpecification: {
						'@type': 'PriceSpecification',
						price: '3500000',
						priceCurrency: 'IDR',
						valueAddedTaxIncluded: false
					}
				},
				{
					'@type': 'Offer',
					name: 'Growth Package',
					description: 'Multiple dashboard untuk SME dengan multi data sources',
					priceSpecification: {
						'@type': 'PriceSpecification',
						price: '7500000',
						priceCurrency: 'IDR',
						valueAddedTaxIncluded: false
					}
				}
			]
		})}
	</script>
</svelte:head>

<!-- HERO SECTION -->
<section class="relative isolate overflow-hidden">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="grid items-center gap-8 py-16 sm:py-20 lg:grid-cols-12 lg:py-24">
			<!-- Content -->
			<div class="lg:col-span-6">
				<h1
					class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white"
				>
					Data Jelas, <span class="text-blue-600">Keputusan Tepat</span>
				</h1>
				<p class="mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-white">
					Membantu Anda memahami performa bisnis dengan cepat melalui Visualisasi Data dan Dashboard
					interaktif
				</p>

				<!-- CTA Buttons -->
				<div class="mt-8 flex flex-wrap gap-4">
					<a
						href={whatsapp()}
						class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					>
						<MessageSquare class="size-5" />
						Konsultasi Gratis
					</a>
					<a
						href="https://lookerstudio.google.com/s/jNQFNSu2S0Q"
						class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:text-white"
					>
						<ChartBar class="size-5" />
						Lihat Contoh Dashboard
					</a>
				</div>

				<!-- Stats -->
				<div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div class="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
						<div class="text-2xl font-bold text-gray-900">Actionable</div>
						<div class="text-sm text-gray-600">Insight - Not Just Numbers</div>
					</div>
					<div class="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
						<div class="text-2xl font-bold text-gray-900">5–10 Hari</div>
						<div class="text-sm text-gray-600">Average Delivery</div>
					</div>
				</div>
			</div>

			<!-- Hero Image -->
			<div class="lg:col-span-6">
				<div class="relative">
					<picture>
						<source srcset="/images/services/hero-dashboard.webp" type="image/webp" />
						<img
							src="/images/services/hero-dashboard.webp"
							alt="Contoh dashboard marketing dan sales dengan KPI real-time, chart interaktif, dan filter yang mudah digunakan"
							loading="eager"
							decoding="async"
							class="w-full rounded-2xl border border-gray-200 shadow-xl"
							width="800"
							height="600"
						/>
					</picture>
					<!-- Floating badges -->
					<div
						class="absolute -bottom-4 -left-4 rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-800 shadow-lg"
					>
						✅ Real-time Data
					</div>
					<div
						class="absolute -top-4 -right-4 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-800 shadow-lg"
					>
						🚀 5 Detik Load Time
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- WHY DASHBOARD SECTION -->
<section class="py-16 sm:py-20 dark:bg-gray-800">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
				Kenapa Bisnis Butuh Dashboard?
			</h2>
			<p class="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
				Dari spreadsheet manual ke insight real-time yang menggerakkan bisnis
			</p>
		</div>

		<div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<div class="text-center">
				<div
					class="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900"
				>
					<svg
						class="size-8 text-green-600 dark:text-green-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
				</div>
				<h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100">
					Monitor Real-Time
				</h3>
				<p class="mt-2 text-gray-600 dark:text-gray-400">
					Pantau performa bisnis setiap saat. Tidak perlu menunggu laporan bulanan untuk tahu ada
					yang salah.
				</p>
			</div>

			<div class="text-center">
				<div
					class="mx-auto flex size-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900"
				>
					<svg
						class="size-8 text-blue-600 dark:text-blue-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
						/>
					</svg>
				</div>
				<h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100">
					Keputusan Lebih Cepat
				</h3>
				<p class="mt-2 text-gray-600 dark:text-gray-400">
					Dari "feeling" ke data-driven decision. Lihat trend, identifikasi masalah, ambil tindakan
					dalam hitungan menit.
				</p>
			</div>

			<div class="text-center">
				<div
					class="mx-auto flex size-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900"
				>
					<svg
						class="size-8 text-purple-600 dark:text-purple-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
						/>
					</svg>
				</div>
				<h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100">Adaptasi Cepat</h3>
				<p class="mt-2 text-gray-600 dark:text-gray-400">
					Respon perubahan pasar dengan cepat. Pivot strategi marketing atau operasional berdasarkan
					data terkini.
				</p>
			</div>

			<div class="text-center">
				<div
					class="mx-auto flex size-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900"
				>
					<svg
						class="size-8 text-orange-600 dark:text-orange-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
						/>
					</svg>
				</div>
				<h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100">Data Terpercaya</h3>
				<p class="mt-2 text-gray-600 dark:text-gray-400">
					Hindari human error dari manual reporting. Satu source of truth untuk seluruh tim.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- SERVICES SECTION -->
<section class="bg-gray-50 py-16 sm:py-20 dark:bg-gray-900">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
				Layanan Utama
			</h2>
			<p class="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
				Paket fleksibel yang bisa disesuaikan dengan kebutuhan, mulai dari UMKM sampai Enterprise
			</p>
		</div>

		<div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each services as service, index}
				<article
					class="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
				>
					<!-- Icon -->
					<div
						class="flex size-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900 dark:text-blue-400"
					>
						<service.icon class="size-6" aria-hidden="true" />
					</div>

					<!-- Content -->
					<h3 class="mt-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
						{service.title}
					</h3>
					<p class="mt-2 leading-7 text-gray-600 dark:text-gray-400">{service.desc}</p>

					<!-- Feature list -->
					<ul class="mt-6 space-y-3" role="list">
						{#each service.points as point}
							<li class="flex items-start gap-3">
								<CheckCircle class="mt-0.5 size-5 shrink-0 text-green-500" aria-hidden="true" />
								<span class="text-sm text-gray-700 dark:text-gray-300">{point}</span>
							</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- WORKFLOW SECTION -->
<section class="py-16 sm:py-20 dark:bg-gray-800">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
				Workflow Pengerjaan
			</h2>
			<p class="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
				Proses yang ringkas, transparan, dan bisa dipantau progress-nya
			</p>
		</div>

		<div class="mt-16">
			<ol class="grid gap-8 sm:grid-cols-2 lg:grid-cols-5" role="list">
				{#each steps as step}
					<li class="relative">
						<!-- Connection line -->
						{#if step.n < 5}
							<div
								class="absolute top-8 left-8 hidden h-0.5 w-full bg-gradient-to-r from-blue-600 to-blue-300 lg:block"
								aria-hidden="true"
							></div>
						{/if}

						<div
							class="group relative rounded-2xl border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
						>
							<!-- Step number -->
							<div class="flex items-center gap-4">
								<div
									class="flex size-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white transition-transform duration-300 group-hover:scale-110"
								>
									{step.n}
								</div>
								<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{step.title}</h3>
							</div>
							<p class="mt-4 leading-6 text-gray-600 dark:text-gray-400">{step.text}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<!-- PRICING SECTION -->
<section class="bg-gray-50 py-16 sm:py-20 dark:bg-gray-900">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
				Paket & Estimasi Harga
			</h2>
			<p class="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
				Harga transparan—detail final akan dibahas setelah discovery call
			</p>
		</div>

		<div class="mt-16 grid gap-8 lg:grid-cols-3">
			<!-- Starter Package -->
			<div
				class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Starter</h3>
				<p class="mt-2 text-gray-600 dark:text-gray-400">
					Ideal untuk UMKM dengan single data source
				</p>
				<div class="mt-6">
					<span class="text-4xl font-bold text-gray-900 dark:text-gray-100">Rp 3,5 jt</span>
					<span class="text-gray-600 dark:text-gray-400">+</span>
				</div>
				<ul class="mt-8 space-y-4" role="list">
					<li class="flex items-start gap-3">
						<CheckCircle class="mt-0.5 size-5 shrink-0 text-green-500" />
						<span class="text-gray-700 dark:text-gray-300">1 dashboard inti dengan 5-8 KPI</span>
					</li>
					<li class="flex items-start gap-3">
						<CheckCircle class="mt-0.5 size-5 shrink-0 text-green-500" />
						<span class="text-gray-700 dark:text-gray-300">Google Sheets atau GA4 integration</span>
					</li>
					<li class="flex items-start gap-3">
						<CheckCircle class="mt-0.5 size-5 shrink-0 text-green-500" />
						<span class="text-gray-700 dark:text-gray-300">1 kali major revision</span>
					</li>
					<li class="flex items-start gap-3">
						<CheckCircle class="mt-0.5 size-5 shrink-0 text-green-500" />
						<span class="text-gray-700 dark:text-gray-300">Basic training & dokumentasi</span>
					</li>
				</ul>
				<a
					href={whatsapp('Halo, saya tertarik dengan paket Starter untuk dashboard bisnis.')}
					class="mt-8 block w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					Diskusi Paket Starter
				</a>
			</div>

			<!-- Growth Package - Popular -->
			<div
				class="relative rounded-2xl border-2 border-blue-600 bg-white p-8 shadow-lg dark:bg-gray-800"
			>
				<div class="absolute -top-4 left-1/2 -translate-x-1/2">
					<span
						class="inline-flex rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white"
						>Most Popular</span
					>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Growth</h3>
				<p class="mt-2 text-gray-600 dark:text-gray-400">
					Perfect untuk SME dengan multi data sources
				</p>
				<div class="mt-6">
					<span class="text-4xl font-bold text-gray-900 dark:text-gray-100">Rp 7,5 jt</span>
					<span class="text-gray-600 dark:text-gray-400">+</span>
				</div>
				<ul class="mt-8 space-y-4" role="list">
					<li class="flex items-start gap-3">
						<CheckCircle class="mt-0.5 size-5 shrink-0 text-green-500" />
						<span class="text-gray-700 dark:text-gray-300"
							>2-3 dashboard dengan role-based access</span
						>
					</li>
					<li class="flex items-start gap-3">
						<CheckCircle class="mt-0.5 size-5 shrink-0 text-green-500" />
						<span class="text-gray-700 dark:text-gray-300"
							>Google Sheets + BigQuery integration</span
						>
					</li>
					<li class="flex items-start gap-3">
						<CheckCircle class="mt-0.5 size-5 shrink-0 text-green-500" />
						<span class="text-gray-700 dark:text-gray-300"
							>2 kali major revision + minor tweaks</span
						>
					</li>
					<li class="flex items-start gap-3">
						<CheckCircle class="mt-0.5 size-5 shrink-0 text-green-500" />
						<span class="text-gray-700 dark:text-gray-300">Advanced training + video tutorials</span
						>
					</li>
					<li class="flex items-start gap-3">
						<CheckCircle class="mt-0.5 size-5 shrink-0 text-green-500" />
						<span class="text-gray-700 dark:text-gray-300">1 bulan support gratis</span>
					</li>
				</ul>
				<a
					href={whatsapp('Halo, saya tertarik dengan paket Growth untuk dashboard multi-platform.')}
					class="mt-8 block w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					Diskusi Paket Growth
				</a>
			</div>

			<!-- Custom Package -->
			<div
				class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Custom</h3>
				<p class="mt-2 text-gray-600 dark:text-gray-400">
					Enterprise solution dengan advanced features
				</p>
				<div class="mt-6">
					<span class="text-4xl font-bold text-gray-900 dark:text-gray-100">Custom</span>
					<span class="text-base text-gray-600 dark:text-gray-400"> quote</span>
				</div>
				<ul class="mt-8 space-y-4" role="list">
					<li class="flex items-start gap-3">
						<CheckCircle class="mt-0.5 size-5 shrink-0 text-green-500" />
						<span class="text-gray-700 dark:text-gray-300">Unlimited dashboards & data sources</span
						>
					</li>
					<li class="flex items-start gap-3">
						<CheckCircle class="mt-0.5 size-5 shrink-0 text-green-500" />
						<span class="text-gray-700 dark:text-gray-300">Advanced role-based access control</span>
					</li>
					<li class="flex items-start gap-3">
						<CheckCircle class="mt-0.5 size-5 shrink-0 text-green-500" />
						<span class="text-gray-700 dark:text-gray-300">Custom data pipeline & automation</span>
					</li>
					<li class="flex items-start gap-3">
						<CheckCircle class="mt-0.5 size-5 shrink-0 text-green-500" />
						<span class="text-gray-700 dark:text-gray-300">SLA agreement & priority support</span>
					</li>
					<li class="flex items-start gap-3">
						<CheckCircle class="mt-0.5 size-5 shrink-0 text-green-500" />
						<span class="text-gray-700 dark:text-gray-300">Ongoing maintenance contract</span>
					</li>
				</ul>
				<a
					href={whatsapp('Halo, saya ingin diskusi custom solution untuk enterprise dashboard.')}
					class="mt-8 block w-full rounded-lg bg-gray-900 px-4 py-3 text-center font-semibold text-white transition-colors duration-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
				>
					Diskusi Custom Solution
				</a>
			</div>
		</div>
	</div>
</section>

<!-- FAQ SECTION -->
<section class="py-16 sm:py-20 dark:bg-gray-800">
	<div class="mx-auto max-w-4xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
				Frequently Asked Questions
			</h2>
			<p class="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
				Jawaban untuk pertanyaan yang sering ditanyakan
			</p>
		</div>

		<div
			class="mt-16 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white shadow-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800"
		>
			{#each faqs as faq, index}
				<div class="p-6">
					<button
						class="flex w-full items-center justify-between text-left"
						aria-expanded={openFaq === index}
						aria-controls="faq-{index}"
						on:click={() => toggleFaq(index)}
					>
						<span class="pr-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{faq.q}</span>
						<ChevronDown
							class="size-6 shrink-0 text-gray-500 transition-transform duration-200 dark:text-gray-400 {openFaq ===
							index
								? 'rotate-180'
								: ''}"
							aria-hidden="true"
						/>
					</button>
					{#if openFaq === index}
						<div
							id="faq-{index}"
							class="mt-4 leading-7 text-gray-700 dark:text-gray-300"
							role="region"
							aria-labelledby="faq-button-{index}"
						>
							{faq.a}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- FINAL CTA SECTION -->
<section class="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 sm:py-20">
	<div class="mx-auto max-w-4xl px-6 text-center lg:px-8">
		<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
			Siap membuat dashboard yang membuat tim memahami data dalam 5 detik?
		</h2>
		<p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
			Kirim contoh data Anda (boleh dummy data), saya akan review dan berikan rekomendasi dashboard
			structure secara gratis.
		</p>

		<div class="mt-10 flex flex-wrap justify-center gap-4">
			<a
				href={whatsapp('Halo, saya mau kirim sample data untuk review gratis dashboard structure.')}
				class="inline-flex items-center gap-3 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			>
				<MessageSquare class="size-6" />
				WhatsApp Consultation
			</a>
			<a
				href="mailto:{email}"
				class="inline-flex items-center gap-3 rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
			>
				<svg class="size-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path
						d="M3 4a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 0h4.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 2H19a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm5 5a2 2 0 100 4 2 2 0 000-4zm5 2a1 1 0 100 2 1 1 0 000-2z"
					/>
				</svg>
				Email Me
			</a>
		</div>

		<!-- Contact info -->
		<div class="mt-12 text-center">
			<p class="text-gray-600">
				📧 {email} • 📱 +62 819-4514-0191
			</p>
		</div>
	</div>
</section>

<style>
	/* Smooth scrolling for better UX */
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Custom focus states for better accessibility */
	:global(:focus-visible) {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	/* Improved button hover states */
	:global(.group:hover .group-hover\:scale-110) {
		transform: scale(1.1);
	}
</style>
