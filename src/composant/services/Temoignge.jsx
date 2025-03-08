import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

// Images de placeholder (à remplacer par vos propres images)
import abdoulayeavoc from "../../assets/abdoulayeavoc.avif";
import mbangou from "../../assets/mbangou.avif";
import paul from "../../assets/paul.avif";
import naroumb from "../../assets/naroumb.avif";
import keitaseul2 from "../../assets/keitaseul2.avif";

const TestimonialContainer = styled.section`
  padding: 1rem 1rem;
  background: #f4f5f1;
  position: relative;
  overflow: hidden;
  min-height: 500px;
`;

const Controls = styled.div`
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2.5rem;
  z-index: 2;
`;

const NavButton = styled.button`
  background: ${({ $active }) => ($active ? "#a07753" : "#b96f33")};
  color: #f4f5f1;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 2px -2px 8px rgba(1, 29, 35, 0.9);
  font-size: 1rem;

  &:hover {
    background: #a07753;
    transform: scale(1.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TestimonialContent = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem;
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0rem 0.5rem;
    text-align: left;
  }
`;

const AuthorImage = styled.img`
  width: 300px;
  height: 330px;
  border-radius: 1%;
  object-fit: cover;
  margin: 0 auto 1rem;
  border: 1px solid #b96f33;
`;

const Quote = styled.blockquote`
  font-size: 1.3rem;
  color: #011d23;
  line-height: 1.2;
  margin-bottom: 1rem;
  position: relative;
  padding: 0 2rem;

  svg {
    color: #a07753;
    font-size: 1rem;
    margin: 0 0.5rem;
  }
`;

const AuthorInfo = styled.cite`
  display: block;
  font-style: normal;
  color: #b96f33;
  font-weight: 600;
  margin-top: 1rem;

  span {
    display: block;
    font-weight: 400;
    color: #a07753;
    font-size: 0.9rem;
  }
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0rem 2rem;
    text-align: left;
  }
`;

const Temoignage = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  // Liste des témoignages
  const testimonials = [
    {
      author: "Abdoulaye keita",
      role: "Avocat associé",
      text: "Une équipe professionnelle qui a su transformer notre vision en une plateforme exceptionnelle. Le résultat a dépassé nos attentes !",
      image: abdoulayeavoc,
    },
    {
      author: "Me Bangoura",
      role: "Avocat associé AOD-Avocats",
      text: "Le service client est réactif et les solutions proposées sont toujours innovantes. Un partenariat fructueux depuis 2 ans.",
      image: mbangou,
    },
    {
      author: "Ibrahima Diallo",
      role: "Fondateur de DICKOB",
      text: "Notre chiffre d'affaires a augmenté de 150% grâce à leur expertise en SEO et développement web. Tout simplement impressionnant.",
      image: paul,
    },
    {
      author: "Naroumba",
      role: "Secretaire chez AOD-Avocats",
      text: "Des designs modernes et une approche créative. Ils ont parfaitement capté l'identité de notre marque.",
      image: naroumb,
    },
    {
      author: "Fatoumata keita",
      role: "Associé chez AOD-Avocats",
      text: "Un accompagnement sur mesure dès le cahier des charges jusqu'au déploiement final. Je recommande vivement !",
      image: keitaseul2,
    },
  ];

  // Gestion du défilement automatique
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval); // Nettoyage de l'intervalle
    }
  }, [testimonials.length, isDragging]);

  // Gestion du témoignage suivant
  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  // Gestion du témoignage précédent
  const handlePrev = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Variants pour les animations
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeInOut" },
    }),
  };

  return (
    <TestimonialContainer>
      <Controls>
        <NavButton onClick={handlePrev} aria-label="Précédent">
          ‹
        </NavButton>
        <NavButton onClick={handleNext} aria-label="Suivant">
          ›
        </NavButton>
      </Controls>

      <AnimatePresence mode="wait" initial={true} custom={direction}>
        <TestimonialContent
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, { offset, velocity }) => {
            setIsDragging(true);
            const swipe =
              Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 500;

            if (swipe) {
              offset.x > 0 || velocity.x > 0 ? handlePrev() : handleNext();
            }
          }}
        >
          <AuthorImage
            src={testimonials[current].image}
            alt={testimonials[current].author}
            loading="lazy" // Optimisation du chargement des images
          />
          <Quote>
            <FaQuoteLeft />
            {testimonials[current].text}
            <FaQuoteRight />
          </Quote>
          <AuthorInfo>
            {testimonials[current].author}
            <span>{testimonials[current].role}</span>
          </AuthorInfo>
        </TestimonialContent>
      </AnimatePresence>
      <Controls>
        <NavButton
          onClick={handlePrev}
          aria-label="Précédent"
          $active={direction === -1}
        >
          ‹
        </NavButton>
        <NavButton
          onClick={handleNext}
          aria-label="Suivant"
          $active={direction === 1}
        >
          ›
        </NavButton>
      </Controls>
    </TestimonialContainer>
  );
};

export default Temoignage;
