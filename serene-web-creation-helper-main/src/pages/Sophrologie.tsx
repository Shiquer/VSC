import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle, Clock, Users, Phone, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Sophrologie = () => {
  const techniques = [
    "Relaxation dynamique",
    "Respiration consciente",
    "Visualisation positive",
    "Méditation guidée",
    "Ancrage corporel"
  ];

  const benefices = [
    "Réduction du stress et de l'anxiété",
    "Amélioration du sommeil",
    "Renforcement de la confiance en soi",
    "Meilleure gestion des émotions",
    "Préparation mentale aux défis",
    "Développement de la concentration"
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
              <Brain className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Sophrologie
            </h1>
            <p className="text-xl text-soft-gray max-w-3xl mx-auto leading-relaxed mb-8">
              La sophrologie est une méthode de relaxation basée sur la respiration,
              la décontraction musculaire et la visualisation. Elle vous aide à retrouver
              un équilibre entre votre corps et votre mental.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/reservation">
                <Button size="lg" className="bg-gradient-warm border-0 text-white">
                  <Phone className="w-5 h-5 mr-2" />
                  Prendre rendez-vous
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Me contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Techniques Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              Mes techniques de sophrologie
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techniques.map((technique, index) => (
                <Card key={index} className="text-center group hover:shadow-warm transition-all duration-300">
                  <CardContent className="pt-6">
                    <CheckCircle className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-foreground">{technique}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bénéfices Section */}
      <section className="py-20 bg-cream-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              Les bénéfices de la sophrologie
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-4">
                  {benefices.map((benefice, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{benefice}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-6 h-6 text-primary mr-3" />
                    Déroulement d'une séance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1">1</div>
                    <div>
                      <p className="font-medium text-foreground">Échange et définition des objectifs</p>
                      <p className="text-sm text-soft-gray">10 minutes</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1">2</div>
                    <div>
                      <p className="font-medium text-foreground">Exercices de relaxation dynamique</p>
                      <p className="text-sm text-soft-gray">35 minutes</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1">3</div>
                    <div>
                      <p className="font-medium text-foreground">Partage et conseils personnalisés</p>
                      <p className="text-sm text-soft-gray">15 minutes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Prêt à commencer votre parcours ?
            </h2>
            <p className="text-lg text-soft-gray mb-8 max-w-2xl mx-auto">
              Prenez rendez-vous pour une première séance découverte et commencez
              votre chemin vers un mieux-être durable.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/reservation">
                <Button size="lg" className="bg-gradient-warm border-0 text-white">
                  <Phone className="w-5 h-5 mr-2" />
                  Prendre rendez-vous
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  <Users className="w-5 h-5 mr-2" />
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sophrologie;
