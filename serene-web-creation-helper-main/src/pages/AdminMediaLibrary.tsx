import { useState, useEffect, useRef } from "react";
import { Plus, Search, Edit, Trash2, Play, Pause, Download, Upload, X } from "lucide-react";
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

const AdminMediaLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [mediaContents, setMediaContents] = useState<MediaContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content_type: "audio" as "audio" | "video",
    category: "",
    difficulty: "DÃ©butant" as "DÃ©butant" | "IntermÃ©diaire" | "AvancÃ©",
    status: "draft" as "draft" | "published",
  });
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

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
      setMediaContents((data as MediaContent[]) || []);
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les contenus multimÃ©dia.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPause = (id: string) => {
    setCurrentPlaying(currentPlaying === id ? null : id);
  };

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media-files')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

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
        description: "Veuillez sÃ©lectionner un fichier multimÃ©dia.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload main media file
      const fileUrl = await uploadFile(mediaFile, formData.content_type);
      
      // Upload thumbnail if provided
      let thumbnailUrl = null;
      if (thumbnailFile) {
        thumbnailUrl = await uploadFile(thumbnailFile, 'thumbnails');
      }

      // Get file size
      const fileSize = mediaFile.size;

      // Insert into database
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
        });

      if (error) throw error;

      // Reset form and refresh data
      setFormData({
        title: "",
        description: "",
        content_type: "audio",
        category: "",
        difficulty: "DÃ©butant",
        status: "draft",
      });
      setMediaFile(null);
      setThumbnailFile(null);
      setIsAddDialogOpen(false);
      
      await fetchMediaContents();

      toast({
        title: "SuccÃ¨s",
        description: "Contenu multimÃ©dia ajoutÃ© avec succÃ¨s.",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le contenu multimÃ©dia.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
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
        title: "SuccÃ¨s",
        description: "Contenu supprimÃ© avec succÃ¨s.",
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
      case "published":
        return "default";
      case "draft":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "DÃ©butant":
        return "default";
      case "IntermÃ©diaire":
        return "secondary";
      case "AvancÃ©":
        return "destructive";
      default:
        return "outline";
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
        {[...Array(6)].map((_, i) => (
          <Card key={`skeleton-${i}`} className="h-32">
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion de la mÃ©diathÃ¨que</h1>
          <p className="text-muted-foreground">
            GÃ©rez vos contenus audio et vidÃ©o
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                Ajoutez un nouveau fichier audio ou vidÃ©o Ã  votre mÃ©diathÃ¨que.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Titre du contenu"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="content_type">Type de contenu *</Label>
                  <Select 
                    value={formData.content_type} 
                    onValueChange={(value: "audio" | "video") => 
                      setFormData(prev => ({ ...prev, content_type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="video">VidÃ©o</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description du contenu"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">CatÃ©gorie *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="ex: Relaxation, Stress, Ã‰ducatif"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty">DifficultÃ©</Label>
                  <Select 
                    value={formData.difficulty} 
                    onValueChange={(value: "DÃ©butant" | "IntermÃ©diaire" | "AvancÃ©") => 
                      setFormData(prev => ({ ...prev, difficulty: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DÃ©butant">DÃ©butant</SelectItem>
                      <SelectItem value="IntermÃ©diaire">IntermÃ©diaire</SelectItem>
                      <SelectItem value="AvancÃ©">AvancÃ©</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="status">Statut</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: "draft" | "published") => 
                    setFormData(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">PubliÃ©</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* File upload */}
              <div className="space-y-3">
                <Label>Fichier multimÃ©dia *</Label>
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

              {/* Thumbnail upload for videos */}
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
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={uploading}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? "Ajout en cours..." : "Ajouter le contenu"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher dans la mÃ©diathÃ¨que..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="audio" className="space-y-6">
        <TabsList>
          <TabsTrigger value="audio">Contenus Audio ({filteredAudio.length})</TabsTrigger>
          <TabsTrigger value="video">Contenus VidÃ©o ({filteredVideo.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="audio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fichiers Audio</CardTitle>
              <CardDescription>
                GÃ©rez vos sÃ©ances audio de sophrologie et d'hypnose
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>CatÃ©gorie</TableHead>
                    <TableHead>DurÃ©e</TableHead>
                    <TableHead>DifficultÃ©</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>TÃ©lÃ©chargements</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAudio.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {item.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>{item.duration}</TableCell>
                      <TableCell>
                        <Badge variant={getDifficultyColor(item.difficulty)}>
                          {item.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(item.status)}>
                          {item.status === "published" ? "PubliÃ©" : "Brouillon"}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.downloads || 0}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePlayPause(item.id)}
                          >
                            {currentPlaying === item.id ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteContent(item.id)}
                          >
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
              <CardTitle>Fichiers VidÃ©o</CardTitle>
              <CardDescription>
                GÃ©rez vos contenus vidÃ©o Ã©ducatifs et sÃ©ances guidÃ©es
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>CatÃ©gorie</TableHead>
                    <TableHead>DurÃ©e</TableHead>
                    <TableHead>DifficultÃ©</TableHead>
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
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {item.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>{item.duration}</TableCell>
                      <TableCell>
                        <Badge variant={getDifficultyColor(item.difficulty)}>
                          {item.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(item.status)}>
                          {item.status === "published" ? "PubliÃ©" : "Brouillon"}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.views || 0}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePlayPause(item.id)}
                          >
                            {currentPlaying === item.id ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteContent(item.id)}
                          >
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