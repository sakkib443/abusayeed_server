import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { DesignTemplate } from '../app/modules/designTemplate/designTemplate.model';
import { Category } from '../app/modules/category/category.model';
import { User } from '../app/modules/user/user.model';

dotenv.config();

const designTemplatesData = [
    {
        title: "Modern Corporate Banner Collection",
        platform: "Photoshop",
        templateType: "Social Media Graphic",
        accessType: "paid",
        price: 1500,
        offerPrice: 999,
        regularLicensePrice: 1500,
        extendedLicensePrice: 3500,
        description: "Professional corporate banner templates perfect for LinkedIn, Facebook, and website headers. Clean, modern design with editable text and graphics.",
        longDescription: "This comprehensive banner collection includes 15+ professionally designed templates optimized for social media and web use. Each template features modern typography, elegant color schemes, and fully customizable layers. Perfect for corporate branding, marketing campaigns, and professional presentations.",
        features: [
            "15+ Banner Designs",
            "4K Resolution (3840x2160)",
            "Fully Layered PSD Files",
            "Smart Object Placeholders",
            "Free Google Fonts Used",
            "Color Customizable",
            "Print Ready 300 DPI"
        ],
        filesIncluded: [".psd", ".jpg", ".png", "Documentation.pdf"],
        compatibility: ["Photoshop CC 2020+", "Photoshop CS6"],
        images: [
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
        ],
        previewUrl: "",
        downloadFile: "https://drive.google.com/file/corporate-banner",
        documentationUrl: "",
        status: "approved",
        isFeatured: true,
        tags: ["corporate", "banner", "professional", "business", "linkedin", "facebook"],
        colors: ["#2563EB", "#1E40AF", "#FFFFFF", "#F3F4F6"],
        industry: "Corporate",
        fileSize: "245MB",
        dimensions: "3840x2160",
        isEditable: true,
        softwareVersion: "Photoshop CC 2020+",
        layered: true,
        responsive: false,
        fontIncluded: false,
        version: "2.0.0"
    },
    {
        title: "Minimalist Logo Design Kit",
        platform: "Illustrator",
        templateType: "Logo",
        accessType: "paid",
        price: 2500,
        offerPrice: 1999,
        regularLicensePrice: 2500,
        extendedLicensePrice: 5000,
        description: "50+ minimalist logo templates for startups, agencies, and modern brands. Vector-based, fully editable, and scalable to any size.",
        longDescription: "Create stunning brand identities with this comprehensive logo design kit. Includes 50+ carefully crafted minimalist logos suitable for tech startups, creative agencies, fashion brands, and more. Each logo is delivered in multiple formats and fully customizable in Adobe Illustrator.",
        features: [
            "50+ Logo Templates",
            "100% Vector Based",
            "Unlimited Scalability",
            "Multiple Color Variations",
            "Horizontal & Vertical Versions",
            "Favicon Included",
            "Brand Guidelines Template"
        ],
        filesIncluded: [".ai", ".eps", ".svg", ".pdf", ".png"],
        compatibility: ["Illustrator CC 2019+", "CorelDRAW X8+"],
        images: [
            "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800",
            "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800"
        ],
        previewUrl: "",
        downloadFile: "https://drive.google.com/file/logo-kit",
        documentationUrl: "",
        status: "approved",
        isFeatured: true,
        tags: ["logo", "minimalist", "branding", "startup", "vector", "modern"],
        colors: ["#000000", "#FFFFFF", "#6366F1", "#10B981"],
        industry: "Agency",
        fileSize: "85MB",
        dimensions: "Scalable Vector",
        isEditable: true,
        softwareVersion: "Illustrator CC 2019+",
        layered: true,
        responsive: false,
        fontIncluded: true,
        version: "1.5.0"
    },
    {
        title: "Premium Business Card Bundle",
        platform: "Photoshop",
        templateType: "Business Card",
        accessType: "paid",
        price: 800,
        offerPrice: 599,
        regularLicensePrice: 800,
        extendedLicensePrice: 1800,
        description: "30 elegant business card designs for professionals. Print-ready with bleed marks, CMYK colors, and 300 DPI resolution.",
        longDescription: "Make a lasting impression with these premium business card templates. This bundle includes 30 unique designs ranging from classic corporate to creative artistic styles. All templates are print-ready with proper bleed marks, CMYK color mode, and organized layers for easy customization.",
        features: [
            "30 Unique Designs",
            "Print Ready 300 DPI",
            "CMYK Color Mode",
            "3.5x2 inch Standard Size",
            "Bleed Marks Included",
            "QR Code Placeholder",
            "Double-sided Designs"
        ],
        filesIncluded: [".psd", ".ai", ".pdf", "Print Guide.pdf"],
        compatibility: ["Photoshop CC 2018+", "Illustrator CC 2018+"],
        images: [
            "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800",
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800"
        ],
        previewUrl: "",
        downloadFile: "https://drive.google.com/file/business-cards",
        documentationUrl: "",
        status: "approved",
        isFeatured: false,
        tags: ["business card", "print", "professional", "corporate", "elegant", "visiting card"],
        colors: ["#1F2937", "#F59E0B", "#FFFFFF", "#374151"],
        industry: "Corporate",
        fileSize: "156MB",
        dimensions: "3.5x2 inch",
        isEditable: true,
        softwareVersion: "Photoshop CC 2018+",
        layered: true,
        responsive: false,
        fontIncluded: false,
        version: "3.0.0"
    },
    {
        title: "E-commerce Website Template - ShopMax",
        platform: "Figma",
        templateType: "Website Template",
        accessType: "paid",
        price: 4500,
        offerPrice: 3499,
        regularLicensePrice: 4500,
        extendedLicensePrice: 9000,
        description: "Complete e-commerce website UI kit with 60+ screens, responsive design, and modern shopping experience components.",
        longDescription: "ShopMax is a comprehensive e-commerce website template designed for modern online stores. Includes all essential pages like homepage, product listing, product details, cart, checkout, user dashboard, and admin panel. Built with auto-layout for responsive design and organized with a clean component library.",
        features: [
            "60+ Unique Screens",
            "Fully Responsive Design",
            "Dark & Light Mode",
            "Component Library",
            "Auto-layout Enabled",
            "Design System Included",
            "Free Updates"
        ],
        filesIncluded: [".fig", "Style Guide.pdf", "Components.fig"],
        compatibility: ["Figma Desktop", "Figma Web"],
        images: [
            "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800",
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
        ],
        previewUrl: "https://figma.com/shopmax-preview",
        downloadFile: "https://drive.google.com/file/shopmax-figma",
        documentationUrl: "https://docs.shopmax.com",
        status: "approved",
        isFeatured: true,
        tags: ["ecommerce", "website", "figma", "ui kit", "shopping", "responsive", "modern"],
        colors: ["#7C3AED", "#EC4899", "#FFFFFF", "#111827"],
        industry: "eCommerce",
        fileSize: "320MB",
        dimensions: "1440px Desktop, 768px Tablet, 375px Mobile",
        isEditable: true,
        softwareVersion: "Figma 2024",
        layered: true,
        responsive: true,
        fontIncluded: false,
        version: "4.2.0"
    },
    {
        title: "Restaurant Menu & Flyer Pack",
        platform: "Photoshop",
        templateType: "Flyer",
        accessType: "paid",
        price: 1200,
        offerPrice: 899,
        regularLicensePrice: 1200,
        extendedLicensePrice: 2500,
        description: "Beautiful restaurant menu and promotional flyer templates. Perfect for cafes, restaurants, and food businesses.",
        longDescription: "Elevate your restaurant's brand with this stunning menu and flyer collection. Includes bi-fold menus, tri-fold menus, single-page menus, and promotional flyers in various sizes. Each design features appetizing layouts with space for food photography and elegant typography.",
        features: [
            "20+ Menu Designs",
            "15+ Flyer Templates",
            "A4 & US Letter Sizes",
            "Print Ready CMYK",
            "Food Photo Placeholders",
            "Multiple Layout Options",
            "QR Code Menu Ready"
        ],
        filesIncluded: [".psd", ".ai", ".indd", ".pdf"],
        compatibility: ["Photoshop CC 2019+", "Illustrator CC 2019+", "InDesign CC 2019+"],
        images: [
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
        ],
        previewUrl: "",
        downloadFile: "https://drive.google.com/file/restaurant-pack",
        documentationUrl: "",
        status: "approved",
        isFeatured: false,
        tags: ["restaurant", "menu", "flyer", "food", "cafe", "print", "promotional"],
        colors: ["#B45309", "#FEF3C7", "#1F2937", "#DC2626"],
        industry: "Restaurant",
        fileSize: "412MB",
        dimensions: "A4, US Letter, DL",
        isEditable: true,
        softwareVersion: "Photoshop CC 2019+",
        layered: true,
        responsive: false,
        fontIncluded: false,
        version: "2.1.0"
    },
    {
        title: "Portfolio Website UI Kit",
        platform: "Figma",
        templateType: "Website Template",
        accessType: "paid",
        price: 2000,
        offerPrice: 1499,
        regularLicensePrice: 2000,
        extendedLicensePrice: 4000,
        description: "Creative portfolio website template for designers, photographers, and artists. Clean, minimal design with stunning project showcases.",
        longDescription: "Showcase your creative work with this elegant portfolio template. Designed for designers, photographers, artists, and creative professionals. Features beautiful project galleries, about sections, contact forms, and blog layouts. Includes both single-page and multi-page versions.",
        features: [
            "25+ Page Templates",
            "Project Gallery Layouts",
            "Blog Section",
            "Contact Form Design",
            "Testimonial Sections",
            "Responsive Breakpoints",
            "Animation Ready"
        ],
        filesIncluded: [".fig", "Icons.svg", "README.md"],
        compatibility: ["Figma Desktop", "Figma Web"],
        images: [
            "https://images.unsplash.com/photo-1545665277-5937489579f2?w=800",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
        ],
        previewUrl: "https://figma.com/portfolio-preview",
        downloadFile: "https://drive.google.com/file/portfolio-figma",
        documentationUrl: "",
        status: "approved",
        isFeatured: true,
        tags: ["portfolio", "creative", "designer", "photographer", "minimal", "showcase"],
        colors: ["#000000", "#FFFFFF", "#F97316", "#6B7280"],
        industry: "Portfolio",
        fileSize: "180MB",
        dimensions: "1440px, 768px, 375px",
        isEditable: true,
        softwareVersion: "Figma 2024",
        layered: true,
        responsive: true,
        fontIncluded: false,
        version: "1.8.0"
    },
    {
        title: "Social Media Marketing Bundle",
        platform: "Canva",
        templateType: "Social Media Graphic",
        accessType: "paid",
        price: 1800,
        offerPrice: 1299,
        regularLicensePrice: 1800,
        extendedLicensePrice: 3600,
        description: "200+ social media post and story templates for Instagram, Facebook, LinkedIn, and Twitter. Ready to use in Canva.",
        longDescription: "Boost your social media presence with this massive template bundle. Includes quote posts, promotional graphics, story templates, carousel designs, and highlight covers. All templates are fully editable in Canva Free version - no Pro subscription required.",
        features: [
            "200+ Templates",
            "Instagram Posts & Stories",
            "Facebook & LinkedIn Templates",
            "Twitter/X Headers",
            "Canva Free Compatible",
            "Drag & Drop Editing",
            "Monthly Update Pack"
        ],
        filesIncluded: ["Canva Links", "PNG Exports", "Usage Guide.pdf"],
        compatibility: ["Canva Free", "Canva Pro"],
        images: [
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800"
        ],
        previewUrl: "https://canva.com/templates/preview",
        downloadFile: "https://drive.google.com/file/social-bundle",
        documentationUrl: "",
        status: "approved",
        isFeatured: false,
        tags: ["social media", "instagram", "facebook", "marketing", "canva", "posts", "stories"],
        colors: ["#E11D48", "#8B5CF6", "#06B6D4", "#FBBF24"],
        industry: "Agency",
        fileSize: "50MB",
        dimensions: "1080x1080, 1080x1920, 1200x628",
        isEditable: true,
        softwareVersion: "Canva 2024",
        layered: false,
        responsive: false,
        fontIncluded: false,
        version: "5.0.0"
    },
    {
        title: "Real Estate Branding Kit",
        platform: "Illustrator",
        templateType: "Print Template",
        accessType: "paid",
        price: 3500,
        offerPrice: 2799,
        regularLicensePrice: 3500,
        extendedLicensePrice: 7000,
        description: "Complete branding kit for real estate agencies including logo, stationery, brochures, signage, and marketing materials.",
        longDescription: "Launch your real estate brand with this comprehensive branding kit. Includes logo templates, business cards, letterheads, envelopes, brochures, property flyers, yard signs, and social media templates. All files are vector-based and fully customizable with your brand colors.",
        features: [
            "Logo Template Pack",
            "Complete Stationery Set",
            "Property Brochures",
            "Yard Sign Templates",
            "Email Signature",
            "Social Media Kit",
            "Brand Style Guide"
        ],
        filesIncluded: [".ai", ".eps", ".psd", ".pdf", ".docx"],
        compatibility: ["Illustrator CC 2020+", "Photoshop CC 2020+", "Word 2019+"],
        images: [
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
            "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800"
        ],
        previewUrl: "",
        downloadFile: "https://drive.google.com/file/realestate-kit",
        documentationUrl: "",
        status: "approved",
        isFeatured: true,
        tags: ["real estate", "branding", "property", "agency", "stationery", "marketing"],
        colors: ["#0D9488", "#134E4A", "#FFFFFF", "#F0FDFA"],
        industry: "Real Estate",
        fileSize: "520MB",
        dimensions: "Various Sizes",
        isEditable: true,
        softwareVersion: "Illustrator CC 2020+",
        layered: true,
        responsive: false,
        fontIncluded: true,
        version: "1.0.0"
    }
];

