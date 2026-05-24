import { useQuery } from "@tanstack/react-query";
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

// Fetch ALL site_content in one single request — shared across all components
const fetchAllSiteContent = async (): Promise<SiteContent[]> => {
    const { data, error } = await supabase
      .from("site_content" as any)
      .select("*")
      .order("section", { ascending: true });

    if (error) throw new Error(error.message);
    return (data as unknown as SiteContent[]) ?? [];
};

export const useSiteContent = (section?: string) => {
    // React Query caches by key "site_content" — only 1 network call total,
    // shared by all components. staleTime prevents re-fetches on re-mount.
    const {
          data: allContent = [],
          isLoading: loading,
          error: queryError,
    } = useQuery({
          queryKey: ["site_content"],
          queryFn: fetchAllSiteContent,
          staleTime: 5 * 60 * 1000, // cache valid for 5 minutes
          gcTime: 10 * 60 * 1000,   // keep in memory for 10 minutes
    });

    const error = queryError ? (queryError as Error).message : null;

    // Filter by section if requested
    const filtered = section
      ? allContent.filter((item) => item.section === section)
          : allContent;

    // Build key->item map for quick lookup
    const content = filtered.reduce((acc, item) => {
          acc[item.key] = item;
          return acc;
    }, {} as Record<string, SiteContent>);

    // Utility: get content value by key
    const getContent = (key: string, defaultValue: string = "") => {
          return content[key]?.content || defaultValue;
    };

    // Utility: get image URL by key
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
