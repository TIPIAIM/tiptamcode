import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
import SEO from '../Seo.jsx'
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

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  height: 90%;
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

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0 0.5rem;
  }
`;
const Accueil = () => {
  const seoProps = {
    title: "TIPTAMCode Agence de Développement Web Professionnelle ",
    description:
      "Création de sites vitrines et dynamiques avec bases de données, formations et conseils en bonnes pratiques",
    keywords:
      "développement web, site vitrine, formation react, bonnes pratiques",
  };


  const messages = [
    "Des solutions sur mesure pour booster votre présence en ligne",
    "Une expertise en React, Node.js et bien plus encore",
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
    const canvasRef = useRef(null);
  
    useEffect(() => {
      AOS.init({
        duration: 1000,
        once: true,
      });
  
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
      }, 2000);
  
      return () => clearInterval(interval);
    }, []);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      const particles = [];
      const bubbles = [];
  
      class Particle {
        constructor(x, y, size, speedX, speedY) {
          this.x = x;
          this.y = y;
          this.size = size;
          this.speedX = speedX;
          this.speedY = speedY;
        }
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.size > 0.2) this.size -= 0.02;
        }
        draw() {
          ctx.fillStyle = "rgba(185, 111, 51, 0.7)";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
  
      class Bubble {
        constructor(x, y, size, speedY) {
          this.x = x;
          this.y = y;
          this.size = size;
          this.speedY = speedY;
        }
        update() {
          this.y -= this.speedY;
          if (this.y < -10) this.y = canvas.height + 10;
        }
        draw() {
          ctx.fillStyle = "rgba(160, 119, 83, 0.5)";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
  
      function createParticles(e) {
        for (let i = 0; i < 5; i++) {
          particles.push(
            new Particle(e.x, e.y, Math.random() * 5 + 2, Math.random() * 4 - 2, Math.random() * 4 - 2)
          );
        }
      }
  
      function createBubbles() {
        for (let i = 0; i < 15; i++) {
          bubbles.push(
            new Bubble(
              Math.random() * canvas.width,
              Math.random() * canvas.height,
              Math.random() * 10 + 5,
              Math.random() * 2 + 1
            )
          );
        }
      }
      createBubbles();
  
      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
          if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
          }
        }
        for (let bubble of bubbles) {
          bubble.update();
          bubble.draw();
        }
        requestAnimationFrame(animateParticles);
      }
  
      window.addEventListener("mousemove", createParticles);
      animateParticles();
  
      return () => window.removeEventListener("mousemove", createParticles);
    }, []);
  
  return (
    <HeroSection>
      <Canvas ref={canvasRef} />

      <ContentWrapper>
        <MainHeading
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          Votre Partenaire en {" "}
          <GradientText>
            Développement Web
          </GradientText>
        </MainHeading>

        <MessageText
          key={currentMessage}
          data-aos="fade-down"
          data-aos-delay="300"
        >
          {messages[currentMessage]}
        </MessageText>
      </ContentWrapper>
    </HeroSection>
  );
};

export default Accueil;
