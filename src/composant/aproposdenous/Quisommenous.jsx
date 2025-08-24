import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Rocket, Code } from "lucide-react";
import { Helmet } from "react-helmet";
import Seo from "../Seo";
import Footer from "../Footerrr";
import Acueilapropos from "./Acueilapropos";

// Styles des composants
const AboutContainer = styled.section`
  padding: 2rem 1rem;
  background: #f4f5f1;
  position: relative;
  overflow: hidden;

  @media (min-width: 480px) {
    padding: 3rem 1.5rem;
  }

  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }

  @media (min-width: 1200px) {
    padding: 6rem 2rem;
  }
`;

const ContentGrid = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  align-items: center;

  @media (min-width: 480px) {
    gap: 2rem;
  }

  @media (min-width: 768px) {
    gap: 3rem;
  }

  @media (min-width: 992px) {
    grid-template-columns: 1.1fr 1fr;
    gap: 5rem;
  }
`;

const VisualSection = styled(motion.div)`
  position: relative;
  background: #011d23;
  border-radius: 0.1rem;
  overflow: hidden;
  min-height: 280px;
  aspect-ratio: 1;
  will-change: transform; /* Optimisation des animations */

  @media (min-width: 480px) {
    aspect-ratio: 16/9;
  }

  @media (min-width: 768px) {
    min-height: 380px;
    aspect-ratio: 4/3;
  }

  @media (min-width: 992px) {
    aspect-ratio: unset;
    min-height: 480px;
  }
`;

const MainVisual = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  filter: grayscale(20%) contrast(50%);
  transition: transform 2.8s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center center;
  loading="lazy"; // Optimisation du chargement des images

  @media (hover: hover) {
    ${VisualSection}:hover & {
      transform: scale(1.02);
      filter: grayscale(0%) contrast(110%);
    }
  }
`;

const TextContent = styled.div`
  padding: 1rem;
  position: relative;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const SectionTitle = styled(motion.h1)`
  font-size: 2rem;
  color: #b96f33;
  margin-bottom: 1.5rem;
  line-height: 1.3;

  @media (min-width: 480px) {
    font-size: 2.4rem;
  }

  @media (min-width: 768px) {
    font-size: 2.8rem;
    margin-bottom: 2rem;
  }
