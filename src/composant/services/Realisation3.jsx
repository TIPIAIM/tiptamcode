import { useState, useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Modal from "react-modal";

// Point d’ancrage du modal (adapte si nécessaire)
Modal.setAppElement("#root");

/* ================== Variants & keyframes ================== */
const cardAnimation = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.6 },
  },
};
const modalAnimation = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.2 } },
};
const staggerItems = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemAnimation = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
};

const shine = keyframes`
  0%   { transform: translateX(-120%) skewX(-12deg); }
  100% { transform: translateX(220%)  skewX(-12deg); }
`;
const loadingPulse = keyframes`
  0%,100% { opacity: .55 }
  50%     { opacity: .95 }
`;

/* ================== Styles de layout ================== */
const ProjectsContainer = styled.section`
  padding: clamp(2.5rem, 6vw, 5rem) 1rem;
  background: #f4f5f1;
`;
const Title = styled(motion.h2).attrs(() => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}))`
  font-size: clamp(1.8rem, 3.8vw, 3rem);
  font-weight: 800;
  color: #a07753;
  text-align: center;
  text-shadow: 2px 2px 0px rgba(169, 111, 51, 0.15);
  margin-bottom: 0.75rem;
`;
const Subtitle = styled(motion.p).attrs(() => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { delay: 0.15 },
}))`
  color: #011d23;
  text-align: center;
  margin: 0 auto 3.2rem;
  font-size: clamp(1rem, 1.7vw, 1.1rem);
  line-height: 1.7;
  max-width: 860px;
  font-weight: 500;
  padding-inline: clamp(0.5rem, 4vw, 1rem);
`;
const ProjectsGrid = styled.div`
  display: grid;
  gap: clamp(1rem, 3vw, 2rem);
  padding: clamp(0rem, 3vw, 1rem);
  grid-template-columns: 1fr;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 980px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

/* ================== Carte projet ================== */
const ProjectCard = styled(motion.article).attrs(() => ({
  variants: cardAnimation,
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "0px 0px -100px 0px" },
}))`
  background: #fff;
  border-radius: 14px;
  position: relative;
  overflow: hidden;
  outline: 1px solid rgba(169, 111, 51, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease,
    outline-color 0.25s ease;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.06);
  &:hover {
    transform: translateY(-6px);
    outline-color: rgba(169, 111, 51, 0.25);
    box-shadow: 0 22px 44px rgba(0, 0, 0, 0.1);
  }
`;
const MediaWrap = styled.div`
  position: relative;
  overflow: hidden;
  height: 250px;
  @media (min-width: 420px) {
    height: 260px;
  }
