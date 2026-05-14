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
  category: string;
  difficulty: string;
  content_type: 'audio' | 'video';
  status: 'draft' | 'published';
};

type MediaState = {
  mediaContents: MediaContent[];
  loading: boolean;
  uploading: boolean;
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  editingItem: MediaContent | null;
  searchTerm: string;
  currentPlaying: string | null;
  formData: MediaFormData;
};

type MediaAction =
  | { type: "SET_MEDIA_CONTENTS"; payload: MediaContent[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_UPLOADING"; payload: boolean }
  | { type: "SET_DIALOG_OPEN"; payload: boolean }
  | { type: "SET_EDIT_DIALOG_OPEN"; payload: boolean }
  | { type: "SET_EDITING_ITEM"; payload: MediaContent | null }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_CURRENT_PLAYING"; payload: string | null }
  | { type: "UPDATE_FORM"; payload: Partial<MediaFormData> }
  | { type: "RESET_FORM" };

const initialFormData: MediaFormData = {
  title: "",
  description: "",
  category: "",
  difficulty: "debutant",
  content_type: "audio",
  status: "draft",
};

function mediaReducer(state: MediaState, action: MediaAction): MediaState {
  switch (action.type) {
    case "SET_MEDIA_CONTENTS": return { ...state, mediaContents: action.payload };
    case "SET_LOADING": return { ...state, loading: action.payload };
    case "SET_UPLOADING": return { ...state, uploading: action.payload };
    case "SET_DIALOG_OPEN": return { ...state, isAddDialogOpen: action.payload };
    case "SET_EDIT_DIALOG_OPEN": return { ...state, isEditDialogOpen: action.payload };
    case "SET_EDITING_ITEM":
      return {
        ...state,
        editingItem: action.payload,
        isEditDialogOpen: action.payload !== null,
        formData: action.payload
          ? {
              title: action.payload.title,
              description: action.payload.description,
              category: action.payload.category,
              difficulty: action.payload.difficulty,
              content_type: action.payload.content_type,
              status: action.payload.status,
            }
          : initialFormData,
      };
    case "SET_SEARCH_TERM": return { ...state, searchTerm: action.payload };
    case "SET_CURRENT_PLAYING": return { ...state, currentPlaying: action.payload };
    case "UPDATE_FORM": return { ...state, formData: { ...state.formData, ...action.payload } };
    case "RESET_FORM": return { ...state, formData: initialFormData };
    default: return state;
  }
}

const AdminMediaLibrary = () => {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(mediaReducer, {
    mediaContents: [],
    loading: true,
    uploading: false,
    isAddDialogOpen: false,
    isEditDialogOpen: false,
    editingItem: null,
    searchTerm: "",
    currentPlaying: null,
    formData: initialFormData,
  });

  const {
    mediaContents,
    loading,
    uploading,
    isAddDialogOpen,
    isEditDialogOpen,
    editingItem,
    searchTerm,
    currentPlaying,
    formData,
  } = state;

  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchMediaContents();
  }, []);

  const fetchMediaContents = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { data, error } = await supabase
        .from("media_content")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      dispatch({ type: "SET_MEDIA_CONTENTS", payload: data || [] });
    } catch (error) {
      console.error("Error fetching media:", error);
      toast({ title: "Erreur", description: "Impossible de charger les contenus.", variant: "destructive" });
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

    const MAX_SIZE_MB = 50;
    if (mediaFile.size > MAX_SIZE_MB * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: `La taille maximale est ${MAX_SIZE_MB} MB. Votre fichier fait ${(mediaFile.size / 1024 / 1024).toFixed(1)} MB.`,
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

      toast({ title: "Succès", description: "Contenu multimédia ajouté avec succès." });
    } catch (error) {
      console.error("Error uploading:", error);
      toast({ title: "Erreur", description: "Impossible d'ajouter le contenu.", variant: "destructive" });
    } finally {
      dispatch({ type: "SET_UPLOADING", payload: false });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    dispatch({ type: "SET_UPLOADING", payload: true });

    try {
      const { error } = await supabase
        .from("media_content")
        .update({
          title: formData.title,
          description: formData.description,
          content_type: formData.content_type,
          category: formData.category,
          difficulty: formData.difficulty,
          status: formData.status,
        })
        .eq("id", editingItem.id);

      if (error) throw error;

      dispatch({ type: "SET_EDITING_ITEM", payload: null });
      await fetchMediaContents();

      toast({ title: "Succès", description: "Contenu mis à jour avec succès." });
    } catch (error) {
      console.error("Error updating:", error);
      toast({ title: "Erreur", description: "Impossible de mettre à jour le contenu.", variant: "destructive" });
    } finally {
      dispatch({ type: "SET_UPLOADING", payload: false });
    }
  };

  const deleteContent = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce contenu ?")) return;
    try {
      const { error } = await supabase.from("media_content").delete().eq("id", id);
      if (error) throw error;
      await fetchMediaContents();
      toast({ title: "Succès", description: "Contenu supprimé avec succès." });
    } catch (error) {
      console.error("Error deleting:", error);
      toast({ title: "Erreur", description: "Impossible de supprimer le contenu.", variant: "destructive" });
    }
  };

  const getStatusColor = (status: string) => {
    return status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      debutant: "bg-blue-100 text-blue-800",
      intermediaire: "bg-orange-100 text-orange-800",
      avance: "bg-red-100 text-red-800",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-800";
  };

  const filteredContents = mediaContents.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const audioContents = filteredContents.filter(item => item.content_type === 'audio');
  const videoContents = filteredContents.filter(item => item.content_type === 'video');

  const EditDialogContent = () => (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Modifier le contenu</DialogTitle>
        <DialogDescription>
          Modifiez les informations du contenu multimédia.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="edit-title">Titre *</Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) => dispatch({ type: "UPDATE_FORM", payload: { title: e.target.value } })}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-category">Catégorie *</Label>
            <Input
              id="edit-category"
              value={formData.category}
              onChange={(e) => dispatch({ type: "UPDATE_FORM", payload: { category: e.target.value } })}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="edit-description">Description</Label>
          <Textarea
            id="edit-description"
            value={formData.description}
            onChange={(e) => dispatch({ type: "UPDATE_FORM", payload: { description: e.target.value } })}
            rows={3}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Type</Label>
            <Select
              value={formData.content_type}
              onValueChange={(value) => dispatch({ type: "UPDATE_FORM", payload: { content_type: value as 'audio' | 'video' } })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="video">Vidéo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Difficulté</Label>
            <Select
              value={formData.difficulty}
              onValueChange={(value) => dispatch({ type: "UPDATE_FORM", payload: { difficulty: value } })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="debutant">Débutant</SelectItem>
                <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                <SelectItem value="avance">Avancé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Statut</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => dispatch({ type: "UPDATE_FORM", payload: { status: value as 'draft' | 'published' } })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Brouillon</SelectItem>
                <SelectItem value="published">Publié</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => dispatch({ type: "SET_EDITING_ITEM", payload: null })}>
            Annuler
          </Button>
          <Button type="submit" disabled={uploading}>
            {uploading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );

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
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Catégorie *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => dispatch({ type: "UPDATE_FORM", payload: { category: e.target.value } })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => dispatch({ type: "UPDATE_FORM", payload: { description: e.target.value } })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Type de contenu</Label>
                  <Select
                    value={formData.content_type}
                    onValueChange={(value) => dispatch({ type: "UPDATE_FORM", payload: { content_type: value as 'audio' | 'video' } })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="video">Vidéo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Difficulté</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => dispatch({ type: "UPDATE_FORM", payload: { difficulty: value } })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debutant">Débutant</SelectItem>
                      <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                      <SelectItem value="avance">Avancé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Statut</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => dispatch({ type: "UPDATE_FORM", payload: { status: value as 'draft' | 'published' } })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="published">Publié</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="media-file">Fichier multimédia * (max 50 MB)</Label>
                <Input
                  id="media-file"
                  type="file"
                  accept="audio/*,video/*"
                  onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="thumbnail-file">Image miniature (optionnel)</Label>
                <Input
                  id="thumbnail-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => dispatch({ type: "SET_DIALOG_OPEN", payload: false })}>
                  Annuler
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? (
                    <><Upload className="w-4 h-4 mr-2 animate-spin" />Upload en cours...</>
                  ) : (
                    <><Upload className="w-4 h-4 mr-2" />Ajouter le contenu</>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={(open) => { if (!open) dispatch({ type: "SET_EDITING_ITEM", payload: null }); }}>
        <EditDialogContent />
      </Dialog>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher dans la médiathèque..."
            value={searchTerm}
            onChange={(e) => dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="audio">
        <TabsList>
          <TabsTrigger value="audio">Contenus Audio ({audioContents.length})</TabsTrigger>
          <TabsTrigger value="video">Contenus Vidéo ({videoContents.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="audio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fichiers Audio</CardTitle>
              <CardDescription>Gérez vos séances audio de sophrologie et relaxation</CardDescription>
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
                    <TableHead>Écoutes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audioContents.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                      <TableCell>{item.duration || "—"}</TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(item.difficulty)}>
                          {item.difficulty === 'debutant' ? 'Débutant' : item.difficulty === 'intermediaire' ? 'Intermédiaire' : 'Avancé'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status === 'published' ? 'Publié' : 'Brouillon'}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.downloads || 0}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handlePlayPause(item.id)}>
                            {currentPlaying === item.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "SET_EDITING_ITEM", payload: item })}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteContent(item.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
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
                  {videoContents.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                      <TableCell>{item.duration || "—"}</TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(item.difficulty)}>
                          {item.difficulty === 'debutant' ? 'Débutant' : item.difficulty === 'intermediaire' ? 'Intermédiaire' : 'Avancé'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status === 'published' ? 'Publié' : 'Brouillon'}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.views || 0}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handlePlayPause(item.id)}>
                            {currentPlaying === item.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "SET_EDITING_ITEM", payload: item })}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteContent(item.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
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
