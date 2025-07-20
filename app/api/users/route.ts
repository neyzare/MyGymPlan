import { NextResponse } from "next/server";
import { PrismaClient } from '@/lib/generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Erreur GET:", error);
    return NextResponse.json({error: "Erreur lors de la récupération des données"}, {status: 500});
  }
}

export async function POST(request: Request) {
  try {
    const {email, password, name} = await request.json();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Un utilisateur avec cet email existe déjà" }, { status: 400 });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Erreur POST:", error);
    return NextResponse.json({ error: "Erreur lors de la création de l'utilisateur" }, { status: 500 });
  }
}