async function seedDesignTemplates() {
    try {
        console.log('🔄 Connecting to database...');
        await mongoose.connect(process.env.DATABASE_URL as string);
        console.log('✅ Connected to database');

        // Get first admin user or any user, or create one
        let admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            admin = await User.findOne({ role: 'mentor' });
        }
        if (!admin) {
            admin = await User.findOne({});
        }
        if (!admin) {
            // Create a default admin user
            console.log('⚠️ No user found, creating default admin...');
            admin = await User.create({
                email: 'admin@zayeduddin.com',
                password: 'Admin@123',
                firstName: 'Zayed',
                lastName: 'Uddin',
                role: 'admin',
                status: 'active',
                isEmailVerified: true,
            });
            console.log('✅ Created admin user');
        }
        console.log(`👤 Using user: ${admin.email} (${admin.role})`);

        // Get or create a default category for design templates
        let category = await Category.findOne({ type: 'design-template' });
        if (!category) {
            category = await Category.findOne({});
        }
        if (!category) {
            // Create a default category
            console.log('⚠️ No category found, creating default...');
            category = await Category.create({
                name: 'Graphic Templates',
                slug: 'graphic-templates',
                type: 'design-template',
                description: 'Professional graphic design templates',
                status: 'active',
                isDeleted: false,
            });
            console.log('✅ Created default category');
        }
        console.log(`📁 Using category: ${category.name}`);

        // Delete existing templates (optional - comment out to keep existing)
        // await DesignTemplate.deleteMany({});
        // console.log('🗑️ Cleared existing templates');

        // Create templates
        console.log('\n📦 Creating design templates...\n');

        for (const templateData of designTemplatesData) {
            const slug = templateData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '') + '-' + Date.now();

            const template = await DesignTemplate.create({
                ...templateData,
                author: admin._id,
                category: category._id,
                slug,
                rating: Math.floor(Math.random() * 2) + 4, // Random 4-5 rating
                reviewCount: Math.floor(Math.random() * 50) + 10,
                salesCount: Math.floor(Math.random() * 200) + 50,
                viewCount: Math.floor(Math.random() * 1000) + 200,
                likeCount: Math.floor(Math.random() * 100) + 20,
            });

            console.log(`✅ Created: ${template.title}`);
        }

        console.log('\n🎉 Successfully created 8 design templates!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

seedDesignTemplates();
