import { useReducer, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/RichTextEditor";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url?: string;
  category?: string;
  tags?: string[];
  status: string;
  created_at: string;
}

type FormData = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  category: string;
  tags: string;
  status: string;
};

type State = {
  articles: Article[];
  loading: boolean;
  showDialog: boolean;
  searchTerm: string;
  uploadProgress: number;
  formData: FormData;
};

type Action =
  | { type: "SET_ARTICLES"; payload: Article[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SHOW_DIALOG"; payload: boolean }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_UPLOAD_PROGRESS"; payload: number }
  | { type: "UPDATE_FORM"; payload: Partial<FormData> }
  | { type: "RESET_FORM" };

const initialFormData: FormData = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featured_image_url: "",
  category: "",
  tags: "",
  status: "draft",
};

const initialState: State = {
  articles: [],
  loading: true,
  showDialog: false,
  searchTerm: "",
  uploadProgress: 0,
  formData: initialFormData,
};

function articlesReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ARTICLES": return { ...state, articles: action.payload };
    case "SET_LOADING": return { ...state, loading: action.payload };
    case "SET_SHOW_DIALOG": return { ...state, showDialog: action.payload };
    case "SET_SEARCH_TERM": return { ...state, searchTerm: action.payload };
    case "SET_UPLOAD_PROGRESS": return { ...state, uploadProgress: action.payload };
    case "UPDATE_FORM": return { ...state, formData: { ...state.formData, ...action.payload } };
    case "RESET_FORM": return { ...state, formData: initialFormData };
    default: return state;
  }
}

export default function AdminArticles() {
  const [state, dispatch] = useReducer(articlesReducer, initialState);
  const { articles, loading, showDialog, searchTerm, uploadProgress, formData } = state;
  const imageInputRef = useRef<HTMLInputElement>(null);

  const fetchArticles = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      dispatch({ type: "SET_ARTICLES", payload: data || [] });
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("Erreur lors du chargement des articles");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const uploadFile = async (file: File, bucket: string) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_UPLOAD_PROGRESS", payload: 0 });

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      let imageUrl = formData.featured_image_url;

      if (imageInputRef.current?.files?.[0]) {
        dispatch({ type: "SET_UPLOAD_PROGRESS", payload: 30 });
        imageUrl = await uploadFile(imageInputRef.current.files[0], "content-images");
        dispatch({ type: "SET_UPLOAD_PROGRESS", payload: 60 });
      }

      const tagsArray = formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [];

      const articleData = {
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt,
        content: formData.content,
        featured_image_url: imageUrl,
        category: formData.category || null,
        tags: tagsArray.length > 0 ? tagsArray : null,
        status: formData.status,
        created_by: user.id,
        ...(formData.status === "published" && { published_at: new Date().toISOString() }),
      };

      if (formData.id) {
        const { error } = await supabase
          .from("articles")
          .update(articleData)
          .eq("id", formData.id);

        if (error) throw error;
        toast.success("Article mis à jour avec succès");
      } else {
        const { error } = await supabase
          .from("articles")
          .insert([articleData]);

        if (error) throw error;
        toast.success("Article créé avec succès");
      }

      dispatch({ type: "SET_UPLOAD_PROGRESS", payload: 100 });
      dispatch({ type: "SET_SHOW_DIALOG", payload: false });
      fetchArticles();
      resetForm();
    } catch (error) {
      console.error("Error saving article:", error);
      toast.error("Erreur lors de la sauvegarde de l'article");
    } finally {
      dispatch({ type: "SET_UPLOAD_PROGRESS", payload: 0 });
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

    try {
      const { error } = await supabase.from("articles").delete().eq("id", id);

      if (error) throw error;
      toast.success("Article supprimé");
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const editArticle = (article: Article) => {
    dispatch({
      type: "UPDATE_FORM",
      payload: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt || "",
        content: article.content,
        featured_image_url: article.featured_image_url || "",
        category: article.category || "",
        tags: article.tags?.join(", ") || "",
        status: article.status,
      },
    });
    dispatch({ type: "SET_SHOW_DIALOG", payload: true });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "default";
      case "draft":
        return "secondary";
      default:
        return "outline";
    }
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Button
          onClick={() => {
            resetForm();
            dispatch({ type: "SET_SHOW_DIALOG", payload: true });
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un article
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Rechercher un article..."
          value={searchTerm}
          onChange={(e) => dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>
                  {article.featured_image_url && (
                    <img
                      src={article.featured_image_url}
                      alt={article.title}
                      loading="lazy"
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.category || "-"}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(article.status)}>
                    {article.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(article.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editArticle(article)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteArticle(article.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showDialog} onOpenChange={(open) => dispatch({ type: "SET_SHOW_DIALOG", payload: open })}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {formData.id ? "Modifier l'article" : "Nouvel article"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => dispatch({ type: "UPDATE_FORM", payload: { title: e.target.value } })}
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => dispatch({ type: "UPDATE_FORM", payload: { slug: e.target.value } })}
                placeholder="Généré automatiquement si vide"
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Extrait</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => dispatch({ type: "UPDATE_FORM", payload: { excerpt: e.target.value } })}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="content">Contenu *</Label>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => dispatch({ type: "UPDATE_FORM", payload: { content: value } })}
              />
            </div>

            <div>
              <Label htmlFor="image">Image à la une</Label>
              <Input
                id="image"
                type="file"
                ref={imageInputRef}
                accept="image/*"
              />
              {formData.featured_image_url && (
                <img
                  src={formData.featured_image_url}
                  alt="Preview"
                  loading="lazy"
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}
            </div>

            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => dispatch({ type: "UPDATE_FORM", payload: { category: e.target.value } })}
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => dispatch({ type: "UPDATE_FORM", payload: { tags: e.target.value } })}
                placeholder="sophrologie, bien-être, stress"
              />
            </div>

            <div>
              <Label htmlFor="status">Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => dispatch({ type: "UPDATE_FORM", payload: { status: value } })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="published">Publié</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {uploadProgress > 0 && (
              <div className="w-full bg-secondary h-2 rounded">
                <div
                  className="bg-primary h-2 rounded transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => dispatch({ type: "SET_SHOW_DIALOG", payload: false })}
              >
                Annuler
              </Button>
              <Button type="submit">
                {formData.id ? "Mettre à jour" : "Créer"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
