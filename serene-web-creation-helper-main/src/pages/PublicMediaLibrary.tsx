import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Download, Clock, Star, Headphones, Video, Music, Book, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

interface MediaContent {
  id: string;
  title: string;
  description: string | null;
  content_type: string;
  file_url: string;
  thumbnail_url: string | null;
  duration: string | null;
  category: string;
  difficulty: string;
  status: string;
  views: number | null;
  downloads: number | null;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  category: string | null;
  tags: string[] | null;
  status: string;
  created_at: string;
}

const MediaLibrary = () => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [mediaContents, setMediaContents] = useState<MediaContent[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMediaContents();
    fetchArticles();
  }, []);

  const fetchMediaContents = async () => {
    try {
      const { data, error } = await supabase
        .from("media_content")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMediaContents(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des contenus:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des articles:", error);
    }
  };

  const audioContent = mediaContents.filter(m => m.content_type === "audio");
  const videoContent = mediaContents.filter(m => m.content_type === "video");


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
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-warm">
                <Headphones className="w-5 h-5 mr-2" />
                Explorer les audios
              </Button>
              <Button variant="outline" size="lg">
                <Video className="w-5 h-5 mr-2" />
                Voir les vidéos
              </Button>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="audio" className="w-full">
              <div className="flex justify-center mb-12">
                <TabsList className="grid w-full max-w-3xl grid-cols-3">
                  <TabsTrigger value="audio" className="flex items-center">
                    <Headphones className="w-4 h-4 mr-2" />
                    Contenus Audio
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center">
                    <Video className="w-4 h-4 mr-2" />
                    Contenus Vidéo
                  </TabsTrigger>
                  <TabsTrigger value="articles" className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Articles
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

                {loading ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                      <Card key={i}>
                        <CardHeader>
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-20 w-full" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : audioContent.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-soft-gray text-lg">Aucun contenu audio disponible pour le moment.</p>
                  </div>
                ) : (
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
                            {audio.description || "Aucune description disponible"}
                          </p>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4 text-sm text-soft-gray">
                              {audio.duration && (
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {audio.duration}
                                </div>
                              )}
                              {audio.downloads !== null && (
                                <div className="flex items-center">
                                  <Download className="w-4 h-4 mr-1" />
                                  {audio.downloads}
                                </div>
                              )}
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
                            <Button variant="outline" size="icon" asChild>
                              <a href={audio.file_url} download>
                                <Download className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
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

                {loading ? (
                  <div className="grid lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                      <Card key={i}>
                        <Skeleton className="h-48 w-full rounded-t-lg" />
                        <CardHeader>
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-full" />
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : videoContent.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-soft-gray text-lg">Aucun contenu vidéo disponible pour le moment.</p>
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-3 gap-8">
                    {videoContent.map((video) => (
                      <Card key={video.id} className="group hover:shadow-warm transition-all duration-300">
                        <div className="relative overflow-hidden rounded-t-lg">
                          {video.thumbnail_url ? (
                            <img 
                              src={video.thumbnail_url} 
                              alt={video.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-48 bg-cream-bg flex items-center justify-center">
                              <Video className="w-12 h-12 text-soft-gray" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              size="lg" 
                              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                              asChild
                            >
                              <a href={video.file_url} target="_blank" rel="noopener noreferrer">
                                <Play className="w-6 h-6 mr-2" />
                                Regarder
                              </a>
                            </Button>
                          </div>
                          {video.duration && (
                            <Badge className="absolute top-3 right-3 bg-black/60 text-white">
                              {video.duration}
                            </Badge>
                          )}
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
                            {video.description || "Aucune description disponible"}
                          </p>
                        </CardHeader>
                        
                        <CardContent>
                          {video.views !== null && (
                            <div className="flex items-center justify-between mb-4 text-sm text-soft-gray">
                              <div>
                                {video.views} vues
                              </div>
                            </div>
                          )}
                          
                          <Button className="w-full bg-gradient-warm" asChild>
                            <a href={video.file_url} target="_blank" rel="noopener noreferrer">
                              <Play className="w-4 h-4 mr-2" />
                              Regarder
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Articles Content */}
              <TabsContent value="articles">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Articles de Blog
                  </h2>
                  <p className="text-lg text-soft-gray max-w-2xl mx-auto">
                    Découvrez nos articles sur la sophrologie, le bien-être et la santé mentale
                  </p>
                </div>

                {loading ? (
                  <div className="grid lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                      <Card key={i}>
                        <Skeleton className="h-48 w-full rounded-t-lg" />
                        <CardHeader>
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-full" />
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : articles.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-soft-gray text-lg">Aucun article disponible pour le moment.</p>
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                      <Card key={article.id} className="group hover:shadow-warm transition-all duration-300 overflow-hidden">
                        <div className="relative overflow-hidden">
                          {article.featured_image_url ? (
                            <img 
                              src={article.featured_image_url} 
                              alt={article.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-48 bg-cream-bg flex items-center justify-center">
                              <BookOpen className="w-12 h-12 text-soft-gray" />
                            </div>
                          )}
                        </div>
                        
                        <CardHeader>
                          {article.category && (
                            <Badge variant="outline" className="mb-3 w-fit">
                              {article.category}
                            </Badge>
                          )}
                          <CardTitle className="text-lg text-foreground mb-2">
                            {article.title}
                          </CardTitle>
                          <p className="text-soft-gray text-sm leading-relaxed line-clamp-3">
                            {article.excerpt || article.content.substring(0, 150) + "..."}
                          </p>
                          <div className="text-xs text-soft-gray mt-3">
                            {new Date(article.created_at).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric"
                            })}
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <Button className="w-full bg-gradient-warm" asChild>
                            <Link to={`/article/${article.slug}`}>
                              Lire l'article
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
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