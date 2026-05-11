import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, User, Mail, Phone, MessageCircle, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  { value: "sophrologie", label: "Sophrologie" },
  { value: "hypnose", label: "Hypnose" },
  { value: "entreprise", label: "Intervention en entreprise" },
];

const getAvailableTimeSlots = (date: Date) => {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 2 || dayOfWeek === 5) {
    return ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];
  }
  if (dayOfWeek === 6) {
    return ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];
  }
  return [];
};

const inputStyle = {
  background: "hsl(var(--background))",
  border: "3px solid hsl(var(--foreground))",
  borderRadius: "99px",
  height: "60px",
  padding: "0 24px",
  fontSize: "16px",
  fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
  color: "hsl(var(--foreground))",
  width: "100%",
  boxSizing: "border-box" as const,
  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.08)",
  outline: "none",
};

const labelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "13px",
  fontWeight: "700" as const,
  color: "hsl(var(--foreground))",
  marginBottom: "8px",
  fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
};

const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", time: "", message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!selectedDate) {
      toast({ title: "Erreur", description: "Veuillez sélectionner une date.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    try {
      const { error } = await supabase.from('bookings').insert([{
        name: formData.name, email: formData.email, phone: formData.phone,
        service: formData.service, date: format(selectedDate, 'yyyy-MM-dd'),
        time: formData.time, message: formData.message, status: 'pending'
      }]);
      if (error) throw error;
      try {
        await supabase.functions.invoke('send-booking-notification', {
          body: { ...formData, date: format(selectedDate, 'dd/MM/yyyy', { locale: fr }) }
        });
      } catch (emailError) { console.error('Email error:', emailError); }
      toast({ title: "Réservation envoyée !", description: "Vous recevrez un email de confirmation." });
      setSelectedDate(undefined);
      setFormData({ name: "", email: "", phone: "", service: "", time: "", message: "" });
    } catch (error) {
      toast({ title: "Erreur", description: "Une erreur est survenue.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDateAvailable = (date: Date) => {
    const d = date.getDay();
    return d === 2 || d === 5 || d === 6;
  };

  const availableTimeSlots = selectedDate ? getAvailableTimeSlots(selectedDate) : [];

  return (
    <div className="arise-card" style={{ padding: "40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
        <div style={{ width: "44px", height: "44px", background: "hsl(var(--foreground))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Calendar style={{ width: "20px", height: "20px", color: "hsl(var(--primary-foreground))" }} />
        </div>
        <h2 className="arise-serif" style={{ fontSize: "24px", fontWeight: "400", color: "hsl(var(--foreground))" }}>
          Formulaire de réservation
        </h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="booking-name" style={labelStyle}><User style={{ width: "14px", height: "14px" }} />Nom complet *</label>
            <input id="booking-name" style={inputStyle} placeholder="Votre nom complet" value={formData.name} onChange={e => handleInputChange("name", e.target.value)} required />
          </div>
          <div>
            <label htmlFor="booking-email" style={labelStyle}><Mail style={{ width: "14px", height: "14px" }} />Email *</label>
            <input id="booking-email" type="email" style={inputStyle} placeholder="votre@email.com" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="booking-phone" style={labelStyle}><Phone style={{ width: "14px", height: "14px" }} />Téléphone *</label>
            <input id="booking-phone" type="tel" style={inputStyle} placeholder="06 12 34 56 78" value={formData.phone} onChange={e => handleInputChange("phone", e.target.value)} required />
          </div>
          <div>
            <p style={labelStyle}>Service souhaité *</p>
            <Select value={formData.service} onValueChange={value => handleInputChange("service", value)}>
              <SelectTrigger style={{ ...inputStyle, display: "flex", alignItems: "center" }}>
                <SelectValue placeholder="Choisir un service" />
              </SelectTrigger>
              <SelectContent>
                {services.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p style={labelStyle}><CalendarIcon style={{ width: "14px", height: "14px" }} />Date souhaitée *</p>
            <Popover>
              <PopoverTrigger asChild>
                <button type="button" style={{ ...inputStyle, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", background: "hsl(var(--background))" }}>
                  <CalendarIcon style={{ width: "16px", height: "16px" }} />
                  {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: fr }) : <span style={{ opacity: 0.5 }}>Sélectionner une date</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start" style={{ borderRadius: "16px", border: "2px solid hsl(var(--foreground))" }}>
                <CalendarComponent
                  mode="single" selected={selectedDate} onSelect={setSelectedDate}
                  disabled={date => date < new Date() || !isDateAvailable(date)}
                  initialFocus className={cn("p-3 pointer-events-auto")} locale={fr}
                />
                <div style={{ padding: "12px 16px", borderTop: "1px solid hsl(var(--border))" }}>
                  <p style={{ fontSize: "12px", color: "hsl(var(--foreground))", opacity: 0.6, lineHeight: "1.6" }}>
                    📅 Mardi et vendredi : 8h-21h<br/>• Samedi : 8h-13h
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <p style={labelStyle}><Clock style={{ width: "14px", height: "14px" }} />Heure souhaitée *</p>
            <Select value={formData.time} onValueChange={value => handleInputChange("time", value)} disabled={!selectedDate}>
              <SelectTrigger style={{ ...inputStyle, display: "flex", alignItems: "center", opacity: !selectedDate ? 0.5 : 1 }}>
                <SelectValue placeholder={selectedDate ? "Choisir un créneau" : "Sélectionner d'abord une date"} />
              </SelectTrigger>
              <SelectContent>
                {availableTimeSlots.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label htmlFor="booking-message" style={labelStyle}><MessageCircle style={{ width: "14px", height: "14px" }} />Message (optionnel)</label>
          <textarea
            id="booking-message"
            placeholder="Précisez vos besoins ou questions..."
            rows={4}
            value={formData.message}
            onChange={e => handleInputChange("message", e.target.value)}
            style={{ ...inputStyle, height: "auto", borderRadius: "25px", padding: "16px 24px", resize: "vertical" }}
          />
        </div>

        <button
          type="submit"
          className="arise-btn-primary"
          style={{ width: "100%", justifyContent: "center", opacity: isSubmitting ? 0.7 : 1 }}
          disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.service || !selectedDate || !formData.time}
        >
          {isSubmitting ? "Envoi en cours..." : "Réserver mon rendez-vous"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;