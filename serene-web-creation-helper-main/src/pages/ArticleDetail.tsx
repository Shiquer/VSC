import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  category: string | null;
  tags: string[] | null;
  created_at: string;
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (error) {
      console.error("Erreur lors du chargement de l'article:", error);
      setError("Article introuvable");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Skeleton className="h-12 w-24 mb-8" />
            <Skeleton className="h-16 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-8" />
            <Skeleton className="h-96 w-full mb-8" />
            <Skeleton className="h-64 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Article introuvable
            </h1>
            <p className="text-soft-gray mb-8">
              Désolé, cet article n'existe pas ou a été supprimé.
            </p>
            <Button asChild>
              <Link to="/mediatheque">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à la médiathèque
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/mediatheque">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la médiathèque
            </Link>
          </Button>

          {article.featured_image_url && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={article.featured_image_url}
                alt={article.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          <div className="mb-6">
            {article.category && (
              <Badge variant="outline" className="mb-4">
                {article.category}
              </Badge>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-soft-gray text-sm mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(article.created_at).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </div>
            </div>

            {article.excerpt && (
              <p className="text-xl text-soft-gray leading-relaxed italic border-l-4 border-primary pl-4 mb-8">
                {article.excerpt}
              </p>
            )}
          </div>

          <div
            className="prose prose-lg max-w-none text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: article.content && (
                article.content.trim().startsWith('<') ? article.content : 
                article.content.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')
              ) || ''
            }}
          />

          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-soft-gray" />
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Button size="lg" asChild className="bg-gradient-warm">
              <Link to="/contact">
                Prendre rendez-vous
              </Link>
            </Button>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}
