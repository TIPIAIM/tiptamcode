import styled from "styled-components";
import { motion } from "framer-motion";
import { Rocket, Code } from "lucide-react";
import { Helmet } from "react-helmet";
import Seo from "../Seo";

// Styles optimisés
const colors = {
  primary: "#b96f33",
  secondary: "#011d23",
  background: "#f4f5f1",
};

const breakpoints = {
  small: "480px",
  medium: "768px",
  large: "992px",
  xlarge: "1200px",
};

const AboutContainer = styled.section`
  padding: 2rem 1rem;
  background: ${colors.background};
  position: relative;
  overflow: hidden;

  @media (min-width: ${breakpoints.small}) {
    padding: 3rem 1.5rem;
  }
`;

// ... (autres styles optimisés)

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
        title="À propos de TIPTAMCode - Expertise en Développement Web"
        description="Découvrez l'équipe TIPTAMCode, spécialiste en création de sites web et applications sur mesure depuis 2021. Philosophie client-centrée et résultats concrets."
        keywords="développement web, équipe technique, création de sites, applications web, satisfaction client, TIPTAMCode"
      />

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

      <AboutContainer>
        <ContentGrid>
          <VisualSection
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <MainVisual
              src="/img/euipeaod.avif"
              srcSet="/img/euipeaod-480.avif 480w, /img/euipeaod-768.avif 768w, /img/euipeaod-1200.avif 1200w"
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
                aria-labelledby="stat-1"
              >
                <StatValue>
                  <Rocket size={32} aria-hidden="true" />
                  10+
                </StatValue>
                <StatLabel id="stat-1">Projets innovants réalisés</StatLabel>
              </StatCard>

              <StatCard
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                aria-labelledby="stat-2"
              >
                <StatValue>
                  <Code size={32} aria-hidden="true" />
                  98%
                </StatValue>
                <StatLabel id="stat-2">Taux de satisfaction client</StatLabel>
              </StatCard>
            </StatsGrid>
          </TextContent>
        </ContentGrid>

        <TeamSection>
          <TeamTitle initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            Rencontrez l'
            <Highlight style={{ color: colors.primary }}>Équipe</Highlight>
          </TeamTitle>

          <TeamGrid>
            {[
              {
                name: "Mamadou Marietou",
                role: "Co-Fondateur : Assure les formations, la maintenance et autres",
                photo: "/img/mariatou1.avif",
              },
              {
                name: "Diallo Alpha ousmane",
                role: "Co-Fondateur : Assure les formations, le développement Full stack et autres",
                photo: "/img/soum4-6.avif",
              },
              {
                name: "Paul lamah",
                role: "Avocat (Conseiller) : Assure les formations, les partenariats, les conseils juridiques...",
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
                  srcSet={`${member.photo.replace(".avif", "-480.avif")} 480w, ${member.photo.replace(".avif", "-768.avif")} 768w, ${member.photo.replace(".avif", "-1200.avif")} 1200w`}
                  sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
                  alt={`Portrait de ${member.name}`}
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
    </>
  );
};

export default React.memo(APropos);