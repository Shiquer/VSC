import usePageTitle from "@/hooks/usePageTitle";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Download, Clock, Headphones, Video, Music, Book, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface MediaContent {
  id: string;
  title: string;
  description: string | null;
  content_type: string;
  file_url: string | null;
  thumbnail_url: string | null;
  duration: string | null;
  category: string | null;
  difficulty: string | null;
  status: string;
}

const MediaLibrary = () => {
  usePageTitle("Médiathèque - Natalia Kourycheva");
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [audioItems, setAudioItems] = useState<MediaContent[]>([]);
  const [videoItems, setVideoItems] = useState<MediaContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<MediaContent | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    const fetchMedia = async () => {
      const { data, error } = await supabase
        .from("media_content")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setAudioItems(data.filter((item) => item.content_type === "audio"));
        setVideoItems(data.filter((item) => item.content_type === "video"));
      }
      setLoading(false);
    };
    fetchMedia();
  }, []);

  const handlePlayPause = (id: string, url: string | null) => {
    if (!url) return;
    if (currentPlaying === id) {
      audioRefs.current[id]?.pause();
      setCurrentPlaying(null);
    } else {
      if (currentPlaying && audioRefs.current[currentPlaying]) {
        audioRefs.current[currentPlaying].pause();
      }
      if (!audioRefs.current[id]) {
        audioRefs.current[id] = new Audio(url);
        audioRefs.current[id].onended = () => setCurrentPlaying(null);
      }
      audioRefs.current[id].play();
      setCurrentPlaying(id);
    }
  };

  const getDifficultyVariant = (difficulty: string | null): "default" | "secondary" | "destructive" | "outline" => {
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
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Médiathèque</h1>
            <p className="text-xl text-soft-gray max-w-3xl mx-auto leading-relaxed mb-8">
              Accédez à notre collection de contenus audio et vidéo pour pratiquer la sophrologie à votre rythme, quand vous le souhaitez.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <Tabs defaultValue="audio" className="w-full">
                <div className="flex justify-center mb-12">
                  <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="audio" className="flex items-center">
                      <Headphones className="w-4 h-4 mr-2" />Contenus Audio
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center">
                      <Video className="w-4 h-4 mr-2" />Contenus Vidéo
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="audio">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Séances Audio Guidées</h2>
                    <p className="text-lg text-soft-gray max-w-2xl mx-auto">Des séances de sophrologie en audio pour une pratique flexible et autonome</p>
                  </div>
                  {audioItems.length === 0 ? (
                    <p className="text-center text-soft-gray py-12">Aucun contenu audio disponible pour le moment.</p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                      {audioItems.map((audio) => (
                        <div key={audio.id} className="border rounded-2xl p-6 hover:shadow-warm transition-all duration-300 bg-background">
                          {audio.thumbnail_url && (
                            <img src={audio.thumbnail_url} alt={audio.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                          )}
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground text-lg mb-2">{audio.title}</h3>
                              <div className="flex gap-2 mb-2 flex-wrap">
                                {audio.difficulty && <Badge variant={getDifficultyVariant(audio.difficulty)}>{audio.difficulty}</Badge>}
                                {audio.category && <Badge variant="outline">{audio.category}</Badge>}
                              </div>
                            </div>
                            <Button variant="outline" size="icon" onClick={() => handlePlayPause(audio.id, audio.file_url)} className="ml-3">
                              {currentPlaying === audio.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                          </div>
                          {audio.description && <p className="text-soft-gray text-sm mb-4">{audio.description}</p>}
                          {audio.duration && (
                            <div className="flex items-center gap-1 text-sm text-soft-gray mb-4">
                              <Clock className="w-4 h-4" /><span>{audio.duration}</span>
                            </div>
                          )}
                          {currentPlaying === audio.id && (
                            <div className="mb-4">
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full w-1/3 transition-all duration-1000"></div>
                              </div>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1" onClick={() => handlePlayPause(audio.id, audio.file_url)}>
                              {currentPlaying === audio.id ? <><Pause className="w-4 h-4 mr-2" />Pause</> : <><Play className="w-4 h-4 mr-2" />Écouter</>}
                            </Button>
                            {audio.file_url && (
                              <Button variant="outline" size="icon" asChild>
                                <a href={audio.file_url} download><Download className="w-4 h-4" /></a>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="video">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Contenus Vidéo</h2>
                    <p className="text-lg text-soft-gray max-w-2xl mx-auto">Apprenez les techniques visuellement avec nos tutoriels et séances vidéo</p>
                  </div>
                  {selectedVideo && (
                    <div className="mb-8 max-w-3xl mx-auto">
                      <video controls autoPlay className="w-full rounded-2xl shadow-lg" src={selectedVideo.file_url || undefined}>
                        Votre navigateur ne supporte pas la lecture vidéo.
                      </video>
                      <div className="flex justify-between items-center mt-3">
                        <h3 className="font-semibold text-foreground">{selectedVideo.title}</h3>
                        <Button variant="outline" size="sm" onClick={() => setSelectedVideo(null)}>Fermer</Button>
                      </div>
                    </div>
                  )}
                  {videoItems.length === 0 ? (
                    <p className="text-center text-soft-gray py-12">Aucun contenu vidéo disponible pour le moment.</p>
                  ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                      {videoItems.map((video) => (
                        <div key={video.id} className="border rounded-2xl overflow-hidden hover:shadow-warm transition-all duration-300 bg-background group">
                          <div className="relative">
                            {video.thumbnail_url ? (
                              <img src={video.thumbnail_url} alt={video.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                            ) : (
                              <div className="w-full h-48 bg-muted flex items-center justify-center">
                                <Video className="w-12 h-12 text-muted-foreground" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button size="lg" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30" onClick={() => setSelectedVideo(video)}>
                                <Play className="w-6 h-6 mr-2" />Regarder
                              </Button>
                            </div>
                            {video.duration && <Badge className="absolute top-3 right-3 bg-black/60 text-white">{video.duration}</Badge>}
                          </div>
                          <div className="p-5">
                            <div className="flex gap-2 mb-3 flex-wrap">
                              {video.difficulty && <Badge variant={getDifficultyVariant(video.difficulty)}>{video.difficulty}</Badge>}
                              {video.category && <Badge variant="outline">{video.category}</Badge>}
                            </div>
                            <h3 className="font-semibold text-foreground text-lg mb-2">{video.title}</h3>
                            {video.description && <p className="text-soft-gray text-sm mb-4">{video.description}</p>}
                            <Button className="w-full bg-primary text-primary-foreground" onClick={() => setSelectedVideo(video)}>
                              <Play className="w-4 h-4 mr-2" />Regarder
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </section>

        <section className="py-20 bg-cream-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Votre pratique, où que vous soyez</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Qualité Audio HD</h3>
                  <p className="text-soft-gray">Enregistrements haute définition pour une expérience d'écoute optimale.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Téléchargement</h3>
                  <p className="text-soft-gray">Téléchargez vos contenus favoris pour une écoute hors ligne.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto">
                    <Book className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Contenu Exclusif</h3>
                  <p className="text-soft-gray">Accès à des séances exclusives créées spécialement pour nos clients.</p>
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
