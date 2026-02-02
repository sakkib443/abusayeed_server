import { Types } from 'mongoose';

/**
 * Platform Options for Design Templates
 */
export const DESIGN_PLATFORM_OPTIONS = [
    'Figma',
    'Photoshop',
    'Illustrator',
    'Adobe XD',
    'Sketch',
    'Canva',
    'HTML/CSS',
    'React',
    'Next.js',
    'Tailwind CSS',
    'WordPress',
    'Elementor',
    'Bootstrap',
    'InDesign',
    'After Effects',
    'Premiere Pro',
    'Other'
] as const;

export type TDesignPlatform = typeof DESIGN_PLATFORM_OPTIONS[number];

/**
 * Design Template Type Options
 */
export const DESIGN_TYPE_OPTIONS = [
    'UI Kit',
    'Website Template',
    'Landing Page',
    'Mobile App Design',
    'Social Media Graphic',
    'Presentation',
    'Logo',
    'Vector Graphic',
    'Illustration',
    'Print Template',
    'Email Template',
    'Icon Set',
    'Font',
    'Mockup',
    'Business Card',
    'Flyer',
    'Other'
] as const;

export type TDesignType = typeof DESIGN_TYPE_OPTIONS[number];

/**
 * Industry Options for Design Templates
 */
export const INDUSTRY_OPTIONS = [
    'eCommerce',
    'Restaurant',
    'Portfolio',
    'Corporate',
    'Agency',
    'Healthcare',
    'Education',
    'Real Estate',
    'Technology',
    'Fashion',
    'Travel',
    'Finance',
    'Entertainment',
    'Sports',
    'Non-Profit',
    'Wedding',
    'Photography',
    'Blog',
    'Magazine',
    'Other'
] as const;

export type TIndustry = typeof INDUSTRY_OPTIONS[number];

/**
 * IDesignTemplate - Main design template product data structure
 */
export interface IDesignTemplate {
    _id?: Types.ObjectId;

    // Basic Info
    title: string;
    slug: string;
    author: Types.ObjectId;          // User (seller) reference
    platform: TDesignPlatform;       // Platform enum
    category: Types.ObjectId;        // Category reference

    // Type & Access
    templateType: TDesignType;       // Design type enum
    accessType: 'free' | 'paid';

    // Pricing
    price: number;
    offerPrice?: number;

    // Licensing
    licenseType: 'regular' | 'extended';
    regularLicensePrice: number;
    extendedLicensePrice?: number;

    // Ratings & Sales
    rating: number;                  // Average rating (1-5)
    reviewCount: number;
    salesCount: number;

    // Analytics & Engagement
    viewCount: number;               // Page view count
    likeCount: number;               // Total likes
    likedBy: Types.ObjectId[];       // Users who liked this template

    // Details
    version: string;                 // e.g., "1.0.0"
    features: string[];              // Feature list
    filesIncluded: string[];         // Files included (e.g., .fig, .psd, .html)
    description: string;             // Short description
    longDescription?: string;        // Full description (markdown)

    // Compatibility
    compatibility?: string[];        // Compatibility info

    // Media
    images: string[];                // Screenshot URLs
    previewUrl?: string;             // Live demo/preview URL
    downloadFile: string;            // Secure file path/URL
    documentationUrl?: string;       // Documentation link

    // Status
    status: 'pending' | 'approved' | 'rejected' | 'draft';
    isDeleted: boolean;
    isFeatured: boolean;

    // ==================== NEW OPTIONAL FIELDS ====================
    // Tags & SEO
    tags?: string[];                 // SEO tags (e.g., "minimal", "modern", "dark")

    // Visual Info
    colors?: string[];               // Color palette (e.g., "#FF5733", "blue")
    industry?: TIndustry;            // Industry category

    // File Info
    fileSize?: string;               // File size (e.g., "25MB", "1.2GB")
    dimensions?: string;             // Dimensions (e.g., "1920x1080", "A4")

    // Technical Info
    isEditable?: boolean;            // Source file editable
    softwareVersion?: string;        // Required software version (e.g., "Photoshop CC 2023")
    layered?: boolean;               // Has layers (PSD/AI)
    responsive?: boolean;            // Is responsive (web templates)
    fontIncluded?: boolean;          // Font files included

    // Dates
    publishDate?: Date;
    lastUpdate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * IDesignTemplateFilters - Query filters for design template listing
 */
export interface IDesignTemplateFilters {
    searchTerm?: string;
    category?: string;
    platform?: TDesignPlatform;
    author?: string;
    accessType?: 'free' | 'paid';
    status?: string;
    templateType?: TDesignType;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    isFeatured?: boolean;
}

/**
 * IDesignTemplateQuery - Pagination and sorting options
 */
export interface IDesignTemplateQuery {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
