import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface AuthFormProps {
    onAuthSuccess?: () => void;
}

const AuthForm = ({ onAuthSuccess }: AuthFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const { toast } = useToast();

    const handleSignUp = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsLoading(true);

          try {
                  const { error } = await supabase.auth.signUp({
                            email,
                            password,
                            options: {
                                        emailRedirectTo: `${window.location.origin}/`,
                                        data: {
                                                      full_name: fullName,
                                        },
                            },
                  });

            if (error) {
                      toast({
                                  title: "Erreur d'inscription",
                                  description: error.message,
                                  variant: "destructive",
                      });
            } else {
                      toast({
                                  title: "Inscription reussie",
                                  description: "Verifiez votre email pour confirmer votre compte.",
                      });
                      onAuthSuccess?.();
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

    const handleSignIn = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsLoading(true);

          try {
                  const { error } = await supabase.auth.signInWithPassword({
                            email,
                            password,
                  });

            if (error) {
                      toast({
                                  title: "Erreur de connexion",
                                  description: error.message,
                                  variant: "destructive",
                      });
            } else {
                      toast({
                                  title: "Connexion reussie",
                                  description: "Vous etes maintenant connecte.",
                      });
                      onAuthSuccess?.();
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

    const handleForgotPassword = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsLoading(true);

          try {
                  const { error } = await supabase.auth.resetPasswordForEmail(email, {
                            redirectTo: `${window.location.origin}/reset-password`,
                  });

            if (error) {
                      toast({
                                  title: "Erreur",
                                  description: error.message,
                                  variant: "destructive",
                      });
            } else {
                      toast({
                                  title: "Email envoye",
                                  description: "Verifiez votre boite mail pour reinitialiser votre mot de passe.",
                      });
                      setShowForgotPassword(false);
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

    if (showForgotPassword) {
          return (
                  <Card className="w-full max-w-md mx-auto">
                          <CardHeader>
                                    <CardTitle>Mot de passe oublie</CardTitle>CardTitle>
                                    <CardDescription>
                                                Entrez votre email pour recevoir un lien de reinitialisation
                                    </CardDescription>CardDescription>
                          </CardHeader>CardHeader>
                          <CardContent>
                                    <form onSubmit={handleForgotPassword} className="space-y-4">
                                                <div className="space-y-2">
                                                              <Label htmlFor="forgot-email">Email</Label>Label>
                                                              <Input
                                                                                id="forgot-email"
                                                                                type="email"
                                                                                value={email}
                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                                required
                                                                              />
                                                </div>div>
                                                <Button type="submit" className="w-full" disabled={isLoading}>
                                                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                              Envoyer le lien
                                                </Button>Button>
                                                <Button
                                                                type="button"
                                                                variant="ghost"
                                                                className="w-full"
                                                                onClick={() => setShowForgotPassword(false)}
                                                              >
                                                              Retour a la connexion
                                                </Button>Button>
                                    </form>form>
                          </CardContent>CardContent>
                  </Card>Card>
                );
    }
  
    return (
          <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                        <CardTitle>Connexion</CardTitle>CardTitle>
                        <CardDescription>
                                  Connectez-vous ou creez un compte pour prendre rendez-vous
                        </CardDescription>CardDescription>
                </CardHeader>CardHeader>
                <CardContent>
                        <Tabs defaultValue="signin" className="space-y-4">
                                  <TabsList className="grid w-full grid-cols-2">
                                              <TabsTrigger value="signin">Se connecter</TabsTrigger>TabsTrigger>
                                              <TabsTrigger value="signup">S'inscrire</TabsTrigger>TabsTrigger>
                                  </TabsList>TabsList>
                        
                                  <TabsContent value="signin">
                                              <form onSubmit={handleSignIn} className="space-y-4">
                                                            <div className="space-y-2">
                                                                            <Label htmlFor="signin-email">Email</Label>Label>
                                                                            <Input
                                                                                                id="signin-email"
                                                                                                type="email"
                                                                                                value={email}
                                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                                                required
                                                                                              />
                                                            </div>div>
                                                            <div className="space-y-2">
                                                                            <Label htmlFor="signin-password">Mot de passe</Label>Label>
                                                                            <Input
                                                                                                id="signin-password"
                                                                                                type="password"
                                                                                                value={password}
                                                                                                onChange={(e) => setPassword(e.target.value)}
                                                                                                required
                                                                                              />
                                                            </div>div>
                                                            <Button type="submit" className="w-full" disabled={isLoading}>
                                                              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                                            Se connecter
                                                            </Button>Button>
                                                            <Button
                                                                              type="button"
                                                                              variant="ghost"
                                                                              className="w-full text-sm text-muted-foreground"
                                                                              onClick={() => setShowForgotPassword(true)}
                                                                            >
                                                                            Mot de passe oublie ?
                                                            </Button>Button>
                                              </form>form>
                                  </TabsContent>TabsContent>
                        
                                  <TabsContent value="signup">
                                              <form onSubmit={handleSignUp} className="space-y-4">
                                                            <div className="space-y-2">
                                                                            <Label htmlFor="signup-name">Nom complet</Label>Label>
                                                                            <Input
                                                                                                id="signup-name"
                                                                                                type="text"
                                                                                                value={fullName}
                                                                                                onChange={(e) => setFullName(e.target.value)}
                                                                                                required
                                                                                              />
                                                            </div>div>
                                                            <div className="space-y-2">
                                                                            <Label htmlFor="signup-email">Email</Label>Label>
                                                                            <Input
                                                                                                id="signup-email"
                                                                                                type="email"
                                                                                                value={email}
                                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                                                required
                                                                                              />
                                                            </div>div>
                                                            <div className="space-y-2">
                                                                            <Label htmlFor="signup-password">Mot de passe</Label>Label>
                                                                            <Input
                                                                                                id="signup-password"
                                                                                                type="password"
                                                                                                value={password}
                                                                                                onChange={(e) => setPassword(e.target.value)}
                                                                                                required
                                                                                                minLength={6}
                                                                                              />
                                                            </div>div>
                                                            <Button type="submit" className="w-full" disabled={isLoading}>
                                                              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                                            S'inscrire
                                                            </Button>Button>
                                              </form>form>
                                  </TabsContent>TabsContent>
                        </Tabs>Tabs>
                </CardContent>CardContent>
          </Card>Card>
        );
};

export default AuthForm;</Card>
