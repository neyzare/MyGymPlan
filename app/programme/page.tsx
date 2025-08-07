"use client"

import React from 'react';
import {
  Calendar,
  Dumbbell,
  Target,
  Star,
  Eye,
  Edit3,
  Copy,
  Trash2,
  MoreVertical
} from 'lucide-react';

function programmes() {
  // Données d'exemple pour les programmes
  const programs = [
    {
      id: 1,
      name: "Push Pull Legs Débutant",
      description: "Programme de force pour débutants avec progression linéaire",
      category: "Force",
      difficulty: "Débutant",
      duration: "8 semaines",
      sessionsPerWeek: 6,
      totalExercises: 18,
      muscleGroups: ["Pectoraux", "Dos", "Jambes", "Épaules", "Bras"],
      equipment: ["Haltères", "Barre", "Banc"],
      isPublic: false,
      isFavorite: true,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-18T15:30:00Z",
      author: "Alexandre Martin"
    },
    {
      id: 2,
      name: "Full Body Hypertrophie",
      description: "Programme complet corps entier pour la prise de masse musculaire",
      category: "Hypertrophie",
      difficulty: "Intermédiaire",
      duration: "12 semaines",
      sessionsPerWeek: 3,
      totalExercises: 24,
      muscleGroups: ["Corps entier"],
      equipment: ["Haltères", "Barre", "Machines", "Câbles"],
      isPublic: true,
      isFavorite: false,
      createdAt: "2024-01-10T14:20:00Z",
      updatedAt: "2024-01-16T09:15:00Z",
      author: "Alexandre Martin"
    },
    {
      id: 3,
      name: "Upper Lower Split Avancé",
      description: "Programme haut/bas du corps pour athlètes expérimentés",
      category: "Force",
      difficulty: "Avancé",
      duration: "16 semaines",
      sessionsPerWeek: 4,
      totalExercises: 32,
      muscleGroups: ["Haut du corps", "Bas du corps"],
      equipment: ["Haltères", "Barre", "Machines", "Élastiques"],
      isPublic: false,
      isFavorite: true,
      createdAt: "2024-01-05T08:45:00Z",
      updatedAt: "2024-01-17T12:00:00Z",
      author: "Alexandre Martin"
    },
    {
      id: 4,
      name: "Cardio HIIT Intensif",
      description: "Entraînement par intervalles haute intensité pour l'endurance",
      category: "Cardio",
      difficulty: "Intermédiaire",
      duration: "6 semaines",
      sessionsPerWeek: 4,
      totalExercises: 15,
      muscleGroups: ["Cardiovasculaire", "Corps entier"],
      equipment: ["Poids du corps", "Kettlebell", "Corde à sauter"],
      isPublic: true,
      isFavorite: false,
      createdAt: "2024-01-08T16:30:00Z",
      updatedAt: "2024-01-19T11:20:00Z",
      author: "Alexandre Martin"
    },
    {
      id: 5,
      name: "Mobilité & Récupération",
      description: "Programme de stretching et mobilité pour la récupération",
      category: "Mobilité",
      difficulty: "Débutant",
      duration: "4 semaines",
      sessionsPerWeek: 7,
      totalExercises: 20,
      muscleGroups: ["Mobilité générale"],
      equipment: ["Tapis", "Élastiques", "Foam roller"],
      isPublic: false,
      isFavorite: false,
      createdAt: "2024-01-12T13:15:00Z",
      updatedAt: "2024-01-14T18:45:00Z",
      author: "Alexandre Martin"
    },
    {
      id: 6,
      name: "Powerlifting Compétition",
      description: "Programme spécialisé pour la compétition en force athlétique",
      category: "Force",
      difficulty: "Avancé",
      duration: "20 semaines",
      sessionsPerWeek: 5,
      totalExercises: 12,
      muscleGroups: ["Squat", "Bench", "Deadlift"],
      equipment: ["Barre olympique", "Disques", "Rack"],
      isPublic: true,
      isFavorite: true,
      createdAt: "2024-01-01T09:00:00Z",
      updatedAt: "2024-01-20T14:30:00Z",
      author: "Alexandre Martin"
    }
  ];

  // Fonctions utilitaires pour les couleurs
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'text-green-700 bg-green-100';
      case 'Intermédiaire': return 'text-orange-700 bg-orange-100';
      case 'Avancé': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Force': return 'text-blue-700 bg-blue-100';
      case 'Hypertrophie': return 'text-purple-700 bg-purple-100';
      case 'Cardio': return 'text-red-700 bg-red-100';
      case 'Mobilité': return 'text-emerald-700 bg-emerald-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">Programmes</h3>
        <span className="text-lg text-gray-600">Apprends la musculation dès maintenant</span>
      </div>
      
      {/* Grille de cartes de programmes */}
      <div className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div key={program.id} className="group border border-gray-200 rounded-lg p-5 bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {program.name}
                    </h4>
                    {program.isFavorite && (
                      <Star className="text-yellow-500 fill-current" size={16} />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{program.description}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(program.category)}`}>
                      {program.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(program.difficulty)}`}>
                      {program.difficulty}
                    </span>
                    {program.isPublic && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium text-blue-700 bg-blue-100">
                        Public
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  {program.duration} • {program.sessionsPerWeek}x/semaine
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Dumbbell size={16} className="mr-2" />
                  {program.totalExercises} exercices
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Target size={16} className="mr-2" />
                  {program.muscleGroups.slice(0, 2).join(', ')}{program.muscleGroups.length > 2 && '...'}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Modifié: {formatDate(program.updatedAt)}
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-gray-400 hover:text-yellow-500 rounded" title="Favori">
                    <Star size={16} className={program.isFavorite ? 'fill-current text-yellow-500' : ''} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded" title="Voir">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 rounded" title="Éditer">
                    <Edit3 size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-600 rounded" title="Dupliquer">
                    <Copy size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 rounded" title="Supprimer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default programmes;