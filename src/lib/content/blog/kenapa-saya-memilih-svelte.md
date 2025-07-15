---
title: 'Kenapa Saya Memilih Svelte untuk Proyek Pribadi'
date: '2024-07-15'
description: 'Sebuah pandangan tentang mengapa Svelte menjadi framework pilihan saya di tengah ramainya ekosistem JavaScript.'
---

Di dunia frontend yang penuh dengan pilihan seperti React, Vue, dan Angular, Svelte datang dengan pendekatan yang terasa segar dan berbeda. Setelah mencoba beberapa proyek, saya menemukan beberapa alasan kuat mengapa Svelte, dan SvelteKit, menjadi pilihan utama saya, terutama untuk proyek pribadi dan portofolio ini.

### 1. Less Code, More Power

Hal pertama yang paling terasa adalah betapa sedikitnya kode yang perlu kita tulis. Konsep reaktivitas Svelte yang berbasis pada _compile-time_ menghilangkan kebutuhan akan _boilerplate_ yang rumit. Tidak ada `useState`, `useEffect`, atau `useMemo`. Cukup deklarasikan variabel, dan Svelte akan mengurus sisanya.

```javascript
let count = 0;

function handleClick() {
	count += 1;
}
```

Sesederhana itu.

### 2. Performa Secepat Kilat

Svelte bukanlah framework dalam artian tradisional. Dia adalah sebuah _compiler_. Artinya, kode yang kita tulis tidak dikirim ke browser untuk diinterpretasikan. Sebaliknya, Svelte mengompilasi kode kita menjadi JavaScript vanilla yang sangat efisien saat proses _build_. Hasilnya? Tidak ada _virtual DOM diffing_ yang membebani browser, sehingga aplikasi terasa sangat cepat dan ringan.

### 3. Pengalaman Developer yang Menyenangkan

Menulis kode di Svelte terasa alami. Komponen Svelte pada dasarnya adalah file HTML yang kita tambahi tag `&lt;script&gt;` dan `&lt;style&gt;`. _Scoped styling_ (style yang hanya berlaku untuk komponen itu sendiri) sudah menjadi bawaan, jadi kita tidak perlu khawatir style akan bocor dan mengganggu komponen lain.

Itulah beberapa alasan utama saya. Bagaimana dengan Anda? Apa framework favorit Anda saat ini?
