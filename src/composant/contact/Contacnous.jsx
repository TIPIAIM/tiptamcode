import { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
import photoaccueil from "../../assets/abdoulayeavoc.avif";
import Seo from "../Seo";
import FAQ from "../question/Questions";
import Footer from "../Footerrr";
import Accueil from "../Acueil/Acueil";
// Palette de couleurs
const colors = {
  primaryDark: "#011d23",
  primaryBrown: "#a07753",
  primaryOrange: "#b96f33",
  lightCream: "#f4f5f1",
  secondaryBlue: "#0a272f",
};

// Styled Components
const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 2m 1rem;
  margin-bottom: 9rem;
  margin-top: 8rem;
  background: ${colors.lightCream};

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 4rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 4rem 6rem;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  min-height: 300px;
  border-radius: 1x;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.9);
  background: ${colors.secondaryBlue};

  @media (min-width: 768px) {
    min-height: 500px;
  }
`;

const ResponsiveImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
`;

const FormSection = styled.div`
  flex: 1;
  padding: 2rem;
  background: ${colors.primaryDark};
  border-radius: 1px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.9);

  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${colors.primaryOrange};
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2.5rem;
    text-align: left;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${colors.lightCream};
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0.9;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1rem;
  border-bottom: 2px solid ${colors.primaryBrown};
  border-radius: 1px;
  background: rgba(244, 245, 241, 0.1);
  color: ${colors.lightCream};
  transition: all 0.3s ease;

  &:focus {
    border-color: ${colors.primaryOrange};
    box-shadow: 0 0 8px rgba(169, 111, 51, 0.1);
  }

  &::placeholder {
    color: rgba(244, 245, 241, 0.7);
  }
`;

const Textarea = styled.textarea`
  padding: 1rem;
  font-size: 1rem;
  border-bottom: 2px solid ${colors.primaryBrown};
  border-radius: 1px;
  background: rgba(244, 245, 241, 0.1);
  color: ${colors.lightCream};
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${colors.primaryOrange};
    box-shadow: 0 0 8px rgba(169, 111, 51, 0.3);
  }

  &::placeholder {
    color: rgba(244, 245, 241, 0.7);
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.lightCream};
  background: ${colors.primaryBrown};
  border: none;
  border-radius: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background: ${colors.primaryOrange};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(185, 111, 51, 0.4);
  }

  @media (min-width: 768px) {
    width: fit-content;
    align-self: flex-start;
  }
`;

const createSchemaMarkup = () => ({
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "TIPTAMCode",
  image: photoaccueil,
  telephone: "+624138395",
  email: "technique.info@tiptamcode.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Guinée conakry sonfonya",
    addressLocality: "Conakry",
    postalCode: "T7",
  },
});

export default function Contact() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sanitizeInput = (value) => {
    return value
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return false;
    if (formData.name.length < 2) return false;
    if (formData.message.length < 10) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Veuillez remplir correctement tous les champs");
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    formData.append("_csrf", "votre_token_csrf_ici");

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Message envoyé avec succès !");
          form.reset();
        } else {
          throw new Error("Erreur lors de l'envoi");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Une erreur est survenue");
      });
  };

  return (
    <div style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
      <Seo
        title="Contact - Web de TIPTAMCode"
        description="Contactez le Technique info . Formulaire de contact sécurisé et réponse rapide garantie.  "
        keywords="projets développement web, applications React, solutions digitales, études de cas techniques"
      />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9951347176780036"
        crossorigin="anonymous"
      ></script>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(createSchemaMarkup())}
        </script>
        <meta
          name="google-adsense-account"
          content="ca-pub-8656657415098715"
        ></meta>
      </Helmet>

      <Accueil/>
      <ContactContainer>
        <ImageSection data-aos="fade-right">
          <ResponsiveImage
            src={photoaccueil}
            alt="Équipe du cabinet"
            loading="eager"
            decoding="sync"
          />
        </ImageSection>

        <FormSection data-aos="fade-down">
          <Title>Contactez-nous</Title>

          <Description>
            Notre équipe de développeurs web est à votre disposition pour
            concrétiser vos projets numériques. Remplissez le formulaire
            ci-dessous et nous vous répondrons rapidement pour discuter de vos
            besoins en développement et design web.
          </Description>

          <Form
            action="https://getform.io/f/bnllyvmb"
            method="POST"
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              name="name"
              placeholder="Votre nom complet"
              required
              minLength="2"
              maxLength="50"
              pattern="[A-Za-zÀ-ÿ\s\-]+"
              value={formData.name}
              onChange={handleInputChange}
            />

            <Input
              type="email"
              name="email"
              placeholder="Adresse email professionnelle"
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              value={formData.email}
              onChange={handleInputChange}
            />

            <Textarea
              name="message"
              placeholder="Décrivez votre demande en détail..."
              required
              minLength="10"
              maxLength="1000"
              value={formData.message}
              onChange={handleInputChange}
            />

            <input type="hidden" name="_gotcha" className="display-none" />

            <Button type="submit">Envoyer la demande</Button>
          </Form>
        </FormSection>
      </ContactContainer>

     
      <FAQ />
      <Footer />
    </div>
  );
}
