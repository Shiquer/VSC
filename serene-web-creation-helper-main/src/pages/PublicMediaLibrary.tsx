import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Download, Clock, Headphones, Video, Music, Book, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface MediaContent {
  id: string; title: string; description: string | null; content_type: string;
  file_url: string; thumbnail_url: string | null; duration: string | null;
  category: string; difficulty: string; status: string; views: number | null; downloads: number | null;
}

interface Article {
  id: string; title: string; slug: string; excerpt: string | null; content: string;
  featured_image_url: string | null; category: string | null; tags: string[] | null;
  status: string; created_at: string;
}

const cardStyle = {
  background: "#fff", borderRadius: "25px", border: "1px solid hsl(var(--border))",
  overflow: "hidden", transition: "all 0.3s", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
};

const badgeStyle = (color?: string) => ({
  background: color || "hsl(var(--foreground))", color: color ? "hsl(var(--foreground))" : "hsl(var(--primary-foreground))",
  fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "25px",
  fontFamily: "'Helvetica Neue', sans-serif", display: "inline-block",
  border: color ? "1px solid hsl(var(--border))" : "none",
});

const EmptyState = ({ text }: { text: string }) => (
  <div style={{ textAlign: "center", padding: "64px 0" }}>
    <p style={{ fontSize: "16px", color: "hsl(var(--foreground))", opacity: 0.5 }}>{text}</p>
  </div>
);

const LoadingSkeleton = ({ count = 3, cols = 2 }: { count?: number; cols?: number }) => (
  <div className={`grid md:grid-cols-${cols} gap-6`}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{ ...cardStyle, padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ height: "20px", background: "hsl(var(--secondary))", borderRadius: "99px", width: "70%" }} />
        <div style={{ height: "16px", background: "hsl(var(--secondary))", borderRadius: "99px", width: "50%" }} />
        <div style={{ height: "80px", background: "hsl(var(--secondary))", borderRadius: "16px" }} />
      </div>
    ))}
  </div>
);

