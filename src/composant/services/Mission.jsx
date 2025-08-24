import styled, { keyframes } from "styled-components";
import { Target, HeartHandshake, Globe, Users } from "lucide-react";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

/* ====== ANIMATIONS ====== */
const float = keyframes`
  0%   { transform: translateY(0px) }
  50%  { transform: translateY(-8px) }
  100% { transform: translateY(0px) }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 0px rgba(242, 201, 76, 0.0); }
  50% { box-shadow: 0 0 28px rgba(242, 201, 76, 0.35); }
  100% { box-shadow: 0 0 0px rgba(242, 201, 76, 0.0); }
`;

/* ====== VARIANTS FRAMER ====== */
const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

/* ====== STYLES ====== */
const MissionSection = styled.section`
  padding: 6rem 1.5rem;
  background: radial-gradient(1200px 600px at 20% 10%, #b96f33 50%, transparent 50%)
      no-repeat,
    radial-gradient(900px 500px at 90% 0%, black 8%, transparent 50%) no-repeat,
    linear-gradient(135deg, #011d23 0%, #07232d 100%);
  max-width: 1400px;
  margin: 0 auto;
  color: #f4f5f1;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.9rem, 3vw, 3rem);
  font-weight: 800;
  color: #f2c94c; /* semygprimar */
  letter-spacing: 0.5px;
  margin-bottom: 0.6rem;
  text-shadow: 0 2px 10px rgba(242, 201, 76, 0.25);
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  max-width: 760px;
  margin: 0 auto;
  font-weight: 700;
  line-height: 1.75;
  opacity: 0.92;
`;

const MissionGrid = styled(motion.div)`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const MissionCard = styled(motion.article)`
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  background: linear-gradient(180deg, #102b34 0%, #0b242c 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transform-style: preserve-3d;
  will-change: transform, box-shadow;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35),
      0 0 0 1px rgba(242, 201, 76, 0.12) inset;
  }

  /* reflet diagonal léger */
  &::after {
    content: "";
    position: absolute;
    inset: -40% -10% auto auto;
    width: 120%;
    height: 120%;
    background: conic-gradient(
      from 180deg,
      rgba(255, 255, 255, 0.06),
      transparent 40%,
      transparent 60%,
      rgba(255, 255, 255, 0.03)
    );
    opacity: 0.25;
    transform: translate3d(0, 0, 0);
    pointer-events: none;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem 1.5rem;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 0.75rem;
  text-align: center;
`;

const IconWrap = styled.div`
  position: relative;
  margin: 0 auto 0.75rem;
  width: 86px;
  height: 86px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #f2c94c 0%, #a07753 68%, #8f663f 100%);
  animation: ${glowPulse} 3.2s ease-in-out infinite;

  display: grid;
  place-items: center;

  /* anneau tournant */
  &::before {
    content: "";
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background:
      conic-gradient(from 0deg, rgba(242, 201, 76, 0.7), rgba(161, 119, 83, 0) 40%),
      radial-gradient(closest-side, transparent 78%, rgba(242, 201, 76, 0.35) 80%, transparent 81%);
    animation: ${spin} 6s linear infinite;
    pointer-events: none;
  }

  /* halo doux */
  &::after {
    content: "";
    position: absolute;
    width: 120%;
    height: 120%;
    border-radius: 50%;
    filter: blur(16px);
    background: rgba(242, 201, 76, 0.22);
    z-index: -1;
  }

  svg {
    width: 38px;
    height: 38px;
    color: #011d23; /* contraste */
  }

  /* flotter en continu (désactivé si reduced-motion) */
  @media (prefers-reduced-motion: no-preference) {
    animation: ${glowPulse} 3.2s ease-in-out infinite, ${float} 5s ease-in-out infinite;
  }
`;

const MissionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  color: #f2c94c;
  letter-spacing: 0.3px;
  margin: 0.2rem 0 0.4rem;
`;

const MissionDescription = styled.p`
  font-size: 0.96rem;
  color: #e8eceb;
  opacity: 0.95;
  line-height: 1.65;
`;

const CommitmentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: grid;
  gap: 0.6rem;
`;

const CommitmentItem = styled(motion.li)`
  padding: 0.7rem 0.85rem;
  border-radius: 0.55rem;
  background: rgba(255, 255, 255, 0.06);
  color: #f4f5f1;
  font-size: 0.92rem;
  text-align: left;
  line-height: 1.5;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateX(6px);
    background: rgba(242, 201, 76, 0.16);
    border-color: rgba(242, 201, 76, 0.35);
  }
`;

/* ====== COMPOSANT ====== */
const Mission = () => {
  // données mémoïsées pour éviter les re-renders inutiles
  const missions = useMemo(
    () => [
      {
        title: "Notre Raison d'Être",
        icon: Target,
        description: "Donner vie aux visions digitales de nos clients",
        commitments: [
          "Écoute active des besoins",
          "Solutions sur‑mesure",
          "Accompagnement complet",
          "Technologies innovantes",
        ],
      },
      {
        title: "Éthique Professionnelle",
        icon: HeartHandshake,
        description: "Des relations client basées sur la confiance",
        commitments: [
          "Transparence totale",
          "Respect des délais",
          "Communication constante",
          "Déontologie digitale",
        ],
      },
      {
        title: "Impact Social",
        icon: Globe,
        description: "Créer une technologie responsable",
        commitments: [
          "Accessibilité numérique",
          "Éco‑conception",
          "Formation locale",
          "Open source stratégique",
        ],
      },
      {
        title: "Collaboration",
        icon: Users,
        description: "Co‑construction des solutions",
        commitments: [
          "Partage d'expertise",
          "Intelligence collective",
          "Agilité méthodologique",
          "Amélioration continue",
        ],
      },
    ],
    []
  );

  return (
    <MissionSection aria-labelledby="mission-title">
      <Header>
        <Title
          id="mission-title"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          Notre Mission
        </Title>
        <Subtitle
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Plus qu’un prestataire, un partenaire engagé dans votre réussite.
          Nous innovons en continu pour délivrer des solutions modernes,
          performantes et durables.
        </Subtitle>
      </Header>

      <MissionGrid
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {missions.map(({ title, icon: Icon, description, commitments }, idx) => (
          <MissionCard
            key={title}
            variants={cardVariants}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.995 }}
            role="region"
            aria-label={title}
          >
            <CardContent>
              {/* Icône animée : flottement + halo + micro‑interactions */}
              <IconWrap as={motion.div}
                whileHover={{ rotate: 2, scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                aria-hidden="true"
              >
                <motion.div
                  initial={{ rotate: -6 }}
                  whileInView={{ rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 120, damping: 10 }}
                >
                  <Icon />
                </motion.div>
              </IconWrap>

              <MissionTitle>{title}</MissionTitle>
              <MissionDescription>{description}</MissionDescription>

              <CommitmentsList>
                {commitments.map((c, i) => (
                  <CommitmentItem
                    key={`${idx}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * i, duration: 0.35 }}
                  >
                    {c}
                  </CommitmentItem>
                ))}
              </CommitmentsList>
            </CardContent>
          </MissionCard>
        ))}
      </MissionGrid>
    </MissionSection>
  );
};

export default memo(Mission);
