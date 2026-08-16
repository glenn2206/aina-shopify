/**
 * products.ts — Katalog produk ANIA (satu sumber data).
 *
 * Dipakai bersama oleh:
 *   - MostPopular.astro (homepage)
 *   - ProductsSection.astro (halaman /products + filter)
 *   - ProductDetails.astro + pages/details/[slug].astro (halaman detail)
 */
import type { ImageMetadata } from 'astro';

import productHandful from '../assets/figma/product-handful.png';
import productBlush from '../assets/figma/product-blush.png';
import productSunshine from '../assets/figma/product-sunshine.png';
import productLove from '../assets/figma/product-love.png';
import productVibrant from '../assets/figma/product-vibrant.png';
import productRoseAllure from '../assets/figma/product-roseallure.png';
import productEternal from '../assets/figma/product-eternal.png';
import productVase from '../assets/figma/product-vase.png';
import productRouge from '../assets/figma/product-rouge.png';
import productRosegarden from '../assets/figma/product-rosegarden.png';

import thumbBlush from '../assets/figma/thumb-blush.png';
import thumbSunshine from '../assets/figma/thumb-sunshine.png';
import thumbLove from '../assets/figma/thumb-love.png';
import thumbLove2 from '../assets/figma/thumb-love2.png';
import thumbRoseAllure from '../assets/figma/thumb-roseallure.png';
import thumbPetal from '../assets/figma/thumb-petal.png';

export interface Product {
	slug: string;
	title: string;
	category: 'Bloom Box' | 'Premium Wrapped' | 'Standing Flower' | 'Preserved Flower' | 'Vase' | 'Accessories';
	price: number;
	priceOld?: number;
	badge?: 'Sale' | 'Sold Out';
	size: string;
	image: ImageMetadata;
	standardThumb: ImageMetadata;
	premiumThumb: ImageMetadata;
	gallery: { src: ImageMetadata; alt: string }[];
	occasions: string[];
	flowers: string[];
	description: string[];
}

/** Format harga → "Rp 950,000" */
export function formatPrice(value: number): string {
	return 'Rp ' + value.toLocaleString('en-US');
}

export function getProductBySlug(slug: string): Product | undefined {
	return products.find((p) => p.slug === slug);
}

/** Grup kategori untuk sidebar filter (label Figma + key produk). */
export const categoryFilterGroups: { label: string; key: Product['category'] }[] = [
	{ label: 'Bloom Box & Basket', key: 'Bloom Box' },
	{ label: 'Premium Wrapped Bloom', key: 'Premium Wrapped' },
	{ label: 'Standing Flower & Flower Board', key: 'Standing Flower' },
	{ label: 'Preserved Flower', key: 'Preserved Flower' },
	{ label: 'Vase Arrangement', key: 'Vase' },
	{ label: 'Accessories', key: 'Accessories' },
];

export const occasionOptions: string[] = [
	'Anniversary',
	'Birthday',
	'Graduation',
	'Newborn',
	'Congratulations',
	'Wedding',
	'Get Well Soon',
	'Condolences',
	'Corporate',
	'Seasonal',
	'Just Because',
];