`;
const ProjectImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(95%) contrast(98%);
  transform-origin: center;
  will-change: transform, filter;
  ${ProjectCard}:hover & {
    transform: scale(1.04);
    filter: saturate(105%) contrast(104%);
  }
`;
const ImageShine = styled.span`
  position: absolute;
  inset: 0 auto 0 -30%;
  width: 30%;
  background: linear-gradient(
    100deg,
    transparent 0%,
    rgba(255, 255, 255, 0.35) 45%,
    transparent 100%
  );
  transform: translateX(-120%) skewX(-12deg);
  pointer-events: none;
  ${ProjectCard}:hover & {
    animation: ${shine} 900ms ease forwards;
  }
`;
const GradientEdge = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4px;
  background: linear-gradient(90deg, #a07753, #b96f33);
  transform: scaleX(0.12);
  transform-origin: left;
  transition: transform 0.35s ease;
  ${ProjectCard}:hover & {
    transform: scaleX(1);
  }
`;
const StatusPill = styled.span`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 2;
  background: ${({ $status }) =>
    $status === "Terminer"
      ? "linear-gradient(90deg, #31b66b, #22a05a)"
      : "linear-gradient(90deg, #f59e0b, #e67e22)"};
  color: #fff;
  font-weight: 700;
  font-size: 0.78rem;
  line-height: 1;
  padding: 0.45rem 0.6rem;
  border-radius: 999px;
  letter-spacing: 0.02em;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
`;
const CornerBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  background: rgba(1, 29, 35, 0.75);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.45rem 0.65rem;
  border-bottom-left-radius: 10px;
  backdrop-filter: blur(6px);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;
const TechChips = styled.div`
  position: absolute;
  inset: auto 0.65rem 0.65rem 0.65rem;
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  pointer-events: none;
  z-index: 2;
`;
const Chip = styled.span`
  background: rgba(1, 29, 35, 0.7);
  color: #fff;
  font-size: 0.72rem;
  padding: 0.28rem 0.55rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(4px);
`;

const ProjectContent = styled.div`
  padding: 1.1rem 1.1rem 1.25rem;
`;
const ProjectTitle = styled.h3`
  color: #011d23;
  margin: 0 0 0.4rem 0;
  font-size: clamp(1.05rem, 1.7vw, 1.25rem);
  font-weight: 800;
  line-height: 1.25;
`;
const ProjectExcerpt = styled.p`
  color: #555;
  margin: 0 0 1.1rem 0;
  font-size: 0.98rem;
  line-height: 1.55;
`;
const ButtonsRow = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;
const Btn = styled(motion.button)`
  position: relative;
  appearance: none;
  border: none;
  border-radius: 10px;
  padding: 0.6rem 0.9rem;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: filter 0.2s ease, transform 0.2s ease;
  color: #fff;
  &:focus-visible {
    outline: 2px solid #a07753;
    outline-offset: 2px;
  }
`;
const PrimaryBtn = styled(Btn).attrs(() => ({
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
}))`
  background: linear-gradient(90deg, #b96f33, #a07753);
  box-shadow: 0 8px 20px rgba(169, 111, 51, 0.25);
`;
const GhostBtn = styled(Btn).attrs(() => ({
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
}))`
  background: #011d23;
  box-shadow: 0 8px 20px rgba(1, 29, 35, 0.18);
`;

/* ================== Skeleton ================== */
const Skeleton = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #e9ebe6 25%, #f5f6f2 37%, #e9ebe6 63%);
  background-size: 400% 100%;
  animation: ${loadingPulse} 1.2s ease-in-out infinite;
  &:after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
        circle at 30% 10%,
        rgba(0, 0, 0, 0.03),
        transparent 40%
      ),
      radial-gradient(circle at 70% 80%, rgba(0, 0, 0, 0.03), transparent 50%);
    opacity: 0.6;
  }
`;

/* ================== Modal ================== */
const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    zIndex: 1000,
    backdropFilter: "blur(3px)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    maxWidth: "94%",
    maxHeight: "92vh",
    width: "980px",
    borderRadius: "14px",
    border: "1px solid rgba(169,111,51,.35)",
    padding: 0,
    overflow: "hidden",
    background: "#fff",
  },
};
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;

  border-bottom: 1px solid rgba(169, 111, 51, 0.18);
`;
const ModalTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.05rem, 2.2vw, 1.35rem);
  font-weight: 800;
  color: #011d23;
`;
const HeaderActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
const IconBtn = styled(motion.button)`
  appearance: none;
  border: none;
  background: #eb8837;
  color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 24px rgba(1, 29, 35, 0.25);
  &:focus-visible {
    outline: 2px solid #a07753;
    outline-offset: 2px;
  }
`;

/* ----- Galerie dans le modal ----- */
const ModalGallery = styled.div`
  position: relative;
  background: #eb8837;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalImage = styled(motion.img)`
  max-width: 100%;
  max-height: clamp(260px, 25vh, 520px);
  width: auto;
  height: auto;
  object-fit: ${({ $fit }) => $fit};
  background: #000;
`;
const Thumbs = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow: auto;
  padding: 0.6rem 0.9rem;
  background: #0b0f10;
`;
const Thumb = styled(motion.img)`
  width: 50px;
  height: 50;
  object-fit: cover;
  border-radius: 2px;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  outline: ${({ $active }) =>
    $active ? "2px solid #b96f33" : "1px solid rgba(255,255,255,.08)"};
`;
const NavBtn = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(2px);
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;
const NavPrev = styled(NavBtn)`
  left: 0.5rem;
`;
const NavNext = styled(NavBtn)`
  right: 0.5rem;
`;

const ModalBody = styled(motion.div).attrs(() => ({
  variants: staggerItems,
  initial: "hidden",
  animate: "visible",
}))`
  padding: clamp(1rem, 3vw, 1.5rem);
  overflow-y: auto;
  max-height: calc(98vh - (clamp(260px, 58vh, 520px) + 60px));
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #b96f33;
    border-radius: 10px;
  }
`;

