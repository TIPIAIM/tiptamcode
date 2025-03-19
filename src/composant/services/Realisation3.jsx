import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";

// Configuration de base pour React Modal
Modal.setAppElement("#root");

// Animations réutilisables
const cardAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

const modalAnimation = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.9 },
};

const staggerItems = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// Styles des composants
const ProjectsContainer = styled.section`
  padding: 4rem 1rem;
  background: #f4f5f1;
`;

const Title = styled(motion.h2).attrs(() => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}))`
  font-size: 2.5rem;
  font-weight: 700;
  color: #a07753;
  text-align: center;
  text-shadow: 2px 2px 0px rgba(169, 111, 51, 0.2);
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p).attrs(() => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { delay: 0.2 },
}))`
  color: #011d23;
  text-align: center;
  margin-bottom: 6rem;
  font-size: 1.05rem;
  max-width: 800px;
  margin: 0 auto;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0rem 2rem;
    text-align: left;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  gap: 2.5rem;
  padding: 2rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled(motion.div).attrs(() => ({
  variants: cardAnimation,
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "0px 0px -100px 0px" },
}))`
  background: white;
  border-radius: 1px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: #a07753;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const ProjectImage = styled(motion.img).attrs(() => ({
  whileHover: { scale: 1.05 },
  transition: { type: "spring", stiffness: 300 },
}))`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-bottom: 3px solid #a07753;
  cursor: pointer;
  loading="lazy"; // Optimisation du chargement des images
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  color: #011d23;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const MoreButonlien = styled(motion.button).attrs(() => ({
  whileHover: {
    scale: 1.05,
    backgroundColor: "#011d23",
   boxShadow: "0 4px 15px rgba(169, 111, 51, 0.3)",
  },
  whileTap: { scale: 0.95 },
  boxShadow: "0 4px 15px rgba(169, 111, 51, 0.3)",
}))`
  background: #011d23;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 1px;
  cursor: pointer;
  transition: background 0.3s;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      60deg,
      transparent,
      rgba(255, 255, 255, 0.9),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;
const ProjectExcerpt = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const MoreButton = styled(motion.button).attrs(() => ({
  whileHover: {
    scale: 1.05,
    backgroundColor: "#a07753",
    boxShadow: "0 4px 15px rgba(169, 111, 51, 0.3)",
  },
  whileTap: { scale: 0.95 },
  boxShadow: "0 4px 15px rgba(169, 111, 51, 0.3)",
}))`
  background: #b96f33;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 1px;
  cursor: pointer;
  transition: background 0.3s;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.9),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1000,
    backdropFilter: "blur(3px)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    maxWidth: "90%",
    maxHeight: "90vh",
    width: "800px",
    borderRadius: "4px",
    border: "2px solid #a07753",
    padding: "0",
    overflow: "hidden",
  },
};

const ModalImage = styled(motion.img).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: 0.2 },
}))`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 3px solid #a07753;
`;

const ModalContent = styled(motion.div).attrs(() => ({
  variants: staggerItems,
  initial: "hidden",
  animate: "visible",
}))`
  padding: 1.5rem;
  overflow-y: auto;
  max-height: calc(90vh - 300px);

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f4f5f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #b96f33;
    border-radius: 1px;
  }
`;

const SectionTitle = styled(motion.h3).attrs(() => ({
  variants: itemAnimation,
}))`
  color: #011d23;
  margin: 1.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(169, 111, 51, 0.2);
`;

const DetailGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: 1.5rem 0;
`;

const DetailItem = styled(motion.div).attrs(() => ({
  variants: itemAnimation,
}))`
  background: rgba(244, 245, 241, 0.5);
  padding: 1rem;
  border-radius: 4px;

  strong {
    color: #b96f33;
    display: block;
    margin-bottom: 0.3rem;
  }
`;

const CloseButton = styled(motion.button).attrs(() => ({
  whileHover: { rotate: 90, scale: 1.1 },
  whileTap: { scale: 0.9 },
}))`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(185, 111, 51, 0.9);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const TechList = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

const TechItem = styled(motion.li).attrs(() => ({
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
}))`
  background: rgba(169, 111, 51, 0.1);
  color: #b96f33;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.2s;
  border: 1px solid transparent;
  cursor: default;

  &:hover {
    background: rgba(169, 111, 51, 0.2);
    border-color: #a07753;
  }
`;

