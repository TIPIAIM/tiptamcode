import { motion } from "framer-motion";
import styled from "styled-components";
import {
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaArrowUp,
} from "react-icons/fa";

// Variantes d'animation
const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 },
  },
};

// Styles
const FooterContainer = styled.footer`
  background: linear-gradient(to bottom, #011d23, #0a272f);
  border-top: 1px solid rgba(113, 128, 150, 0.5);
  width: 100%;
`;

const InnerContainer = styled(motion.div)`
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 3rem;

  @media (min-width: 640px) {
    padding: 3rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem 4rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem;
  }
`;

const SectionTitle = styled(motion.h3)`
  color: #a07753;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ContactSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #ffe8d4;

  svg {
    flex-shrink: 0;
    color: #a07753;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #b3e0ff;
    }
  }
`;

const SocialSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  padding: 0.75rem;
  border-radius: 0.5rem;
  position: relative;
  display: flex;
  align-items: center;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: #ffe8d4;
    transition: color 0.3s ease;
  }

  &:hover {
    background-color: rgba(160, 119, 83, 0.1);
  }
`;

const Tooltip = styled.span`
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #1a365d;
  color: #90cdf4;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${SocialLink}:hover & {
    opacity: 1;
  }
`;

const LegalSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LegalLink = styled(motion.a)`
  color: #ffe8d4;
  text-decoration: none;
  width: fit-content;
  transition: color 0.3s ease;

  &:hover {
    color: #b3e0ff;
  }
`;

const CopyrightSection = styled(motion.div)`
  border-top: 1px solid rgba(113, 128, 150, 0.1);
  margin-top: 3rem;
  color: #a07753;
  padding-top: 2rem;
  text-align: center;
`;

const BackToTop = styled(motion.button)`
  background: none;
  border: none;
  color: #a07753;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem auto 0;
  cursor: pointer;
  transition: color 0.3s ease;

  span {
    color: #ffe0c5;
    font-size: 0.875rem;
  }

  &:hover {
    color: #d17525;
  }
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <FooterContainer>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9951347176780036"
        crossorigin="anonymous"
      ></script>
      <InnerContainer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={footerVariants}
      >
        <GridContainer>
          {/* Section Coordonnées */}
          <ContactSection
            variants={itemVariants}
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            <SectionTitle whileHover={{ scale: 1.05 }}>TIPTAMCode</SectionTitle>

            <ContactItem>
              <FaMapMarkerAlt />
              <span itemProp="streetAddress">Guinée conakry sonfonya</span>
            </ContactItem>

            <ContactItem>
              <span style={{ visibility: "hidden" }}>
                <FaMapMarkerAlt />
              </span>
              <span>
                <span itemProp="postalCode">T7</span>{" "}
                <span itemProp="addressLocality">Conakry</span>
              </span>
            </ContactItem>

            <ContactItem as={motion.div} whileHover={{ x: 5 }}>
              <FaPhone />
              <a href="tel:+624138395" itemProp="telephone">
                +624 138 395 /+224 629 066 988
              </a>
            </ContactItem>

            <ContactItem as={motion.div} whileHover={{ x: 5 }}>
              <FaEnvelope />
              <a href="mailto:alpha.diallo@tiptamcode.com" itemProp="email">
                Technique.info@tiptamcode.com
              </a>
            </ContactItem>
          </ContactSection>

          {/* Section Réseaux sociaux */}
          <SocialSection variants={itemVariants}>
            <SectionTitle whileHover={{ scale: 1.05 }}>
              Nous suivre
            </SectionTitle>

            <SocialLinks>
              {[
                {
                  icon: FaLinkedin,
                  url: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  icon: FaGithub,
                  url: "https://github.com",
                  label: "GitHub",
                },
              ].map((social, index) => (
                <SocialLink
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon />
                  <Tooltip>{social.label}</Tooltip>
                </SocialLink>
              ))}
            </SocialLinks>
          </SocialSection>

          {/* Section Légal */}
          <LegalSection variants={itemVariants}>
            <SectionTitle whileHover={{ scale: 1.05 }}>Légal</SectionTitle>

            {[
              { path: "mentions-legales", label: "Mentions légales" },
              { path: "confidentialite", label: "Confidentialité" },
              { path: "cgu", label: "Conditions d'utilisation" },
            ].map((link, index) => (
              <LegalLink
                key={index}
                href={`/${link.path}`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </LegalLink>
            ))}
          </LegalSection>
        </GridContainer>

        {/* Copyright et retour en haut */}
        <CopyrightSection variants={itemVariants}>
          <motion.p whileHover={{ scale: 1.05 }}>
            © {new Date().getFullYear()} TIPTAMCode - Tous droits réservés
          </motion.p>

          <BackToTop
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
            <span>Haut de page</span>
          </BackToTop>
        </CopyrightSection>
      </InnerContainer>
    </FooterContainer>
  );
};

export default Footer;
