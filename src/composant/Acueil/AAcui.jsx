import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import styled from "styled-components";
import SEO from "../Seo.jsx";
import * as THREE from "three";

// Styles responsives avec styled-components
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 1rem;
  position: relative;
  background-color: #011d23;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 0.5rem;
  }
`;

const CanvasWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 56rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const MainHeading = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
  color: #f4f5f1;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.9);

  @media (min-width: 768px) {
    font-size: 3.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.875rem;
  }
`;

const GradientText = styled.span`
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, #b96f33, #a07753);
`;

const MessageText = styled.p`
  font-size: 1.125rem;
  color: #f4f5f1;
  max-width: 42rem;
  margin: 0 auto;
  opacity: 1;
  transition: opacity 0.5s ease;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0 0.5rem;
  }
`;

const Particles = () => {
  const meshRef = useRef();
  const [positions] = useState(() => {
    const positions = [];
    for (let i = 0; i < 5000; i++) {
      positions.push((Math.random() - 0.5) * 10);
      positions.push((Math.random() - 0.5) * 10);
      positions.push((Math.random() - 0.5) * 10);
    }
    return new Float32Array(positions);
  });

  useFrame(({ mouse }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = mouse.y * 0.5;
      meshRef.current.rotation.y = mouse.x * 0.5;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#b96f33" size={0.05} />
    </points>
  );
};

const Accueil = () => {
  const messages = [
    "Des solutions sur mesure pour booster votre présence en ligne",
    "Une expertise en React, Node.js, express, mongodb et bien plus encore",
    "Transformez vos idées en réalité digitale avec nous",
    "Sites web performants et adaptés à vos besoins",
    "Optimisation SEO et accompagnement personnalisé",
    "Applications web modernes et intuitives",
    "Développement sur mesure pour entreprises et startups",
    "Intégration des dernières technologies web",
    "Sécurité et performances au cœur de nos réalisations",
    "Formation et conseils pour réussir votre projet digital",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <HeroSection>
      <SEO
        title="TIPTAMCode - Dév & Formation Tech - Solutions Digitales"
        description="TIPTAMCode propose des services de développement web sur mesure, des formations en informatique et des solutions digitales adaptées à vos besoins. Création de sites web, applications et conseils en IT."
        keywords="Développement web, Création site internet, Formation informatique , Solutions digitales, Développement web Conakry, Hébergement web, Deployement des solutions, Référencement SEO, Conseil en informatique, Site web responsive, Programmation web, Formation React, Formation JavaScript, CMS personnalisé, Site e-commerce"
      />
      <CanvasWrapper>
        <Canvas>
          <OrbitControls enableZoom={false} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          <Particles />
        </Canvas>
      </CanvasWrapper>

      <ContentWrapper>
        <MainHeading>
          Votre Partenaire en <GradientText>Développement Web</GradientText>
        </MainHeading>

        <MessageText>
          {messages[currentMessage]}
        </MessageText>
      </ContentWrapper>
    </HeroSection>
  );
};

export default Accueil;