export const flowerOptions: string[] = ['Rose', 'Carnation', 'Daisy', 'Hydrangea', 'Chrysanthemum', 'Sunflower', 'Orchid'];
export const products: Product[] = [
	{
		slug: 'a-handful-flower-box',
		title: 'A Handful Flower Box',
		category: 'Bloom Box',
		price: 950000,
		priceOld: 1250000,
		badge: 'Sale',
		size: 'Mini',
		image: productHandful,
		standardThumb: productHandful,
		premiumThumb: thumbBlush,
		gallery: [
			{ src: productHandful, alt: 'A Handful Flower Box ANIA — standard wrap' },
			{ src: thumbBlush, alt: 'A Handful Flower Box ANIA — premium wrap' },
			{ src: thumbPetal, alt: 'A Handful Flower Box ANIA — petal detail' },
			{ src: thumbLove, alt: 'A Handful Flower Box ANIA — detail' },
		],
		occasions: ['Birthday', 'Just Because', 'Congratulations'],
		flowers: ['Rose', 'Hydrangea', 'Chrysanthemum'],
		description: [
			'A Handful Flower Box is our signature Bloom Box — a compact burst of fresh blooms arranged with love in a hand-wrapped kraft box. Every petal is hand-picked each morning and arranged by our florists to create a gift that feels personal, warm, and effortless.',
			'The box is designed to make a statement without the fuss — easy to carry, easy to keep, and endlessly photographable. Whether it is a birthday, an apology, a thank-you, or a quiet Friday surprise, this little box says more than a thousand words.',
		],
	},
	{
		slug: 'blush-amethyst-orchestra',
		title: 'Blush Amethyst Orchestra',
		category: 'Premium Wrapped',
		price: 1250000,
		size: 'Standard',
		image: productBlush,
		standardThumb: productBlush,
		premiumThumb: thumbSunshine,
		gallery: [
			{ src: productBlush, alt: 'Blush Amethyst Orchestra ANIA' },
			{ src: thumbSunshine, alt: 'Blush Amethyst Orchestra ANIA — premium wrap' },
			{ src: thumbPetal, alt: 'Blush Amethyst Orchestra ANIA — petal detail' },
		],
		occasions: ['Wedding', 'Anniversary', 'Birthday'],
		flowers: ['Rose', 'Orchid', 'Carnation'],
		description: [
			'A soft symphony of blush roses and amethyst-toned blooms, hand-wrapped in our signature premium paper. Blush Amethyst Orchestra is a favorite for weddings and romantic milestones.',
			'Each stem is cut at the perfect angle and conditioned for maximum vase life, so the arrangement stays picture-perfect long after the celebration ends.',
		],
	},
	{
		slug: 'hello-sunshine',
		title: 'Hello Sunshine',
		category: 'Premium Wrapped',
		price: 1000000,
		badge: 'Sold Out',
		size: 'Standard',
		image: productSunshine,
		standardThumb: productSunshine,
		premiumThumb: thumbLove,
		gallery: [
			{ src: productSunshine, alt: 'Hello Sunshine ANIA' },
			{ src: thumbLove, alt: 'Hello Sunshine ANIA — premium wrap' },
			{ src: thumbSunshine, alt: 'Hello Sunshine ANIA — sunflower detail' },
		],
		occasions: ['Birthday', 'Get Well Soon', 'Congratulations'],
		flowers: ['Sunflower', 'Daisy'],
		description: [
			'A radiant bouquet built around cheerful sunflowers and crisp daisies, wrapped in sunny tones that instantly brighten any room — and any mood.',
			'Perfect for a new home, a new job, or simply a day that deserves a little more color. Hello Sunshine is our go-to gift for putting a smile on someone’s face.',
		],
	},

	{
		slug: 'love-symphony',
		title: 'Love Symphony',
		category: 'Premium Wrapped',
		price: 700000,
		priceOld: 950000,
		badge: 'Sale',
		size: 'Mini',
		image: productLove,
		standardThumb: productLove,
		premiumThumb: thumbLove2,
		gallery: [
			{ src: productLove, alt: 'Love Symphony ANIA' },
			{ src: thumbLove2, alt: 'Love Symphony ANIA — premium wrap' },
			{ src: thumbLove, alt: 'Love Symphony ANIA — detail' },
		],
		occasions: ['Anniversary', 'Just Because', 'Wedding'],
		flowers: ['Rose', 'Carnation'],
		description: [
			'Love Symphony brings together velvety roses and delicate carnations in a romantic palette of pinks and cream. A timeless melody of color, wrapped with a satin ribbon.',
			'A compact arrangement that fits beautifully on a desk or bedside table — ideal for expressing feelings words sometimes fail to capture.',
		],
	},
	{
		slug: 'vibrant-longevity',
		title: 'Vibrant Longevity',
		category: 'Vase',
		price: 1950000,
		size: 'Large',
		image: productVibrant,
		standardThumb: productVibrant,
		premiumThumb: thumbPetal,
		gallery: [
			{ src: productVibrant, alt: 'Vibrant Longevity ANIA' },
			{ src: thumbPetal, alt: 'Vibrant Longevity ANIA — detail' },
			{ src: thumbSunshine, alt: 'Vibrant Longevity ANIA — accent' },
		],
		occasions: ['Corporate', 'Congratulations'],
		flowers: ['Chrysanthemum', 'Carnation', 'Hydrangea'],
		description: [
			'A lush, long-lasting vase arrangement featuring chrysanthemums, carnations, and hydrangea in a vibrant mix. Built to hold its beauty for weeks.',
			'The perfect statement piece for office lobbies, grand openings, and celebrations that deserve a little extra staying power.',
		],
	},
	{
		slug: 'rose-allure',
		title: 'Rose Allure',
		category: 'Preserved Flower',
		price: 1250000,
		size: 'Standard',
		image: productRoseAllure,
		standardThumb: productRoseAllure,
		premiumThumb: thumbRoseAllure,
		gallery: [
			{ src: productRoseAllure, alt: 'Rose Allure ANIA' },
			{ src: thumbRoseAllure, alt: 'Rose Allure ANIA — premium wrap' },
			{ src: thumbLove, alt: 'Rose Allure ANIA — detail' },
		],
		occasions: ['Anniversary', 'Birthday', 'Wedding'],
		flowers: ['Rose', 'Hydrangea'],
		description: [
			'Preserved roses that keep their shape, color, and softness for up to a year — no water, no fuss, just enduring elegance.',
			'Rose Allure is presented in our signature box with a handwritten card, making it the ultimate long-lasting keepsake gift.',
		],
	},

	{
		slug: 'eternal-grace',
		title: 'Eternal Grace',
		category: 'Standing Flower',
		price: 2050000,
		badge: 'Sold Out',
		size: 'Large',
		image: productEternal,
		standardThumb: productEternal,
		premiumThumb: thumbLove2,
		gallery: [
			{ src: productEternal, alt: 'Eternal Grace ANIA' },
			{ src: thumbLove2, alt: 'Eternal Grace ANIA — detail' },
		],
		occasions: ['Corporate', 'Condolences', 'Get Well Soon'],
		flowers: ['Orchid', 'Chrysanthemum'],
		description: [
			'A grand standing flower arrangement crafted with orchids and chrysanthemums — tall, graceful, and made to be noticed from across the room.',
			'Each tier is balanced by hand so the structure stays elegant from every angle. Ideal for lobbies, ceremonies, and meaningful gestures.',
		],
	},
	{
		slug: 'vase-ceramic-premium-neck-motif',
		title: 'Vase Ceramic Premium Neck Motif',
		category: 'Accessories',
		price: 350000,
		size: 'Standard',
		image: productVase,
		standardThumb: thumbPetal,
		premiumThumb: thumbPetal,
		gallery: [
			{ src: productVase, alt: 'Vase Ceramic Premium Neck Motif ANIA' },
			{ src: thumbPetal, alt: 'Vase Ceramic Premium Neck Motif ANIA — detail' },
		],
		occasions: ['Seasonal', 'Corporate'],
		flowers: ['Daisy', 'Carnation'],
		description: [
			'A hand-finished ceramic vase with a premium neck motif — a timeless home accessory that pairs beautifully with any ANIA arrangement.',
			'Generously sized and weighted for stability, this vase is as lovely on its own as it is with a fresh or preserved bouquet inside.',
		],
	},

	{
		slug: 'rouge-allure',
		title: 'Rouge Allure',
		category: 'Premium Wrapped',
		price: 1350000,
		size: 'Standard',
		image: productRouge,
		standardThumb: productRouge,
		premiumThumb: thumbRoseAllure,
		gallery: [
			{ src: productRouge, alt: 'Rouge Allure ANIA' },
			{ src: thumbRoseAllure, alt: 'Rouge Allure ANIA — premium wrap' },
			{ src: thumbLove, alt: 'Rouge Allure ANIA — detail' },
		],
		occasions: ['Anniversary', 'Just Because', 'Birthday'],
		flowers: ['Rose'],
		description: [
			'Deep crimson roses wrapped in a moody, elegant palette — Rouge Allure is for moments that call for passion and drama.',
			'Hand-tied with a velvet ribbon and finished with a sealed greeting card, this bouquet makes an unforgettable entrance.',
		],
	},
	{
		slug: 'rose-garden',
		title: 'Rose Garden',
		category: 'Preserved Flower',
		price: 1500000,
		size: 'Medium',
		image: productRosegarden,
		standardThumb: productRosegarden,
		premiumThumb: thumbBlush,
		gallery: [
			{ src: productRosegarden, alt: 'Rose Garden ANIA' },
			{ src: thumbBlush, alt: 'Rose Garden ANIA — premium wrap' },
			{ src: thumbPetal, alt: 'Rose Garden ANIA — detail' },
		],
		occasions: ['Wedding', 'Birthday', 'Anniversary'],
		flowers: ['Rose', 'Daisy', 'Hydrangea'],
		description: [
			'A lush preserved garden of roses, daisies, and hydrangea that stays beautiful for a year — the gift that keeps blooming.',
			'Arranged in a keepsake box with optional personalization, Rose Garden turns any celebration into a lasting memory.',
		],
	},
];

