import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Create Supabase client for user verification
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Function to sanitize HTML input
function sanitizeHtml(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/&/g, '&amp;');
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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get JWT token from Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify the user with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid authentication' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { name, email, phone, service, date, time, message }: BookingNotificationRequest = await req.json();

    // Sanitize all input fields to prevent XSS
    const sanitizedData = {
      name: sanitizeHtml(name),
      email: sanitizeHtml(email),
      phone: sanitizeHtml(phone),
      service: sanitizeHtml(service),
      date: sanitizeHtml(date),
      time: sanitizeHtml(time),
      message: message ? sanitizeHtml(message) : undefined
    };

    // Send email to Christopher (practice owner)
    const ownerEmailResponse = await resend.emails.send({
      from: "Réservations <onboarding@resend.dev>",
      to: ["qureshichristopher80@gmail.com"],
      subject: `Nouvelle réservation: ${sanitizedData.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            Nouvelle demande de rendez-vous
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Informations du patient</h3>
            <p><strong>👤 Nom :</strong> ${sanitizedData.name}</p>
            <p><strong>📧 Email :</strong> ${sanitizedData.email}</p>
            <p><strong>📞 Téléphone :</strong> ${sanitizedData.phone}</p>
          </div>

          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #065f46;">Détails du rendez-vous</h3>
            <p><strong>🔮 Service :</strong> ${sanitizedData.service}</p>
            <p><strong>📅 Date :</strong> ${sanitizedData.date}</p>
            <p><strong>🕐 Heure :</strong> ${sanitizedData.time}</p>
          </div>

          ${sanitizedData.message ? `
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #92400e;">Message du patient</h3>
            <p style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #f59e0b;">
              ${sanitizedData.message.replace(/\n/g, '<br>')}
            </p>
          </div>
          ` : ''}

          <div style="background-color: #e0e7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #3730a3;">Action requise</h3>
            <p>💡 Veuillez contacter le patient pour confirmer ce rendez-vous.</p>
            <p>📞 Téléphone : <a href="tel:${sanitizedData.phone}" style="color: #2563eb;">${sanitizedData.phone}</a></p>
            <p>📧 Email : <a href="mailto:${sanitizedData.email}" style="color: #2563eb;">${sanitizedData.email}</a></p>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 12px; text-align: center;">
            Ce message a été envoyé depuis le formulaire de réservation par l'utilisateur: ${user.email}
          </p>
        </div>
      `,
    });

    // Send confirmation email to the patient
    const patientEmailResponse = await resend.emails.send({
      from: "Christopher Quershi <onboarding@resend.dev>",
      to: [sanitizedData.email],
      subject: "Confirmation de votre demande de rendez-vous",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            Demande de rendez-vous reçue
          </h2>
          
          <p style="font-size: 16px;">Bonjour <strong>${sanitizedData.name}</strong>,</p>
          
          <p>J'ai bien reçu votre demande de rendez-vous pour une séance de <strong>${sanitizedData.service.toLowerCase()}</strong>.</p>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h3 style="margin-top: 0; color: #1e293b;">Récapitulatif de votre demande</h3>
            <p><strong>📅 Date souhaitée :</strong> ${sanitizedData.date}</p>
            <p><strong>🕐 Heure souhaitée :</strong> ${sanitizedData.time}</p>
            <p><strong>🔮 Service :</strong> ${sanitizedData.service}</p>
            ${sanitizedData.message ? `<p><strong>💬 Votre message :</strong><br/><em>"${sanitizedData.message}"</em></p>` : ''}
          </div>

          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #065f46;">Prochaines étapes</h3>
            <p>🔄 Je vais examiner votre demande et vous contacter <strong>dans les 24 heures</strong> pour confirmer votre rendez-vous.</p>
            <p>📞 Je vous appellerai au <strong>${sanitizedData.phone}</strong> ou vous écrirai à cette adresse email.</p>
          </div>

          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #0277bd;">Informations pratiques</h3>
            <p><strong>📍 Adresse :</strong> 15 rue Adrien Damalix, 94410 Saint-Maurice</p>
            <p><strong>🕒 Horaires :</strong></p>
            <ul style="margin: 5px 0;">
              <li>Mardi et vendredi : 8h à 21h</li>
              <li>Samedi : 8h à 13h</li>
            </ul>
            <p><strong>📞 En cas d'urgence :</strong> ${sanitizedData.phone}</p>
          </div>

          <p>Au plaisir de vous accompagner dans votre démarche de bien-être.</p>
          
          <p style="margin-top: 30px;">
            Cordialement,<br/>
            <strong>Christopher Quershi</strong><br/>
            <em>Sophrologue & Hypnothérapeute</em>
          </p>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 12px; text-align: center;">
            Si vous souhaitez annuler ou modifier votre demande, répondez simplement à cet email.
          </p>
        </div>
      `,
    });

    console.log("Booking notification emails sent successfully:", { 
      ownerEmailResponse, 
      patientEmailResponse 
    });

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Emails de notification envoyés avec succès" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);