import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, Award, Calendar, MapPin } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import officeImage from "@/assets/therapy-office.jpg";

const About = () => {
  const { getContent } = useSiteContent("about");
  return (
    <section id="a-propos" className="py-20 bg-gradient-soft relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {getContent("about_title", "À propos de Christopher Quershi")}
          </h2>
          <p className="text-lg text-soft-gray max-w-3xl mx-auto">
            {getContent("about_intro", "Découvrez mon parcours et ma philosophie d'accompagnement.")}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Image and info blocks */}
          <div className="lg:col-span-8 space-y-6">
            {/* Main office image */}
            <div className="relative group">
              <div className="relative rounded-3xl overflow-hidden shadow-soft">
                <img
                  src={officeImage}
                  alt="Cabinet de sophrologie - Espace de détente et de bien-être"
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* CTA Button overlay */}
                <div className="absolute bottom-8 left-8">
                  <Button 
                    size="lg"
                    className="bg-white/90 text-foreground hover:bg-white border-0 shadow-lg backdrop-blur-sm"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Prendre rendez-vous
                  </Button>
                </div>
              </div>
            </div>

            {/* Info blocks under the image */}
            <div className="space-y-6">
              {/* First row - Hours */}
              <Card className="bg-white/95 backdrop-blur-md border-0 shadow-warm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Horaires d'ouverture</h4>
                      <div className="space-y-1 text-sm text-soft-gray">
                        <p>Mardi et vendredi de 8h à 21h</p>
                        <p>et samedi de 8h à 13h</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Three aligned blocks */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Certifications */}
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground">Formations & Certifications</h4>
                    </div>
                    <div className="space-y-3">
                      {[
                        "Sophrologue certifié RNCP",
                        "Hypnothérapeute diplômé", 
                        "Formation continue en thérapies brèves",
                        "Spécialisation accompagnement entreprise"
                      ].map((cert, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <p className="text-sm text-soft-gray">{cert}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Testimonials */}
                <Card className="bg-gradient-warm text-white border-0 shadow-warm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Quote className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-semibold text-white">Témoignages</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-3 h-3 text-yellow-300">★</div>
                          ))}
                        </div>
                        <p className="text-sm text-white/90 italic">
                          "Accompagnement exceptionnel, j'ai retrouvé confiance en moi."
                        </p>
                        <p className="text-xs text-white/70">— Marie L.</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-3 h-3 text-yellow-300">★</div>
                          ))}
                        </div>
                        <p className="text-sm text-white/90 italic">
                          "Des séances qui ont transformé ma gestion du stress."
                        </p>
                        <p className="text-xs text-white/70">— Thomas R.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Statistics & Experience */}
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground">Expérience & Résultats</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">5+</div>
                        <div className="text-xs text-soft-gray">Années d'expérience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">200+</div>
                        <div className="text-xs text-soft-gray">Patients accompagnés</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">95%</div>
                        <div className="text-xs text-soft-gray">Taux de satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">85%</div>
                        <div className="text-xs text-soft-gray">Amélioration ressentie</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-4 space-y-6">
            {/* CTA Buttons - remontés en haut */}
            <div className="flex flex-col gap-3">
              <Button 
                size="lg"
                className="bg-gradient-warm border-0 text-white hover:opacity-90 shadow-warm w-full"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Prendre rendez-vous
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Voir tous les avis
              </Button>
            </div>

            {/* Address */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Cabinet</h4>
                    <p className="text-soft-gray">15 rue Adrien Damalix</p>
                    <p className="text-soft-gray">94410 Saint-Maurice</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quote */}
            <Card className="bg-gradient-warm text-white border-0 shadow-warm">
              <CardContent className="p-8 relative">
                <Quote className="w-10 h-10 opacity-20 absolute top-4 right-4" />
                <blockquote className="text-lg font-medium mb-4 leading-relaxed">
                  "On ne change pas en luttant contre ce qui existe déjà. Pour changer quelque chose, construisez un modèle nouveau qui rend l'ancien obsolète."
                </blockquote>
                <cite className="text-white/80 text-sm">— Buckminster Fuller</cite>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;