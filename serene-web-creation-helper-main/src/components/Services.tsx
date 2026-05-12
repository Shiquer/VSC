import { Brain, Heart, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const Services = () => {
  const { getContent } = useSiteContent("services");

  const services = [
    {
      icon: Brain,
      iconBg: "hsl(var(--foreground))",
      iconColor: "hsl(var(--primary-foreground))",
      title: getContent("sophrologie_title", "Sophrologie"),
      description: getContent("sophrologie_description", "Techniques de relaxation et de gestion du stress pour retrouver un équilibre mental et physique."),
      features: ["Gestion du stress et de l'anxiété", "Préparation aux examens", "Accompagnement sommeil", "Développement personnel"],
      link: "/sophrologie"
    },
    {
      icon: Heart,
      iconBg: "hsl(var(--accent))",
      iconColor: "#fff",
      title: getContent("hypnose_title", "Hypnose"),
      description: getContent("hypnose_description", "Accompagnement thérapeutique pour modifier les comportements et surmonter les blocages."),
      features: ["Arrêt du tabac", "Gestion des phobies", "Perte de poids", "Confiance en soi"],
      link: "/hypnose"
    },
    {
      icon: Users,
      iconBg: "#334862",
      iconColor: "#fff",
      title: getContent("entreprise_title", "Entreprise"),
      description: getContent("entreprise_description", "Formations et accompagnements adaptés au monde du travail pour améliorer le bien-être au travail."),
      features: ["Formations anti-stress", "Cohésion d'équipe", "Prévention burn-out", "Qualité de vie au travail"],
      link: "/entreprise"
    }
  ];

  return (
    <section id="specialites" style={{ padding: "80px 0", background: "hsl(var(--secondary))" }}>
      <div className="container mx-auto px-8">
        <div className="text-center animate-fade-in" style={{ marginBottom: "56px" }}>
          <h2 className="arise-serif" style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "16px" }}>
            {getContent("services_title", "Mes spécialités")}
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.7, maxWidth: "560px", margin: "0 auto 32px" }}>
            {getContent("services_intro", "Je vous accompagne en sophrologie et en hypnose pour votre mieux-être. N'hésitez pas à me contacter.")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={service.title} className="arise-card" style={{ animationDelay: `${index * 0.2}s`, transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
              >
                <div style={{ width: "52px", height: "52px", background: service.iconBg, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <IconComponent style={{ width: "24px", height: "24px", color: service.iconColor }} />
                </div>
                <h3 className="arise-serif" style={{ fontSize: "20px", fontWeight: "400", color: "hsl(var(--foreground))", marginBottom: "12px" }}>{service.title}</h3>
                <p style={{ fontSize: "14px", lineHeight: "1.7", color: "hsl(var(--foreground))", opacity: 0.7, marginBottom: "20px" }}>{service.description}</p>
                <ul style={{ marginBottom: "24px" }}>
                  {service.features.map((feature) => (
                    <li key={feature} style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "hsl(var(--foreground))", marginBottom: "8px" }}>
                      <div style={{ width: "6px", height: "6px", background: "hsl(var(--foreground))", borderRadius: "50%", marginRight: "10px", flexShrink: 0 }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to={service.link} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "700", color: "#334862", textDecoration: "none", fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}>
                  En savoir plus <ArrowRight style={{ width: "14px", height: "14px" }} />
                </Link>
              </div>
            );
          })}

          <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link to="/contact">
            <button className="arise-btn-outline">Me contacter</button>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
