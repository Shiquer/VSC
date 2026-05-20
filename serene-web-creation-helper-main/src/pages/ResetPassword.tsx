import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isValidSession, setIsValidSession] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
          const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                  if (event === "PASSWORD_RECOVERY") {
                            setIsValidSession(true);
                          }
                });

          // Check if we already have a session (token from URL hash processed by Supabase)
          supabase.auth.getSession().then(({ data: { session } }) => {
                  if (session) {
                            setIsValidSession(true);
                          }
                });

          return () => subscription.unsubscribe();
        }, []);

    const handleUpdatePassword = async (e: React.FormEvent) => {
          e.preventDefault();

          if (password !== confirmPassword) {
                  toast({
                            title: "Erreur",
                            description: "Les mots de passe ne correspondent pas.",
                            variant: "destructive",
                          });
                  return;
                }

          if (password.length < 6) {
                  toast({
                            title: "Erreur",
                            description: "Le mot de passe doit contenir au moins 6 caracteres.",
                            variant: "destructive",
                          });
                  return;
                }

          setIsLoading(true);

          try {
                  const { error } = await supabase.auth.updateUser({ password });

                  if (error) {
                            toast({
                                        title: "Erreur",
                                        description: error.message,
                                        variant: "destructive",
                                      });
                          } else {
                            toast({
                                        title: "Mot de passe mis a jour",
                                        description: "Votre mot de passe a ete reinitialise avec succes.",
                                      });
                            await supabase.auth.signOut();
                            navigate("/auth");
                          }
                } catch (error: any) {
                  toast({
                            title: "Erreur",
                            description: error.message,
                            variant: "destructive",
                          });
                } finally {
                  setIsLoading(false);
                }
        };

    return (
          <div className="min-h-screen">
            <Header />
            <main className="pt-20 pb-16">
              <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Nouveau mot de passe</CardTitle>
                      <CardDescription>
                        Choisissez un nouveau mot de passe pour votre compte
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isValidSession ? (
                                          <form onSubmit={handleUpdatePassword} className="space-y-4">
                                            <div className="space-y-2">
                                              <Label htmlFor="new-password">Nouveau mot de passe</Label>
                                              <Input
                                                id="new-password"
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                minLength={6}
                                              />
                                            </div>
                                            <div className="space-y-2">
                                              <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                                              <Input
                                                id="confirm-password"
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                minLength={6}
                                              />
                                            </div>
                                            <Button type="submit" className="w-full" disabled={isLoading}>
                                              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                              Mettre a jour le mot de passe
                                            </Button>
                                          </form>
                                        ) : (
                                          <div className="text-center space-y-4">
                                            <p className="text-muted-foreground">
                                              Lien de reinitialisation invalide ou expire. Veuillez recommencer.
                                            </p>
                                            <Button onClick={() => navigate("/auth")} variant="outline">
                                              Retour a la connexion
                                            </Button>
                                          </div>
                                        )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        );
  };

export default ResetPassword;
