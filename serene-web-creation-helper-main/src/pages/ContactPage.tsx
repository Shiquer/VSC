import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Calendar, Clock, Award, Users, Heart, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import nataliaPortrait from "@/assets/natalia-portrait.jpg";

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const certifications = ["Psychanalyste certifiée RNCP", "Hypnothérapeute", "Formation en entreprise", "Accompagnement personnalisé"];
  const specialties = [
    { icon: Heart, title: "Gestion du stress", description: "Techniques de relaxation et d'apaisement" },
    { icon: Users, title: "Accompagnement professionnel", description: "Formations et coaching en entreprise" },
    { icon: Clock, title: "Troubles du sommeil", description: "Amélioration de la qualité du sommeil" },
    { icon: Award, title: "Développement personnel", description: "Confiance en soi et estime de soi" },
  ];

  const sectionStyle = { padding: "80px 0" };
  const inputStyle = { width: "100%", padding: "12px 16px", border: "1.5px solid hsl(var(--border))", borderRadius: "10px", fontSize: "14px", background: "hsl(var(--background))", color: "hsl(var(--foreground))", boxSizing: "border-box" as const };
  const labelStyle = { display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "14px", color: "hsl(var(--foreground))" };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setFormStatus("sending");
    fetch("https://formspree.io/f/mykobvjq", {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (res.ok) { setFormStatus("success"); form.reset(); }
        else setFormStatus("error");
      })
      .catch(() => setFormStatus("error"));