const ModalText = styled(motion.p).attrs(() => ({ variants: itemAnimation }))`
  color: #444;
  line-height: 1.7;
  margin: 0 0 1rem 0;
  font-size: 0.98rem;
`;
const SectionTitle = styled(motion.h3).attrs(() => ({
  variants: itemAnimation,
}))`
  color: #011d23;
  margin: 1rem 0 0.6rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(169, 111, 51, 0.18);
  font-weight: 800;
  font-size: 1.02rem;
`;
const TechList = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0.6rem 0 1rem 0;
  padding: 0;
  list-style: none;
`;
const TechItem = styled(motion.li).attrs(() => ({
  whileHover: { scale: 1.06 },
  whileTap: { scale: 0.96 },
}))`
  background: rgba(169, 111, 51, 0.12);
  color: #b96f33;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  font-size: 0.85rem;
  border: 1px solid rgba(169, 111, 51, 0.28);
  font-weight: 700;
`;
const DetailGrid = styled.div`
  display: grid;
  gap: 0.8rem;
  margin: 1rem 0;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;
const DetailItem = styled(motion.div).attrs(() => ({
  variants: itemAnimation,
}))`
  background: rgba(244, 245, 241, 0.75);
  padding: 0.75rem 0.9rem;
  border-radius: 10px;
  border: 1px solid rgba(169, 111, 51, 0.15);
  strong {
    color: #b96f33;
    display: block;
    margin-bottom: 0.25rem;
  }
`;
const ModalFooter = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 0.6rem;
`;
const LinkBtn = styled(PrimaryBtn).attrs(() => ({
  as: "a",
  target: "_blank",
  rel: "noopener noreferrer",
}))`
  text-decoration: none;
