import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Calendar, Clock, Award, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import christopherPortrait from "@/assets/christopher-portrait.jpg";

const ContactPage = () => {
  const certifications = [
    "Sophrologue certifié RNCP",
    "Hypnothérapeute",
    "Formation en entreprise",
    "Accompagnement personnalisé"
  ];

  const specialties = [
    { icon: Heart, title: "Gestion du stress", description: "Techniques de relaxation et d'apaisement" },
    { icon: Users, title: "Accompagnement professionnel", description: "Formations et coaching en entreprise" },
    { icon: Clock, title: "Troubles du sommeil", description: "Amélioration de la qualité du sommeil" },
    { icon: Award, title: "Développement personnel", description: "Confiance en soi et estime de soi" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Christopher Quershi
                </h1>
                <p className="text-xl text-soft-gray mb-4">
                  Sophrologue & Hypnothérapeute certifié
                </p>
                <p className="text-lg text-soft-gray leading-relaxed mb-8">
                  Passionné par l'accompagnement humain, je vous propose un suivi personnalisé 
                  en sophrologie et hypnose. Mon approche bienveillante et professionnelle 
                  vous permettra de retrouver équilibre, sérénité et confiance en vous.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/reservation">
                    <Button size="lg" className="bg-gradient-warm">
                      <Calendar className="w-5 h-5 mr-2" />
                      Prendre rendez-vous
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    <Phone className="w-5 h-5 mr-2" />
                    Me contacter
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={christopherPortrait} 
                  alt="Christopher Quershi, Sophrologue et Hypnothérapeute"
                  className="rounded-2xl shadow-warm w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
                Mon parcours & mon approche
              </h2>
              
              <Card className="mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-6 h-6 mr-3 text-primary" />
                    Formation & Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-soft-gray leading-relaxed mb-6">
                    Diplômé en sophrologie et formé aux techniques d'hypnose thérapeutique, 
                    je me suis spécialisé dans l'accompagnement des particuliers et des entreprises. 
                    Ma formation continue me permet de proposer des approches innovantes et adaptées 
                    aux besoins de chacun.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-8">
                {specialties.map((specialty, index) => {
                  const IconComponent = specialty.icon;
                  return (
                    <Card key={index} className="hover:shadow-warm transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <div className="w-10 h-10 bg-gradient-warm rounded-full flex items-center justify-center mr-3">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          {specialty.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-soft-gray">{specialty.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-20 bg-cream-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
                Informations pratiques
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-6 h-6 mr-3 text-primary" />
                      Adresse du cabinet
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground font-medium">
                      15 rue Adrien Damalix<br />
                      94410 Saint-Maurice
                    </p>
                    <p className="text-soft-gray text-sm">
                      Cabinet facilement accessible en transport en commun, 
                      parking disponible à proximité.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-6 h-6 mr-3 text-primary" />
                      Horaires d'ouverture
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Mardi</span>
                      <span className="text-soft-gray">8h - 21h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Vendredi</span>
                      <span className="text-soft-gray">8h - 21h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Samedi</span>
                      <span className="text-soft-gray">8h - 13h</span>
                    </div>
                    <p className="text-sm text-soft-gray mt-4">
                      Consultations sur rendez-vous uniquement
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-6 h-6 mr-3 text-primary" />
                    Contact direct
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <span className="text-foreground">contact@christopherquershi.fr</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <span className="text-foreground">Téléphone communiqué sur demande</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Link to="/reservation">
                        <Button className="w-full bg-gradient-warm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Prendre rendez-vous en ligne
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full">
                        <Mail className="w-4 h-4 mr-2" />
                        Envoyer un message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;