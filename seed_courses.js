const mongoose = require('mongoose');
const { Types } = mongoose;
require('dotenv').config();

const DB_URL = process.env.DB_URL || process.env.DATABASE_URL;
const CATEGORY_ID = "6980fa70d938a4dcd8619797";

async function seed() {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB");

        const coursesToInsert = [
            {
                title: "Advanced After Effects Masterclass",
                titleBn: "অ্যাডভান্সড আফটার ইফেক্টস মাস্টারক্লাস",
                slug: "advanced-after-effects-masterclass-" + Date.now(),
                description: "Master motion graphics and visual effects with our advanced AE masterclass. Learn professional workflows and techniques used in the industry.",
                thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
                category: new Types.ObjectId(CATEGORY_ID),
                price: 4500,
                discountPrice: 2500,
                courseType: "recorded",
                status: "published",
                level: "advanced",
                totalModules: 10,
                totalLessons: 30
            },
            {
                title: "Professional Video Editing with Premiere Pro",
                titleBn: "প্রফেশনাল ভিডিও এডিটিং উইথ প্রিমিয়ার প্রো",
                slug: "professional-video-editing-" + (Date.now() + 1),
                description: "Comprehensive guide to professional video editing. From basic cuts to advanced color grading and storytelling techniques.",
                thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800",
                category: new Types.ObjectId(CATEGORY_ID),
                price: 3500,
                discountPrice: 1800,
                courseType: "recorded",
                status: "published",
                level: "intermediate",
                totalModules: 10,
                totalLessons: 30
            },
            {
                title: "3D Animation Fundamentals with Blender",
                titleBn: "থ্রিডি অ্যানিমেশন ফান্ডামেন্টালস উইথ ব্লেন্ডার",
                slug: "3d-animation-blender-" + (Date.now() + 2),
                description: "Enter the world of 3D. Learn modeling, sculpting, texturing, and basic animation using the powerful open-source tool Blender.",
                thumbnail: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800",
                category: new Types.ObjectId(CATEGORY_ID),
                price: 5000,
                discountPrice: 3000,
                courseType: "recorded",
                status: "published",
                level: "beginner",
                totalModules: 10,
                totalLessons: 30
            }
        ];

        for (const courseData of coursesToInsert) {
            console.log(`Inserting course: ${courseData.title}`);

            // Insert Course
            const course = await mongoose.connection.db.collection('courses').insertOne({
                ...courseData,
                modules: [],
                lessons: [],
                tags: ["motion graphics", "video editing", "animation"],
                features: ["Lifetime access", "Completion certificate", "Project files included"],
                createdAt: new Date(),
                updatedAt: new Date()
            });

            const courseId = course.insertedId;
            const moduleIds = [];
            const lessonIds = [];

            for (let i = 1; i <= 10; i++) {
                // Insert Module
                const moduleTitle = `Module ${i}: ${getModuleTitle(i, courseData.title)}`;
                const module = await mongoose.connection.db.collection('modules').insertOne({
                    course: courseId,
                    title: moduleTitle,
                    order: i,
                    isPublished: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });

                const moduleId = module.insertedId;
                moduleIds.push(moduleId);

                for (let j = 1; j <= 3; j++) {
                    // Insert Lesson
                    const lessonOrder = (i - 1) * 3 + j;
                    const lessonTitle = `Lesson ${lessonOrder}: ${getLessonTitle(lessonOrder)}`;
                    const lesson = await mongoose.connection.db.collection('lessons').insertOne({
                        course: courseId,
                        module: moduleId,
                        title: lessonTitle,
                        order: j,
                        isFree: j === 1 && i === 1,
                        isPublished: true,
                        lessonType: "video",
                        videoUrl: "https://vimeo.com/836442654", // Dummy video
                        videoProvider: "vimeo",
                        videoDuration: 600,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });

                    lessonIds.push(lesson.insertedId);
                }
            }

            // Update Course with IDs
            await mongoose.connection.db.collection('courses').updateOne(
                { _id: courseId },
                {
                    $set: {
                        modules: moduleIds,
                        lessons: lessonIds
                    }
                }
            );
        }

        console.log("Seeding completed successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Error during seeding:", err);
        process.exit(1);
    }
}

function getModuleTitle(index, courseTitle) {
    const titles = [
        "Introduction & Workspace Setup",
        "Fundamental Concepts",
        "Basic Tools and Techniques",
        "Intermediate Workflows",
        "Advanced Features Explained",
        "Creative Problem Solving",
        "Industry Production Ready",
        "Efficiency & Optimization",
        "Master Class Techniques",
        "Final Project & Conclusion"
    ];
    return titles[index - 1] || "Extra Module Content";
}

function getLessonTitle(index) {
    const titles = [
        "Getting Started",
        "Introduction to Tools",
        "Setting up Preferences",
        "Understanding the Logic",
        "Basic Walkthrough",
        "Project Structure",
        "First Simple Project",
        "Common Pitfalls",
        "Workflow Efficiency",
        "Layer Management",
        "Keyframes and Timing",
        "Curves Explained",
        "Introduction to Effects",
        "Color Theory in Practice",
        "Exporting for Web",
        "Advanced Compositing",
        "Masking Mastery",
        "Expression Basics",
        "Dynamic Elements",
        "Scripting 101",
        "Particles and Simulation",
        "Lighting and Shadows",
        "Rendering Optimization",
        "Third-party Plugins",
        "Client Feedback Loop",
        "Professional Review",
        "Portfolio Preparation",
        "Career Advice",
        "Final Project Part 1",
        "Course Recap & Next Steps"
    ];
    return titles[index - 1] || `In-depth Lesson ${index}`;
}

seed();