`;

const Highlight = styled.span`
  color: #011d23;
  font-weight: 700;
  position: relative;
  display: inline-block;

  &::before {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 3px;
    background: #a07753;
    transition: width 0.4s ease;
  }

  &:hover::before {
    width: 100%;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #011d23;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  padding: 0 0.5rem;

  @media (min-width: 480px) {
    gap: 1.5rem;
    padding: 0 1rem;
  }
`;

const StatCard = styled(motion.div)`
  padding: 1.5rem;
  background: rgba(169, 111, 51, 0.05);
  border-radius: 0.1rem;
  border: 1px solid rgba(169, 111, 51, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(169, 111, 51, 0.1);
    transform: translateY(-5px);
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  color: #b96f33;
  font-weight: 700;
  margin-bottom: 0.1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const StatLabel = styled.div`
  color: #011d23;
  font-size: 0.95rem;
  opacity: 0.9;
`;

const TeamTitle = styled(SectionTitle)`
  color: #f4f5f1;
  text-align: center;
  margin-bottom: 4rem;
  margin-left: 1rem;
  &::after {
    background: #b96f33;
  }
`;

const TeamSection = styled.div`
  margin-top: 4rem;
  padding: 3rem 0;
  background: linear-gradient(to bottom right, #011d23, #0a272f);

  @media (min-width: 768px) {
    margin-top: 6rem;
    padding: 4rem 0;
  }
`;

const TeamMember = styled(motion.div)`
  background: #f4f5f1;
  border-radius: 0.1rem;
  overflow: hidden;
  position: relative;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform; // Optimisation des animations

  &:hover {
    transform: translateY(-10px);
  }
`;

const MemberPhoto = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: top;
  border-bottom: 5px solid #b96f33;
  loading="lazy"; // Optimisation du chargement des images

  @media (min-width: 768px) {
    height: 380px;
  }
`;

const MemberInfo = styled.div`
  padding: 1.8rem;
  text-align: center;
`;

const MemberName = styled.h3`
  color: #011d23;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

const MemberRole = styled.p`
  color: #a07753;
  font-size: 1rem;
`;

const APropos = () => {
  const generateStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "À propos de TIPTAMCode",
    description:
      "Découvrez notre équipe et notre philosophie de développement web centrée sur l'humain et les résultats concrets.",
    publisher: {
      "@type": "Organization",
      name: "TIPTAMCode",
      logo: "https://www.tiptamcode.com/tiptamcode.avif",
      sameAs: [
        "https://www.linkedin.com/company/tiptamcode",
        "https://twitter.com/tiptamcode",
      ],
    },
    image: {
      "@type": "ImageObject",
      url: "https://www.tiptamcode.com/img/tiptamcode.avif",
      width: 1200,
      height: 630,
    },
  });

  return (
    <>
      <Seo
        title="À propos de TIPTAMCode-Expertise en Développement Web"
        description="Découvrez l'équipe TIPTAMCode, spécialiste en création de sites web et applications sur mesure depuis 2021. Philosophie client-centrée et résultats concrets."
        keywords="développement web, équipe technique, création de sites, applications web, satisfaction client, TIPTAMCode"
      />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9951347176780036"
        crossorigin="anonymous"
      ></script>

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData())}
        </script>

        <meta
          property="og:image"
          content="https://www.tiptamcode.com/img/tiptamecode.avif"
        />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:image"
          content="https://www.tiptamcode.com/img/tiptamcode.avif"
        />
      </Helmet>
      <Acueilapropos />
      <AboutContainer>
        <ContentGrid>
          <VisualSection
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <MainVisual
              src="/img/euipeaod.avif" 
              srcSet="/img/euipeaod.avif 480w, /img/euipeaod.avif 768w, /img/euipeaod.avif 1200w"
              sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
              alt="Équipe TIPTAMCode collaborant sur un projet digital"
              loading="lazy"
            />
          </VisualSection>

          <TextContent>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Notre <Highlight>Philosophie</Highlight>
            </SectionTitle>

            <Description
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Chez <Highlight>TIPTAMCode</Highlight>, nous croyons en une
              approche
              <Highlight> humaine du numérique</Highlight>. Depuis 2021, nous
              transformons les idées ambitieuses en solutions digitales
              pérennes, avec
              <Highlight> 98% de satisfaction client</Highlight> sur plus de 10
              projets.
            </Description>

            <StatsGrid>
              <StatCard
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <StatValue>
                  <Rocket size={32} />
                  10+
                </StatValue>
                <StatLabel>Projets innovants réalisés</StatLabel>
              </StatCard>

              <StatCard
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <StatValue>
                  <Code size={32} />
                  98%
                </StatValue>
                <StatLabel>Taux de satisfaction client</StatLabel>
              </StatCard>
            </StatsGrid>
          </TextContent>
        </ContentGrid>

        <TeamSection>
          <TeamTitle initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            Rencontrez l'
            <Highlight style={{ color: "#b96f33" }}>Équipe</Highlight>
          </TeamTitle>

          <TeamGrid>
            {[
              {
                name: "Mamadou Marietou",
                role: " Co-Fondateur : Assure les formations, la maintenance et autres ",
                photo: "/img/mariatou1.avif",
              },
              {
                name: "Diallo Alpha ousmane",
                role: "Co-Fondateur : Assure les formations, le develloppement Full stack et autres ",
                photo: "/img/soum4-6.avif",
              },
              {
                name: "Paul lamah",
                role: "Avocat (Conseiller) : Assure les formations, les partenariats, les conseil juridique ... ",
                photo: "/img/paul.avif",
              },
            ].map((member, index) => (
              <TeamMember
                key={index}
                initial={{ opacity: 0.5, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <MemberPhoto
                  src={member.photo}
                  sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
                  alt={`Portrait de ${member.name}`}
                  loading="lazy"
                />
                <MemberInfo>
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                </MemberInfo>
              </TeamMember>
            ))}
          </TeamGrid>
        </TeamSection>
      </AboutContainer>
      <Footer />
    </>
  );
};

export default React.memo(APropos);
