-- Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  category TEXT,
  tags TEXT[],
  status TEXT NOT NULL DEFAULT 'draft',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Create policies for articles
CREATE POLICY "Articles are viewable by everyone when published"
ON public.articles
FOR SELECT
USING (status = 'published' OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create articles"
ON public.articles
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = created_by);

CREATE POLICY "Users can update their own articles"
ON public.articles
FOR UPDATE
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own articles"
ON public.articles
FOR DELETE
USING (auth.uid() = created_by);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for slug lookups
CREATE INDEX idx_articles_slug ON public.articles(slug);

-- Create index for status filtering
CREATE INDEX idx_articles_status ON public.articles(status);