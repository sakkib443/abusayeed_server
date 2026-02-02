/**
 * Seed Design Templates and Categories
 * Run: npx ts-node src/scripts/seedDesignData.ts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

// Models
import { Category } from '../app/modules/category/category.model';
import { DesignTemplate } from '../app/modules/designTemplate/designTemplate.model';
import { User } from '../app/modules/user/user.model';

const MONGO_URI = process.env.DATABASE_URL as string;

// ==================== DESIGN CATEGORIES ====================
const designCategories = [
    {
        name: 'UI/UX Design',
        slug: 'ui-ux-design',
        description: 'Professional UI/UX design templates including web interfaces, mobile app designs, and user experience components.',
        icon: 'LuLayout',
        type: 'design-template',
        status: 'active',
        order: 1,
    },
    {
        name: 'Social Media Templates',
        slug: 'social-media-templates',
        description: 'Eye-catching social media graphics for Instagram, Facebook, LinkedIn, and other platforms.',
        icon: 'LuShare2',
        type: 'design-template',
        status: 'active',
        order: 2,
    },
    {
        name: 'Print Design',
        slug: 'print-design',
        description: 'Professional print templates including business cards, brochures, flyers, and posters.',
        icon: 'LuPrinter',
        type: 'design-template',
        status: 'active',
        order: 3,
    },
    {
        name: 'Presentation Templates',
        slug: 'presentation-templates',
        description: 'Modern and professional presentation templates for PowerPoint, Keynote, and Google Slides.',
        icon: 'LuPresentation',
        type: 'design-template',
        status: 'active',
        order: 4,
    },
];

// ==================== DESIGN TEMPLATES ====================
const createDesignTemplates = (authorId: mongoose.Types.ObjectId, categoryIds: mongoose.Types.ObjectId[]) => [
    {
        title: 'Modern Dashboard UI Kit',
        slug: 'modern-dashboard-ui-kit-' + Date.now(),
        author: authorId,
        platform: 'Figma',
        category: categoryIds[0], // UI/UX Design
        templateType: 'UI Kit',
        accessType: 'paid',
        price: 1500,
        offerPrice: 1200,
        regularLicensePrice: 1200,
        extendedLicensePrice: 3500,
        rating: 4.8,
        reviewCount: 45,
        salesCount: 156,
        viewCount: 2340,
        likeCount: 89,
        version: '2.0.0',
        features: [
            'Dark & Light Mode',
            '200+ Components',
            'Responsive Design',
            'Auto Layout Support',
            'Design System Included',
            'Regular Updates'
        ],
        filesIncluded: ['.fig', '.pdf', 'Documentation'],
        description: 'A comprehensive dashboard UI kit with over 200 components. Perfect for admin panels, analytics dashboards, and data visualization projects.',
        longDescription: `This modern dashboard UI kit is designed for professionals who want to create stunning admin interfaces quickly. 

**What's Included:**
- 50+ Dashboard screens
- 200+ Reusable components
- Dark and Light themes
- Complete design system
- Auto-layout for responsive design

**Best For:**
- SaaS Applications
- Analytics Dashboards
- Admin Panels
- CRM Systems`,
        compatibility: ['Figma 2023+', 'Auto Layout', 'Components'],
        images: [
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
            'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800'
        ],
        previewUrl: 'https://figma.com/preview/dashboard',
        downloadFile: '/files/modern-dashboard-ui-kit.zip',
        status: 'approved',
        isFeatured: true,
        tags: ['dashboard', 'admin', 'ui kit', 'figma', 'modern'],
        colors: ['#3B82F6', '#10B981', '#F59E0B', '#1F2937'],
        industry: 'Technology',
        fileSize: '45MB',
        isEditable: true,
        layered: true,
        responsive: true,
        fontIncluded: true,
    },
    {
        title: 'Instagram Stories Pack - Minimal',
        slug: 'instagram-stories-pack-minimal-' + Date.now(),
        author: authorId,
        platform: 'Canva',
        category: categoryIds[1], // Social Media
        templateType: 'Social Media Graphic',
        accessType: 'paid',
        price: 800,
        offerPrice: 600,
        regularLicensePrice: 600,
        extendedLicensePrice: 1800,
        rating: 4.6,
        reviewCount: 78,
        salesCount: 234,
        viewCount: 3450,
        likeCount: 167,
        version: '1.5.0',
        features: [
            '50 Story Templates',
            'Editable in Canva',
            'Minimal Aesthetic',
            'Brand Color Ready',
            'Instagram Optimized',
            'Free Font Links'
        ],
        filesIncluded: ['Canva Link', '.png', '.jpg', 'Font Guide'],
        description: 'Clean and minimal Instagram story templates perfect for lifestyle brands, influencers, and modern businesses.',
        longDescription: `Elevate your Instagram presence with our minimal story pack.

**Features:**
- 50 unique story designs
- Easy Canva editing
- Drag and drop photos
- One-click color change

**Perfect For:**
- Fashion Brands
- Lifestyle Influencers
- Beauty Businesses
- Coaches & Consultants`,
        compatibility: ['Canva Free', 'Canva Pro'],
        images: [
            'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800',
            'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800'
        ],
        previewUrl: 'https://canva.com/preview/instagram',
        downloadFile: '/files/instagram-stories-minimal.zip',
        status: 'approved',
        isFeatured: true,
        tags: ['instagram', 'social media', 'stories', 'minimal', 'canva'],
        colors: ['#FAFAFA', '#000000', '#E5E5E5'],
        industry: 'Fashion',
        fileSize: '12MB',
        isEditable: true,
        responsive: false,
    },
    {
        title: 'Corporate Business Card Bundle',
        slug: 'corporate-business-card-bundle-' + Date.now(),
        author: authorId,
        platform: 'Photoshop',
        category: categoryIds[2], // Print Design
        templateType: 'Business Card',
        accessType: 'paid',
        price: 500,
        offerPrice: 350,
        regularLicensePrice: 350,
        extendedLicensePrice: 1200,
        rating: 4.9,
        reviewCount: 112,
        salesCount: 567,
        viewCount: 4560,
        likeCount: 234,
        version: '3.0.0',
        features: [
            '25 Card Designs',
            'Print Ready (CMYK)',
            '300 DPI Quality',
            'Fully Layered PSD',
            'Free Fonts Included',
            'Bleed & Safe Zone'
        ],
        filesIncluded: ['.psd', '.ai', '.pdf', 'Font Pack'],
        description: 'Professional business card bundle with 25 unique designs. Print-ready with CMYK colors and 300 DPI resolution.',
        longDescription: `Make a lasting first impression with our corporate business card bundle.

**Specifications:**
- Size: 3.5" x 2" (standard)
- Resolution: 300 DPI
- Color Mode: CMYK
- Bleed: 0.125"

**Includes:**
- 25 unique designs
- Double-sided layouts
- QR code ready
- All fonts free`,
        compatibility: ['Photoshop CC 2020+', 'Illustrator CC 2020+'],
        images: [
            'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800',
            'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800'
        ],
        downloadFile: '/files/corporate-business-cards.zip',
        status: 'approved',
        isFeatured: false,
        tags: ['business card', 'corporate', 'print', 'professional'],
        colors: ['#1E3A5F', '#D4AF37', '#FFFFFF'],
        industry: 'Corporate',
        fileSize: '85MB',
        dimensions: '3.5x2 inches',
        isEditable: true,
        layered: true,
        fontIncluded: true,
    },
    {
        title: 'Pitch Deck Presentation Template',
        slug: 'pitch-deck-presentation-template-' + Date.now(),
        author: authorId,
        platform: 'Figma',
        category: categoryIds[3], // Presentation
        templateType: 'Presentation',
        accessType: 'paid',
        price: 1200,
        offerPrice: 900,
        regularLicensePrice: 900,
        extendedLicensePrice: 2500,
        rating: 4.7,
        reviewCount: 56,
        salesCount: 189,
        viewCount: 2890,
        likeCount: 145,
        version: '2.1.0',
        features: [
            '80+ Unique Slides',
            'Investor Ready',
            'Data Visualization',
            'Icon Library',
            'Device Mockups',
            'Animation Guide'
        ],
        filesIncluded: ['.fig', '.pptx', '.pdf', 'Icons'],
        description: 'Professional pitch deck template designed for startups and entrepreneurs seeking investment. Includes 80+ slides.',
        longDescription: `Win investors with our professionally designed pitch deck template.

**Sections Included:**
- Problem & Solution
- Market Opportunity
- Business Model
- Traction & Metrics
- Team
- Financial Projections
- Ask & Use of Funds

**Export Options:**
- Figma (editable)
- PowerPoint (.pptx)
- PDF (print ready)`,
        compatibility: ['Figma', 'PowerPoint 2019+', 'Google Slides'],
        images: [
            'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800'
        ],
        previewUrl: 'https://figma.com/preview/pitch-deck',
        downloadFile: '/files/pitch-deck-template.zip',
        status: 'approved',
        isFeatured: true,
        tags: ['pitch deck', 'presentation', 'startup', 'investor', 'figma'],
        colors: ['#6366F1', '#EC4899', '#14B8A6'],
        industry: 'Technology',
        fileSize: '65MB',
        dimensions: '1920x1080',
        isEditable: true,
        layered: true,
    },
    {
        title: 'E-commerce Mobile App UI Kit',
        slug: 'ecommerce-mobile-app-ui-kit-' + Date.now(),
        author: authorId,
        platform: 'Figma',
        category: categoryIds[0], // UI/UX Design
        templateType: 'Mobile App Design',
        accessType: 'paid',
        price: 2000,
        offerPrice: 1600,
        regularLicensePrice: 1600,
        extendedLicensePrice: 4500,
        rating: 4.9,
        reviewCount: 89,
        salesCount: 298,
        viewCount: 5670,
        likeCount: 312,
        version: '3.2.0',
        features: [
            '150+ App Screens',
            'iOS & Android Ready',
            'Prototype Included',
            'Component Library',
            'Dark Mode Support',
            'RTL Support'
        ],
        filesIncluded: ['.fig', '.sketch', 'Icons', 'Documentation'],
        description: 'Complete e-commerce mobile app UI kit with 150+ screens. Includes shopping flow, checkout, user profiles, and more.',
        longDescription: `Build your e-commerce app faster with our comprehensive UI kit.

**Screen Categories:**
- Onboarding (8 screens)
- Authentication (6 screens)
- Home & Discovery (15 screens)
- Product Details (10 screens)
- Cart & Checkout (12 screens)
- User Profile (18 screens)
- Settings (10 screens)
- And 70+ more!

**Design System:**
- Typography scale
- Color palette
- Spacing system
- Component variants`,
        compatibility: ['Figma 2023+', 'Sketch 80+'],
        images: [
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
            'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800',
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'
        ],
        previewUrl: 'https://figma.com/preview/ecommerce-app',
        downloadFile: '/files/ecommerce-app-ui-kit.zip',
        status: 'approved',
        isFeatured: true,
        tags: ['mobile app', 'ecommerce', 'shopping', 'ios', 'android', 'figma'],
        colors: ['#FF6B6B', '#4ECDC4', '#1A1A2E'],
        industry: 'eCommerce',
        fileSize: '120MB',
        dimensions: '375x812 (iPhone)',
        isEditable: true,
        layered: true,
        responsive: true,
        fontIncluded: true,
    },
    {
        title: 'Restaurant Menu Flyer Pack',
        slug: 'restaurant-menu-flyer-pack-' + Date.now(),
        author: authorId,
        platform: 'Illustrator',
        category: categoryIds[2], // Print Design
        templateType: 'Flyer',
        accessType: 'free',
        price: 0,
        offerPrice: 0,
        regularLicensePrice: 0,
        extendedLicensePrice: 800,
        rating: 4.5,
        reviewCount: 234,
        salesCount: 1245,
        viewCount: 8900,
        likeCount: 567,
        version: '1.0.0',
        features: [
            '5 Menu Designs',
            'A4 & US Letter Size',
            'Print Ready',
            'Easy to Edit',
            'Vector Graphics',
            'Free for Personal Use'
        ],
        filesIncluded: ['.ai', '.eps', '.pdf'],
        description: 'Free restaurant menu flyer templates. Perfect for cafes, restaurants, and food businesses. Print-ready and fully editable.',
        longDescription: `Stunning free menu templates for your restaurant or cafe.

**What's Included:**
- 5 unique designs
- Multiple layout options
- Food photography placeholders
- Price list sections

**Print Specifications:**
- A4 size (210x297mm)
- US Letter (8.5x11")
- 300 DPI
- CMYK colors

**License:**
Free for personal use. Extended license available for commercial projects.`,
        compatibility: ['Illustrator CC 2019+', 'CorelDRAW'],
        images: [
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'
        ],
        downloadFile: '/files/restaurant-menu-flyer-free.zip',
        status: 'approved',
        isFeatured: false,
        tags: ['restaurant', 'menu', 'flyer', 'free', 'food', 'print'],
        colors: ['#8B4513', '#228B22', '#F5DEB3'],
        industry: 'Restaurant',
        fileSize: '35MB',
        dimensions: 'A4 / US Letter',
        isEditable: true,
        layered: true,
        fontIncluded: true,
    },
];

// ==================== MAIN SEED FUNCTION ====================
async function seedDesignData() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB Connected\n');

        // Step 1: Find or create admin user
        console.log('👤 Finding/Creating admin user...');
        let adminUser = await User.findOne({ role: 'admin' });

        if (!adminUser) {
            adminUser = await User.create({
                email: 'admin@abusayeed.com',
                password: 'Admin@123456',
                firstName: 'Abu',
                lastName: 'Sayeed',
                role: 'admin',
                isVerified: true,
                status: 'active',
            });
            console.log('   ✅ Admin user created: admin@abusayeed.com');
        } else {
            console.log(`   ✅ Using existing admin: ${adminUser.email}`);
        }

        // Step 2: Create Design Categories
        console.log('\n📁 Creating Design Categories...');
        const categoryIds: mongoose.Types.ObjectId[] = [];

        for (const cat of designCategories) {
            const existing = await Category.findOne({ slug: cat.slug });
            if (existing) {
                categoryIds.push(existing._id as mongoose.Types.ObjectId);
                console.log(`   ⏭️  Category exists: ${cat.name}`);
            } else {
                const created = await Category.create(cat);
                categoryIds.push(created._id as mongoose.Types.ObjectId);
                console.log(`   ✅ Created: ${cat.name}`);
            }
        }

        // Step 3: Create Design Templates
        console.log('\n🎨 Creating Design Templates...');
        const templates = createDesignTemplates(adminUser._id as mongoose.Types.ObjectId, categoryIds);

        for (const template of templates) {
            try {
                await DesignTemplate.create(template);
                console.log(`   ✅ Created: ${template.title}`);
            } catch (error: any) {
                if (error.code === 11000) {
                    console.log(`   ⏭️  Template exists: ${template.title}`);
                } else {
                    console.log(`   ❌ Error: ${template.title} - ${error.message}`);
                }
            }
        }

        // Summary
        const totalCategories = await Category.countDocuments({ type: 'design-template' });
        const totalTemplates = await DesignTemplate.countDocuments({ status: 'approved' });

        console.log('\n' + '═'.repeat(50));
        console.log('✅ SEEDING COMPLETE!');
        console.log('═'.repeat(50));
        console.log(`📁 Design Categories: ${totalCategories}`);
        console.log(`🎨 Design Templates: ${totalTemplates}`);
        console.log('═'.repeat(50));

        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seedDesignData();
