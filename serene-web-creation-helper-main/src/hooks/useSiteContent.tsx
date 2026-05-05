import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteContent {
  id: string;
  key: string;
  title: string;
  content: string;
  content_type: string;
  section: string;
  image_url?: string;
}

export const useSiteContent = (section?: string) => {
  const [content, setContent] = useState<Record<string, SiteContent>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from("site_content" as any)
          .select("*");
        
        if (section) {
          query = query.eq("section", section);
        }
        
        const { data, error } = await query;

        if (error) throw error;

        // Convertir en object avec key comme clé pour un accès facile
        const contentMap = (data as unknown as SiteContent[]).reduce((acc, item) => {
          acc[item.key] = item;
          return acc;
        }, {} as Record<string, SiteContent>);

        setContent(contentMap);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement du contenu:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [section]);

  // Fonction utilitaire pour récupérer le contenu par clé
  const getContent = (key: string, defaultValue: string = "") => {
    return content[key]?.content || defaultValue;
  };

  // Fonction utilitaire pour récupérer l'image par clé
  const getImage = (key: string) => {
    return content[key]?.image_url;
  };

  return {
    content,
    loading,
    error,
    getContent,
    getImage,
  };
};