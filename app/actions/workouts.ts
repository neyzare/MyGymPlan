"use server";
import { prisma } from "@/lib/prisma";

export async function getWorkouts() {
  return await prisma.workout.findMany({
    include: {
      exercises: true,
    },
  });
}

export async function getWorkoutBySlug(slug: string) {
  return await prisma.workout.findUnique({
    where: {
      slug,
    },
  });
}