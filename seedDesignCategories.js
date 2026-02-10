// Seed Design Categories with Subcategories - OPTIMIZED VERSION (7 categories)
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
};

// Category Schema (same as model)
const categorySchema = new mongoose.Schema({
    name: String,
    name_bn: String,
    slug: String,
    description: String,
    icon: String,
    image: String,
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    type: { type: String, default: 'design-template' },
    productCount: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
    isParent: { type: Boolean, default: false },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

// Categories Data - OPTIMIZED (7 parent + 3-5 subs each)
const categoriesData = [
    {
        name: "Brand Identity",
        name_bn: "ব্র্যান্ড আইডেন্টিটি",
        slug: "brand-identity",
        icon: "LuPenTool",
        order: 1,
        subcategories: [
            { name: "Logo Design", name_bn: "লোগো ডিজাইন", slug: "logo-design" },
            { name: "Business Card", name_bn: "ব্যবসা কার্ড", slug: "business-card" },
            { name: "Letterhead", name_bn: "লেটারহেড", slug: "letterhead" },
            { name: "Brand Guideline", name_bn: "ব্র্যান্ড গাইডলাইন", slug: "brand-guideline" },
        ]
    },
    {
        name: "UI/UX Design",
        name_bn: "ইউআই/ইউএক্স ডিজাইন",
        slug: "ui-ux-design",
        icon: "LuLayoutDashboard",
        order: 2,
        subcategories: [
            { name: "Dashboard UI", name_bn: "ড্যাশবোর্ড ইউআই", slug: "dashboard-ui" },
            { name: "Mobile App", name_bn: "মোবাইল অ্যাপ", slug: "mobile-app" },
            { name: "Landing Page", name_bn: "ল্যান্ডিং পেজ", slug: "landing-page" },
            { name: "Admin Panel", name_bn: "অ্যাডমিন প্যানেল", slug: "admin-panel" },
            { name: "Website Design", name_bn: "ওয়েবসাইট ডিজাইন", slug: "website-design" },
        ]
    },
    {
        name: "Social Media",
        name_bn: "সোশ্যাল মিডিয়া",
        slug: "social-media",
        icon: "LuMegaphone",
        order: 3,
        subcategories: [
            { name: "Instagram Post", name_bn: "ইনস্টাগ্রাম পোস্ট", slug: "instagram-post" },
            { name: "Facebook Ad", name_bn: "ফেসবুক অ্যাড", slug: "facebook-ad" },
            { name: "YouTube Thumbnail", name_bn: "ইউটিউব থাম্বনেইল", slug: "youtube-thumbnail" },
            { name: "LinkedIn Banner", name_bn: "লিংকডইন ব্যানার", slug: "linkedin-banner" },
        ]
    },
    {
        name: "Video & Motion",
        name_bn: "ভিডিও ও মোশন",
        slug: "video-motion",
        icon: "LuPlay",
        order: 4,
        subcategories: [
            { name: "Reels Template", name_bn: "রিলস টেমপ্লেট", slug: "reels-template" },
            { name: "Shorts Template", name_bn: "শর্টস টেমপ্লেট", slug: "shorts-template" },
            { name: "Intro/Outro", name_bn: "ইন্ট্রো/আউট্রো", slug: "intro-outro" },
            { name: "Logo Animation", name_bn: "লোগো অ্যানিমেশন", slug: "logo-animation" },
        ]
    },
    {
        name: "Print Design",
        name_bn: "প্রিন্ট ডিজাইন",
        slug: "print-design",
        icon: "LuPrinter",
        order: 5,
        subcategories: [
            { name: "Flyer Design", name_bn: "ফ্লায়ার ডিজাইন", slug: "flyer" },
            { name: "Brochure", name_bn: "ব্রুশিয়ার", slug: "brochure" },
            { name: "Poster", name_bn: "পোস্টার", slug: "poster" },
            { name: "Business Stationery", name_bn: "বিজনেস স্টেশনারি", slug: "stationery" },
        ]
    },
    {
        name: "Illustration",
        name_bn: "ইলাস্ট্রেশন",
        slug: "illustration",
        icon: "LuImage",
        order: 6,
        subcategories: [
            { name: "Vector Art", name_bn: "ভেক্টর আর্ট", slug: "vector-art" },
            { name: "Icon Set", name_bn: "আইকন সেট", slug: "icon-set" },
            { name: "Character Design", name_bn: "ক্যারেক্টার ডিজাইন", slug: "character-design" },
            { name: "Pattern Design", name_bn: "প্যাটার্ন ডিজাইন", slug: "pattern-design" },
        ]
    },
    {
        name: "Photo Editing",
        name_bn: "ফটো এডিটিং",
        slug: "photo-editing",
        icon: "LuMousePointer2",
        order: 7,
        subcategories: [
            { name: "Background Removal", name_bn: "ব্যাকগ্রাউন্ড রিমুভ", slug: "background-removal" },
            { name: "Photo Retouching", name_bn: "ফটো রিটাচিং", slug: "photo-retouching" },
            { name: "Color Correction", name_bn: "কালার কারেকশন", slug: "color-correction" },
            { name: "Image Manipulation", name_bn: "ইমেজ ম্যানিপুলেশন", slug: "image-manipulation" },
        ]
    },
];

const seedCategories = async () => {
    try {
        console.log('🌱 Starting OPTIMIZED category seeding (7 parents)...');

        // Clear existing design-template categories
        await Category.deleteMany({ type: 'design-template' });
        console.log('🗑️  Cleared existing design-template categories');

        let totalAdded = 0;

        // Add each parent category with subcategories
        for (const catData of categoriesData) {
            const { subcategories, ...parentData } = catData;

            // Create parent category
            const parent = await Category.create({
                ...parentData,
                type: 'design-template',
                isParent: true,
                status: 'active',
            });

            console.log(`✅ Added parent: ${parent.name} (${parent.name_bn})`);
            totalAdded++;

            // Create subcategories
            if (subcategories && subcategories.length > 0) {
                for (const subData of subcategories) {
                    const sub = await Category.create({
                        ...subData,
                        type: 'design-template',
                        parentCategory: parent._id,
                        isParent: false,
                        status: 'active',
                        icon: parentData.icon, // Inherit parent icon
                    });
                    console.log(`   ↳ Added subcategory: ${sub.name} (${sub.name_bn})`);
                    totalAdded++;
                }
            }
        }

        console.log(`\n✨ Successfully seeded ${totalAdded} categories!`);
        console.log(`📊 Parent categories: ${categoriesData.length}`);
        console.log(`📊 Total with subcategories: ${totalAdded}`);
        console.log(`\n🎯 OPTIMIZED: Only essential categories for better UX!`);

    } catch (error) {
        console.error('❌ Error seeding categories:', error);
    } finally {
        await mongoose.connection.close();
        console.log('👋 Database connection closed');
    }
};

// Run the seed
connectDB().then(() => {
    seedCategories();
});
