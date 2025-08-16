export type Project = {
	title: string;
	description: string;
	year: number;
	tags: string[];
	url?: string;
	repo?: string;
	cover: string; // /public/images/*.jpg
};

export default <Project[]>[
	{
		title: 'AlignRx Tools',
		description:
			'Internal tools for pharmacies: data pipelines, dashboards, and workflow automation.',
		year: 2025,
		tags: ['Vue 3', 'C#', 'SQL', 'Bootstrap'],
		url: 'https://example.com',
		repo: 'https://github.com/austinbowdler',
		cover: '/images/alignrx.jpg',
	},
	// add more…
];
