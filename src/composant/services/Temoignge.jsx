import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled, { keyframes, css } from "styled-components";
import { FaQuoteLeft, FaQuoteRight, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Images
import abdoulayeavoc from "../../assets/abdoulayeavoc.avif";
 import paul from "../../assets/paul.avif";
import naroumb from "../../assets/naroumb.avif";
import keitaseul2 from "../../assets/keitaseul2.avif";
import moussàdjàn from "../../assets/moussàdjàn.avif";

/* ========= Animations Premium ========= */
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-8px) rotate(1deg); }
  66% { transform: translateY(4px) rotate(-1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* ========= Styles Premium ========= */
const TestimonialContainer = styled.section`
  padding: clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 3rem);
  background: 
  //  radial-gradient(ellipse at 20% 20%, rgba(160, 119, 83, 0.08) 0%, transparent 50%),
  //  radial-gradient(ellipse at 80% 80%, rgba(1, 29, 35, 0.06) 0%, transparent 50%),
    linear-gradient(135deg, #f4f5f1 0%, #e8eae6 100%);
  position: relative;
  overflow: hidden;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 15%;
    right: 10%;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(160, 119, 83, 0.1) 0%, transparent 70%);
    animation: ${float} 15s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 20%;
    left: 10%;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(1, 29, 35, 0.08) 0%, transparent 70%);
    animation: ${float} 12s ease-in-out infinite reverse;
  }
`;

const SectionTitle = styled.h2`
  position: absolute;
  top: clamp(2rem, 5vw, 3rem);
  left: 50%;
  
  transform: translateX(-50%);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  background: linear-gradient(90deg, #b35202 50%, #1a2e35 50%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin: 0;
  z-index: 2;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -22px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, #b35202, #b35202);
    border-radius: 2px;
  }
`;

const Stage = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Card = styled(motion.div)`
 // background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 2px;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset,
    0 0 30px rgba(160, 119, 83, 0.1);
  padding: clamp(2rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, black 50%, #b35202 50%);
  }

  @media (min-width: 900px) {
    grid-template-columns: 400px 1fr;
    gap: 3rem;
  }
`;

const Media = styled.div`
  position: relative;
  display: grid;
  place-items: center;
`;

const ImageContainer = styled.div`
  width: min(90vw, 380px);
  height: 380px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #e6e8e4, #f5f6f2, #e6e8e4);
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s ease-in-out infinite;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 22px;
    background: linear-gradient(135deg, #a07753, #d4a574, #a07753);
    background-size: 200% 200%;
    animation: ${gradientShift} 4s ease infinite;
    z-index: -1;
    opacity: 0.7;
  }

  @media (max-width: 480px) {
    height: 320px;
  }
`;

const AuthorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.02);
  transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  position: relative;
  z-index: 2;

  &.loaded {
    opacity: 1;
    transform: scale(1);
  }
`;

const Content = styled.div`
  text-align: left;
  position: relative;
`;

const QuoteContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const Quote = styled.blockquote`
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: #011d23;
  line-height: 1.7;
  margin: 0;
  position: relative;
  font-weight: 500;
  font-style: italic;
  padding: 0 1.5rem;
`;

const QuoteIcon = styled.div`
  position: absolute;
  color: #a07753;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  opacity: 0.2;
  z-index: 0;

  &.left {
    top: -15px;
    left: 0;
  }

  &.right {
    bottom: -15px;
    right: 0;
  }
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
`;

const StarIcon = styled(FaStar)`
  color: #ffd700;
  font-size: 1.4rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

const AuthorInfo = styled.cite`
  display: block;
  font-style: normal;
  color: #011d23;
  font-weight: 700;
  margin-top: 1.5rem;
  font-size: clamp(1.2rem, 2.5vw, 1.4rem);
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 2px;
    background: linear-gradient(90deg, #a07753, #d4a574);
  }

  span {
    display: block;
    font-weight: 400;
    color: #a07753;
    font-size: clamp(0.95rem, 2vw, 1.1rem);
    margin-top: 0.5rem;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin: 2rem 0 1rem;
  flex-wrap: wrap;
`;

const NavButton = styled(motion.button)`
  background: ${({ $tone = "primary" }) =>
    $tone === "primary" ? "rgba(160, 119, 83, 0.9)" : "rgba(185, 111, 51, 0.9)"};
  color: #f4f5f1;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 1.2rem;

  &:hover {
    background: #a07753;
    transform: scale(1.1);
    box-shadow: 0 12px 25px rgba(160, 119, 83, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  flex-wrap: wrap;
`;

const Dot = styled(motion.button)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 0;
  background: ${({ $active }) => ($active ? "#a07753" : "rgba(1, 29, 35, 0.2)")};
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #a07753, #d4a574);
    border-radius: 50%;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: scale(1.2);
    
    &::after {
      opacity: 1;
    }
  }
