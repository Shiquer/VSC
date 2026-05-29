import { useState } from 'react';
import { Save, Bell, Palette, Globe, Mail, Type, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const AdminSettings = () => {
  const [notifEmail, setNotifEmail] = useState('contact@natalia-kourycheva.fr');
  const [notifNewBooking, setNotifNewBooking] = useState(true);
  const [notifNewMessage, setNotifNewMessage] = useState(true);
  const [notifNewTestimonial, setNotifNewTestimonial] = useState(false);
  const [notifDigestWeekly, setNotifDigestWeekly] = useState(false);
  const [siteName, setSiteName] = useState('Natalia Kourycheva');
  const [siteTagline, setSiteTagline] = useState('Psychanalyste & Hypnotherapeute a Paris');
  const [primaryColor, setPrimaryColor] = useState('#4a2c2a');
  const [accentColor, setAccentColor] = useState('#b5987a');

  const handleSaveNotifications = () => { toast.success('Parametres de notification enregistres'); };
  const handleSaveVisual = () => { toast.success('Parametres visuels enregistres'); };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Parametres</h1>
        <p className="text-gray-500 mt-1">Gerez les parametres de votre site</p>
      </div>
      <Tabs defaultValue="notifications">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-2" />Notifications</TabsTrigger>
          <TabsTrigger value="visual"><Palette className="w-4 h-4 mr-2" />Identite visuelle</TabsTrigger>
        </TabsList>
        <TabsContent value="notifications" className="mt-6">
          <div className="space-y-6 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Mail className="w-5 h-5 text-primary" />Email de notification</CardTitle>
                <CardDescription>Adresse email qui recevra les notifications du site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notif-email">Adresse email</Label>
                  <Input id="notif-email" type="email" value={notifEmail} onChange={(e) => setNotifEmail(e.target.value)} placeholder="votre@email.com" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5 text-primary" />Evenements a notifier</CardTitle>
                <CardDescription>Choisissez quand vous souhaitez etre notifie</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div><p className="font-medium text-sm">Nouvelle reservation</p><p className="text-xs text-gray-500">Notifie a chaque nouvelle demande de rendez-vous</p></div>
                  <Switch checked={notifNewBooking} onCheckedChange={setNotifNewBooking} />
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div><p className="font-medium text-sm">Nouveau message de contact</p><p className="text-xs text-gray-500">Notifie a chaque message recu via le formulaire</p></div>
                  <Switch checked={notifNewMessage} onCheckedChange={setNotifNewMessage} />
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div><p className="font-medium text-sm">Nouveau temoignage</p><p className="text-xs text-gray-500">Notifie a chaque nouveau temoignage soumis</p></div>
                  <Switch checked={notifNewTestimonial} onCheckedChange={setNotifNewTestimonial} />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div><p className="font-medium text-sm">Recapitulatif hebdomadaire</p><p className="text-xs text-gray-500">Resume des activites de la semaine chaque lundi</p></div>
                  <Switch checked={notifDigestWeekly} onCheckedChange={setNotifDigestWeekly} />
                </div>
              </CardContent>
            </Card>
            <Button onClick={handleSaveNotifications} className="flex items-center gap-2"><Save className="w-4 h-4" />Enregistrer les notifications</Button>
          </div>
        </TabsContent>
        <TabsContent value="visual" className="mt-6">
          <div className="space-y-6 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" />Informations du site</CardTitle>
                <CardDescription>Nom et accroche affiches sur votre site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Nom du site</Label>
                  <Input id="site-name" value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="Nom du praticien ou cabinet" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-tagline">Sous-titre / Accroche</Label>
                  <Input id="site-tagline" value={siteTagline} onChange={(e) => setSiteTagline(e.target.value)} placeholder="Votre specialite et localisation" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5 text-primary" />Couleurs</CardTitle>
                <CardDescription>Palette de couleurs principale du site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Couleur principale</Label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-300" />
                      <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="font-mono text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Couleur d'accentuation</Label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-300" />
                      <Input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="font-mono text-sm" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button onClick={handleSaveVisual} className="flex items-center gap-2"><Save className="w-4 h-4" /><Type className="w-4 h-4" />Enregistrer l'identite visuelle</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