`;
const CloseBtnGhost = styled(GhostBtn)``;

/* ================== Composant ================== */
const Realisation3 = () => {
  const reduceMotion = useReducedMotion();

  const projects = useMemo(
    () => [
      // EXISTANTS
      {
        id: 1,
        title: "Cabinet AOD Avocats",
        images: ["/img/accueilaodavocat.avif"],
        image: "/img/accueilaodavocat.avif",
        description:
          "Portail de cabinet : présentation, prises de contact, contenu juridique, modules privés.",
        technologies: [
          "Vite + React",
          "Node.js",
          "MongoDB",
          "Socket.io",
          "SEO",
          "IA",
        ],
        duration: "4 mois",
        role: "Développement Full-Stack",
        status: "Terminer",
        link: "https://www.aod-avocats.net",
        fullDescription:
          "Plateforme cabinet avec annuaire, gestion de contenu, notifications temps réel et espace sécurisé. SEO/Perf optimisés, sécurisation des flux, déploiement sur infra scalable.",
      },
      {
        id: 2,
        title: "MK Globale Services",
        images: ["/img/logomkàvectextefondbleux.avif", "/img/logomkfontblànc.avif"],
        image: "/img/logomkfontblànc.avif",
        description:
          "Site multi-services (aménagement, évènementiel, facility) avec devis instantané et CRM simple.",
        technologies: [
          "React+ Vite.js",
          "Node.js",
          "MongoDB",
          "Tailwind",
          "Emailing",
        ],
        duration: "1 mois",
        role: "Conception & Dev",
        status: "Terminer",
        link: "https://www.mkgservices-gn.com",
        fullDescription:
          "Site modulaire : exposition des offres, formulaires dynamiques, gestions des differentes àctivités, gestion de leads, et connecteurs emailing... Performances et accessibilité renforcées.",
      },
      {
        id: 4,
        title: "Judiciaire Private",
        images: ["/img/càsierjudiciàire.png"],
        image: "/img/càsierjudiciàire.png",
        description: "Solution confidentielle de gestion et suivi (private).",
        technologies: [
          "Styled-Components",
          "Vite + React",
          "Node.js",
          "Express",
          "MongoDB",
        ],
        duration: "5 mois",
        role: "Développement Full-Stack",
        status: "En cours",
        link: "https://www.tiptamcode.com/privée",
        fullDescription:
          "Application et backoffice pour la gestion sécurisée de demandes et documents sensibles (détails confidentiels). Workflow, audit trail, chiffrement et accès restreints.",
      },
      {
        id: 3,
        title: "SEMYG — Immobilier",
        images: [
          "/img/logosemyg.avif",
          "/img/logosemyg.avif",
          "/img/logosemyg.avif",
        ],
        image: "/img/logosemyg.avif",
        description:
          "Plateforme immobilière : annonces, filtres avancés, demandes de visites & CRM léger.",
        technologies: [
          "Next.js",
          "Node.js",
          "Cloud Storage",
          "Emailing",
          "Cloudnàry",
        ],
        duration: "1 mois",
        role: "Développement & Intégration",
        status: "Terminer",
        link: "https://www.semygimmobilier.vercel.app",
        fullDescription:
          "SEMYG centralise la publication d’annonces, la prise de rendez-vous et le suivi des prospects. Recherche multi-critères, cartes interactives, tableau de bord commercial, export rapports, et intégrations paiement/réservation.",
      },
    
      {
        id: 5,
        title: "CaurisInvestment — Immobilier",
        images: ["/img/logocàurisàvectexte.avif"],
        image: "/img/logocàurisàvectexte.avif",
        description:
          "Site corporate + deal-room : présentation d’actifs, data-room privée & onboarding investisseurs.",
        technologies: ["React+vitejs", "Emàil.js", "Cloud", "Styded-component"],
        duration: "1 mois",
        role: "Dev Front end",
        status: "Terminer",
        link: "https://www.caurisinvestment.com",
        fullDescription:
          "Espace public premium (thèses d’investissement, équipe, actualités) et data-room privée pour investisseurs : documents, KPI, pipeline, signatures électroniques. Gouvernance et permissions fines, journal d’audit, automatisations de workflow.",
      },
    
      {
        id: 6,
        title: "BibiaBusiness — E-Commerce",
        images: ["/img/fondbleufonce.avif"],
        image: "/img/fondbleufonce.avif",
        description: "Boutique en ligne guinéenne : maison, déco, vêtements.",
        technologies: [
          "Vite + React",
          "Node.js",
          "Express",
          "MongoDB",
          "EmailJS",
          "AI",
        ],
        duration: "2 mois",
        role: "Développement Full-Stack",
        status: "Terminer",
        link: "https://bibiabusness.vercel.app/",
        fullDescription:
          "E-commerce performant : catalogue, panier, codes promo, automatisations emails, analytics, SEO technique, hébergement edge.",
      },

      // NOUVEAUX — à adapter avec tes images
   
   
    ],
    []
  );

  // state
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fitMode, setFitMode] = useState("contain"); // contain | cover
  const [loadingIds, setLoadingIds] = useState(new Set());

  useEffect(() => {
    setLoadingIds(new Set(projects.map((p) => p.id)));
  }, [projects]);

  const handleImgLoad = (id) => {
    setLoadingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setModalIsOpen(true);
    setCurrentIdx(0);
    setFitMode("contain");
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProject(null);
  };

  const goPrev = () => {
    if (!selectedProject) return;
    setCurrentIdx(
      (i) =>
        (i - 1 + selectedProject.images.length) % selectedProject.images.length
    );
  };
  const goNext = () => {
    if (!selectedProject) return;
    setCurrentIdx((i) => (i + 1) % selectedProject.images.length);
  };

  return (
    <ProjectsContainer>
      <Title>Nos Projets Innovants</Title>
      <Subtitle>
        Voici un aperçu de quelques une de nos réalisations : expériences rapides, accessibles
        et maintenables, construites avec des stacks modernes et un soin
        particulier pour la qualité.
      </Subtitle>

      <ProjectsGrid>
        {projects.map((project) => {
          const isLoading = loadingIds.has(project.id);
          return (
            <ProjectCard
              key={project.id}
              aria-label={`Projet ${project.title}`}
            >
              <MediaWrap
                role="button"
                tabIndex={0}
                onClick={() => openModal(project)}
                onKeyDown={(e) => e.key === "Enter" && openModal(project)}
                aria-label={`Ouvrir ${project.title}`}
              >
                <StatusPill $status={project.status}>
                  {project.status}
                </StatusPill>
                <CornerBadge>{project.duration}</CornerBadge>
                <TechChips>
                  {project.technologies.slice(0, 3).map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                  {project.technologies.length > 3 && (
                    <Chip>+{project.technologies.length - 3}</Chip>
                  )}
                </TechChips>

                {isLoading && <Skeleton aria-hidden="true" />}
                <ProjectImage
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  onLoad={() => handleImgLoad(project.id)}
                  initial={reduceMotion ? false : { scale: 1.02 }}
                  whileHover={reduceMotion ? {} : { scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                />
                <ImageShine />
                <GradientEdge />
              </MediaWrap>

              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectExcerpt>{project.description}</ProjectExcerpt>
                <ButtonsRow>
                  <PrimaryBtn
                    onClick={() => openModal(project)}
                    aria-label={`Détails du projet ${project.title}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Détails
                  </PrimaryBtn>
                  <GhostBtn
                    as="a"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visiter ${project.title}`}
                  >
                    Voir le site
                  </GhostBtn>
                </ButtonsRow>
              </ProjectContent>
            </ProjectCard>
          );
        })}
      </ProjectsGrid>

      {/* MODAL */}
      <AnimatePresence>
        {modalIsOpen && selectedProject && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customModalStyles}
            contentLabel={`Détails ${selectedProject.title}`}
          >
            <motion.div
              key="modal-content"
              variants={modalAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ModalHeader>
                <ModalTitle>{selectedProject.title}</ModalTitle>
                <HeaderActions>
                  <IconBtn
                    onClick={() =>
                      setFitMode((m) => (m === "contain" ? "cover" : "contain"))
                    }
                    title={
                      fitMode === "contain"
                        ? "Remplir l’espace"
                        : "Adapter à l’écran"
                    }
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    {fitMode === "contain" ? "↔︎" : "⤢"}
                  </IconBtn>
                  <IconBtn
                    onClick={closeModal}
                    aria-label="Fermer"
                    whileHover={{ rotate: 90, scale: 1.06 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    ×
                  </IconBtn>
                </HeaderActions>
              </ModalHeader>

              {/* Galerie */}
              <ModalGallery>
                <ModalImage
                  key={selectedProject.images[currentIdx]}
                  src={selectedProject.images[currentIdx]}
                  alt={`${selectedProject.title} — vue ${currentIdx + 1}`}
                  $fit={fitMode}
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
                  animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {selectedProject.images.length > 1 && (
                  <>
                    <NavPrev
                      onClick={goPrev}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Précédente"
                    >
                      ‹
                    </NavPrev>
                    <NavNext
                      onClick={goNext}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Suivante"
                    >
                      ›
                    </NavNext>
                  </>
                )}
              </ModalGallery>
              <Thumbs>
                {selectedProject.images.map((src, i) => (
                  <Thumb
                    key={src}
                    src={src}
                    alt={`miniature ${i + 1}`}
                    $active={i === currentIdx}
                    onClick={() => setCurrentIdx(i)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </Thumbs>

              <ModalBody>
                <motion.div
                  variants={staggerItems}
                  initial="hidden"
                  animate="visible"
                >
                  <ModalText>{selectedProject.fullDescription}</ModalText>

                  <SectionTitle>Stack & Outils</SectionTitle>
                  <TechList>
                    {selectedProject.technologies.map((tech) => (
                      <TechItem key={tech}>{tech}</TechItem>
                    ))}
                  </TechList>

                  <SectionTitle>Infos</SectionTitle>
                  <DetailGrid>
                    <DetailItem>
                      <strong>Durée</strong>
                      {selectedProject.duration}
                    </DetailItem>
                    <DetailItem>
                      <strong>Rôle</strong>
                      {selectedProject.role}
                    </DetailItem>
                    <DetailItem>
                      <strong>Statut</strong>
                      {selectedProject.status}
                    </DetailItem>
                  </DetailGrid>

                  <ModalFooter>
                    <LinkBtn href={selectedProject.link}>
                      Voir le projet
                    </LinkBtn>
                    <CloseBtnGhost onClick={closeModal}>Fermer</CloseBtnGhost>
                  </ModalFooter>
                </motion.div>
              </ModalBody>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </ProjectsContainer>
  );
};

export default Realisation3;
