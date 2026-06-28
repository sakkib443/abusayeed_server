/**
 * Seed design categories + designs from the frontend's "All Project" folder.
 *
 * For every sub-folder inside frontend-abusayeed/public/All Project:
 *   - creates a design-template Category (visible on the website)
 *   - copies up to 5 images into frontend-abusayeed/public/designs/<slug>/
 *   - creates up to 5 Design entries (image + name + category) in the DB
 *
 * DESTRUCTIVE: deletes ALL existing designs and ALL design-template categories
 * before seeding, so the result exactly matches the folders.
 *
 * Run from backend root:
 *   npx ts-node-dev --transpile-only src/scripts/seedFromAllProject.ts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.join(process.cwd(), '.env') });

import { Category } from '../app/modules/category/category.model';
import { DesignTemplate } from '../app/modules/designTemplate/designTemplate.model';
import { User } from '../app/modules/user/user.model';

const MONGO_URI = process.env.DATABASE_URL as string;
const PER_CATEGORY = 5;

const FRONTEND_PUBLIC = path.join(process.cwd(), '..', 'frontend-abusayeed', 'public');
const SRC_ROOT = path.join(FRONTEND_PUBLIC, 'All Project');
const DEST_ROOT = path.join(FRONTEND_PUBLIC, 'designs');

const IMG_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Per-folder presentation: nicer name, Bengali name, slug and icon.
// (icon names match the set CategoryShowcase supports.)
const CONFIG: Record<string, { name: string; name_bn: string; slug: string; icon: string }> = {
    'Ai Diven Design': { name: 'AI Design', name_bn: 'এআই ডিজাইন', slug: 'ai-design', icon: 'LuShapes' },
    'Banner Design': { name: 'Banner Design', name_bn: 'ব্যানার ডিজাইন', slug: 'banner-design', icon: 'LuImage' },
    'Corporate Profile Design': { name: 'Corporate Profile', name_bn: 'কর্পোরেট প্রোফাইল', slug: 'corporate-profile', icon: 'LuLayoutDashboard' },
    'Flyer Design': { name: 'Flyer Design', name_bn: 'ফ্লায়ার ডিজাইন', slug: 'flyer-design', icon: 'LuPrinter' },
    'Food manu Design': { name: 'Food Menu Design', name_bn: 'ফুড মেনু ডিজাইন', slug: 'food-menu-design', icon: 'LuImage' },
    'Image Manipulation': { name: 'Image Manipulation', name_bn: 'ইমেজ ম্যানিপুলেশন', slug: 'image-manipulation', icon: 'LuImage' },
    'Logo Design': { name: 'Logo Design', name_bn: 'লোগো ডিজাইন', slug: 'logo-design', icon: 'LuPenTool' },
    'Poster Design': { name: 'Poster Design', name_bn: 'পোস্টার ডিজাইন', slug: 'poster-design', icon: 'LuPrinter' },
    'Product packaging Design': { name: 'Product Packaging', name_bn: 'প্রোডাক্ট প্যাকেজিং', slug: 'product-packaging', icon: 'LuShapes' },
    'Social Media Banner Design': { name: 'Social Media Banner', name_bn: 'সোশ্যাল মিডিয়া ব্যানার', slug: 'social-media-banner', icon: 'LuMegaphone' },
    'Social Media Post Design': { name: 'Social Media Post', name_bn: 'সোশ্যাল মিডিয়া পোস্ট', slug: 'social-media-post', icon: 'LuMegaphone' },
};

const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

let slugCounter = 0;
const uniqueSlug = (s: string) => `${slugify(s)}-${Date.now()}-${slugCounter++}`;

async function run() {
    if (!MONGO_URI) throw new Error('DATABASE_URL is not set');
    if (!fs.existsSync(SRC_ROOT)) throw new Error(`Folder not found: ${SRC_ROOT}`);

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected\n');

    // Author (required on designs)
    const author =
        (await User.findOne({ role: 'admin' })) ||
        (await User.findOne({ role: 'mentor' })) ||
        (await User.findOne({}));
    if (!author) throw new Error('No user found to set as author. Create a user first.');
    console.log(`👤 Author: ${author.email} (${author.role})\n`);

    // --- Step 1: wipe existing designs + design-template categories ---
    const delDesigns = await DesignTemplate.deleteMany({});
    console.log(`🧹 Deleted ${delDesigns.deletedCount} existing designs`);
    const delCats = await Category.deleteMany({ type: 'design-template' });
    console.log(`🧹 Deleted ${delCats.deletedCount} existing design categories\n`);

    // --- Step 2: read folders ---
    const folders = fs
        .readdirSync(SRC_ROOT, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .sort();

    let order = 0;
    let totalDesigns = 0;

    for (const folder of folders) {
        const cfg = CONFIG[folder] || {
            name: titleCase(folder),
            name_bn: titleCase(folder),
            slug: slugify(folder),
            icon: 'LuShapes',
        };

        // pick up to 5 images
        const srcDir = path.join(SRC_ROOT, folder);
        const images = fs
            .readdirSync(srcDir)
            .filter((f) => IMG_EXT.includes(path.extname(f).toLowerCase()))
            .sort()
            .slice(0, PER_CATEGORY);

        if (images.length === 0) {
            console.log(`⏭️  ${folder}: no images, skipped`);
            continue;
        }

        // create category
        const category = await Category.create({
            name: cfg.name,
            name_bn: cfg.name_bn,
            slug: cfg.slug,
            type: 'design-template',
            isParent: true,
            status: 'active',
            icon: cfg.icon,
            order: order++,
        });

        // copy images → /public/designs/<slug>/N.ext  and create designs
        const destDir = path.join(DEST_ROOT, cfg.slug);
        fs.mkdirSync(destDir, { recursive: true });

        let n = 0;
        for (const file of images) {
            n++;
            const ext = path.extname(file).toLowerCase();
            const destName = `${n}${ext}`;
            fs.copyFileSync(path.join(srcDir, file), path.join(destDir, destName));

            const imageUrl = `/designs/${cfg.slug}/${destName}`;
            const title = `${cfg.name} ${String(n).padStart(2, '0')}`;

            await DesignTemplate.create({
                title,
                slug: uniqueSlug(title),
                author: author._id,
                category: category._id,
                images: [imageUrl],
                accessType: 'free',
                price: 0,
                regularLicensePrice: 0,
                status: 'approved',
                publishDate: new Date(),
            });
            totalDesigns++;
        }

        // keep category's productCount in sync
        await Category.updateOne({ _id: category._id }, { $set: { productCount: n } });

        console.log(`✅ ${cfg.name}: category + ${n} designs`);
    }

    console.log('\n' + '═'.repeat(50));
    console.log(`🎉 ${folders.length} categories processed | ${totalDesigns} designs created`);
    console.log('═'.repeat(50));

    await mongoose.disconnect();
    process.exit(0);
}

run().catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
});
