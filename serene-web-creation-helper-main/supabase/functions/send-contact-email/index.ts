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

interface ContactEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
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

    const { firstName, lastName, email, phone, subject, message }: ContactEmailRequest = await req.json();

    // Sanitize all input fields to prevent XSS
    const sanitizedData = {
      firstName: sanitizeHtml(firstName),
      lastName: sanitizeHtml(lastName),
      email: sanitizeHtml(email),
      phone: phone ? sanitizeHtml(phone) : undefined,
      subject: sanitizeHtml(subject),
      message: sanitizeHtml(message)
    };

    // Send email to Christopher (practice owner)
    const ownerEmailResponse = await resend.emails.send({
      from: "Site Web <onboarding@resend.dev>",
      to: ["qureshichristopher80@gmail.com"], // Replace with your actual email
      subject: `Nouveau message de contact: ${sanitizedData.subject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>De:</strong> ${sanitizedData.firstName} ${sanitizedData.lastName}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        ${sanitizedData.phone ? `<p><strong>Téléphone:</strong> ${sanitizedData.phone}</p>` : ''}
        <p><strong>Sujet:</strong> ${sanitizedData.subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${sanitizedData.message.replace(/\n/g, '<br>')}
        </div>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Ce message a été envoyé depuis le formulaire de contact du site web par l'utilisateur: ${user.email}
        </p>
      `,
    });

    // Send confirmation email to the user
    const userEmailResponse = await resend.emails.send({
      from: "Christopher Quershi <onboarding@resend.dev>",
      to: [sanitizedData.email],
      subject: "Confirmation de réception de votre message",
      html: `
        <h2>Merci pour votre message, ${sanitizedData.firstName}!</h2>
        <p>J'ai bien reçu votre message concernant: <strong>${sanitizedData.subject}</strong></p>
        <p>Je vous répondrai dans les plus brefs délais.</p>
        <br>
        <p>Pour rappel, voici les informations de contact:</p>
        <ul>
          <li>📍 15 rue Adrien Damalix, 94410 Saint-Maurice</li>
          <li>🕒 Mardi et vendredi de 8h à 21h, samedi de 8h à 13h</li>
          <li>📞 Téléphone: [Votre numéro]</li>
        </ul>
        <br>
        <p>Cordialement,<br>Christopher Quershi<br>Sophrologue & Hypnothérapeute</p>
      `,
    });

    console.log("Emails sent successfully:", { ownerEmailResponse, userEmailResponse });

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Emails envoyés avec succès" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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