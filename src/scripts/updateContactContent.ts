/**
 * Replace the demo (Hi Ict Park) contact content with the real Creative Solve CS
 * / Abu Sayeed details. Safe & idempotent — just re-sets the `contact` design doc.
 *
 * Run from backend root:  npx ts-node --transpile-only src/scripts/updateContactContent.ts
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

import { Design } from "../app/modules/design/design.model";

const contactContent = {
  hero: {
    badge: "Get In Touch",
    badgeBn: "যোগাযোগ করুন",
    title1: "Let's ",
    title1Bn: "আমাদের সাথে ",
    title2: "Connect",
    title2Bn: "যোগাযোগ করুন",
    subtitle:
      "Have a question about courses, admissions, or design services? Reach out to the Creative Solve CS team — we're happy to help!",
    subtitleBn:
      "কোর্স, ভর্তি বা ডিজাইন সার্ভিস নিয়ে কোনো প্রশ্ন? Creative Solve CS টিমের সাথে যোগাযোগ করুন — আমরা সাহায্য করতে প্রস্তুত!",
  },
  contactInfo: {
    email: "info@abusayeed.com",
    phone: "+880 1516-153972",
    address: "Bogura, Bangladesh",
    addressBn: "বগুড়া, বাংলাদেশ",
    officeHours: "Sat - Thu: 10:00 AM - 6:00 PM",
    officeHoursBn: "শনি - বৃহঃ: সকাল ১০টা - সন্ধ্যা ৬টা",
  },
  socialLinks: {
    facebook: "https://www.facebook.com/Trainer.AbuSayeed",
    youtube: "",
    linkedin: "",
    whatsapp: "https://wa.me/8801516153972",
    instagram: "",
  },
  whatsappSection: {
    title: "Need Quick Help?",
    titleBn: "দ্রুত সাহায্য দরকার?",
    description: "Chat with us on WhatsApp for instant support on courses, admission and design services.",
    descriptionBn: "কোর্স, ভর্তি ও ডিজাইন সার্ভিস নিয়ে তাৎক্ষণিক সাপোর্টের জন্য হোয়াটসঅ্যাপে চ্যাট করুন।",
    buttonText: "Chat on WhatsApp",
    buttonTextBn: "হোয়াটসঅ্যাপে চ্যাট করুন",
  },
  // Empty → the frontend builds the map from the address (Bogura), so it stays dynamic.
  mapEmbedUrl: "",
};

async function run() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  console.log("🔌 Connecting to MongoDB...");
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("✅ Connected");

  const result = await Design.updateOne(
    { section: "contact" },
    { $set: { section: "contact", contactContent, isActive: true } },
    { upsert: true }
  );

  console.log(`✏️  Contact content updated (matched: ${result.matchedCount}, modified: ${result.modifiedCount}, upserted: ${result.upsertedCount ?? 0})`);
  console.log(`📧 ${contactContent.contactInfo.email} | 📞 ${contactContent.contactInfo.phone} | 📍 ${contactContent.contactInfo.address}`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(async (e) => {
  console.error("❌ Failed:", e);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
