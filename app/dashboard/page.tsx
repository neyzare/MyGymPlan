"use client"

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Eye,
  Edit3,
  Copy,
  Trash2,
  MoreVertical,
  ChevronRight,
  Bell,
  Settings,
  Dumbbell,
  Target,
  Calendar,
  Users,
  Clock,
  BookOpen,
  Grid3X3,
  List,
  Star,
  Loader2
} from 'lucide-react';



const ProgramLibrary: React.FC = () => {
  const [user, setUser] = useState({
    id: 1,
    firstName: "Alexandre",
    lastName: "Martin",
    email: "alexandre@fitpro.com",
    role: "Coach Premium",
    avatar: "AM"
  });

  const [programs, setPrograms] = useState([
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
      totalExercices: 32,
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
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Tous");
  const [viewMode, setViewMode] = useState("grid"); // grid ou list
  const [loading, setLoading] = useState(false);

  const categories = ["Tous", "Force", "Hypertrophie", "Cardio", "Mobilité"];
  const difficulties = ["Tous", "Débutant", "Intermédiaire", "Avancé"];

  // Filtrage des programmes
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || program.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "Tous" || program.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Fonctions utilitaires
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Débutant': return 'text-green-700 bg-green-100';
      case 'Intermédiaire': return 'text-orange-700 bg-orange-100';
      case 'Avancé': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Force': return 'text-blue-700 bg-blue-100';
      case 'Hypertrophie': return 'text-purple-700 bg-purple-100';
      case 'Cardio': return 'text-red-700 bg-red-100';
      case 'Mobilité': return 'text-emerald-700 bg-emerald-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const toggleFavorite = (programId) => {
    setPrograms(prev => prev.map(program =>
      program.id === programId
        ? { ...program, isFavorite: !program.isFavorite }
        : program
    ));
  };

  const duplicateProgram = (program) => {
    const newProgram = {
      ...program,
      id: Math.max(...programs.map(p => p.id)) + 1,
      name: `${program.name} (Copie)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPrograms(prev => [newProgram, ...prev]);
  };

  const deleteProgram = (programId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) {
      setPrograms(prev => prev.filter(p => p.id !== programId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">MyGymPlan</h1>
            <div className="hidden md:flex items-center space-x-1 text-sm text-gray-500">
              <span>Programmes</span>
              <ChevronRight size={16} />
              <span className="text-gray-900">Bibliothèque</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Bell size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Settings size={20} />
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                <div className="text-xs text-gray-500">{user.role}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                {user.avatar}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Bibliothèque de Programmes
              </h2>
              <p className="text-gray-600">Gérez et organisez vos programmes d'entraînement</p>
            </div>
            <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
              <Plus size={20} className="mr-2" />
              Créer un Programme
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un programme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Programs Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 rounded-lg mr-4">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{programs.length}</div>
                <div className="text-sm text-gray-600">Programmes totaux</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-50 rounded-lg mr-4">
                <Star className="text-emerald-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{programs.filter(p => p.isFavorite).length}</div>
                <div className="text-sm text-gray-600">Favoris</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-50 rounded-lg mr-4">
                <Users className="text-purple-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{programs.filter(p => p.isPublic).length}</div>
                <div className="text-sm text-gray-600">Publics</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-orange-50 rounded-lg mr-4">
                <Target className="text-orange-600" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{new Set(programs.map(p => p.category)).size}</div>
                <div className="text-sm text-gray-600">Catégories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Programs Grid/List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {filteredPrograms.length} programme{filteredPrograms.length > 1 ? 's' : ''} trouvé{filteredPrograms.length > 1 ? 's' : ''}
              </h3>
              <div className="text-sm text-gray-500">
                Dernière mise à jour: {formatDate(Math.max(...programs.map(p => new Date(p.updatedAt))))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : filteredPrograms.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500 mb-4">Aucun programme trouvé</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Créer votre premier programme
              </button>
            </div>
          ) : (
            <div className="p-6">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPrograms.map((program) => (
                    <div key={program.id} className="group border border-gray-200 rounded-lg p-5 hover:border-blue-200 hover:shadow-lg transition-all duration-200">
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
                          <button
                            onClick={() => toggleFavorite(program.id)}
                            className="p-2 text-gray-400 hover:text-yellow-500 rounded"
                            title="Favori"
                          >
                            <Star size={16} className={program.isFavorite ? 'fill-current text-yellow-500' : ''} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 rounded" title="Voir">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-600 rounded" title="Éditer">
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => duplicateProgram(program)}
                            className="p-2 text-gray-400 hover:text-purple-600 rounded"
                            title="Dupliquer"
                          >
                            <Copy size={16} />
                          </button>
                          <button
                            onClick={() => deleteProgram(program.id)}
                            className="p-2 text-gray-400 hover:text-red-600 rounded"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPrograms.map((program) => (
                    <div key={program.id} className="group flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                      <div className="flex items-center flex-1">
                        <div className="flex items-center mr-4">
                          {program.isFavorite && (
                            <Star className="text-yellow-500 fill-current mr-2" size={16} />
                          )}
                          <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                            {program.name}
                          </h4>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(program.category)}`}>
                            {program.category}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(program.difficulty)}`}>
                            {program.difficulty}
                          </span>
                          <span>{program.duration}</span>
                          <span>{program.sessionsPerWeek}x/sem</span>
                          <span>{program.totalExercises} ex.</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleFavorite(program.id)}
                          className="p-2 text-gray-400 hover:text-yellow-500 rounded"
                        >
                          <Star size={16} className={program.isFavorite ? 'fill-current text-yellow-500' : ''} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 rounded">
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => duplicateProgram(program)}
                          className="p-2 text-gray-400 hover:text-purple-600 rounded"
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          onClick={() => deleteProgram(program.id)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramLibrary;