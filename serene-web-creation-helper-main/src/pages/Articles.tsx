import usePageTitle from "@/hooks/usePageTitle";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, BookOpen, ArrowRight } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  category: string | null;
  tags: string[] | null;
  status: string;
  created_at: string;
  published_at: string | null;
}

const Articles = () => {
  usePageTitle("Articles - Natalia Kourycheva");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, excerpt, featured_image_url, category, tags, status, created_at, published_at")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Erreur articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Articles
              </h1>
            </div>
            <p className="text-xl text-soft-gray max-w-2xl mx-auto">
              Ressources, conseils et réflexions sur la psychanalyse, l'hypnothérapie et le mieux-être.
            </p>
          </div>
        </section>

        {/* Articles list */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            {loading ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                    <Skeleton className="h-48 w-full rounded-t-lg" />
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-xl text-soft-gray">Aucun article publié pour le moment.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {articles.map((article) => (
                  <Card key={article.id} className="group hover:shadow-warm transition-all duration-300 overflow-hidden">
                    {article.featured_image_url && (
                      <div className="overflow-hidden h-48">
                        <img
                          src={article.featured_image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {article.category && (
                          <Badge variant="outline">{article.category}</Badge>
                        )}
                        <span className="text-xs text-soft-gray flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(article.published_at || article.created_at)}
                        </span>
                      </div>
                      <CardTitle className="text-lg text-foreground leading-snug group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    {article.excerpt && (
                      <CardContent className="pt-0">
                        <p className="text-soft-gray text-sm leading-relaxed line-clamp-3 mb-4">
                          {article.excerpt}
                        </p>
                        <Link
                          to={`/articles/${article.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                          Lire l'article
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </CardContent>
                    )}
                    {!article.excerpt && (
                      <CardContent className="pt-0">
                        <Link
                          to={`/articles/${article.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                          Lire l'article
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;