const Realisation3 = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Cabinet AOD avocats",
      image: "/img/accueilaodavocat.avif",
      description: "Portail dédié à la communauté pour la navigation",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "..."],
      duration: "4 mois",
      role: "Développement Full-Stack",
      status: "Terminer",
      link: "https://www.aod-avocats.net", // Ajout du lien
      fullDescription:
        "Une plateforme complète avec annuaire, système de chat en temps réel, prise d'information, gestion des données et ...",
    },

    {
      id: 2,
      title: " Judiciaire private",//Casier
      image: "/img/jurid1.avif",
      description: "Solution de gestion (confidentielle)...(private)",//des demandes de casier judiciaire
      technologies: [
        "Reactjs",
        "React native",
        "Mongodb",
        "Node.js",
        "Express",
        
      ],
      duration: "5 mois",
      role: "Développement Full-Stack",
      status: "En développement",
      link: "https://www.tiptamcode.com/en-cour", // Ajout du lien
      fullDescription:
        "L'information est confidentielle  ...",//Système intelligent de gestion des demandes (private) de casier judiciaire
    },
    {
      id: 3,
      title: "Base de données DIKOB",
      image: "/img/tiptamcode.avif",
      description:
        "Suivi des personnalisé des différentes activités entrées/sorties des de l'entreprise en locale",
      technologies: ["React", "Mysql", "Node.js", "Express", "AI"],
      duration: "3 mois",
      role: "Développement Full-Stack",
      status: "Terminer",
      link: "https://www.tiptamcode.com/local-dickob", // Ajout du lien
      fullDescription:
        "Application web avec alertes intelligentes et suivi en temps réel des différentes activités de l'entreprise...",
    }
  ];

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedProject(null);
  };

  return (
    <ProjectsContainer>
      <Title>Nos Projets Innovants</Title>
      <Subtitle>
        Découvrez nos solutions technologiques sur mesure, alliant innovation et
        performance pour répondre aux défis numériques d'aujourd'hui.
      </Subtitle>

      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectCard key={project.id}>
            <ProjectImage
              src={project.image}
              alt={project.title}
              onClick={() => handleOpenModal(project)}
              loading="lazy" // Optimisation du chargement des images
            />
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectExcerpt>{project.description}</ProjectExcerpt>
              <MoreButton onClick={() => handleOpenModal(project)}>
                plus
              </MoreButton>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>

           <Modal
              isOpen={modalIsOpen}
              onRequestClose={handleCloseModal}
              style={{
                ...customModalStyles,
                content: {
                  ...customModalStyles.content,
                  "@media (max-width: 768px)": {
                    width: "95%",
                    height: "90vh",
                  },
                },
              }}
            >
              <AnimatePresence mode="wait">
                {selectedProject && (
                  <motion.div
                    key="modal-content"
                    variants={modalAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <ModalImage
                      src={selectedProject.image}
                      alt={`Détails du projet ${selectedProject.title}`}
                      loading="lazy"
                    />
      
                    <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
      
                    <ModalContent>
                      <motion.h2 variants={itemAnimation}>
                        {selectedProject.title}
                      </motion.h2>
      
                      <motion.p variants={itemAnimation}>
                        {selectedProject.fullDescription}
                      </motion.p>
      
                      <SectionTitle>TIPTAM Code</SectionTitle>
                      <TechList>
                        {selectedProject.technologies.map((tech, index) => (
                          <TechItem
                            key={index}
                            variants={itemAnimation}
                            custom={index}
                          >
                            {tech}
                          </TechItem>
                        ))}
                      </TechList>
      
                      <DetailGrid>
                        {Object.entries({
                          Durée: selectedProject.duration,
                          Rôle: selectedProject.role,
                          Statut: selectedProject.status,
                        }).map(([key, value]) => (
                          <DetailItem key={key} variants={itemAnimation}>
                            <strong>{key}</strong>
                            {value}
                          </DetailItem>
                        ))}
                      </DetailGrid>
      
                      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                       
                        <MoreButonlien
                          onClick={() => window.open(selectedProject.link, "_blank")}
                        >
                          Voir le projet
                        </MoreButonlien> <MoreButton
                          onClick={handleCloseModal}
                        >
                          Fermer
                        </MoreButton>
                      </div>
                    </ModalContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Modal>
    </ProjectsContainer>
  );
};

export default Realisation3;