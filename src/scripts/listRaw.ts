import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { DesignTemplate } from '../app/modules/designTemplate/designTemplate.model';

dotenv.config();

async function listAll() {
    await mongoose.connect(process.env.DATABASE_URL as string);

    // Get all templates directly from DB (bypassing isDeleted filter)
    const rawTemplates = await DesignTemplate.collection.find({}).toArray();

    console.log('\n📊 Raw Templates in DB:', rawTemplates.length);

    rawTemplates.forEach((t, i) => {
        console.log(`${i + 1}. ${t.title}`);
        console.log(`   - isDeleted: ${t.isDeleted}`);
        console.log(`   - status: ${t.status}`);
        console.log(`   - _id: ${t._id}`);
        console.log('');
    });

    process.exit(0);
}

listAll();
