import { useState, useEffect } from "react";
import styled from "styled-components";
import aodblanc from "./../assets/tiptamcode.avif";
import { Home, Briefcase, Info, Layers, Mail } from "lucide-react"; // Import des icônes

// Conteneur principal de la navigation
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  z-index: 1000;
  font-weight: bold;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: ${({ isScrolled }) =>
    isScrolled ? "rgb(1, 29, 35,0.8)" : "transparent"};
  box-shadow: ${({ isScrolled }) =>
    isScrolled ? "1px 3px  2px #b96f33" : "none"};

  @media (max-width: 768px) {
    padding: 0.8rem 1.2rem;
  }
`;

// Logo
const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: white;

  img {
    height: 50px;
    border-radius: 2px;
    margin-right: 0.8rem;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    img {
      height: 70px;
    }
  }
`;

// Menu principal
const Menu = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #011d23;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0%)" : "translateX(100%)"};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
    overflow-y: auto;
    padding-top: 4rem;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }
`;

// Bouton pour menu hamburger
const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #b96f33;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1100;

  @media (max-width: 768px) {
    display: block;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    transform: scale(1.2);
  }
`;

// Style pour les liens principaux
const NavLink = styled.a`
  color: #b96f33;
  text-decoration: none;
  padding: 0.8rem 1.2rem;
  position: relative;
  font-size: 1.1rem;
  white-space: nowrap;
  transition: all 0.8s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(160, 119, 83, 0.2);
    border-radius: 3px;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 0%;
    height: 4px;
    background-color: rgba(160, 119, 83, 1);
    transition: width 1.3s ease;
  }

  &:hover::after {
    width: 90%;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    text-align: center;
    width: 100%;
    padding: 1rem;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

export default function BardeNavigationpublic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Gérer le défilement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Nav isScrolled={isScrolled}>
        <Logo onClick={() => (window.location.href = "/")}>
          <img src={aodblanc} alt="Logo du Cabinet" />
        </Logo>
        {/* Bouton pour le menu hamburger */}
        <HamburgerButton
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? "✕" : "☰"}
        </HamburgerButton>
        {/* Menu principal */}
        <Menu isOpen={isMenuOpen}>
          <NavLink href="/">
            <Home size={20} /> Accueil
          </NavLink>
          <NavLink href="/services">
            <Briefcase size={20} /> Service
          </NavLink>
          <NavLink href="/apropos">
            <Info size={20} /> À propos
          </NavLink>
          <NavLink href="/realisation">
            <Layers size={20} /> Realisations
          </NavLink>
          <NavLink href="/contact">
            <Mail size={20} /> Contact
          </NavLink>
        </Menu>
      </Nav>
      <main style={{ paddingTop: "80px" }}></main>
    </>
  );
}