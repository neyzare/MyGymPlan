import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises',  
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

    const createdExercises = [];
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