`;

const Thumbs = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

const Thumb = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  overflow: hidden;
  padding: 0;
  border: 2px solid ${({ $active }) => ($active ? "#a07753" : "transparent")};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background: transparent;
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(160, 119, 83, 0.2), transparent);
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    
    &::after {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const ProgressBarWrap = styled.div`
  position: relative;
  height: 4px;
  background: rgba(1, 29, 35, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin: 2rem auto 1rem;
  max-width: 800px;
  backdrop-filter: blur(5px);
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #a07753, #d4a574);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(160, 119, 83, 0.3);
`;

const AutoPlayIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: #a07753;
  font-weight: 500;
  font-size: 0.9rem;
  
  svg {
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

/* ========= Composant ========= */
const Temoignage = () => {
  const testimonials = useMemo(
    () => [
      {
        author: "Abdoulaye Keita",
        role: "Avocat associé",
        text: "Une équipe professionnelle qui a su transformer notre vision en une plateforme exceptionnelle. Le résultat a dépassé nos attentes !",
        image: abdoulayeavoc,
        rating: 5
      },
      {
        author: "Moussadjan Kaba",
        role: "Avocat associé AOD-Avocats",
        text: "Le service client est réactif et les solutions proposées sont toujours innovantes. Un partenariat fructueux .",
        image: moussàdjàn,
        rating: 5
      },
      {
        author: "Ibrahima Diallo",
        role: "Fondateur de DICKOB",
        text: "Notre chiffre d'affaires a augmenté de 150% grâce à leur expertise en SEO et développement web. Tout simplement impressionnant.",
        image: paul,
        rating: 5
      },
      {
        author: "Naroumba",
        role: "Gerante de BIBIA BUSNESS",
        text: "Des designs modernes et une approche créative. Ils ont parfaitement capté l'identité de notre marque.",
        image: naroumb,
        rating: 5
      },
      {
        author: "Fatoumata Keita",
        role: "Associé chez AOD-Avocats",
        text: "Un accompagnement sur mesure dès le cahier des charges jusqu'au déploiement final. Je recommande vivement !",
        image: keitaseul2,
        rating: 5
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [paused, setPaused] = useState(false);

  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  // Pré‑charger l'image suivante
  useEffect(() => {
    const next = (idx + 1) % testimonials.length;
    const pre = new Image();
    pre.src = testimonials[next].image;
  }, [idx, testimonials]);

  // Auto‑play avec pause au hover/drag/onglet masqué
  const AUTOPLAY_MS = 6000;

  const clearTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const startTimer = useCallback(() => {
    clearTimer();
    if (paused || isDragging) return;
    intervalRef.current = setInterval(() => {
      setDir(1);
      setIdx((p) => (p + 1) % testimonials.length);
    }, AUTOPLAY_MS);
  }, [paused, isDragging, testimonials.length]);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer]);

  // Pause si onglet masqué
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        setPaused(true);
        clearTimer();
      } else {
        setPaused(false);
        startTimer();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [startTimer]);

  // Pause au hover
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const enter = () => setPaused(true);
    const leave = () => setPaused(false);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  const goNext = useCallback(() => {
    setDir(1);
    setIdx((p) => (p + 1) % testimonials.length);
  }, [testimonials.length]);

  const goPrev = useCallback(() => {
    setDir(-1);
    setIdx((p) => (p - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Navigation clavier
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Enter" || e.key === " ") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // Variants d'animation
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      rotateY: direction > 0 ? 10 : -10,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20, 
        duration: 0.6 
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      rotateY: direction < 0 ? 10 : -10,
      transition: { duration: 0.4 },
    }),
  };

  // Rendu des étoiles
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} style={{ opacity: i < rating ? 1 : 0.3 }} />
    ));
  };

  return (
    <TestimonialContainer
      ref={containerRef}
      aria-labelledby="temoignages-title"
      role="region"
    >
      <BackgroundElements />
      <SectionTitle id="temoignages-title">Témoignages Clients</SectionTitle>

      <Stage>
        <ProgressBarWrap aria-hidden="true">
          <ProgressBar
            key={`${idx}-${paused}-${isDragging}`}
            initial={{ width: 0 }}
            animate={{ width: paused || isDragging ? 0 : "100%" }}
            transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
          />
        </ProgressBarWrap>

        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <Card
            key={idx}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            role="group"
            aria-roledescription="slide"
            aria-label={`${testimonials[idx].author} — ${testimonials[idx].role}`}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, { offset, velocity }) => {
              setIsDragging(false);
              const swipe = Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 500;
              if (swipe) (offset.x > 0 || velocity.x > 0) ? goPrev() : goNext();
            }}
          >
            <Media aria-hidden="true">
              <ImageContainer>
                <AuthorImage
                  src={testimonials[idx].image}
                  alt={testimonials[idx].author}
                  loading="lazy"
                  onLoad={() => setImgLoaded(true)}
                  className={imgLoaded ? "loaded" : ""}
                />
              </ImageContainer>
            </Media>

            <Content>
              <QuoteContainer>
                <QuoteIcon className="left">
                  <FaQuoteLeft />
                </QuoteIcon>
                <Quote aria-live="polite">
                  {testimonials[idx].text}
                </Quote>
                <QuoteIcon className="right">
                  <FaQuoteRight />
                </QuoteIcon>
              </QuoteContainer>

              <StarsContainer>
                {renderStars(testimonials[idx].rating)}
              </StarsContainer>

              <AuthorInfo>
                {testimonials[idx].author}
                <span>{testimonials[idx].role}</span>
              </AuthorInfo>

              <Controls>
                <NavButton 
                  aria-label="Témoignage précédent" 
                  onClick={goPrev}
                  $tone="alt"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaChevronLeft />
                </NavButton>
                
                <Dots>
                  {testimonials.map((_, i) => (
                    <Dot
                      key={i}
                      aria-label={`Aller au témoignage ${i + 1}`}
                      aria-pressed={i === idx}
                      $active={i === idx}
                      onClick={() => {
                        setDir(i > idx ? 1 : -1);
                        setIdx(i);
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </Dots>
                
                <NavButton 
                  aria-label="Témoignage suivant" 
                  onClick={goNext}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaChevronRight />
                </NavButton>
              </Controls>

              <Thumbs>
                {testimonials.map((t, i) => (
                  <Thumb
                    key={t.author}
                    $active={i === idx}
                    onClick={() => {
                      setDir(i > idx ? 1 : -1);
                      setIdx(i);
                    }}
                    title={`${t.author}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <img src={t.image} alt="" loading="lazy" />
                  </Thumb>
                ))}
              </Thumbs>
            </Content>
          </Card>
        </AnimatePresence>

        <AutoPlayIndicator>
          <FaChevronRight size={12} /> Défilement automatique {paused ? "(en pause)" : ""}
        </AutoPlayIndicator>
      </Stage>
    </TestimonialContainer>
  );
};

export default Temoignage;