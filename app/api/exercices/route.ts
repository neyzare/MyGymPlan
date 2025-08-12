import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shouldSync = searchParams.get("sync") === "true";

  // By default, return exercises from the database
  if (!shouldSync) {
    try {
      const exercises = await prisma.exercise.findMany({
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(exercises);
    } catch (error) {
      console.error("Erreur lors de la récupération des exercices depuis la DB:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des exercices" },
        { status: 500 }
      );
    }
  }

  // If sync=true, pull from external API and insert missing exercises
  const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/name/',  
    headers: {
      'x-rapidapi-key': process.env.API_KEY_EXERCICEDB,
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    const exercises = response.data;
    
    const exercisesToCreate = exercises.map((exercise: any) => ({
      name: exercise.name,
      description: exercise.instructions?.join(' ') || '',
      type: exercise.target || exercise.bodyPart || 'general',
      imageUrl: exercise.gifUrl || null,
    }));

    const createdExercises = [] as any[];
    for (const exerciseData of exercisesToCreate) {

      const existingExercise = await prisma.exercise.findFirst({
        where: { name: exerciseData.name }
      });

      if (!existingExercise) {
        const newExercise = await prisma.exercise.create({
          data: exerciseData
        });
        createdExercises.push(newExercise);
      }
    }

    return NextResponse.json({
      message: `${createdExercises.length} nouveaux exercices ajoutés`,
      addedExercises: createdExercises.length,
      totalFromAPI: exercises.length
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des exercices" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, type, imageUrl } = body;

    if (!name || !type) {
      return NextResponse.json(
        { error: "Name and type are required" },
        { status: 400 }
      );
    }

    const exercise = await prisma.exercise.create({
      data: {
        name,
        description,
        type,
        imageUrl,
      },
    });

    return NextResponse.json(exercise, { status: 201 });
  } catch (error) {
    console.error("Error creating exercise:", error);
    return NextResponse.json(
      { error: "Failed to create exercise" },
      { status: 500 }
    );
  }
}
