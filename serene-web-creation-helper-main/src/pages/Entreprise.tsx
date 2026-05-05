import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle, Clock, Phone, ArrowLeft, Building, Target, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Entreprise = () => {
  const services = [
    {
      icon: Target,
      title: "Formations anti-stress",
      description: "Programmes personnalisés pour apprendre à gérer le stress au quotidien",
      duree: "Demi-journée ou journée complète",
      participants: "5 à 15 personnes"
    },
    {
      icon: Users,
      title: "Cohésion d'équipe",
      description: "Activités de team building basées sur la sophrologie et la communication",
      duree: "1 à 2 jours",
      participants: "Équipes de 8 à 20 personnes"
    },
    {
      icon: TrendingUp,
      title: "Prévention burn-out",
      description: "Sensibilisation et outils pratiques pour prévenir l'épuisement professionnel",
      duree: "Ateliers de 2h à 4h",
      participants: "Managers et collaborateurs"
    },
    {
      icon: Award,
      title: "Qualité de vie au travail",
      description: "Amélioration du bien-être global et de l'ambiance de travail",
      duree: "Programme sur mesure",
      participants: "Selon les besoins"
    }
  ];

  const benefices = [
    "Réduction de l'absentéisme",
    "Amélioration de la productivité",
    "Meilleure ambiance de travail",
    "Diminution du stress collectif",
    "Renforcement de la communication",
    "Prévention des risques psychosociaux"
  ];

  const secteurs = [
    "Entreprises privées",
    "Administrations publiques",
    "Établissements de santé",
    "Institutions scolaires",
    "Associations",
    "Startups et PME"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cream-bg to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Link>
            
            <div className="w-20 h-20 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-8">
              <Users className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Entreprise & Organisations
            </h1>
            <p className="text-xl text-soft-gray max-w-3xl mx-auto leading-relaxed mb-8">
              Accompagnement des entreprises et organisations pour améliorer le bien-être 
              au travail, prévenir les risques psychosociaux et favoriser un environnement 
              professionnel épanouissant.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-warm border-0 text-white">
                <Phone className="w-5 h-5 mr-2" />
                Demander un devis
              </Button>
              <Button variant="outline" size="lg">
                <Building className="w-5 h-5 mr-2" />
                Présenter mon projet
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              Nos accompagnements en entreprise
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-2">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                      <CardDescription className="text-soft-gray">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-foreground">
                          <Clock className="w-4 h-4 text-primary mr-2" />
                          <span className="font-medium">Durée :</span>
                          <span className="ml-2">{service.duree}</span>
                        </div>
                        <div className="flex items-center text-sm text-foreground">
                          <Users className="w-4 h-4 text-primary mr-2" />
                          <span className="font-medium">Participants :</span>
                          <span className="ml-2">{service.participants}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bénéfices Section */}
      <section className="py-20 bg-cream-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              Les bénéfices pour votre organisation
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefices.map((benefice, index) => (
                <Card key={index} className="text-center group hover:shadow-warm transition-all duration-300">
                  <CardContent className="pt-6">
                    <CheckCircle className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-foreground">{benefice}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Secteurs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              Secteurs d'intervention
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secteurs.map((secteur, index) => (
                <Card key={index} className="text-center group hover:shadow-warm transition-all duration-300">
                  <CardContent className="pt-6">
                    <Building className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-foreground">{secteur}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Méthode Section */}
      <section className="py-20 bg-cream-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              Notre approche
            </h2>
            
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-semibold mr-4 mt-1">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">Diagnostic des besoins</h3>
                    <p className="text-soft-gray">Analyse de votre contexte et identification des enjeux spécifiques à votre organisation</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-semibold mr-4 mt-1">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">Conception sur mesure</h3>
                    <p className="text-soft-gray">Élaboration d'un programme adapté à vos objectifs et contraintes</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-semibold mr-4 mt-1">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">Mise en œuvre</h3>
                    <p className="text-soft-gray">Animation des ateliers et formations avec des outils pratiques et concrets</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-semibold mr-4 mt-1">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">Suivi et évaluation</h3>
                    <p className="text-soft-gray">Accompagnement dans la durée et mesure de l'impact des actions menées</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Investissez dans le bien-être de vos équipes
            </h2>
            <p className="text-lg text-soft-gray mb-8 max-w-2xl mx-auto">
              Contactez-nous pour échanger sur vos besoins et construire ensemble 
              un programme adapté à votre organisation.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-warm border-0 text-white">
                <Phone className="w-5 h-5 mr-2" />
                Demander un devis
              </Button>
              <Button variant="outline" size="lg">
                <Building className="w-5 h-5 mr-2" />
                Télécharger la brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Entreprise;