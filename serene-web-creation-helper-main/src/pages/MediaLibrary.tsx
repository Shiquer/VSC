import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Download, Clock, Star, Headphones, Video, Music, Book } from "lucide-react";
import { useState } from "react";

const MediaLibrary = () => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);

  const audioContent = [
    {
      id: "audio-1",
      title: "Relaxation Profonde - Détente Complète",
      description: "Séance de relaxation pour relâcher toutes les tensions corporelles et mentales",
      duration: "15:30",
      category: "Relaxation",
      difficulty: "Débutant",
      rating: 4.8,
      downloads: 1250,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: "audio-2", 
      title: "Préparation à l'Examen - Confiance en Soi",
      description: "Techniques de sophrologie pour aborder sereinement les examens et concours",
      duration: "12:45",
      category: "Préparation mentale",
      difficulty: "Intermédiaire",
      rating: 4.9,
      downloads: 890,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: "audio-3",
      title: "Sommeil Réparateur - Endormissement Facile",
      description: "Guidance pour favoriser l'endormissement et améliorer la qualité du sommeil",
      duration: "20:15",
      category: "Sommeil",
      difficulty: "Tous niveaux",
      rating: 4.7,
      downloads: 2100,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: "audio-4",
      title: "Gestion du Stress - Techniques Respiratoires",
      description: "Exercices de respiration pour gérer le stress et l'anxiété au quotidien",
      duration: "10:30",
      category: "Anti-stress",
      difficulty: "Débutant",
      rating: 4.6,
      downloads: 1560,
      thumbnail: "/api/placeholder/300/200"
    }
  ];

  const videoContent = [
    {
      id: "video-1",
      title: "Introduction à la Sophrologie",
      description: "Découvrez les fondements de la sophrologie et ses bienfaits",
      duration: "8:30",
      category: "Formation",
      difficulty: "Débutant",
      rating: 4.9,
      views: 5200,
      thumbnail: "/api/placeholder/400/250"
    },
    {
      id: "video-2",
      title: "Exercices de Relaxation Dynamique",
      description: "Apprenez les mouvements de base de la relaxation dynamique",
      duration: "15:20",
      category: "Pratique",
      difficulty: "Intermédiaire", 
      rating: 4.8,
      views: 3800,
      thumbnail: "/api/placeholder/400/250"
    },
    {
      id: "video-3",
      title: "Séance Complète de Sophrologie",
      description: "Séance complète guidée pour une pratique autonome",
      duration: "25:45",
      category: "Séance complète",
      difficulty: "Tous niveaux",
      rating: 4.7,
      views: 4500,
      thumbnail: "/api/placeholder/400/250"
    }
  ];

  const handlePlayPause = (id: string) => {
    if (currentPlaying === id) {
      setCurrentPlaying(null);
    } else {
      setCurrentPlaying(id);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Débutant": return "default";
      case "Intermédiaire": return "secondary";
      case "Avancé": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Médiathèque
            </h1>
            <p className="text-xl text-soft-gray max-w-3xl mx-auto leading-relaxed mb-8">
              Accédez à notre collection de contenus audio et vidéo pour pratiquer 
              la sophrologie à votre rythme, quand vous le souhaitez.
            </p>
            
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="audio" className="w-full">
              <div className="flex justify-center mb-12">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="audio" className="flex items-center">
                    <Headphones className="w-4 h-4 mr-2" />
                    Contenus Audio
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center">
                    <Video className="w-4 h-4 mr-2" />
                    Contenus Vidéo
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Audio Content */}
              <TabsContent value="audio">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Séances Audio Guidées
                  </h2>
                  <p className="text-lg text-soft-gray max-w-2xl mx-auto">
                    Des séances de sophrologie en audio pour une pratique flexible et autonome
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {audioContent.map((audio) => (
                    <Card key={audio.id} className="group hover:shadow-warm transition-all duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-foreground mb-2">
                              {audio.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant={getDifficultyColor(audio.difficulty)}>
                                {audio.difficulty}
                              </Badge>
                              <Badge variant="outline">
                                {audio.category}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlePlayPause(audio.id)}
                            className="ml-4"
                          >
                            {currentPlaying === audio.id ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        
                        <p className="text-soft-gray leading-relaxed mb-4">
                          {audio.description}
                        </p>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4 text-sm text-soft-gray">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {audio.duration}
                            </div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-1 fill-current text-yellow-500" />
                              {audio.rating}
                            </div>
                            <div className="flex items-center">
                              <Download className="w-4 h-4 mr-1" />
                              {audio.downloads}
                            </div>
                          </div>
                        </div>

                        {/* Progress bar simulation for currently playing */}
                        {currentPlaying === audio.id && (
                          <div className="mb-4">
                            <div className="w-full bg-background rounded-full h-2">
                              <div className="bg-gradient-warm h-2 rounded-full w-1/3 transition-all duration-1000"></div>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handlePlayPause(audio.id)}
                          >
                            {currentPlaying === audio.id ? (
                              <>
                                <Pause className="w-4 h-4 mr-2" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Écouter
                              </>
                            )}
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Video Content */}
              <TabsContent value="video">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Contenus Vidéo
                  </h2>
                  <p className="text-lg text-soft-gray max-w-2xl mx-auto">
                    Apprenez les techniques visuellement avec nos tutoriels et séances vidéo
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {videoContent.map((video) => (
                    <Card key={video.id} className="group hover:shadow-warm transition-all duration-300">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          loading="lazy"
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            size="lg" 
                            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                          >
                            <Play className="w-6 h-6 mr-2" />
                            Regarder
                          </Button>
                        </div>
                        <Badge className="absolute top-3 right-3 bg-black/60 text-white">
                          {video.duration}
                        </Badge>
                      </div>
                      
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant={getDifficultyColor(video.difficulty)}>
                            {video.difficulty}
                          </Badge>
                          <Badge variant="outline">
                            {video.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-foreground">
                          {video.title}
                        </CardTitle>
                        <p className="text-soft-gray leading-relaxed">
                          {video.description}
                        </p>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex items-center justify-between mb-4 text-sm text-soft-gray">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-current text-yellow-500" />
                            {video.rating}
                          </div>
                          <div>
                            {video.views} vues
                          </div>
                        </div>
                        
                        <Button className="w-full bg-gradient-warm">
                          <Play className="w-4 h-4 mr-2" />
                          Regarder
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-cream-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
                Votre pratique, où que vous soyez
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Qualité Audio HD</h3>
                  <p className="text-soft-gray">
                    Enregistrements haute définition pour une expérience d'écoute optimale.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Téléchargement</h3>
                  <p className="text-soft-gray">
                    Téléchargez vos contenus favoris pour une écoute hors ligne.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto">
                    <Book className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Contenu Exclusif</h3>
                  <p className="text-soft-gray">
                    Accès à des séances exclusives créées spécialement pour nos clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MediaLibrary;
