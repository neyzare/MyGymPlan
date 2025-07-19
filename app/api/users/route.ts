import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";  

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
    return NextResponse.json({error: "Erreur lors de la récupération des données"}, {status: 500});
  }
}

export async function POST(request: Request) {
  const {email, password, name} = await request.json()
try {
  const user = await prisma.user.create({
    data: {
      email,
      password,
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
  return NextResponse.json({ error: "Erreur lors de la création de l'utilisateur" }, { status: 500 });
}
}