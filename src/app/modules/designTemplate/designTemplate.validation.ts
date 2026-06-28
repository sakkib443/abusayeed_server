import { z } from 'zod';
import { DESIGN_PLATFORM_OPTIONS, DESIGN_TYPE_OPTIONS, INDUSTRY_OPTIONS } from './designTemplate.interface';

/**
 * Create Design Template Validation
 */
export const createDesignTemplateValidation = z.object({
    body: z.object({
        // ── Required: only the essentials ──
        title: z.string({ required_error: 'Title is required' }).min(1).max(200),
        category: z.string({ required_error: 'Category is required' }),
        images: z.array(z.string()).min(1, 'At least one image is required'),

        // ── Everything else is optional ──
        slug: z.string().optional(),
        platform: z.enum(DESIGN_PLATFORM_OPTIONS).optional(),
        templateType: z.enum(DESIGN_TYPE_OPTIONS).optional(),
        accessType: z.enum(['free', 'paid']).optional().default('paid'),
        price: z.number().min(0).optional().default(0),
        offerPrice: z.number().min(0).optional().nullable(),
        licenseType: z.enum(['regular', 'extended']).optional().default('regular'),
        regularLicensePrice: z.number().min(0).optional().default(0),
        extendedLicensePrice: z.number().min(0).optional().nullable(),
        version: z.string().optional().default('1.0.0'),
        features: z.array(z.string()).optional().default([]),
        filesIncluded: z.array(z.string()).optional().default([]),
        description: z.string().max(1000).optional(),
        longDescription: z.string().optional(),
        compatibility: z.array(z.string()).optional().default([]),
        previewUrl: z.string().url().optional().or(z.literal('')),
        downloadFile: z.string().optional(),
        documentationUrl: z.string().url().optional().or(z.literal('')),
        status: z.enum(['pending', 'approved', 'rejected', 'draft']).optional(),
        isFeatured: z.boolean().optional(),
        tags: z.array(z.string()).optional().default([]),
        colors: z.array(z.string()).optional().default([]),
        industry: z.enum(INDUSTRY_OPTIONS).optional(),
        fileSize: z.string().optional(),
        dimensions: z.string().optional(),
        isEditable: z.boolean().optional().default(true),
        softwareVersion: z.string().optional(),
        layered: z.boolean().optional().default(false),
        responsive: z.boolean().optional().default(false),
        fontIncluded: z.boolean().optional().default(false),
    }),
});

/**
 * Update Design Template Validation
 */
export const updateDesignTemplateValidation = z.object({
    body: z.object({
        title: z.string().min(1).max(200).optional(),
        slug: z.string().optional(),
        platform: z.enum(DESIGN_PLATFORM_OPTIONS).optional(),
        category: z.string().optional(),
        templateType: z.enum(DESIGN_TYPE_OPTIONS).optional(),
        accessType: z.enum(['free', 'paid']).optional(),
        price: z.number().min(0).optional(),
        offerPrice: z.number().min(0).optional().nullable(),
        licenseType: z.enum(['regular', 'extended']).optional(),
        regularLicensePrice: z.number().min(0).optional(),
        extendedLicensePrice: z.number().min(0).optional().nullable(),
        version: z.string().optional(),
        features: z.array(z.string()).optional(),
        filesIncluded: z.array(z.string()).optional(),
        description: z.string().max(1000).optional(),
        longDescription: z.string().optional(),
        compatibility: z.array(z.string()).optional(),
        images: z.array(z.string()).optional(),
        previewUrl: z.string().optional(),
        downloadFile: z.string().optional(),
        documentationUrl: z.string().optional(),
        status: z.enum(['pending', 'approved', 'rejected', 'draft']).optional(),
        isFeatured: z.boolean().optional(),
        // New optional fields
        tags: z.array(z.string()).optional(),
        colors: z.array(z.string()).optional(),
        industry: z.enum(INDUSTRY_OPTIONS).optional(),
        fileSize: z.string().optional(),
        dimensions: z.string().optional(),
        isEditable: z.boolean().optional(),
        softwareVersion: z.string().optional(),
        layered: z.boolean().optional(),
        responsive: z.boolean().optional(),
        fontIncluded: z.boolean().optional(),
    }),
});

/**
 * Design Template Query Validation
 */
export const designTemplateQueryValidation = z.object({
    query: z.object({
        page: z.string().optional(),
        limit: z.string().optional(),
        searchTerm: z.string().optional(),
        category: z.string().optional(),
        platform: z.enum(DESIGN_PLATFORM_OPTIONS).optional(),
        templateType: z.enum(DESIGN_TYPE_OPTIONS).optional(),
        accessType: z.enum(['free', 'paid']).optional(),
        minPrice: z.string().optional(),
        maxPrice: z.string().optional(),
        minRating: z.string().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
    }),
});
