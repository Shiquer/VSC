import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface BookingNotificationRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, date, time, message }: BookingNotificationRequest = await req.json();

    const s = {
      name: sanitizeHtml(name || ""),
      email: sanitizeHtml(email || ""),
      phone: sanitizeHtml(phone || ""),
      service: sanitizeHtml(service || ""),
      date: sanitizeHtml(date || ""),
      time: sanitizeHtml(time || ""),
      message: message ? sanitizeHtml(message) : undefined,
    };

    // Email to Natalia (practice owner)
    await resend.emails.send({
      from: "Réservations <onboarding@resend.dev>",
            to: [Deno.env.get("NOTIFICATION_EMAIL") || "contact@example.com"],
      subject: `Nouvelle demande de rendez-vous : ${s.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5C3D2E; border-bottom: 2px solid #5C3D2E; padding-bottom: 10px;">
            Nouvelle demande de rendez-vous
          </h2>

          <div style="background-color: #fdf8f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Informations du patient</h3>
            <p><strong>👤 Nom :</strong> ${s.name}</p>
            <p><strong>📧 Email :</strong> ${s.email}</p>
            <p><strong>📞 Téléphone :</strong> ${s.phone}</p>
          </div>

          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #065f46;">Détails du rendez-vous</h3>
            <p><strong>🩺 Service :</strong> ${s.service}</p>
            <p><strong>📅 Date :</strong> ${s.date}</p>
            <p><strong>🕐 Heure :</strong> ${s.time}</p>
          </div>

          ${s.message ? `
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #92400e;">Message du patient</h3>
            <p style="background: white; padding: 12px; border-radius: 5px; border-left: 4px solid #f59e0b;">
              ${s.message.replace(/\n/g, '<br>')}
            </p>
          </div>
          ` : ""}

          <div style="background-color: #e0e7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>📞 <a href="tel:${s.phone}" style="color: #5C3D2E;">${s.phone}</a></p>
            <p>📧 <a href="mailto:${s.email}" style="color: #5C3D2E;">${s.email}</a></p>
          </div>
        </div>
      `,
    });

    // Confirmation email to the patient
    await resend.emails.send({
      from: "Natalia Kourycheva <onboarding@resend.dev>",
      to: [s.email],
      subject: "Confirmation de votre demande de rendez-vous",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5C3D2E; border-bottom: 2px solid #5C3D2E; padding-bottom: 10px;">
            Votre demande a bien été reçue
          </h2>

          <p style="font-size: 16px;">Bonjour <strong>${s.name}</strong>,</p>

          <p>J'ai bien reçu votre demande de rendez-vous pour une séance de <strong>${s.service.toLowerCase()}</strong>. Je vous contacterai dans les 24 heures pour confirmer.</p>

          <div style="background-color: #fdf8f5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #5C3D2E;">
            <h3 style="margin-top: 0; color: #1e293b;">Récapitulatif</h3>
            <p><strong>📅 Date souhaitée :</strong> ${s.date}</p>
            <p><strong>🕐 Heure souhaitée :</strong> ${s.time}</p>
            <p><strong>🩺 Service :</strong> ${s.service}</p>
            ${s.message ? `<p><strong>💬 Votre message :</strong> <em>"${s.message}"</em></p>` : ""}
          </div>

          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #065f46;">Informations pratiques</h3>
            <p><strong>📍 Cabinet :</strong> Rue Choiseul, 75002 Paris — M° Opéra ou 4 Septembre</p>
            <p><strong>🕒 Horaires :</strong> Lundi–Vendredi 9h–19h | Samedi 9h–12h</p>
          </div>

          <p>Pour annuler ou modifier votre demande, répondez simplement à cet email.</p>

          <p style="margin-top: 30px;">
            Bien cordialement,<br/>
            <strong>Natalia Kourycheva</strong><br/>
            <em>Psychanalyste &amp; Hypnothérapeute</em>
          </p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-booking-notification:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
