import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle, Clock, Users, Phone, ArrowLeft, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Hypnose = () => {
  const domaines = [
    {
      title: "Arrêt du tabac",
      description: "Accompagnement personnalisé pour se libérer définitivement de la dépendance au tabac"
    },
    {
      title: "Gestion des phobies",
      description: "Traitement en douceur des peurs irrationnelles et des phobies limitantes"
    },
    {
      title: "Perte de poids",
      description: "Modification des comportements alimentaires pour une perte de poids durable"
    },
    {
      title: "Confiance en soi",
      description: "Renforcement de l'estime de soi et développement de la confiance intérieure"
    },
    {
      title: "Gestion du stress",
      description: "Techniques pour réduire l'anxiété et retrouver un état de calme intérieur"
    },
    {
      title: "Troubles du sommeil",
      description: "Amélioration de la qualité du sommeil et traitement des insomnies"
    }
  ];

  const mythes = [
    {
      mythe: "L'hypnose fait perdre le contrôle",
      realite: "Vous restez conscient et maître de vos décisions à tout moment"
    },
    {
      mythe: "Tout le monde n'est pas hypnotisable",
      realite: "Chacun peut atteindre un état d'hypnose adapté à sa personnalité"
    },
    {
      mythe: "L'hypnose peut révéler des secrets",
      realite: "Vous ne direz que ce que vous souhaitez partager"
    }
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
              <Heart className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Hypnose thérapeutique
            </h1>
            <p className="text-xl text-soft-gray max-w-3xl mx-auto leading-relaxed mb-8">
              L'hypnose thérapeutique est un état modifié de conscience qui permet d'accéder 
              aux ressources inconscientes pour créer des changements durables et positifs 
              dans votre vie.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-warm border-0 text-white">
                <Phone className="w-5 h-5 mr-2" />
                Prendre rendez-vous
              </Button>
              <Button variant="outline" size="lg">
                Me contacter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Domaines d'application */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              Domaines d'application
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {domaines.map((domaine, index) => (
                <Card key={index} className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{domaine.title}</CardTitle>
                    <CardDescription className="text-soft-gray">
                      {domaine.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mythes et réalités */}
      <section className="py-20 bg-cream-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              Mythes et réalités sur l'hypnose
            </h2>
            
            <div className="space-y-6">
              {mythes.map((item, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold text-red-600 mb-2">❌ Mythe</h3>
                        <p className="text-foreground">{item.mythe}</p>
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold text-green-600 mb-2">✅ Réalité</h3>
                        <p className="text-foreground">{item.realite}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Déroulement d'une séance */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              Déroulement d'une séance d'hypnose
            </h2>
            
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Clock className="w-8 h-8 text-primary mr-3" />
                  Séance de 60 minutes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-semibold mr-4 mt-1">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">Anamnèse et définition des objectifs</h3>
                    <p className="text-soft-gray">Discussion approfondie de votre demande et de vos attentes</p>
                    <p className="text-sm text-primary font-medium">15 minutes</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-semibold mr-4 mt-1">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">Induction et travail en hypnose</h3>
                    <p className="text-soft-gray">Accompagnement personnalisé vers l'état d'hypnose thérapeutique</p>
                    <p className="text-sm text-primary font-medium">35 minutes</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-semibold mr-4 mt-1">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">Retour et conseils</h3>
                    <p className="text-soft-gray">Échange sur la séance et conseils pour maintenir les bénéfices</p>
                    <p className="text-sm text-primary font-medium">10 minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cream-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Libérez votre potentiel de changement
            </h2>
            <p className="text-lg text-soft-gray mb-8 max-w-2xl mx-auto">
              L'hypnose thérapeutique peut vous aider à surmonter vos blocages 
              et à atteindre vos objectifs. Prenez rendez-vous pour découvrir 
              cette approche en douceur.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-warm border-0 text-white">
                <Phone className="w-5 h-5 mr-2" />
                Prendre rendez-vous
              </Button>
              <Button variant="outline" size="lg">
                <Users className="w-5 h-5 mr-2" />
                Poser une question
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hypnose;