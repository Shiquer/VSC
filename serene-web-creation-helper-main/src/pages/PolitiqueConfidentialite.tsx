import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/hooks/useSiteContent";

const PolitiqueConfidentialite = () => {
    const { getContent } = useSiteContent("privacy");

    const sectionStyle = { padding: "80px 0" };
    const h2Style = {
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "24px",
          fontWeight: "600" as const,
          color: "hsl(var(--accent))",
          marginBottom: "16px",
    };
    const pStyle = {
          fontSize: "15px",
          lineHeight: "1.9",
          color: "hsl(var(--foreground))",
          opacity: 0.85,
          marginBottom: "40px",
    };

    return (
          <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
                  <Header />

                  <section style={sectionStyle}>
                            <div className="container mx-auto px-8" style={{ maxWidth: "860px" }}>
                                        <Link
                                                      to="/"
                                                      style={{
                                                                      display: "inline-flex",
                                                                      alignItems: "center",
                                                                      gap: "6px",
                                                                      fontSize: "14px",
                                                                      color: "hsl(var(--foreground))",
                                                                      textDecoration: "none",
                                                                      opacity: 0.7,
                                                                      marginBottom: "40px",
                                                      }}
                                                    >
                                                    <ArrowLeft style={{ width: "16px", height: "16px" }} /> Retour à l'accueil
                                        </Link>
                            
                                      <h1
                                                    className="arise-serif"
                                                    style={{
                                                                    fontSize: "clamp(32px, 4vw, 48px)",
                                                                    fontWeight: "700",
                                                                    color: "hsl(var(--foreground))",
                                                                    marginBottom: "48px",
                                                    }}
                                                  >
                                        {getContent("privacy_title", "Politique de confidentialité")}
                                      </h1>
                            
                                      <h2 style={h2Style}>{getContent("privacy_responsible_title", "Responsable")}</h2>
                                      <div
                                                    style={pStyle}
                                                    dangerouslySetInnerHTML={{
                                                                    __html: getContent(
                                                                                      "privacy_responsible_content",
                                                                                      "Le responsable du traitement de données effectué par le site internet helenebreton-sophrologue.fr est la société SOLMET – Solutions mieux-être."
                                                                                    ),
                                                    }}
                                                  />
                            
                                      <h2 style={h2Style}>{getContent("privacy_collect_title", "Collecte des données")}</h2>
                                      <div
                                                    style={pStyle}
                                                    dangerouslySetInnerHTML={{
                                                                    __html: getContent(
                                                                                      "privacy_collect_content",
                                                                                      "Le site helenebreton-sophrologue.fr collecte des données à caractère personnel via le formulaire de contact. Les données personnelles sont librement communiquées à la société SOLMET – Solutions mieux-être en consentant au traitement. Les données collectées sont des données d'identification : Nom, prénom, numéro de téléphone et adresse e-mail."
                                                                                    ),
                                                    }}
                                                  />
                            
                                      <h2 style={h2Style}>{getContent("privacy_purposes_title", "Finalités des données récoltées")}</h2>
                                      <div
                                                    style={pStyle}
                                                    dangerouslySetInnerHTML={{
                                                                    __html: getContent(
                                                                                      "privacy_purposes_content",
                                                                                      "Les données personnelles collectées via le formulaire de contact permettent de répondre aux messages envoyés, assurer le suivi avec la personne concernée et traiter les demandes relatives aux droits au titre du RGPD et de la loi informatique."
                                                                                    ),
                                                    }}
                                                  />
                            
                                      <h2 style={h2Style}>{getContent("privacy_recipients_title", "Destinataires des données")}</h2>
                                      <div
                                                    style={pStyle}
                                                    dangerouslySetInnerHTML={{
                                                                    __html: getContent(
                                                                                      "privacy_recipients_content",
                                                                                      "Les données personnelles collectées sont destinées à la société SOLMET – Solutions mieux-être, éditeur et responsable du traitement. Les données sont traitées uniquement pour les finalités indiquées précédemment. Elles ne sont jamais communiquées à des tiers à des fins commerciales. Elles ne sont pas transférées à des acteurs situés en dehors de l'Union Européenne."
                                                                                    ),
                                                    }}
                                                  />
                            
                                      <h2 style={h2Style}>{getContent("privacy_protection_title", "Protection des données")}</h2>
                                      <div
                                                    style={pStyle}
                                                    dangerouslySetInnerHTML={{
                                                                    __html: getContent(
                                                                                      "privacy_protection_content",
                                                                                      "La société SOLMET – Solutions mieux-être s'engage à protéger les données personnelles traitées. Toutes les données échangées entre le navigateur de l'utilisateur et le site internet sont entièrement chiffrées à l'aide du protocole https."
                                                                                    ),
                                                    }}
                                                  />
                            
                                      <h2 style={h2Style}>{getContent("privacy_retention_title", "Durée de conservation")}</h2>
                                      <div
                                                    style={pStyle}
                                                    dangerouslySetInnerHTML={{
                                                                    __html: getContent(
                                                                                      "privacy_retention_content",
                                                                                      "Les données personnelles sont conservées aussi longtemps que nécessaire pour les finalités énumérées précédemment sauf si la personne concernée souhaite leur effacement ou leur modification."
                                                                                    ),
                                                    }}
                                                  />
                            
                                      <h2 style={h2Style}>{getContent("privacy_cookies_title", "Cookies")}</h2>
                                      <div
                                                    style={pStyle}
                                                    dangerouslySetInnerHTML={{
                                                                    __html: getContent(
                                                                                      "privacy_cookies_content",
                                                                                      `Lors de la consultation de ce site, des cookies sont déposés sur l'ordinateur, la tablette ou le smartphone de l'utilisateur. Ces cookies permettent de mémoriser son consentement, suivre les performances du site et optimiser l'expérience utilisateur. Ils ne stockent aucune donnée personnellement identifiable. Pour plus d'informations sur les cookies, vous pouvez vous rendre sur le site de la CNIL.<br><br>
                                                                                                      L'utilisateur de ce site peut accepter ou refuser les cookies à partir de la barre de consentement des cookies en bas de page. Pour plus d'informations, vous pouvez consulter le site de la CNIL.`
                                                                                    ),
                                                    }}
                                                  />
                            
                                      <h2 style={h2Style}>{getContent("privacy_rights_title", "Droits des personnes")}</h2>
                                      <div
                                                    style={pStyle}
                                                    dangerouslySetInnerHTML={{
                                                                    __html: getContent(
                                                                                      "privacy_rights_content",
                                                                                      `Conformément au Règlement Général sur la Protection des données à caractère personnel, l'utilisateur dispose d'un droit d'accès, de rectification, de suppression, de limitation, d'opposition ainsi que d'un droit à la portabilité des données.<br><br>
                                                                                                      Les demandes peuvent être formulées de différentes façons en joignant la copie d'une pièce d'identité valide par e-mail en écrivant à <a href="mailto:helenebreton94@gmail.com" style="color: hsl(var(--accent))">helenebreton94@gmail.com</a> ou par courrier en écrivant à Société SOLMET – Solutions mieux-être, 13 bis avenue de Verdun, 94410 Saint-Maurice.`
                                                                                    ),
                                                    }}
                                                  />
                            </div>
                  </section>
          
                <Footer />
          </div>
        );
};

export default PolitiqueConfidentialite;
