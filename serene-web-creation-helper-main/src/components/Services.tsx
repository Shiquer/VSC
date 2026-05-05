import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const Services = () => {
  const { getContent } = useSiteContent("services");
  const services = [
    {
      icon: Brain,
      title: getContent("sophrologie_title", "Sophrologie"),
      description: getContent("sophrologie_description", "Techniques de relaxation et de gestion du stress pour retrouver un équilibre mental et physique."),
      features: [
        "Gestion du stress et de l'anxiété",
        "Préparation aux examens",
        "Accompagnement sommeil",
        "Développement personnel"
      ],
      link: "/sophrologie"
    },
    {
      icon: Heart,
      title: getContent("hypnose_title", "Hypnose"),
      description: getContent("hypnose_description", "Accompagnement thérapeutique pour modifier les comportements et surmonter les blocages."),
      features: [
        "Arrêt du tabac",
        "Gestion des phobies",
        "Perte de poids",
        "Confiance en soi"
      ],
      link: "/hypnose"
    },
    {
      icon: Users,
      title: getContent("entreprise_title", "Entreprise"),
      description: getContent("entreprise_description", "Formations et accompagnements adaptés au monde du travail pour améliorer le bien-être au travail."),
      features: [
        "Formations anti-stress",
        "Cohésion d'équipe",
        "Prévention burn-out",
        "Qualité de vie au travail"
      ],
      link: "/entreprise"
    }
  ];

  return (
    <section id="specialites" className="py-20 bg-cream-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {getContent("services_title", "Mes spécialités")}
          </h2>
          <p className="text-lg text-soft-gray max-w-3xl mx-auto leading-relaxed">
            {getContent("services_intro", "Je vous accompagne en sophrologie et en hypnose pour votre mieux-être. Je vous laisse découvrir mes différentes spécialités. Comme rien ne remplace un échange de vive voix, n'hésitez pas à me contacter.")}
          </p>
          <Link to="/contact">
            <Button variant="outline" className="mt-6">
              Me contacter
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={service.title}
                className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/50"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                  <CardDescription className="text-soft-gray">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to={service.link}>
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
