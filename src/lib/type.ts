// File: src/lib/types.ts

// Tipe untuk data pengalaman kerja
export interface Experience {
	title: string;
	jobTitle: string;
	period: string;
	details: string;
}

// Tipe untuk data pendidikan
export interface Education {
	school: string;
	degree: string;
	period: string;
}

// Tipe untuk metadata Proyek & Blog
export interface Post {
	slug: string;
	title: string;
	date: string;
	description: string;
}

export interface Project {
	slug: string;
	title: string;
	year: number;
	tags: string[];
	image: string;
	description?: string; // Deskripsi singkat ini opsional
}
