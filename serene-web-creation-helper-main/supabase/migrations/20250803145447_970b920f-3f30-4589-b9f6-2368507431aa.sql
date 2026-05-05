-- Create storage bucket for content images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('content-images', 'content-images', true);

-- Create policies for content images storage
CREATE POLICY "Content images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'content-images');

CREATE POLICY "Authenticated users can upload content images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'content-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update content images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'content-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete content images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'content-images' AND auth.uid() IS NOT NULL);