import React, { useEffect, lazy, Suspense, useMemo, useState, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { Globe, FileText, PenTool, TrendingUp, ArrowRight, ChevronDown } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Seo from "../Seo";
import Footer from "../Footerrr";

// Chargement différé des composants enfants
const Mission = lazy(() => import("./Mission"));
const Accueilpourservice = lazy(() => import("./Accueilpourservice"));
const Temoignage = lazy(() => import("./Temoignge"));
const Realisation3 = lazy(() => import("./Realisation3"));

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

/* ➕ Ajout : orbite pour les points autour de l’icône */
const orbit = keyframes`
  0% { transform: rotate(0deg) translateX(18px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(18px) rotate(-360deg); }
`;

// Styles optimisés
const ServicesContainer = styled.section`
  //padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem);
  background: linear-gradient(135deg, #011d23 0%, #00303a 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(160, 119, 83, 0.5), 
      transparent
    );
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem);

  gap: clamp(1.5rem, 3vw, 2.5rem);
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ServiceCard = styled(motion.article)`
  height: 500px;
  perspective: 1000px;
  will-change: transform;

  @media (max-width: 768px) {
    height: 450px;
  }

  @media (max-width: 480px) {
    height: 400px;
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  border-radius: 1.5rem;
  cursor: pointer;

  ${ServiceCard}:hover & {
    transform: rotateY(180deg);
  }

  @media (hover: none) {
    ${ServiceCard}:hover & {
      transform: none;
    }
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  padding: clamp(1.5rem, 3vw, 2rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 1.5rem;
  overflow: hidden;
`;

const FrontFace = styled(CardFace)`
  background: ${props => props.$bgcolor || "rgba(160, 119, 83, 0.1)"};
  backdrop-filter: blur(10px);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(160, 119, 83, 0.2);
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #a07753, #d4a574);
    opacity: 0.7;
  }
`;

const BackFace = styled(CardFace)`
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #f4f5f1 0%, #e8eae6 100%);
  color: #011d23;
  justify-content: space-between;
`;

/* === Icône : flottement, pulse au hover, + 3 points en orbite === */
const ServiceIcon = styled.div`
  width: clamp(80px, 10vw, 100px);
  height: clamp(80px, 10vw, 100px);
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin-bottom: 2rem;
 
 //  background: linear-gradient(135deg,  #02282f 10%);
  box-shadow: 0 2px 2px #b35202;
  position: relative;
  z-index: 1;

  /* flottement continu si animations autorisées */
  @media (prefers-reduced-motion: no-preference) {
    animation: ${float} 6s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: linear-gradient(135deg, #a07753, #d4a574);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${ServiceCard}:hover &::after {
    opacity: 1;
  }

  svg {
    width: clamp(40px, 5vw, 50px);
    height: clamp(40px, 5vw, 50px);
    stroke-width: 1.5;
    color: #d4a574;
    transition: transform 0.3s ease, color 0.3s ease;
  }
  
  ${ServiceCard}:hover svg {
    color: #fff;
    @media (prefers-reduced-motion: no-preference) {
      animation: ${pulse} 1.5s ease-in-out infinite;
    }
  }

  /* ➕ trois petits points en orbite autour de l’icône */
  i {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 6px;
    margin: -3px 0 0 -3px;
    border-radius: 50%;
    background: #f2c94c;
    opacity: 0.9;
    filter: drop-shadow(0 0 6px rgba(242,201,76,.6));
    transform-origin: -18px 0;
  }

  /* Animations d’orbite (désactivées si reduced-motion) */
  @media (prefers-reduced-motion: no-preference) {
    i:nth-child(2) { animation: ${orbit} 5s linear infinite; }
    i:nth-child(3) { animation: ${orbit} 6.5s linear infinite reverse; opacity: .75; }
    i:nth-child(4) { animation: ${orbit} 8s linear infinite; opacity: .55; }
  }
`;

const ServiceTitle = styled.h3`
  font-size: clamp(1.4rem, 3vw, 1.75rem);
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg,#b35202  50%, #eb8837 50%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #a07753, #d4a574);
    border-radius: 2px;
  }
`;

const ServiceSubtitle = styled.span`
  display: block;
  font-size: clamp(1rem, 2vw, 1.1rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #b35202 0%, #d4a574 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ServiceDescription = styled.p`
  font-size: clamp(0.95rem, 2vw, 1rem);
  line-height: 1.6;
  color: #e0e6e4;
  opacity: 0.9;
`;

const BackContentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  flex-grow: 1;
  width: 100%;
`;

const BackContentItem = styled(motion.li)`
  padding: 0.8rem;
  margin-bottom: 0.75rem;
  background: rgba(1, 29, 35, 0.1);
  border-radius: 8px;
  font-weight: 500;
  color: #011d23;
  border-left: 3px solid #a07753;
  transition: all 0.3s ease;
  text-align: left;
  display: flex;
  align-items: center;

  &::before {
    content: '✓';
    color: #b35202;
    font-weight: bold;
    margin-right: 0.5rem;
  }

  &:hover {
    background: rgba(1, 29, 35, 0.15);
    transform: translateX(5px);
  }
`;

const FlipHint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a07753;
  font-weight: 800;
  margin-top: 1rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  svg {
    margin-left: 0.5rem;
    animation: ${float} 2s ease-in-out infinite;
  }

  ${ServiceCard}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const BackgroundElement = styled.div`
  position: absolute;
  top: 15%;
  right: 5%;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(160, 119, 83, 0.1) 0%, transparent 70%);
  z-index: 0;
  animation: ${float} 8s ease-in-out infinite;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

/* ⚠️ Conserver UNE SEULE définition de generateServiceSchema */
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

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
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
        icon: <Globe aria-hidden="true" />,
        color: "rgba(160, 119, 83, 0.1)",
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
        icon: <FileText aria-hidden="true" />,
        color: "rgba(160, 119, 83, 0.1)",
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
        icon: <PenTool aria-hidden="true" />,
        color: "rgba(160, 119, 83, 0.1)",
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
        icon: <TrendingUp aria-hidden="true" />,
        color: "rgba(160, 119, 83, 0.1)",
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div itemScope itemType="https://schema.org/Service">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9951347176780036"
        crossOrigin="anonymous"
      ></script>
      <ServicesContainer ref={ref}>
        <BackgroundElement />
        <Seo {...seoProps} />
        <Suspense fallback={<div>Chargement...</div>}>
          <Accueilpourservice />
        </Suspense>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{
                delay: index * 0.2,
                duration: 0.7,
                ease: "easeOut"
              }}
              itemScope
              itemProp="hasOfferCatalog"
              itemType="https://schema.org/OfferCatalog"
            >
              <CardInner className="card-inner">
                <FrontFace $bgcolor={service.color}>
                  {/* Icône avec orbite */}
                  <ServiceIcon>
                    {service.icon}
                    <i></i><i></i><i></i>
                  </ServiceIcon>

                  <ServiceTitle itemProp="name">{service.title}</ServiceTitle>
                  <ServiceSubtitle itemProp="category">
                    {service.subtitle}
                  </ServiceSubtitle>
                  <ServiceDescription itemProp="description">
                    {service.description}
                  </ServiceDescription>
                  <FlipHint>
                    Survolez pour en savoir plus <ChevronDown size={18} />
                  </FlipHint>
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
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: i * 0.1 }}
                      >
                        <meta itemProp="position" content={i + 1} />
                        <span itemProp="name">{item}</span>
                      </BackContentItem>
                    ))}
                  </BackContentList>
                  <ServiceSubtitle style={{ color: "#a07753", display: "flex", alignItems: "center" }}>
                     <ArrowRight size={18} style={{ marginLeft: "0.5rem" }} />
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
