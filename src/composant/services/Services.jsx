import React, { useEffect, lazy, Suspense, useMemo } from "react";
import styled from "styled-components";
import { Globe, FileText, PenTool, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Seo from "../Seo";
import Footer from "../Footerrr";
import Accueilpourservice from "./Accueilpourservice";

// Chargement différé des composants enfants
const Mission = lazy(() => import("./Mission"));
const Accueilpourlesautres = lazy(() => import("../Acueilpourlesautres"));
const Temoignage = lazy(() => import("./Temoignge"));
const Realisation3 = lazy(() => import("./Realisation3"));

// generateServiceSchema
const generateServiceSchema = (services) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Développement web",
  provider: {
    "@type": "Organization",
    name: "TIPTAMCode",
    url: "https://www.tiptamcode.com",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de développement web",
    itemListElement: services.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        serviceOutput: service.backContent.join(", "),
      },
    })),
  },
  itemOffered: {
    "@type": "Service",
    name: "Création De Sites Web Professionnels",
    description: "Développement sur mesure avec React, Angular et autres",
    serviceOutput:
      "Site vitrine, Application web, E-commerce, Optimisation SEO,...",
    serviceUrl: "/services",
    areaServed: ["Gunée", "France", "Belgique", "Luxembourg"],
  },
});

// Styles corrigés avec $ pour les props styled-components
const ServicesContainer = styled.section`
  padding: 5rem 1rem;
  background: #011d23;
  max-width: 1400px;
  margin: 0 auto;
`;

const ServicesGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0rem 0.5rem;
    text-align: center;
  }
`;

const ServiceCard = styled(motion.article)`
  height: 450px;
  perspective: 1000px;
  will-change: transform; /* Optimisation des animations */

  &:hover .card-inner {
    transform: rotateY(180deg);
  }

  @media (hover: none) {
    &:hover .card-inner {
      transform: none;
    }
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  border-radius: 1.5rem;
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FrontFace = styled(CardFace)`
  background: ${(props) => props.$bgcolor || "#a07753"};
  box-shadow: 0 10px 30px rgba(1, 29, 35, 0.1);
`;

const BackFace = styled(CardFace)`
  transform: rotateY(180deg);
  background: #f4f5f1;
  color: #011d23;
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  background: #011d23;
  box-shadow: 0 4px 15px rgba(1, 29, 35, 0.1);

  svg {
    width: 50px;
    height: 50px;
    stroke-width: 1.5;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #011d23;
`;

const ServiceSubtitle = styled.span`
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #b96f33;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #011d23;
`;

const BackContentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  flex-grow: 1;
  width: 100%;
`;

const BackContentItem = styled.li`
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  background: rgba(185, 111, 51, 0.1);
  border-radius: 0.5rem;
  font-weight: 500;
  transition: transform 0.2s;
  color: #011d23;

  &:hover {
    transform: translateX(5px);
    background: rgba(185, 111, 51, 0.15);
  }
`;

const Services = () => {
  const services = useMemo(
    () => [
      {
        title: "Création De Sites Web Professionnels",
        subtitle: "Solutions digitales performantes",
        description:
          "Développement sur mesure avec technologies modernes (React, Next.js, Node.js)",
        backContent: [
          "Site vitrine responsive",
          "Application web complexe",
          "E-commerce sécurisé",
          "Optimisation des performances",
        ],
        icon: <Globe color="#b96f33" aria-hidden="true" />,
        color: "hsl(195, 42.90%, 94.50%, 0.2)",
      },
      {
        title: "Rédaction Technique",
        subtitle: "Cahier des charges",
        description: "Cadrage précis de votre projet digital",
        backContent: [
          "Spécifications techniques",
          "Arborescence détaillée",
          "Planning réaliste",
          "Budget maîtrisé",
        ],
        icon: <FileText color="#b96f33" aria-hidden="true" />,
        color: "hsl(195, 42.90%, 94.50%, 0.2)",
      },
      {
        title: "Marketing Digital",
        subtitle: "Stratégie de contenu",
        description: "Engagement et conversion maximale",
        backContent: [
          "Stratégie éditoriale",
          "Rédaction SEO",
          "Gestion réseaux sociaux",
          "Analyse des résultats",
        ],
        icon: <PenTool color="#b96f33" aria-hidden="true" />,
        color: "hsl(195, 42.90%, 94.50%, 0.2)",
      },
      {
        title: "Optimisation SEO",
        subtitle: "Référencement naturel",
        description: "Dominez les résultats de recherche",
        backContent: [
          "Audit technique complet",
          "Optimisation on-page",
          "Stratégie de netlinking",
          "Suivi analytics",
        ],
        icon: <TrendingUp color="#b96f33" aria-hidden="true" />,
        color: "hsl(195, 42.90%, 94.50%, 0.2)",
      },
    ],
    []
  );

  const seoProps = {
    title:
      "Services de Développement Web | TIPTAMCode Agence Professionnelle de dev web",
    description:
      "Création de sites vitrines et applications web sur mesure avec stratégie SEO intégrée - Développement Front-end et Back-end - Formation React/Next.js",
    keywords:
      "développement web et mobile , création site internet complexe , e-commerce, application web, référencement naturel, formation React et dev web, bonnes pratiques développement",
    schemaMarkup: generateServiceSchema(services),
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(generateServiceSchema(services));
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [services]);

  return (
    <div itemScope itemType="https://schema.org/Service">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9951347176780036"
        crossorigin="anonymous"
      ></script>
      <ServicesContainer>
        <Seo {...seoProps} />
        <Suspense fallback={<div>Chargement...</div>}>
          <Accueilpourservice />
        </Suspense>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: false }}
              itemScope
              itemProp="hasOfferCatalog"
              itemType="https://schema.org/OfferCatalog"
            >
              <CardInner className="card-inner">
                <FrontFace $bgcolor={service.color}>
                  <ServiceIcon>{service.icon}</ServiceIcon>
                  <ServiceTitle itemProp="name">{service.title}</ServiceTitle>
                  <ServiceSubtitle itemProp="category">
                    {service.subtitle}
                  </ServiceSubtitle>
                  <ServiceDescription itemProp="description">
                    {service.description}
                  </ServiceDescription>
                </FrontFace>

                <BackFace>
                  <ServiceTitle as="h3">Détails du Service</ServiceTitle>
                  <BackContentList>
                    {service.backContent.map((item, i) => (
                      <BackContentItem
                        key={i}
                        itemProp="itemListElement"
                        itemScope
                        itemType="https://schema.org/ListItem"
                      >
                        <meta itemProp="position" content={i + 1} />
                        <span itemProp="name">{item}</span>
                      </BackContentItem>
                    ))}
                  </BackContentList>
                  <ServiceSubtitle style={{ color: "#b96f33" }}>
                    En bref ➔
                  </ServiceSubtitle>
                </BackFace>
              </CardInner>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ServicesContainer>

      <Suspense fallback={<div>Chargement...</div>}>
        <Temoignage />
        <Mission />
        <Realisation3 />
      </Suspense>
      <Footer />
    </div>
  );
};

export default React.memo(Services);
