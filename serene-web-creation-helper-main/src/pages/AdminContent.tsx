import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Save, Edit, X, Upload, ImageIcon, Trash2, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";

interface SiteContent {
  id: string;
  key: string;
  title: string;
  content: string;
  content_type: string;
  section: string;
  image_url?: string;
}

const AdminContent = () => {
  const [contents, setContents] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", content: "", image_url: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createForm, setCreateForm] = useState({ 
    title: "", 
    content: "", 
    content_type: "text",
    section: "hero",
    key: ""
  });
  const [createImageFile, setCreateImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createFileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const { data, error } = await supabase
        .from("site_content" as any)
        .select("*")
        .order("section", { ascending: true })
        .order("order_index", { ascending: true });

      if (error) throw error;
      setContents((data as unknown as SiteContent[]) || []);
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger le contenu.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (content: SiteContent) => {
    setEditingId(content.id);
    setEditForm({ 
      title: content.title, 
      content: content.content, 
      image_url: content.image_url || "" 
    });
    setImageFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: "", content: "", image_url: "" });
    setImageFile(null);
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `content-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('content-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('content-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const saveEdit = async (id: string) => {
    try {
      setUploadingImage(true);
      let finalImageUrl = editForm.image_url;

      // Upload new image if selected
      if (imageFile) {
        finalImageUrl = await handleImageUpload(imageFile);
      }

      const { error } = await supabase
        .from("site_content" as any)
        .update({
          title: editForm.title,
          content: editForm.content,
          image_url: finalImageUrl || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      await fetchContents();
      setEditingId(null);
      setEditForm({ title: "", content: "", image_url: "" });
      setImageFile(null);

      toast({
        title: "Succès",
        description: "Contenu mis à jour avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les modifications.",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = async (contentId: string) => {
    try {
      const { error } = await supabase
        .from("site_content" as any)
        .update({
          image_url: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", contentId);

      if (error) throw error;

      await fetchContents();
      if (editingId === contentId) {
        setEditForm({ ...editForm, image_url: "" });
      }

      toast({
        title: "Succès",
        description: "Image supprimée avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'image.",
        variant: "destructive",
      });
    }
  };

  const deleteContent = async (contentId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce contenu ? Cette action est irréversible.")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("site_content" as any)
        .delete()
        .eq("id", contentId);

      if (error) throw error;

      await fetchContents();
      
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

  const startCreate = () => {
    setIsCreating(true);
    setCreateForm({ 
      title: "", 
      content: "", 
      content_type: "text",
      section: "hero",
      key: ""
    });
    setCreateImageFile(null);
  };

  const cancelCreate = () => {
    setIsCreating(false);
    setCreateForm({ 
      title: "", 
      content: "", 
      content_type: "text",
      section: "hero",
      key: ""
    });
    setCreateImageFile(null);
  };

  const saveCreate = async () => {
    try {
      if (!createForm.title || !createForm.content || !createForm.key) {
        toast({
          title: "Erreur",
          description: "Veuillez remplir tous les champs obligatoires.",
          variant: "destructive",
        });
        return;
      }

      setUploadingImage(true);
      let imageUrl = null;

      // Upload image if selected
      if (createImageFile) {
        imageUrl = await handleImageUpload(createImageFile);
      }

      const { error } = await supabase
        .from("site_content" as any)
        .insert({
          title: createForm.title,
          content: createForm.content,
          content_type: createForm.content_type,
          section: createForm.section,
          key: createForm.key,
          image_url: imageUrl,
          order_index: 0,
        });

      if (error) throw error;

      await fetchContents();
      setIsCreating(false);
      setCreateForm({ 
        title: "", 
        content: "", 
        content_type: "text",
        section: "hero",
        key: ""
      });
      setCreateImageFile(null);

      toast({
        title: "Succès",
        description: "Nouveau contenu créé avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le contenu.",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const groupedContents = contents.reduce((acc, content) => {
    if (!acc[content.section]) {
      acc[content.section] = [];
    }
    acc[content.section].push(content);
    return acc;
  }, {} as Record<string, SiteContent[]>);

  const sectionTitles = {
    header: "En-tête / Navigation",
    hero: "Page d'accueil - Section principale",
    services: "Services et spécialités",
    about: "À propos",
    contact: "Contact et informations",
    footer: "Pied de page",
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="h-32">
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
          <h2 className="text-2xl font-bold mb-2">Gestion du contenu</h2>
          <p className="text-muted-foreground">
            Modifiez le contenu affiché sur votre site web.
          </p>
        </div>
        <Button onClick={startCreate} disabled={isCreating}>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau contenu
        </Button>
      </div>

      {/* Create new content form */}
      {isCreating && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Créer un nouveau contenu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Titre *</Label>
                <Input
                  value={createForm.title}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, title: e.target.value })
                  }
                  placeholder="Titre du contenu"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Clé unique *</Label>
                <Input
                  value={createForm.key}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, key: e.target.value })
                  }
                  placeholder="ex: hero_title, about_description"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Section</Label>
                <select
                  value={createForm.section}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, section: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                >
                  <option value="header">En-tête / Navigation</option>
                  <option value="hero">Page d'accueil - Section principale</option>
                  <option value="services">Services et spécialités</option>
                  <option value="about">À propos</option>
                  <option value="contact">Contact et informations</option>
                  <option value="footer">Pied de page</option>
                </select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Type de contenu</Label>
                <select
                  value={createForm.content_type}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, content_type: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                >
                  <option value="text">Texte</option>
                  <option value="html">HTML</option>
                </select>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Contenu *</Label>
              <Textarea
                value={createForm.content}
                onChange={(e) =>
                  setCreateForm({ ...createForm, content: e.target.value })
                }
                placeholder="Contenu de la section"
                rows={createForm.content_type === "html" ? 6 : 4}
              />
              {createForm.content_type === "html" && (
                <p className="text-xs text-muted-foreground mt-1">
                  HTML autorisé: &lt;br&gt;, &lt;strong&gt;, &lt;em&gt;, etc.
                </p>
              )}
            </div>

            {/* Image upload for new content */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Image (optionnelle)</Label>
              
              {createImageFile && (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Image sélectionnée: {createImageFile.name}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <input
                  type="file"
                  ref={createFileInputRef}
                  onChange={(e) => setCreateImageFile(e.target.files?.[0] || null)}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => createFileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {createImageFile ? createImageFile.name : "Choisir une image"}
                </Button>
                {createImageFile && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setCreateImageFile(null)}
                    className="w-full"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Supprimer l'image
                  </Button>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={saveCreate}
                disabled={uploadingImage}
                className="flex-1"
              >
                <Save className="w-4 h-4 mr-2" />
                {uploadingImage ? "Création..." : "Créer le contenu"}
              </Button>
              <Button
                variant="outline"
                onClick={cancelCreate}
                disabled={uploadingImage}
              >
                <X className="w-4 h-4 mr-2" />
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue={Object.keys(groupedContents)[0]}>
        <TabsList className="grid w-full grid-cols-6">
          {Object.keys(groupedContents).map((section) => (
            <TabsTrigger key={section} value={section}>
              {sectionTitles[section as keyof typeof sectionTitles] || section}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(groupedContents).map(([section, sectionContents]) => (
          <TabsContent key={section} value={section} className="space-y-4">
            {sectionContents.map((content) => (
              <Card key={content.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{content.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{content.content_type}</Badge>
                      {editingId === content.id ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => saveEdit(content.id)}
                            disabled={uploadingImage}
                            className="h-8"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            {uploadingImage ? "Upload..." : "Sauver"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={cancelEdit}
                            className="h-8"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Annuler
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEdit(content)}
                            className="h-8"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Modifier
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteContent(content.id)}
                            className="h-8"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Supprimer
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingId === content.id ? (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Titre</Label>
                        <Input
                          value={editForm.title}
                          onChange={(e) =>
                            setEditForm({ ...editForm, title: e.target.value })
                          }
                          placeholder="Titre de la section"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Contenu</Label>
                        <Textarea
                          value={editForm.content}
                          onChange={(e) =>
                            setEditForm({ ...editForm, content: e.target.value })
                          }
                          placeholder="Contenu de la section"
                          rows={content.content_type === "html" ? 6 : 4}
                        />
                        {content.content_type === "html" && (
                          <p className="text-xs text-muted-foreground mt-1">
                            HTML autorisé: &lt;br&gt;, &lt;strong&gt;, &lt;em&gt;, etc.
                          </p>
                        )}
                      </div>
                      
                      {/* Image Management */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Image</Label>
                        
                        {/* Current image preview */}
                        {(editForm.image_url || content.image_url) && (
                          <div className="space-y-2">
                            <div className="relative inline-block">
                              <img
                                src={editForm.image_url || content.image_url}
                                alt="Aperçu"
                                className="max-w-xs max-h-32 object-cover rounded-md border"
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                onClick={() => removeImage(content.id)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Image actuelle - Cliquez sur X pour la supprimer
                            </p>
                          </div>
                        )}

                        {/* File upload */}
                        <div className="space-y-2">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                            accept="image/*"
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            {imageFile ? imageFile.name : "Choisir une nouvelle image"}
                          </Button>
                          {imageFile && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Nouvelle image sélectionnée: {imageFile.name}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setImageFile(null)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Image display */}
                      {content.image_url && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Image actuelle</Label>
                          <div className="relative inline-block">
                            <img
                              src={content.image_url}
                              alt={content.title}
                              className="max-w-xs max-h-32 object-cover rounded-md border"
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Content display */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Contenu</Label>
                        <div
                          className="p-3 bg-muted/50 rounded-md text-sm"
                          dangerouslySetInnerHTML={{
                            __html: content.content_type === "html" 
                              ? content.content 
                              : content.content.replace(/\n/g, "<br>")
                          }}
                        />
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Clé: <code className="bg-muted px-1 rounded">{content.key}</code>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminContent;