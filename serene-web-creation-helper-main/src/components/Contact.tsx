import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Calendar, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message envoyé !",
        description: "Votre message a été envoyé avec succès. Vous recevrez une réponse rapidement.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });

    } catch (error) {
      console.error('Error sending contact email:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre message.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-20 bg-cream-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Prendre contact
          </h2>
          <p className="text-lg text-soft-gray max-w-2xl mx-auto">
            N'hésitez pas à me contacter pour tout renseignement ou question, 
            auxquels je répondrai avec plaisir.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <MapPin className="w-5 h-5 text-primary mr-2" />
                  Adresse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-soft-gray">
                  15 rue Adrien Damalix<br />
                  94410 Saint-Maurice<br />
                  Val-de-Marne
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Clock className="w-5 h-5 text-primary mr-2" />
                  Horaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-soft-gray">
                  <p>Mardi: 8h - 21h</p>
                  <p>Vendredi: 8h - 21h</p>
                  <p>Samedi: 8h - 13h</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Phone className="w-5 h-5 text-primary mr-2" />
                  Contact direct
                </CardTitle>
              </CardHeader>
               <CardContent className="space-y-4">
                 <a href="tel:+33123456789">
                   <Button 
                     variant="outline" 
                     className="w-full justify-start"
                   >
                     <Phone className="w-4 h-4 mr-2" />
                     Appeler
                   </Button>
                 </a>
                 <a href="mailto:christopher.quershi@example.com">
                   <Button 
                     variant="outline" 
                     className="w-full justify-start"
                   >
                     <Mail className="w-4 h-4 mr-2" />
                     Email
                   </Button>
                 </a>
                 <a href="#" target="_blank" rel="noopener noreferrer">
                   <Button 
                     variant="outline" 
                     className="w-full justify-start"
                   >
                     <Linkedin className="w-4 h-4 mr-2" />
                     LinkedIn
                   </Button>
                 </a>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Envoyez-moi un message</CardTitle>
              </CardHeader>
               <CardContent>
                 <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid md:grid-cols-2 gap-4">
                     <div>
                       <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                         Prénom *
                       </label>
                       <Input 
                         id="firstName" 
                         placeholder="Votre prénom" 
                         value={formData.firstName}
                         onChange={(e) => handleInputChange("firstName", e.target.value)}
                         required 
                       />
                     </div>
                     <div>
                       <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                         Nom *
                       </label>
                       <Input 
                         id="lastName" 
                         placeholder="Votre nom" 
                         value={formData.lastName}
                         onChange={(e) => handleInputChange("lastName", e.target.value)}
                         required 
                       />
                     </div>
                   </div>

                   <div>
                     <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                       Email *
                     </label>
                     <Input 
                       id="email" 
                       type="email" 
                       placeholder="votre.email@example.com" 
                       value={formData.email}
                       onChange={(e) => handleInputChange("email", e.target.value)}
                       required 
                     />
                   </div>

                   <div>
                     <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                       Téléphone
                     </label>
                     <Input 
                       id="phone" 
                       type="tel" 
                       placeholder="Votre numéro de téléphone" 
                       value={formData.phone}
                       onChange={(e) => handleInputChange("phone", e.target.value)}
                     />
                   </div>

                   <div>
                     <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                       Sujet *
                     </label>
                     <Input 
                       id="subject" 
                       placeholder="Objet de votre demande" 
                       value={formData.subject}
                       onChange={(e) => handleInputChange("subject", e.target.value)}
                       required 
                     />
                   </div>

                   <div>
                     <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                       Message *
                     </label>
                     <Textarea 
                       id="message" 
                       placeholder="Décrivez votre demande ou vos questions..."
                       rows={6}
                       value={formData.message}
                       onChange={(e) => handleInputChange("message", e.target.value)}
                       required
                     />
                   </div>

                   <div className="flex flex-col sm:flex-row gap-4">
                     <Button 
                       type="submit"
                       size="lg"
                       className="bg-gradient-warm border-0 text-white hover:opacity-90 shadow-warm"
                       disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message}
                     >
                       {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                     </Button>
                     <Link to="/reservation">
                       <Button 
                         type="button"
                         variant="outline"
                         size="lg"
                         className="flex-1"
                       >
                         <Calendar className="w-5 h-5 mr-2" />
                         Prendre rendez-vous directement
                       </Button>
                     </Link>
                   </div>
                 </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;