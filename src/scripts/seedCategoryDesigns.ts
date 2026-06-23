/**
 * Seed ~5 sample design templates per MAIN design-template category,
 * spread across each category's subcategories. Also re-assigns any existing
 * designs whose category link is broken/missing to a valid subcategory.
 *
 * SAFE TO RE-RUN: every design this script creates is tagged 'auto-seed'.
 * On each run it first deletes only 'auto-seed' designs, then recreates them,
 * so it never touches real (owner-created) designs and never duplicates.
 *
 * Run from backend root:  npx ts-node-dev --transpile-only src/scripts/seedCategoryDesigns.ts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

import { Category } from '../app/modules/category/category.model';
import { DesignTemplate } from '../app/modules/designTemplate/designTemplate.model';
import { User } from '../app/modules/user/user.model';

const MONGO_URI = process.env.DATABASE_URL as string;
const SEED_TAG = 'auto-seed';
const PER_CATEGORY = 5;

const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`;

// Known-good Unsplash photo IDs (reused from the project's existing seeds) per main category.
const IMAGE_POOL: Record<string, string[]> = {
    'brand-identity': ['1626785774573-4b799315345d', '1614680376593-902f74cf0d41', '1611532736597-de2d4265fba3', '1589829545856-d10d557cf95f', '1557804506-669a67965ba0'],
    'ui-ux-design': ['1551288049-bebda4e38f71', '1504868584819-f8e8b4b6d7e3', '1661956602116-aa6865609028', '1556742049-0cfed4f6a45d', '1512941937669-90a1b58e7e9c', '1523206489230-c012c64b2b48'],
    'social-media': ['1611162617474-5b21e879e113', '1563986768609-322da13575f3', '1611162616305-c69b3fa7fbe0', '1557804506-669a67965ba0'],
    'video-motion': ['1542744173-8e7e53415bb0', '1460925895917-afdab827c52f', '1556742049-0cfed4f6a45d', '1611162616305-c69b3fa7fbe0'],
    'print-design': ['1568901346375-23c9450c58cd', '1414235077428-338989a2e8c0', '1504674900247-0877df9cc836', '1611532736597-de2d4265fba3'],
    'illustration': ['1545665277-5937489579f2', '1507003211169-0a1dd7228f2d', '1560518883-ce09059eeffa', '1626785774573-4b799315345d'],
    'photo-editing': ['1582407947304-fd86f028f716', '1542744173-8e7e53415bb0', '1507003211169-0a1dd7228f2d', '1556742049-0cfed4f6a45d'],
};
const FALLBACK_IMAGES = ['1557804506-669a67965ba0', '1460925895917-afdab827c52f', '1556742049-0cfed4f6a45d'];

const PLATFORM_BY_PARENT: Record<string, string> = {
    'brand-identity': 'Illustrator', 'ui-ux-design': 'Figma', 'social-media': 'Canva',
    'video-motion': 'After Effects', 'print-design': 'Illustrator', 'illustration': 'Illustrator', 'photo-editing': 'Photoshop',
};
const INDUSTRY_BY_PARENT: Record<string, string> = {
    'brand-identity': 'Corporate', 'ui-ux-design': 'Technology', 'social-media': 'Agency',
    'video-motion': 'Entertainment', 'print-design': 'Corporate', 'illustration': 'Agency', 'photo-editing': 'Photography',
};
const DEFAULT_TYPE_BY_PARENT: Record<string, string> = {
    'brand-identity': 'Logo', 'ui-ux-design': 'UI Kit', 'social-media': 'Social Media Graphic',
    'video-motion': 'Other', 'print-design': 'Print Template', 'illustration': 'Illustration', 'photo-editing': 'Other',
};
// templateType per known subcategory slug (enum-valid values only)
const TYPE_BY_SUBSLUG: Record<string, string> = {
    'logo-design': 'Logo', 'business-card': 'Business Card', 'brand-guideline': 'Print Template', 'letterhead': 'Print Template',
    'mobile-app': 'Mobile App Design', 'landing-page': 'Landing Page', 'website-design': 'Website Template', 'dashboard-ui': 'UI Kit', 'admin-panel': 'UI Kit',
    'facebook-ad': 'Social Media Graphic', 'instagram-post': 'Social Media Graphic', 'linkedin-banner': 'Social Media Graphic', 'youtube-thumbnail': 'Social Media Graphic',
    'intro-outro': 'Other', 'logo-animation': 'Other', 'reels-template': 'Other', 'shorts-template': 'Other',
    'flyer': 'Flyer', 'brochure': 'Print Template', 'poster': 'Print Template', 'stationery': 'Print Template',
    'vector-art': 'Vector Graphic', 'icon-set': 'Icon Set', 'character-design': 'Illustration', 'pattern-design': 'Illustration',
    'background-removal': 'Other', 'color-correction': 'Other', 'image-manipulation': 'Other', 'photo-retouching': 'Mockup',
};

const DESCRIPTORS = ['Premium Kit', 'Modern Pack', 'Creative Set', 'Elegant Bundle', 'Minimal Template'];
const PRICES = [800, 1200, 1500, 2000, 0]; // last one free
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

let counter = 0;
const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now() + '-' + (counter++);

async function run() {
    if (!MONGO_URI) throw new Error('DATABASE_URL is not set');
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected\n');

    // Author
    let author = await User.findOne({ role: 'admin' }) || await User.findOne({ role: 'mentor' }) || await User.findOne({});
    if (!author) throw new Error('No user found to set as author. Create a user first.');
    console.log(`👤 Author: ${author.email} (${author.role})`);

    // Categories
    const cats = await Category.find({ type: 'design-template' });
    const parents = cats.filter((c: any) => c.isParent).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    const subsOf = (pid: any) => cats.filter((c: any) => {
        if (c.isParent) return false;
        const p: any = c.parentCategory;
        const id = p && typeof p === 'object' ? (p._id || p.id) : p;
        return String(id) === String(pid);
    });
    console.log(`📁 ${parents.length} main categories, ${cats.length - parents.length} subcategories\n`);

    // --- Step 1: clear previous auto-seeded designs (only ours) ---
    const del = await DesignTemplate.deleteMany({ tags: SEED_TAG });
    console.log(`🧹 Removed ${del.deletedCount} previously auto-seeded designs\n`);

    // --- Step 2: create ~5 per main category ---
    let created = 0;
    for (const parent of parents as any[]) {
        const kids = subsOf(parent._id);
        const pool = IMAGE_POOL[parent.slug] || FALLBACK_IMAGES;
        const platform = PLATFORM_BY_PARENT[parent.slug] || 'Photoshop';
        const industry = INDUSTRY_BY_PARENT[parent.slug] || 'Other';
        const defType = DEFAULT_TYPE_BY_PARENT[parent.slug] || 'Other';

        for (let i = 0; i < PER_CATEGORY; i++) {
            const sub = kids.length ? kids[i % kids.length] : null;
            const catId = sub ? sub._id : parent._id;
            const subName = sub ? sub.name : parent.name;
            const templateType = (sub && TYPE_BY_SUBSLUG[sub.slug]) || defType;
            const price = PRICES[i % PRICES.length];
            const isFree = price === 0;
            const title = `${subName} ${DESCRIPTORS[i % DESCRIPTORS.length]}`;

            await DesignTemplate.create({
                title,
                slug: slugify(title),
                author: author._id,
                platform,
                category: catId,
                templateType,
                accessType: isFree ? 'free' : 'paid',
                price,
                offerPrice: isFree ? 0 : Math.round(price * 0.75),
                licenseType: 'regular',
                regularLicensePrice: isFree ? 0 : price,
                extendedLicensePrice: isFree ? 800 : price * 2,
                description: `Professional ${subName.toLowerCase()} design by Creative Solve CS — clean, modern and fully editable. Perfect for ${industry.toLowerCase()} brands and businesses.`,
                longDescription: `A high-quality ${subName} template crafted for ${industry} use. Fully layered, easy to customise, and ready to export. Part of the ${parent.name} collection.`,
                features: ['Fully editable', 'High resolution', 'Well organised layers', 'Free fonts used', 'Print & web ready'],
                filesIncluded: ['.psd', '.ai', '.pdf', '.png'],
                compatibility: [`${platform} 2020+`],
                images: [img(pool[i % pool.length]), img(pool[(i + 1) % pool.length])],
                previewUrl: '',
                downloadFile: `/files/sample-${parent.slug}-${i + 1}.zip`,
                documentationUrl: '',
                status: 'approved',
                isFeatured: i === 0,
                tags: [SEED_TAG, parent.slug, sub ? sub.slug : parent.slug, 'sample'],
                colors: ['#003ECB', '#002da3', '#FFFFFF', '#F1F5F9'],
                industry,
                fileSize: `${rand(20, 240)}MB`,
                dimensions: templateType === 'Business Card' ? '3.5x2 inch' : '1920x1080',
                isEditable: true,
                layered: true,
                responsive: ['UI Kit', 'Website Template', 'Landing Page', 'Mobile App Design'].includes(templateType),
                fontIncluded: true,
                version: '1.0.0',
                rating: Math.round((4 + Math.random()) * 10) / 10,
                reviewCount: rand(8, 90),
                salesCount: rand(20, 400),
                viewCount: rand(200, 4000),
                likeCount: rand(15, 250),
            });
            created++;
        }
        console.log(`✅ ${parent.name}: +${PER_CATEGORY} designs (${kids.length} subcats)`);
    }

    // --- Step 3: fix existing designs with broken/missing category ---
    const validCatIds = new Set(cats.map((c: any) => String(c._id)));
    const allDesigns = await DesignTemplate.find({ tags: { $ne: SEED_TAG } }); // skip our samples
    let fixed = 0;
    for (const d of allDesigns as any[]) {
        const cid = d.category ? String(d.category) : null;
        if (cid && validCatIds.has(cid)) continue; // already valid

        // pick a subcategory by templateType, else first subcategory of the first parent
        let target =
            cats.find((c: any) => !c.isParent && TYPE_BY_SUBSLUG[c.slug] === d.templateType) ||
            cats.find((c: any) => !c.isParent) ||
            parents[0];
        if (!target) continue;
        await DesignTemplate.updateOne({ _id: d._id }, { $set: { category: target._id } });
        fixed++;
        console.log(`   🔧 Re-categorised "${d.title}" → ${target.name}`);
    }

    // Summary
    const total = await DesignTemplate.countDocuments({ status: 'approved' });
    console.log('\n' + '═'.repeat(48));
    console.log(`🎉 Created ${created} sample designs | Re-categorised ${fixed} existing`);
    console.log(`🎨 Total approved designs now: ${total}`);
    console.log('═'.repeat(48));

    await mongoose.disconnect();
    process.exit(0);
}

run().catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
});