const PublicMediaLibrary = () => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [mediaContents, setMediaContents] = useState<MediaContent[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchMediaContents(); fetchArticles(); }, []);

  const fetchMediaContents = async () => {
    try {
      const { data, error } = await supabase.from("media_content").select("*").eq("status", "published").order("created_at", { ascending: false });
      if (error) throw error;
      setMediaContents(data || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase.from("articles").select("*").eq("status", "published").order("created_at", { ascending: false });
      if (error) throw error;
      setArticles(data || []);
    } catch (e) { console.error(e); }
  };

  const audioContent = mediaContents.filter(m => m.content_type === "audio");
  const videoContent = mediaContents.filter(m => m.content_type === "video");

  const handlePlayPause = (id: string) => setCurrentPlaying(currentPlaying === id ? null : id);

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <Header />
      <main>

        {/* Hero */}
        <section style={{ padding: "80px 0", background: "hsl(var(--secondary))" }}>
          <div className="container mx-auto px-8" style={{ textAlign: "center" }}>
            <span className="arise-badge" style={{ marginBottom: "24px", display: "inline-block" }}>Ressources gratuites</span>
            <h1 className="arise-serif" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "20px", marginTop: "16px" }}>Médiathèque</h1>
            <p style={{ fontSize: "18px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.7, maxWidth: "560px", margin: "0 auto 36px" }}>
              Accédez à notre collection de contenus audio, vidéo et articles pour pratiquer la sophrologie à votre rythme.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <button className="arise-btn-primary"><Headphones style={{ width: "18px", height: "18px" }} />Explorer les audios</button>
              <button className="arise-btn-outline"><Video style={{ width: "18px", height: "18px" }} />Voir les vidéos</button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: "80px 0" }}>
          <div className="container mx-auto px-8">
            <Tabs defaultValue="audio" className="w-full">
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
                <div style={{ display: "inline-flex", background: "hsl(var(--secondary))", borderRadius: "99px", padding: "6px", gap: "4px" }}>
                  {[
                    { value: "audio", icon: Headphones, label: "Audio" },
                    { value: "video", icon: Video, label: "Vidéo" },
                    { value: "articles", icon: BookOpen, label: "Articles" },
                  ].map(({ value, icon: Icon, label }) => (
                    <TabsList key={value} style={{ background: "transparent", padding: 0 }}>
                      <TabsTrigger value={value} style={{ borderRadius: "99px", padding: "10px 20px", fontSize: "14px", fontWeight: "700", fontFamily: "'Helvetica Neue', sans-serif" }}>
                        <Icon style={{ width: "16px", height: "16px", marginRight: "8px" }} />{label}
                      </TabsTrigger>
                    </TabsList>
                  ))}
                </div>
              </div>

              {/* Audio */}
              <TabsContent value="audio">
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h2 className="arise-serif" style={{ fontSize: "32px", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "12px" }}>Séances Audio Guidées</h2>
                  <p style={{ fontSize: "16px", color: "hsl(var(--foreground))", opacity: 0.7 }}>Des séances de sophrologie pour une pratique flexible et autonome</p>
                </div>
                {loading ? <LoadingSkeleton count={4} cols={2} /> : audioContent.length === 0 ? <EmptyState text="Aucun contenu audio disponible pour le moment." /> : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {audioContent.map(audio => (
                      <div key={audio.id} style={cardStyle}
                        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"}
                        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"}
                      >
                        <div style={{ padding: "28px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                            <div style={{ flex: 1 }}>
                              <h3 className="arise-serif" style={{ fontSize: "18px", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "8px" }}>{audio.title}</h3>
                              <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
                                <span style={badgeStyle()}>{audio.difficulty}</span>
                                <span style={{ ...badgeStyle("hsl(var(--secondary))") }}>{audio.category}</span>
                              </div>
                            </div>
                            <button onClick={() => handlePlayPause(audio.id)} style={{ width: "44px", height: "44px", borderRadius: "50%", background: "hsl(var(--foreground))", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginLeft: "12px" }}>
                              {currentPlaying === audio.id ? <Pause style={{ width: "18px", height: "18px", color: "hsl(var(--primary-foreground))" }} /> : <Play style={{ width: "18px", height: "18px", color: "hsl(var(--primary-foreground))" }} />}
                            </button>
                          </div>
                          <p style={{ fontSize: "14px", lineHeight: "1.6", color: "hsl(var(--foreground))", opacity: 0.7, marginBottom: "16px" }}>{audio.description || "Aucune description disponible"}</p>
                          {currentPlaying === audio.id && (
                            <div style={{ marginBottom: "16px" }}>
                              <div style={{ height: "4px", background: "hsl(var(--secondary))", borderRadius: "99px" }}>
                                <div style={{ height: "4px", width: "33%", background: "hsl(var(--foreground))", borderRadius: "99px" }} />
                              </div>
                            </div>
                          )}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", gap: "16px", fontSize: "13px", color: "hsl(var(--foreground))", opacity: 0.5 }}>
                              {audio.duration && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock style={{ width: "12px", height: "12px" }} />{audio.duration}</span>}
                              {audio.downloads !== null && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Download style={{ width: "12px", height: "12px" }} />{audio.downloads}</span>}
                            </div>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <button onClick={() => handlePlayPause(audio.id)} className="arise-btn-outline" style={{ height: "40px", padding: "0 16px", fontSize: "13px" }}>
                                {currentPlaying === audio.id ? <><Pause style={{ width: "14px", height: "14px" }} />Pause</> : <><Play style={{ width: "14px", height: "14px" }} />Écouter</>}
                              </button>
                              <a href={audio.file_url} download>
                                <button style={{ width: "40px", height: "40px", borderRadius: "99px", background: "transparent", border: "3px solid hsl(var(--foreground))", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                                  <Download style={{ width: "14px", height: "14px" }} />
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Video */}
              <TabsContent value="video">
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h2 className="arise-serif" style={{ fontSize: "32px", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "12px" }}>Contenus Vidéo</h2>
                  <p style={{ fontSize: "16px", color: "hsl(var(--foreground))", opacity: 0.7 }}>Apprenez les techniques visuellement avec nos tutoriels et séances vidéo</p>
                </div>
                {loading ? <LoadingSkeleton count={3} cols={3} /> : videoContent.length === 0 ? <EmptyState text="Aucun contenu vidéo disponible pour le moment." /> : (
                  <div className="grid lg:grid-cols-3 gap-6">
                    {videoContent.map(video => (
                      <div key={video.id} style={cardStyle}
                        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"}
                        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"}
                      >
                        <div style={{ position: "relative", overflow: "hidden" }}>
                          {video.thumbnail_url ? (
                            <img src={video.thumbnail_url} alt={video.title} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} />
                          ) : (
                            <div style={{ width: "100%", height: "200px", background: "hsl(var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Video style={{ width: "48px", height: "48px", color: "hsl(var(--foreground))", opacity: 0.3 }} />
                            </div>
                          )}
                          {video.duration && <span style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "12px", fontWeight: "700", padding: "3px 8px", borderRadius: "99px" }}>{video.duration}</span>}
                        </div>
                        <div style={{ padding: "24px" }}>
                          <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
                            <span style={badgeStyle()}>{video.difficulty}</span>
                            <span style={{ ...badgeStyle("hsl(var(--secondary))") }}>{video.category}</span>
                          </div>
                          <h3 className="arise-serif" style={{ fontSize: "18px", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "8px" }}>{video.title}</h3>
                          <p style={{ fontSize: "13px", lineHeight: "1.6", color: "hsl(var(--foreground))", opacity: 0.7, marginBottom: "16px" }}>{video.description || "Aucune description disponible"}</p>
                          {video.views !== null && <p style={{ fontSize: "12px", color: "hsl(var(--foreground))", opacity: 0.4, marginBottom: "16px" }}>{video.views} vues</p>}
                          <a href={video.file_url} target="_blank" rel="noopener noreferrer">
                            <button className="arise-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                              <Play style={{ width: "16px", height: "16px" }} />Regarder
                            </button>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Articles */}
              <TabsContent value="articles">
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h2 className="arise-serif" style={{ fontSize: "32px", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "12px" }}>Articles de Blog</h2>
                  <p style={{ fontSize: "16px", color: "hsl(var(--foreground))", opacity: 0.7 }}>Découvrez nos articles sur la sophrologie, le bien-être et la santé mentale</p>
                </div>
                {loading ? <LoadingSkeleton count={3} cols={3} /> : articles.length === 0 ? <EmptyState text="Aucun article disponible pour le moment." /> : (
                  <div className="grid lg:grid-cols-3 gap-6">
                    {articles.map(article => (
                      <div key={article.id} style={cardStyle}
                        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"}
                        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"}
                      >
                        <div style={{ overflow: "hidden" }}>
                          {article.featured_image_url ? (
                            <img src={article.featured_image_url} alt={article.title} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} />
                          ) : (
                            <div style={{ width: "100%", height: "200px", background: "hsl(var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <BookOpen style={{ width: "48px", height: "48px", color: "hsl(var(--foreground))", opacity: 0.3 }} />
                            </div>
                          )}
                        </div>
                        <div style={{ padding: "24px" }}>
                          {article.category && <span style={{ ...badgeStyle("hsl(var(--secondary))"), marginBottom: "12px", display: "inline-block" }}>{article.category}</span>}
                          <h3 className="arise-serif" style={{ fontSize: "18px", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "8px", marginTop: "8px" }}>{article.title}</h3>
                          <p style={{ fontSize: "13px", lineHeight: "1.6", color: "hsl(var(--foreground))", opacity: 0.7, marginBottom: "12px" }}>
                            {article.excerpt || article.content.substring(0, 150) + "..."}
                          </p>
                          <p style={{ fontSize: "12px", color: "hsl(var(--foreground))", opacity: 0.4, marginBottom: "16px" }}>
                            {new Date(article.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                          </p>
                          <Link to={`/article/${article.slug}`}>
                            <button className="arise-btn-primary" style={{ width: "100%", justifyContent: "center" }}>Lire l'article</button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: "80px 0", background: "hsl(var(--secondary))" }}>
          <div className="container mx-auto px-8">
            <h2 className="arise-serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: "400", color: "hsl(var(--foreground))", textAlign: "center", marginBottom: "48px" }}>Votre pratique, où que vous soyez</h2>
            <div className="grid md:grid-cols-3 gap-8" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
              {[
                { icon: Music, title: "Qualité Audio HD", desc: "Enregistrements haute définition pour une expérience d'écoute optimale." },
                { icon: Download, title: "Téléchargement", desc: "Téléchargez vos contenus favoris pour une écoute hors ligne." },
                { icon: Book, title: "Contenu Exclusif", desc: "Accès à des séances exclusives créées spécialement pour nos clients." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "64px", height: "64px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon style={{ width: "28px", height: "28px", color: "hsl(var(--primary-foreground))" }} />
                  </div>
                  <h3 className="arise-serif" style={{ fontSize: "18px", fontWeight: "400", color: "hsl(var(--foreground))" }}>{title}</h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PublicMediaLibrary;