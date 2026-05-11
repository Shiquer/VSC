import { useReducer, useState, useEffect, useRef } from "react";
import { Plus, Search, Edit, Trash2, Play, Pause, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MediaContent {
  id: string;
  title: string;
  description: string;
  content_type: 'audio' | 'video';
  file_url: string;
  thumbnail_url?: string;
  duration?: string;
  category: string;
  difficulty: string;
  status: 'draft' | 'published';
  downloads?: number;
  views?: number;
  created_at: string;
}

type MediaFormData = {
  title: string;
  description: string;
  content_type: "audio" | "video";
  category: string;
  difficulty: "Débutant" | "Intermédiaire" | "Avancé";
  status: "draft" | "published";
};

type MediaState = {
  mediaContents: MediaContent[];
  loading: boolean;
  uploading: boolean;
  isAddDialogOpen: boolean;
  searchTerm: string;
  currentPlaying: string | null;
  formData: MediaFormData;
};

type MediaAction =
  | { type: "SET_MEDIA_CONTENTS"; payload: MediaContent[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_UPLOADING"; payload: boolean }
  | { type: "SET_DIALOG_OPEN"; payload: boolean }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_CURRENT_PLAYING"; payload: string | null }
  | { type: "UPDATE_FORM"; payload: Partial<MediaFormData> }
  | { type: "RESET_FORM" };

const initialFormData: MediaFormData = {
  title: "",
  description: "",
  content_type: "audio",
  category: "",
  difficulty: "Débutant",
  status: "draft",
};

const initialState: MediaState = {
  mediaContents: [],
  loading: true,
  uploading: false,
  isAddDialogOpen: false,
  searchTerm: "",
  currentPlaying: null,
  formData: initialFormData,
};

function mediaReducer(state: MediaState, action: MediaAction): MediaState {
  switch (action.type) {
    case "SET_MEDIA_CONTENTS": return { ...state, mediaContents: action.payload };
    case "SET_LOADING": return { ...state, loading: action.payload };
    case "SET_UPLOADING": return { ...state, uploading: action.payload };
    case "SET_DIALOG_OPEN": return { ...state, isAddDialogOpen: action.payload };
    case "SET_SEARCH_TERM": return { ...state, searchTerm: action.payload };
    case "SET_CURRENT_PLAYING": return { ...state, currentPlaying: action.payload };
    case "UPDATE_FORM": return { ...state, formData: { ...state.formData, ...action.payload } };
    case "RESET_FORM": return { ...state, formData: initialFormData };
    default: return state;
  }
}

const AdminMediaLibrary = () => {
  const [state, dispatch] = useReducer(mediaReducer, initialState);
  const { mediaContents, loading, uploading, isAddDialogOpen, searchTerm, currentPlaying, formData } = state;
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMediaContents();
  }, []);

  const fetchMediaContents = async () => {
    try {
      const { data, error } = await supabase
        .from("media_content")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      dispatch({ type: "SET_MEDIA_CONTENTS", payload: (data as MediaContent[]) || [] });
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les contenus multimédia.",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const handlePlayPause = (id: string) => {
    dispatch({ type: "SET_CURRENT_PLAYING", payload: currentPlaying === id ? null : id });
  };

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media-files')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('media-files')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mediaFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier multimédia.",
        variant: "destructive",
      });
      return;
    }

    dispatch({ type: "SET_UPLOADING", payload: true });

    try {
      const fileUrl = await uploadFile(mediaFile, formData.content_type);

      let thumbnailUrl = null;
      if (thumbnailFile) {
        thumbnailUrl = await uploadFile(thumbnailFile, 'thumbnails');
      }

      const fileSize = mediaFile.size;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utilisateur non authentifié");

      const { error } = await supabase
        .from("media_content")
        .insert({
          title: formData.title,
          description: formData.description,
          content_type: formData.content_type,
          file_url: fileUrl,
          thumbnail_url: thumbnailUrl,
          category: formData.category,
          difficulty: formData.difficulty,
          status: formData.status,
          file_size: fileSize,
          created_by: user.id,
        });

      if (error) throw error;

      dispatch({ type: "RESET_FORM" });
      setMediaFile(null);
      setThumbnailFile(null);
      dispatch({ type: "SET_DIALOG_OPEN", payload: false });

      await fetchMediaContents();

      toast({
        title: "Succès",
        description: "Contenu multimédia ajouté avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le contenu multimédia.",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: "SET_UPLOADING", payload: false });
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from("media_content")
        .delete()
        .eq("id", id);

      if (error) throw error;

      await fetchMediaContents();
      toast({
        title: "Succès",
        description: "Contenu supprimé avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le contenu.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "default";
      case "draft": return "secondary";
      default: return "outline";
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

  const filteredAudio = mediaContents.filter(item =>
    item.content_type === 'audio' &&
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredVideo = mediaContents.filter(item =>
    item.content_type === 'video' &&
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="space-y-4">
        {["a","b","c","d","e","f"].map((k) => (
          <Card key={`skeleton-${k}`} className="h-32">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion de la médiathèque</h1>
          <p className="text-muted-foreground">Gérez vos contenus audio et vidéo</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={(open) => dispatch({ type: "SET_DIALOG_OPEN", payload: open })}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un contenu
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau contenu</DialogTitle>
              <DialogDescription>
                Ajoutez un nouveau fichier audio ou vidéo à votre médiathèque.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => dispatch({ type: "UPDATE_FORM", payload: { title: e.target.value } })}
                    placeholder="Titre du contenu"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="content_type">Type de contenu *</Label>
                  <Select
                    value={formData.content_type}
                    onValueChange={(value: "audio" | "video") =>
                      dispatch({ type: "UPDATE_FORM", payload: { content_type: value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="video">Vidéo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => dispatch({ type: "UPDATE_FORM", payload: { description: e.target.value } })}
                  placeholder="Description du contenu"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Catégorie *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => dispatch({ type: "UPDATE_FORM", payload: { category: e.target.value } })}
                    placeholder="ex: Relaxation, Stress, Éducatif"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty">Difficulté</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value: "Débutant" | "Intermédiaire" | "Avancé") =>
                      dispatch({ type: "UPDATE_FORM", payload: { difficulty: value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Débutant">Débutant</SelectItem>
                      <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                      <SelectItem value="Avancé">Avancé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="status">Statut</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "draft" | "published") =>
                    dispatch({ type: "UPDATE_FORM", payload: { status: value } })
                  }
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

              <div className="space-y-3">
                <Label>Fichier multimédia *</Label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
                  accept={formData.content_type === 'audio' ? 'audio/*' : 'video/*'}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {mediaFile ? mediaFile.name : `Choisir un fichier ${formData.content_type}`}
                </Button>
                {mediaFile && (
                  <p className="text-sm text-muted-foreground">
                    Taille: {(mediaFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
              </div>

              {formData.content_type === 'video' && (
                <div className="space-y-3">
                  <Label>Miniature (optionnel)</Label>
                  <input
                    type="file"
                    ref={thumbnailInputRef}
                    onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => thumbnailInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {thumbnailFile ? thumbnailFile.name : "Choisir une miniature"}
                  </Button>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => dispatch({ type: "SET_DIALOG_OPEN", payload: false })}
                  disabled={uploading}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? "Ajout en cours…" : "Ajouter le contenu"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher dans la médiathèque..."
          value={searchTerm}
          onChange={(e) => dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="audio" className="space-y-6">
        <TabsList>
          <TabsTrigger value="audio">Contenus Audio ({filteredAudio.length})</TabsTrigger>
          <TabsTrigger value="video">Contenus Vidéo ({filteredVideo.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="audio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fichiers Audio</CardTitle>
              <CardDescription>Gérez vos séances audio de sophrologie et d'hypnose</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Difficulté</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Téléchargements</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAudio.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">{item.description}</div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                      <TableCell>{item.duration}</TableCell>
                      <TableCell><Badge variant={getDifficultyColor(item.difficulty)}>{item.difficulty}</Badge></TableCell>
                      <TableCell><Badge variant={getStatusColor(item.status)}>{item.status === "published" ? "Publié" : "Brouillon"}</Badge></TableCell>
                      <TableCell>{item.downloads || 0}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handlePlayPause(item.id)}>
                            {currentPlaying === item.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteContent(item.id)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="video" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fichiers Vidéo</CardTitle>
              <CardDescription>Gérez vos contenus vidéo éducatifs et séances guidées</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Difficulté</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Vues</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVideo.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">{item.description}</div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                      <TableCell>{item.duration}</TableCell>
                      <TableCell><Badge variant={getDifficultyColor(item.difficulty)}>{item.difficulty}</Badge></TableCell>
                      <TableCell><Badge variant={getStatusColor(item.status)}>{item.status === "published" ? "Publié" : "Brouillon"}</Badge></TableCell>
                      <TableCell>{item.views || 0}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handlePlayPause(item.id)}>
                            {currentPlaying === item.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteContent(item.id)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminMediaLibrary;
