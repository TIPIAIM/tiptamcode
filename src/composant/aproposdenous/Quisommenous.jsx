import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Code,
  Users,
  Target,
  Heart,
  Zap,
  ArrowRight,
  Star,
  ChevronDown,
  X,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Helmet } from "react-helmet";
import Seo from "../Seo";
import Footer from "../Footerrr";
import Acueilapropos from "./Acueilapropos";

/* ===================== Animations & Helpers ===================== */
const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-6px) rotate(1deg); }
  66% { transform: translateY(3px) rotate(-1deg); }
`;
const shimmer = keyframes`0%{background-position:-200% 0;}100%{background-position:200% 0;}`;
const pulse = keyframes`0%,100%{opacity:1;}50%{opacity:.7;}`;
const fadeInUp = keyframes`from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}`;
const scaleIn = keyframes`from{opacity:0;transform:scale(.9);}to{opacity:1;transform:scale(1);}`;
const gradientBackground = keyframes`0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}`;
const particleBurst = keyframes`0%{transform:translate(0,0) scale(0);opacity:1;}100%{transform:translate(var(--tx),var(--ty)) scale(1);opacity:0;}`;
const mosaicOut = keyframes`
  0%{transform:scale(1) rotate(0deg);opacity:1;filter:blur(0)}
  60%{transform:scale(.9) rotate(2deg);opacity:.8}
  100%{transform:scale(0) rotate(5deg);opacity:0;filter:blur(4px)}
`;

/* ===================== Layout ===================== */
const AboutContainer = styled.section`
  padding: max(2rem, env(safe-area-inset-top)) 1rem
    max(2rem, env(safe-area-inset-bottom));
  background: linear-gradient(135deg, #011d23 50%, #011d23 50%);
  position: relative;
  overflow: hidden;
  animation: ${gradientBackground} 15s ease infinite;
  background-size: 200% 200%;

  @media (min-width: 480px) {
    padding: 3rem 1.5rem;
  }
  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
  @media (min-width: 1200px) {
    padding: 6rem 2rem;
  }
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -20%;
    width: 60%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(185, 111, 51, 0.05) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const ContentGrid = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  align-items: center;
  position: relative;
  z-index: 2;
  @media (min-width: 480px) {
    gap: 2.5rem;
  }
  @media (min-width: 768px) {
    gap: 4rem;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1.1fr 1fr;
    gap: 6rem;
  }
`;

const VisualSection = styled(motion.div)`
  position: relative;
  background: #011d23;
  border-radius: 16px;
  overflow: hidden;
  min-height: 260px;
  aspect-ratio: 1;
  box-shadow: 0 16px 32px rgba(1, 29, 35, 0.2);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(1, 29, 35, 0.3);
  }
  @media (min-width: 480px) {
    aspect-ratio: 16/9;
    min-height: 260px;
  }
  @media (min-width: 768px) {
    min-height: 360px;
    aspect-ratio: 4/3;
  }
  @media (min-width: 992px) {
    aspect-ratio: unset;
    min-height: 420px;
  }
`;

const TextContent = styled.div`
  padding: 0.75rem;
  position: relative;
  @media (min-width: 480px) {
    padding: 1rem;
  }
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const SectionTitle = styled(motion.h1)`
  font-size: clamp(1.6rem, 3.5vw, 3.2rem);
  color: #b96f33;
  margin-bottom: clamp(1rem, 2vw, 2rem);
  line-height: 1.2;
  font-weight: 800;
  position: relative;
  display: inline-block;
  animation: ${fadeInUp} 0.8s ease-out;
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #b96f33, #a07753);
    border-radius: 2px;
    transition: width 0.5s ease;
  }
  &:hover::after {
    width: 100%;
  }
`;

const Highlight = styled.span`
  color: #f4f5f1;
  font-weight: 800;
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, #f4f5f1, #f4f5f1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  &::before {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #b96f33, #a07753);
    transition: width 0.4s ease;
  }
  &:hover::before {
    width: 100%;
  }
`;

const Description = styled(motion.p)`
  font-size: clamp(0.98rem, 2.6vw, 1.2rem);
  line-height: 1.75;
  color: #e7eaea;
  margin-bottom: 1.5rem;
  font-weight: 600;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
`;

