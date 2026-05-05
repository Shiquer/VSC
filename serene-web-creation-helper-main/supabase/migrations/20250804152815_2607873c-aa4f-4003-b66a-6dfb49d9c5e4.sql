-- Create media_content table for storing audio and video content
CREATE TABLE public.media_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL CHECK (content_type IN ('audio', 'video')),
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration TEXT,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Débutant', 'Intermédiaire', 'Avancé')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  downloads INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  tags TEXT[],
  file_size INTEGER,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.media_content ENABLE ROW LEVEL SECURITY;

-- Create policies for media content
CREATE POLICY "Media content is viewable by everyone" 
ON public.media_content 
FOR SELECT 
USING (status = 'published' OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create media content" 
ON public.media_content 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = created_by);

CREATE POLICY "Users can update their own media content" 
ON public.media_content 
FOR UPDATE 
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own media content" 
ON public.media_content 
FOR DELETE 
USING (auth.uid() = created_by);

-- Create function to update timestamps
CREATE TRIGGER update_media_content_updated_at
BEFORE UPDATE ON public.media_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media-files', 'media-files', true);

-- Create policies for media files storage
CREATE POLICY "Media files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'media-files');

CREATE POLICY "Authenticated users can upload media files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'media-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update media files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'media-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete media files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'media-files' AND auth.uid() IS NOT NULL);