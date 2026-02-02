import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { DesignTemplate } from '../app/modules/designTemplate/designTemplate.model';

dotenv.config();

async function checkTemplates() {
    await mongoose.connect(process.env.DATABASE_URL as string);

    const count = await DesignTemplate.countDocuments();
    console.log('\n📊 Total Design Templates:', count);

    const templates = await DesignTemplate.find().select('title status isFeatured price');

    console.log('\n📋 Template List:');
    templates.forEach((t, i) => {
        console.log(`${i + 1}. ${t.title} - ৳${t.price} [${t.status}] ${t.isFeatured ? '⭐ Featured' : ''}`);
    });

    process.exit(0);
}

checkTemplates();
