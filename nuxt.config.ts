// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	modules: [
		'@nuxtjs/tailwindcss',
		// move module options into the tuple to avoid an unknown top-level `image` key
		['@nuxt/image-edge', { format: ['webp', 'avif'] }],
		'@vueuse/motion/nuxt',
		// Using Font Awesome via plugin; removed unplugin-icons
	],
	app: {
		head: {
			title: 'Austin Bowdler — Web Developer',
			meta: [
				{
					name: 'description',
					content:
						'Web software developer & designer. Selected projects and contact.',
				},
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ property: 'og:title', content: 'Austin Bowdler — Portfolio' },
				{ property: 'og:type', content: 'website' },
			],
			link: [
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{
					rel: 'preconnect',
					href: 'https://fonts.gstatic.com',
					crossorigin: '',
				},
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap',
				},
				// custom favicon (SVG adapts to OS dark/light; ICO is fallback).
				// `?v=2` busts the old Nuxt-default favicon cached in browsers.
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=2' },
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
			],
		},
	},
	routeRules: { '/**': { prerender: true } },
});
