import styled from "styled-components";
import { Target, HeartHandshake, Globe, Users } from "lucide-react";
import { motion } from "framer-motion";

const MissionContainer = styled.section`
  padding: 5rem 1rem;
  background: #011d23;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 0.5rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: 480px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 700;
  color: #a07753;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 0px rgba(169, 111, 51, 0.2);

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
     text-align: center;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1rem;
  color: #f4f5f1;
  max-width: 800px;
  margin: 0 auto;
  font-weight: 500;
  line-height: 1.6;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0rem 2rem;
     text-align: left;
  }
`;

const MissionGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);

    }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
`;

const MissionCard = styled(motion.div)`
  min-height: 500px;
  perspective: 1000px;

  @media (max-width: 768px) {
    min-height: 450px;
  }

  @media (max-width: 480px) {
    min-height: 400px;
     padding: 1rem;
  }
`;

const CardContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  border-radius: 0.2rem;
  padding: 1.5rem;
  background: ${(props) => props.bgcolor || "#a07753"};
  box-shadow: 0 10px 30px rgba(1, 29, 35, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

const MissionIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background: #011d23;
  z-index: 1;

  svg {
    width: 35px;
    height: 35px;
    stroke-width: 1.5;
    color: #b96f33;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

const MissionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #a07753;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const MissionDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: #f4f5f1;
  opacity: 0.9;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const CommitmentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  flex-grow: 1;
  width: 100%;
`;

const CommitmentItem = styled.li`
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  background: rgba(244, 245, 241, 0.1);
  border-radius: 0.2rem;
  color: #f4f5f1;
  transition: all 0.3s;
  font-size: 0.9rem;

  &:hover {
    background: rgba(244, 245, 241, 0.2);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.5rem;
  }

  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

const Mission = () => {
  const missions = [
    {
      title: "Notre Raison d'Être",
      icon: <Target />,
      color: "#1a2e35",
      description: "Donner vie aux visions digitales de nos clients",
      commitments: [
        "Écoute active des besoins",
        "Solutions sur-mesure",
        "Accompagnement complet",
        "Technologies innovantes",
      ],
    },
    {
      title: "Éthique Professionnelle",
      icon: <HeartHandshake />,
      color: "#1a2e35",
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
      icon: <Globe />,
      color: "#1a2e35",
      description: "Créer une technologie responsable",
      commitments: [
        "Accessibilité numérique",
        "Éco-conception",
        "Formation locale",
        "Open source stratégique",
      ],
    },
    {
      title: "Collaboration",
      icon: <Users />,
      color: "#1a2e35",
      description: "Co-construction des solutions",
      commitments: [
        "Partage d'expertise",
        "Intelligence collective",
        "Agilité méthodologique",
        "Amélioration continue",
      ],
    },
  ];

  return (
    <MissionContainer>
      <Header>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          Notre Mission
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Plus qu`un prestataire, un partenaire engagé dans votre réussite. Nous
          cherchons constamment à innover dans le domaine du développement web
          pour offrir les solutions les plus modernes et efficaces.
        </Subtitle>
      </Header>

      <MissionGrid>
        {missions.map((mission, index) => (
          <MissionCard
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.4,
              type: "spring",
              stiffness: 100,
            }}
            viewport={{ once: false }}
          >
            <CardContent
              bgcolor={mission.color}
              whileHover={{
                rotate: [0, -2, 2, 0],
                transition: { duration: 3.8 },
              }}
            >
              <MissionIcon>{mission.icon}</MissionIcon>
              <MissionTitle>{mission.title}</MissionTitle>
              <MissionDescription>{mission.description}</MissionDescription>
              <CommitmentsList>
                {mission.commitments.map((item, i) => (
                  <CommitmentItem key={i}>{item}</CommitmentItem>
                ))}
              </CommitmentsList>
            </CardContent>
          </MissionCard>
        ))}
      </MissionGrid>
    </MissionContainer>
  );
};

export default Mission;