const StatCard = styled(motion.div)`
  padding: clamp(1rem, 3vw, 1.4rem);
  background: rgba(255, 255, 255, 0.85);
  border-radius: 14px;
  border: 1px solid rgba(169, 111, 51, 0.15);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  animation: ${scaleIn} 0.6s ease-out;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #b96f33, #a07753);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  }
  &:hover::before {
    transform: scaleX(1);
  }
`;

const StatValue = styled.div`
  font-size: clamp(1.6rem, 5vw, 2.4rem);
  color: #b96f33;
  font-weight: 800;
  margin-bottom: 0.35rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;
const StatLabel = styled.div`
  color: #011d23;
  font-size: 0.95rem;
  opacity: 0.95;
  font-weight: 500;
`;

/* ===================== Floating Elements ===================== */
const FloatingElement = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(185, 111, 51, 0.1),
    rgba(160, 119, 83, 0.1)
  );
  animation: ${float} 3s ease-in-out infinite;
  z-index: 1;
  &:nth-child(1) {
    top: 20%;
    left: 10%;
    width: 18px;
    height: 18px;
  }
  &:nth-child(2) {
    top: 60%;
    right: 15%;
    width: 20px;
    height: 20px;
    animation-delay: 0.8s;
  }
  &:nth-child(3) {
    bottom: 30%;
    left: 15%;
    width: 16px;
    height: 16px;
    animation-delay: 1.6s;
  }
`;

/* ===================== Team (RESPONSIVE TUNING) ===================== */
const TeamSection = styled.section`
  margin-top: 3.5rem;
  padding: 2.5rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, #b96f33, transparent);
  }

  @media (min-width: 480px) {
    margin-top: 4rem;
    padding: 3rem 0;
  }
  @media (min-width: 768px) {
    margin-top: 6rem;
    padding: 4rem 0;
  }
`;

const TeamTitle = styled(SectionTitle)`
  text-align: center;
  margin-bottom: clamp(2rem, 6vw, 4rem);
  width: 100%;
  &::after {
    left: 50%;
    transform: translateX(-50%);
    background: #b96f33;
    width: 80px;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  gap: clamp(1rem, 4vw, 2rem);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  padding: 0 clamp(0.5rem, 3vw, 1.5rem);
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    padding: 0 0.5rem;
  }
`;

const TeamMember = styled(motion.div)`
  background: #f4f5f1;
  border-radius: 16px;
  /* Pour éviter les coupures sur mobile, on autorise le dépassement */
  overflow: visible;
  position: relative;
  transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 0.35s ease;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 480px) {
    border-radius: 14px;
  }
`;

const MemberInfo = styled.div`
  padding: clamp(0.9rem, 3.5vw, 1.5rem);
  text-align: center;
`;

const MemberName = styled.h3`
  color: #011d23;
  margin-bottom: 0.35rem;
  font-size: clamp(1.05rem, 4.5vw, 1.35rem);
  font-weight: 800;
  line-height: 1.25;
  word-break: break-word;
`;

const MemberRole = styled.p`
  color: #a07753;
  font-size: clamp(0.9rem, 3.8vw, 1rem);
  line-height: 1.55;
  font-weight: 600;
  margin: 0 auto;
  max-width: 38ch; /* empêche les lignes trop longues et améliore la lisibilité */
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.9rem;
  flex-wrap: wrap; /* autorise le retour à la ligne sur petits écrans */
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(185, 111, 51, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b96f33;
  transition: all 0.3s ease;

  &:hover {
    background: #b96f33;
    color: #fff;
    transform: translateY(-3px);
  }

  @media (max-width: 380px) {
    width: 36px;
    height: 36px; /* touche un peu plus petite pour gagner de la place */
  }
`;

/* ===================== MosaicHover ===================== */
const MosaicRoot = styled.div`
  position: relative;
  width: 100%;
  /* Hauteur plus faible sur mobile pour dégager le texte */
  height: ${({ $h }) => $h || "clamp(200px, 45vw, 300px)"};
  overflow: hidden;
  border-bottom: ${({ $border }) => $border || "4px solid #b96f33"};
  cursor: pointer;

  @media (min-width: 768px) {
    height: ${({ $hMd }) => $hMd || "380px"};
  }
`;

const MosaicImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $pos }) => $pos || "center"};
  display: block;
  filter: grayscale(12%) contrast(52%);
  transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1), filter 0.6s ease;
  transform-origin: center;
  will-change: transform, filter;
  ${MosaicRoot}:hover & {
    transform: scale(1.05);
    filter: grayscale(0%) contrast(110%);
  }
`;

const MosaicOverlay = styled.div`
  --rows: ${({ $rows }) => $rows || 8};
  --cols: ${({ $cols }) => $cols || 8};
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: grid;
  grid-template-rows: repeat(var(--rows), 1fr);
  grid-template-columns: repeat(var(--cols), 1fr);
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Cell = styled.span`
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(${({ $src }) => $src});
    background-size: 100% 100%;
    background-position: calc(var(--x) * (100% / (var(--cols) - 1)))
      calc(var(--y) * (100% / (var(--rows) - 1)));
    transform-origin: center;
    opacity: 0;
  }
  ${MosaicRoot}:hover &::before {
    opacity: 1;
    animation: ${mosaicOut} 0.8s ease forwards;
    animation-delay: ${({ $delay }) => $delay || 0}ms;
  }
`;

const MosaicHover = ({
  src,
  alt,
  rows = 8,
  cols = 8,
  height,
  heightMd,
  pos,
  onClick,
}) => {
  const cells = [];
  const baseDelay = 15;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const delay = (x + y) * baseDelay;
      cells.push(
        <Cell
          key={`${x}-${y}`}
          style={{ "--x": x, "--y": y }}
          $src={src}
          $delay={delay}
        />
      );
    }
  }
  return (
    <MosaicRoot
      $h={height}
      $hMd={heightMd}
      $border="4px solid #b96f33"
      onClick={onClick}
    >
      <MosaicImg src={src} alt={alt} loading="lazy" $pos={pos} />
      <MosaicOverlay $rows={rows} $cols={cols}>
        {cells}
      </MosaicOverlay>
    </MosaicRoot>
  );
};

