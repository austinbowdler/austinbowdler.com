export type Project = {
	title: string;
	description: string;
	year: number;
	tags: string[];
	url?: string;
	repo?: string;
	cover: string; // path under /public or remote URL
	highlights?: string[];
	featured?: boolean;
};

/**
 * Add new projects by copying an existing entry and editing the fields.
 * `tags` are rendered as colored chips — any string works; known tags
 * get automatic brand colors (see components/ProjectCard.vue).
 *
 * Images go in /public/images and are referenced as "/images/<file>".
 */
export default <Project[]>[
	{
		title: 'AlignRx Tools',
		description:
			'Internal tools for pharmacies: data pipelines, dashboards, and workflow automation that keep the business running every day.',
		year: 2025,
		tags: ['Vue 3', 'C#', 'SQL', 'jQuery'],
		url: 'https://alignrx.org',
		cover: '/images/alignrx.jpg',
		highlights: [
			'Built and shipped multiple pharmacy-facing dashboards.',
			'Led a team delivering business-critical integrations.',
			'Owned the front-end stack transition to Vue 3.',
		],
		featured: true,
	},
	// ——— Add more projects below. Copy the block above as a template. ———
];
