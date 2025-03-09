import React, { useState } from 'react';
import styled from 'styled-components';

// Styles
const FAQContainer = styled.section`
  max-width: 1000px;
  margin: 4rem auto;
  padding: 2rem;
  //background: #f4f5f1;
  border-radius: 1px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const FAQHeader = styled.h2`
  font-size: 2.5rem;
  color: #011d23;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
`;

const FAQSearch = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;
  border: 2px solid #a07753;
  border-radius: 1px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #b96f33;
    box-shadow: 0 0 12px rgba(185, 111, 51, 0.3);
  }
`;

const FAQItem = styled.div`
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1rem;
`;

const Question = styled.button`
  width: 100%;
  text-align: left;
  padding: 1.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #011d23;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: #b96f33;
  }
`;

const Answer = styled.div`
  padding: 0 0 1.5rem 0;
  color: #4a5568;
  line-height: 1.8;
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.5s ease, padding 0.5s ease;
`;

const Icon = styled.span`
  font-size: 1.5rem;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.3s ease;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ active }) => (active ? '#b96f33' : '#a07753')};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #b96f33;
    transform: translateY(-2px);
  }
`;

// Données FAQ (20 questions)
const faqData = [
  {
    question: "Quels services propose TIPTAMCode ?",
    answer: "Nous offrons des formations en développement web, création de sites internet sur mesure, développement d'applications web, et conseils en stratégie digitale."
  },
  {
    question: "Quelles technologies utilisez-vous ?",
    answer: "Nous travaillons avec les dernières technologies : React, Node.js, JavaScript, Python, ainsi que des CMS modernes comme WordPress et Strapi."
  },
  {
    question: "Proposez-vous des formations en ligne ?",
    answer: "Oui, nous proposons des formations en ligne et en présentiel, adaptées à tous les niveaux, du débutant au développeur confirmé."
  },
  {
    question: "Combien de temps prend la création d'un site web ?",
    answer: "Le délai varie selon la complexité du projet. En moyenne, un site vitrine prend 2 à 4 semaines, tandis qu'une application web peut nécessiter 2 à 6 mois."
  },
  {
    question: "Pouvez-vous optimiser mon site existant ?",
    answer: "Absolument ! Nous proposons des services d'optimisation SEO, amélioration des performances, et refonte de sites existants."
  },
  {
    question: "Quels sont vos tarifs ?",
    answer: "Nos tarifs sont adaptés à chaque projet. Contactez-nous pour un devis personnalisé en fonction de vos besoins."
  },
  {
    question: "Proposez-vous des formations certifiantes ?",
    answer: "Oui, toutes nos formations délivrent une certification reconnue dans le secteur du développement web."
  },
  {
    question: "Quels sont les prérequis pour vos formations ?",
    answer: "Aucun prérequis n'est nécessaire pour nos formations débutants. Pour les niveaux avancés, une base en programmation est recommandée."
  },
  {
    question: "Pouvez-vous créer un site e-commerce ?",
    answer: "Oui, nous développons des sites e-commerce performants avec des solutions comme Shopify, WooCommerce ou des plateformes sur mesure."
  },
  {
    question: "Proposez-vous un support après la livraison ?",
    answer: "Oui, nous offrons un support technique pendant 6 mois après la livraison de chaque projet."
  },
  {
    question: "Quelle est votre politique de confidentialité ?",
    answer: "Nous respectons strictement le RGPD. Toutes les données de nos clients sont protégées et ne sont jamais partagées avec des tiers."
  },
  {
    question: "Pouvez-vous héberger mon site web ?",
    answer: "Oui, nous proposons des solutions d'hébergement sécurisées et optimisées pour les performances."
  },
  {
    question: "Quels sont vos délais de réponse ?",
    answer: "Nous répondons à toutes les demandes sous 24 heures ouvrées."
  },
  {
    question: "Proposez-vous des formations en entreprise ?",
    answer: "Oui, nous organisons des formations sur mesure adaptées aux besoins spécifiques de votre entreprise."
  },
  {
    question: "Quels sont vos horaires d'ouverture ?",
    answer: "Notre équipe est disponible du lundi au vendredi, de 9h à 18h."
  },
  {
    question: "Pouvez-vous intégrer des API tierces ?",
    answer: "Oui, nous avons une expertise dans l'intégration d'API comme Stripe, Google Maps, ou des services métiers spécifiques."
  },
  {
    question: "Proposez-vous des audits SEO ?",
    answer: "Oui, nous réalisons des audits complets avec des recommandations concrètes pour améliorer votre référencement."
  },
  {
    question: "Quelle est votre méthodologie de travail ?",
    answer: "Nous utilisons une approche agile, avec des sprints de 2 semaines et des livrables réguliers."
  },
  {
    question: "Pouvez-vous créer des applications mobiles ?",
    answer: "Oui, nous développons des applications mobiles hybrides avec React Native pour iOS et Android."
  },
  {
    question: "Comment puis-je suivre l'avancement de mon projet ?",
    answer: "Nous fournissons un accès à un tableau de bord en temps réel pour suivre chaque étape du projet."
  }
];

// Composant FAQ
export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedFAQs = filteredFAQs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <FAQContainer>
      <FAQHeader>Foire aux Questions</FAQHeader>
      
      <FAQSearch
        type="text"
        placeholder="Rechercher dans les questions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {paginatedFAQs.map((item, index) => (
        <FAQItem key={index}>
          <Question onClick={() => toggleFAQ(index)}>
            {item.question}
            <Icon isOpen={activeIndex === index}>▼</Icon>
          </Question>
          <Answer isOpen={activeIndex === index}>
            {item.answer}
          </Answer>
        </FAQItem>
      ))}

      <Pagination>
        {Array.from({ length: Math.ceil(filteredFAQs.length / itemsPerPage) }, (_, i) => (
          <PageButton
            key={i}
            active={currentPage === i + 1}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </PageButton>
        ))}
      </Pagination>

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        })}
      </script>
    </FAQContainer>
  );
}