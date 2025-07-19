import { PrismaClient } from '../lib/generated/prisma'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  try {
    // Supprime les données existantes
    await prisma.user.deleteMany()

    // Crée quelques utilisateurs de test
    const users = [
      {
        email: 'john@example.com',
        name: 'John Doe',
        password: await bcrypt.hash('password123', 10)
      },
      {
        email: 'jane@example.com',
        name: 'Jane Smith',
        password: await bcrypt.hash('password456', 10)
      },
      {
        email: 'bob@example.com',
        name: 'Bob Wilson',
        password: await bcrypt.hash('password789', 10)
      }
    ]

    for (const user of users) {
      await prisma.user.create({
        data: user
      })
    }

    console.log('Base de données remplie avec les données de test !')
  } catch (error) {
    console.error('Erreur:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main() 