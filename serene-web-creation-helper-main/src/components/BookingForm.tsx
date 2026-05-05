import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, User, Mail, Phone, MessageCircle, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "./AuthForm";

const services = [
  { value: "sophrologie", label: "Sophrologie" },
  { value: "hypnose", label: "Hypnose" },
  { value: "entreprise", label: "Intervention en entreprise" },
];

// Créneaux par jour de la semaine
const getAvailableTimeSlots = (date: Date) => {
  const dayOfWeek = date.getDay();
  
  // Mardi (2) et Vendredi (5): 8h-21h
  if (dayOfWeek === 2 || dayOfWeek === 5) {
    return [
      "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
      "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
    ];
  }
  
  // Samedi (6): 8h-13h
  if (dayOfWeek === 6) {
    return ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];
  }
  
  // Autres jours: pas de créneaux disponibles
  return [];
};

const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    time: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedDate) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une date.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Insérer la réservation dans la base de données
      const { error } = await supabase
        .from('bookings')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: formData.time,
          message: formData.message,
          status: 'pending'
        }]);

      if (error) throw error;

      // Envoyer les emails de notification
      try {
        await supabase.functions.invoke('send-booking-notification', {
          body: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            date: format(selectedDate, 'dd/MM/yyyy', { locale: fr }),
            time: formData.time,
            message: formData.message
          }
        });
      } catch (emailError) {
        console.error('Email notification error:', emailError);
        // Continue même si l'email échoue
      }

      toast({
        title: "Réservation envoyée !",
        description: "Votre demande de rendez-vous a été envoyée. Vous recevrez un email de confirmation.",
      });

      // Reset form
      setSelectedDate(undefined);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        time: "",
        message: ""
      });

    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre réservation.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour vérifier si une date est disponible
  const isDateAvailable = (date: Date) => {
    const dayOfWeek = date.getDay();
    // Disponible mardi (2), vendredi (5) et samedi (6)
    return dayOfWeek === 2 || dayOfWeek === 5 || dayOfWeek === 6;
  };

  const availableTimeSlots = selectedDate ? getAvailableTimeSlots(selectedDate) : [];

  

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Formulaire de réservation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nom complet *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                placeholder="Votre nom complet"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Téléphone *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                placeholder="06 12 34 56 78"
              />
            </div>

            <div className="space-y-2">
              <Label>Service souhaité *</Label>
              <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date souhaitée *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "dd/MM/yyyy", { locale: fr })
                    ) : (
                      <span>Sélectionner une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => 
                      date < new Date() || 
                      !isDateAvailable(date)
                    }
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                    locale={fr}
                  />
                  <div className="p-3 border-t">
                    <p className="text-sm text-muted-foreground">
                      📅 Disponibilités :<br/>
                      • Mardi et vendredi : 8h-21h<br/>
                      • Samedi : 8h-13h
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Heure souhaitée *
              </Label>
              <Select 
                value={formData.time} 
                onValueChange={(value) => handleInputChange("time", value)}
                disabled={!selectedDate}
              >
                <SelectTrigger>
                  <SelectValue placeholder={
                    selectedDate 
                      ? "Choisir un créneau" 
                      : "Sélectionner d'abord une date"
                  } />
                </SelectTrigger>
                <SelectContent>
                  {availableTimeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedDate && availableTimeSlots.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Aucun créneau disponible pour cette date
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Message (optionnel)
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Précisez vos besoins ou questions..."
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.service || !selectedDate || !formData.time}
          >
            {isSubmitting ? "Envoi en cours..." : "Réserver mon rendez-vous"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;