/* ===================== Values Section (inchangé) ===================== */
const ValuesSection = styled.section`
  margin: 6rem 0;
  padding: 3rem 1rem;
  position: relative;
  @media (min-width: 768px) {
    margin: 8rem 0;
    padding: 4rem 2rem;
  }
`;
const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
`;
const ValueCard = styled(motion.div)`
  padding: 2.2rem 1.6rem;
  background: #fff;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  border-top: 5px solid;
  border-image: linear-gradient(90deg, #b96f33, #a07753) 1;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
  }
  &:nth-child(2) {
    border-image: linear-gradient(90deg, #a07753, #8a6248) 1;
  }
  &:nth-child(3) {
    border-image: linear-gradient(90deg, #8a6248, #011d23) 1;
  }
`;
const ValueIcon = styled.div`
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(185, 111, 51, 0.1),
    rgba(160, 119, 83, 0.1)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.2rem;
  transition: all 0.3s ease;
  animation: ${float} 6s ease-in-out infinite;
  ${ValueCard}:hover & {
    transform: scale(1.08) rotate(5deg);
    background: linear-gradient(
      135deg,
      rgba(185, 111, 51, 0.2),
      rgba(160, 119, 83, 0.2)
    );
    animation: none;
  }
  svg {
    color: #b96f33;
    width: 30px;
    height: 30px;
  }
`;
const ValueTitle = styled.h3`
  color: #011d23;
  margin-bottom: 0.8rem;
  font-size: clamp(1.05rem, 3.4vw, 1.35rem);
  font-weight: 700;
`;
const ValueDescription = styled.p`
  color: #5a5a5a;
  line-height: 1.65;
  font-size: clamp(0.95rem, 3.2vw, 1rem);
`;

/* ===================== Particles & Modal & CTA (inchangés) ===================== */
const ParticlesContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
`;
const Particle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(185, 111, 51, 0.6);
  animation: ${particleBurst} 1.5s ease-out forwards;
`;
const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(1, 29, 35, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;
const ModalContent = styled(motion.div)`
  background: #fff;
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
  animation: ${scaleIn} 0.4s ease-out;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(90deg, #b96f33, #a07753);
  color: #fff;
`;
const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 800;
`;
const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;
const ModalBody = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const ModalImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  @media (min-width: 768px) {
    height: 100%;
  }
`;
const ModalText = styled.div`
  h3 {
    color: #011d23;
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }
  p {
    color: #5a5a5a;
    line-height: 1.7;
    margin-bottom: 1.2rem;
  }
`;
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.2rem;
`;
const ContactButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(90deg, #b96f33, #a07753);
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  transition: all 0.3s ease;
  width: fit-content;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(185, 111, 51, 0.3);
  }
`;
const CtaSection = styled.section`
  padding: 3.2rem 1rem;
  background: linear-gradient(135deg, #011d23 0%, #0a272f 100%);
  text-align: center;
  color: #fff;
  position: relative;
  overflow: hidden;
  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`;
const CtaTitle = styled.h2`
  font-size: clamp(1.6rem, 4.6vw, 3rem);
  margin-bottom: 1rem;
  font-weight: 800;
  animation: ${fadeInUp} 0.8s ease-out;
`;
const CtaText = styled.p`
  font-size: clamp(0.98rem, 3.2vw, 1.1rem);
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.65;
  opacity: 0.9;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;
const CtaButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.05rem 2rem;
  background: linear-gradient(90deg, #b96f33, #a07753);
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: clamp(1rem, 3.5vw, 1.1rem);
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(185, 111, 51, 0.3);
  animation: ${pulse} 2s ease-in-out infinite;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(185, 111, 51, 0.4);
    animation: none;
  }
`;

/* ===================== Page ===================== */
const ShimmerText = styled.span`
  background: linear-gradient(90deg, #b96f33, #a07753, #b96f33);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 3s infinite linear;
`;

const APropos = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

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

  const createParticles = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newParticles = [];
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 90;
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
      });
    }
    setParticles((p) => [...p, ...newParticles]);
    setTimeout(
      () => setParticles((p) => p.filter((pp) => !newParticles.includes(pp))),
      1500
    );
  };

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.keyCode === 27) closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const teamMembers = [
    {
      name: "Mamadou Marietou",
      role: "Co-Fondateur & Expert Formation",
      description:
        "Spécialiste en pédagogie numérique et maintenance technique. Assure le transfert de compétences et la pérennité des solutions. Avec plus de 5 ans d'expérience dans la formation aux technologies web.",
      photo: "/img/mariatou1.avif",
      email: "contact@tiptamcode.com",
      phone: "+224 624 138 395",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Diallo Alpha Ousmane",
      role: "Co-Fondateur & Lead Développeur",
      description:
        "Expert en développement Full Stack, architecture cloud et consultant en système d'information. Garant de la qualité technique et de l'innovation. Passionné par les technologies émergentes et les solutions scalables.",
      photo: "/img/soum4-6.avif",
      email: "contact@tiptamcode.com",
      phone: "+224 624 138 395",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Emmanuelle",
      role: "Responsable Marketing & Partenariats",
      description:
        "Expert en stratégie digitale et développement business. Assure la visibilité et les relations clients. Spécialiste du marketing de contenu et des stratégies de croissance.",
      photo: "/img/emà.avif",
      email: "contact@tiptamcode.com",
      phone: "+224624138395",
      linkedin: "#",
      twitter: "#",
    },
  ];

  const values = [
    {
      icon: <Heart size={32} />,
      title: "Approche Humaine",
      description:
        "Nous plaçons l'humain au centre de chaque projet, avec une écoute active et un accompagnement personnalisé tout au long du processus de création.",
    },
    {
      icon: <Target size={32} />,
      title: "Excellence Technique",
      description:
        "Nous combinons expertise technique et créativité pour livrer des solutions robustes, performantes et esthétiques qui dépassent les attentes.",
    },
    {
      icon: <Users size={32} />,
      title: "Collaboration Transparente",
      description:
        "Nous croyons en une communication ouverte et une collaboration étroite avec nos clients pour transformer leurs visions en réalité digitale.",
    },
  ];

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

      <Acueilapropos />

      <AboutContainer ref={containerRef} onClick={createParticles}>
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />

        <ParticlesContainer>
          {particles.map((p) => (
            <Particle
              key={p.id}
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                "--tx": `${p.tx}px`,
                "--ty": `${p.ty}px`,
              }}
            />
          ))}
        </ParticlesContainer>

        <ContentGrid>
          <VisualSection
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <MosaicHover
              src="/img/euipeaod.avif"
              alt="Équipe TIPTAMCode collaborant sur un projet digital"
              rows={9}
              cols={12}
              height="clamp(200px, 45vw, 300px)"
              heightMd="420px"
              pos="center 30%"
            />
          </VisualSection>

          <TextContent>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Notre <Highlight>Philosophie</Highlight>
            </SectionTitle>

            <Description
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Chez <ShimmerText>TIPTAMCode</ShimmerText>, nous croyons en une
              approche <Highlight>humaine du numérique</Highlight>. Depuis 2021,
              nous transformons les idées ambitieuses en solutions digitales
              pérennes, avec <Highlight>98% de satisfaction client</Highlight>{" "}
              sur plus de 50 projets.
            </Description>

            <StatsGrid>
              <StatCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <StatValue>
                  <Rocket size={28} /> 50+
                </StatValue>
                <StatLabel>Projets innovants réalisés</StatLabel>
              </StatCard>

              <StatCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <StatValue>
                  <Code size={28} /> 98%
                </StatValue>
                <StatLabel>Taux de satisfaction client</StatLabel>
              </StatCard>
            </StatsGrid>
          </TextContent>
        </ContentGrid>

        <ValuesSection>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            Nos <Highlight>Valeurs</Highlight>
          </SectionTitle>

          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <ValueIcon>{value.icon}</ValueIcon>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ValuesSection>

        <TeamSection>
          <TeamTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Rencontrez l'Équipe
          </TeamTitle>

          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                initial={{ opacity: 0, y: 50, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ y: -12 }}
              >
                <MosaicHover
                  src={member.photo}
                  alt={`Portrait de ${member.name}`}
                  rows={8}
                  cols={8}
                  height="clamp(200px, 52vw, 300px)"
                  heightMd="380px"
                  pos="top"
                  onClick={() => openModal(member)}
                />
                <MemberInfo>
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                  <SocialLinks>
                    <SocialLink
                      href={`mailto:${member.email}`}
                      aria-label="Email"
                    >
                      <Mail size={18} />
                    </SocialLink>
                    <SocialLink
                      href={`tel:${member.phone}`}
                      aria-label="Téléphone"
                    >
                      <Phone size={18} />
                    </SocialLink>
                    <SocialLink href={member.linkedin} aria-label="LinkedIn">
                      <MessageCircle size={18} />
                    </SocialLink>
                  </SocialLinks>
                </MemberInfo>
              </TeamMember>
            ))}
          </TeamGrid>
        </TeamSection>
      </AboutContainer>

      <CtaSection>
        <CtaTitle>Prêt à transformer votre idée en réalité ?</CtaTitle>
        <CtaText>
          Contactez-nous dès aujourd'hui pour discuter de votre projet et
          découvrir comment notre équipe peut vous aider à atteindre vos
          objectifs digitaux.
        </CtaText>
        <CtaButton
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Discuter de mon projet <ArrowRight size={20} />
        </CtaButton>
      </CtaSection>

      <Footer />

      <AnimatePresence>
        {isModalOpen && selectedMember && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitle>{selectedMember.name}</ModalTitle>
                <CloseButton onClick={closeModal}>
                  <X size={24} />
                </CloseButton>
              </ModalHeader>
              <ModalBody>
                <ModalImage
                  src={selectedMember.photo}
                  alt={selectedMember.name}
                />
                <ModalText>
                  <h3>{selectedMember.role}</h3>
                  <p>{selectedMember.description}</p>
                  <ContactInfo>
                    <ContactButton href={`mailto:${selectedMember.email}`}>
                      <Mail size={18} /> Envoyer un email
                    </ContactButton>
                    <ContactButton href={`tel:${selectedMember.phone}`}>
                      <Phone size={18} /> Appeler
                    </ContactButton>
                  </ContactInfo>
                </ModalText>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(APropos);
