import { prisma } from "../lib/prisma";
import { hash } from "bcrypt";

async function main() {
  try {
    // Clean existing data
    await prisma.workoutExercise.deleteMany();
    await prisma.workoutSession.deleteMany();
    await prisma.program.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.user.deleteMany();

    // Create default user
    const defaultUser = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        password: await hash("password123", 10),
      },
    });

    // Create default exercises
    const exercises = await prisma.exercise.createMany({
      data: [
        {
          name: "Biceps Curl",
          description: "Curl exercise for biceps development",
          type: "biceps",
          imageUrl: "/assets/biceps-curl.jpeg",
        },
        {
          name: "Triceps Extension",
          description: "Extension exercise for triceps development",
          type: "triceps",
          imageUrl: "/assets/extension-triceps.jpeg",
        },
        {
          name: "Bench Press",
          description: "Classic chest exercise",
          type: "chest",
          imageUrl: "/assets/developper-coucher.jpeg",
        },
        {
          name: "Lateral Raise",
          description: "Shoulder isolation exercise",
          type: "shoulders",
          imageUrl: "/assets/elevation-laterale.jpeg",
        },
        {
          name: "Pull-ups",
          description: "Compound back exercise",
          type: "back",
          imageUrl: null,
        },
        {
          name: "Squats",
          description: "Fundamental leg exercise",
          type: "legs",
          imageUrl: null,
        },
      ],
    });

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 