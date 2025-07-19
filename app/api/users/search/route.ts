import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users/search?name=John&email=john@example.com
export async function GET(request: Request) {
  try {
    // Récupérer les paramètres de l'URL
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const email = searchParams.get('email');

    // Construire la requête de recherche
    const where: any = {};
    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive' // Recherche insensible à la casse
      };
    }
    if (email) {
      where.email = {
        contains: email,
        mode: 'insensitive'
      };
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la recherche des utilisateurs" },
      { status: 500 }
    );
  }
} 