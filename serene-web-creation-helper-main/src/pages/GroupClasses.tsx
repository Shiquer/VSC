import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Calendar, MapPin, Star, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const GroupClasses = () => {
  const classes = [
    {
      title: "Sophrologie Débutant",
      description: "Initiation aux techniques de base de sophrologie et relaxation",
      duration: "1h30",
      participants: { current: 4, max: 8 },
      level: "Débutant",
      price: "25€",
      schedule: "Mardi 19h - 20h30",
      benefits: [
        "Apprentissage des techniques de base",
        "Gestion du stress quotidien",
        "Amélioration du sommeil",
        "Renforcement de la confiance en soi"
      ]
    },
    {
      title: "Sophrologie Avancée",
      description: "Approfondissement des techniques pour pratiquants confirmés",
      duration: "1h30",
      participants: { current: 6, max: 10 },
      level: "Avancé",
      price: "30€",
      schedule: "Vendredi 18h - 19h30",
      benefits: [
        "Techniques avancées de visualisation",
        "Préparation mentale aux défis",
        "Développement de l'intuition",
        "Gestion des émotions complexes"
      ]
    },
    {
      title: "Relaxation & Méditation",
      description: "Séances de relaxation profonde et méditation guidée",
      duration: "1h",
      participants: { current: 8, max: 12 },
      level: "Tous niveaux",
      price: "20€",
      schedule: "Samedi 10h - 11h",
      benefits: [
        "Relaxation profonde",
        "Méditation guidée",
        "Réduction de l'anxiété",
        "Bien-être immédiat"
      ]
    },
    {
      title: "Sophrologie Entreprise",
      description: "Ateliers adaptés aux besoins en entreprise",
      duration: "2h",
      participants: { current: 12, max: 15 },
      level: "Tous niveaux",
      price: "Sur devis",
      schedule: "Planning flexible",
      benefits: [
        "Gestion du stress professionnel",
        "Amélioration de la concentration",
        "Cohésion d'équipe",
        "Prévention du burn-out"
      ]
    }
  ];

  const getParticipantsBadge = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return "destructive";
    if (percentage >= 70) return "secondary";
    return "outline";
  };

  const getAvailabilityText = (current: number, max: number) => {
    const remaining = max - current;
    if (remaining === 0) return "Complet";
    if (remaining <= 2) return `${remaining} place${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}`;
    return `${remaining} places disponibles`;
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Cours Collectifs
            </h1>
            <p className="text-xl text-soft-gray max-w-3xl mx-auto leading-relaxed mb-8">
              Découvrez les bienfaits de la sophrologie en groupe. Nos cours collectifs 
              offrent un accompagnement de qualité dans une ambiance conviviale et bienveillante.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-warm">
                <Calendar className="w-5 h-5 mr-2" />
                Réserver ma place
              </Button>
              <Button variant="outline" size="lg">
                <Users className="w-5 h-5 mr-2" />
                En savoir plus
              </Button>
            </div>
          </div>
        </section>

        {/* Classes Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Nos cours collectifs
              </h2>
              <p className="text-lg text-soft-gray max-w-2xl mx-auto">
                Choisissez le cours qui correspond à votre niveau et vos objectifs
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {classes.map((classItem, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <CardTitle className="text-xl text-foreground mb-2">
                          {classItem.title}
                        </CardTitle>
                        <Badge variant="outline" className="mb-2">
                          {classItem.level}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {classItem.price}
                        </div>
                        <div className="text-sm text-soft-gray">par séance</div>
                      </div>
                    </div>
                    
                    <p className="text-soft-gray leading-relaxed">
                      {classItem.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Participants */}
                    <div className="bg-cream-bg rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Users className="w-5 h-5 text-primary mr-2" />
                          <span className="font-medium">Participants</span>
                        </div>
                        <Badge variant={getParticipantsBadge(classItem.participants.current, classItem.participants.max)}>
                          {classItem.participants.current}/{classItem.participants.max}
                        </Badge>
                      </div>
                      
                      <div className="w-full bg-background rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-warm h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(classItem.participants.current / classItem.participants.max) * 100}%` 
                          }}
                        ></div>
                      </div>
                      
                      <p className="text-sm text-soft-gray">
                        {getAvailabilityText(classItem.participants.current, classItem.participants.max)}
                      </p>
                    </div>

                    {/* Schedule & Duration */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-primary mr-2" />
                        <div>
                          <div className="text-sm font-medium">{classItem.schedule}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-primary mr-2" />
                        <div>
                          <div className="text-sm font-medium">{classItem.duration}</div>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Bénéfices :</h4>
                      <ul className="space-y-2">
                        {classItem.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center text-sm text-soft-gray">
                            <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3 pt-4">
                      <Link to="/reservation" className="flex-1">
                        <Button 
                          className="w-full bg-gradient-warm group-hover:shadow-lg transition-all"
                          disabled={classItem.participants.current >= classItem.participants.max}
                        >
                          {classItem.participants.current >= classItem.participants.max ? (
                            "Complet"
                          ) : (
                            <>
                              Réserver
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </Link>
                      <Button variant="outline">
                        Plus d'infos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-cream-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
                Pourquoi choisir nos cours collectifs ?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Dynamique de groupe</h3>
                  <p className="text-soft-gray">
                    L'énergie collective favorise la motivation et crée une émulation positive entre les participants.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Qualité professionnelle</h3>
                  <p className="text-soft-gray">
                    Encadrement par un sophrologue certifié avec un programme structuré et adapté.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Cadre bienveillant</h3>
                  <p className="text-soft-gray">
                    Environnement calme et sécurisant dans notre cabinet à Saint-Maurice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Prêt à rejoindre nos cours ?
              </h2>
              <p className="text-lg text-soft-gray mb-8">
                Réservez dès maintenant votre place dans le cours qui vous correspond. 
                Places limitées pour garantir un accompagnement de qualité.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/reservation">
                  <Button size="lg" className="bg-gradient-warm">
                    <Calendar className="w-5 h-5 mr-2" />
                    Réserver ma place
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Poser une question
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GroupClasses;