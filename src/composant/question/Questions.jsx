import React, { useEffect, useMemo, useState, useCallback, useId } from "react";
import styled, { keyframes } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

/* =========================
   UI — Styles & animations
========================= */
const fadeIn = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
};
const accordion = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: "auto", opacity: 1, transition: { duration: 0.28 } },
};
const pulse = keyframes`
  0%,100% { box-shadow: 0 0 0 0 rgba(185,111,51,.26) }
  50%     { box-shadow: 0 0 0 8px rgba(185,111,51,.06) }
`;

const FAQContainer = styled.section`
  max-width: 1100px;
  margin: 4rem auto;
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 12px 34px rgba(0,0,0,.08);
`;

const HeaderWrap = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;
const Title = styled.h2`
  font-size: clamp(1.8rem, 3.6vw, 2.6rem);
  color: #011d23;
  font-weight: 800;
  margin: 0 0 .5rem 0;
`;
const Subtitle = styled.p`
  color: #4a5568;
  margin: 0;
`;

const Toolbar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: .8rem;
  margin: 1.25rem 0 1.5rem;
  @media (min-width: 760px) { grid-template-columns: 3fr 2fr; }
`;
const Search = styled.input`
  padding: .9rem 1rem;
  border: 2px solid #a07753;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color .2s ease, box-shadow .2s ease;
  &:focus { outline: none; border-color: #b96f33; box-shadow: 0 0 0 4px rgba(185,111,51,.12); }
`;
const Categories = styled.div`
  display: flex; gap: .5rem; flex-wrap: wrap; align-items: center;
`;
const Tag = styled.button`
  appearance: none; border: 1px solid rgba(169,111,51,.35);
  background: ${({ $active }) => ($active ? "linear-gradient(90deg,#b96f33,#a07753)" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#011d23")};
  border-radius: 999px; padding: .5rem .9rem; font-weight: 700; cursor: pointer;
  transition: transform .15s ease, background .2s ease, color .2s ease, border-color .2s ease;
  &:hover { transform: translateY(-1px); border-color: #b96f33; }
`;

const List = styled.div`
  border-top: 1px solid #ececec;
`;

const Row = styled.div`
  border-bottom: 1px solid #ececec;
`;

const QuestionBtn = styled.button`
  appearance: none; border: none; background: transparent; width: 100%; text-align: left;
  padding: 1.1rem .25rem; cursor: pointer; display: grid; grid-template-columns: 1fr auto; gap: 1rem; align-items: center;
  color: #011d23; font-weight: 700; font-size: 1.05rem;
  &:focus-visible { outline: 2px solid #a07753; outline-offset: 2px; }
  &:hover { color: #b96f33; }
`;

const Chevron = styled.span`
  display: inline-block; transition: transform .2s ease; will-change: transform;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0)")};
`;

const AnswerWrap = styled(motion.div)`
  overflow: hidden;
`;
const AnswerInner = styled.div`
  padding: 0 0 1.1rem 0;
  color: #4a5568; line-height: 1.8;
  p { margin: .6rem 0; }
  ul { margin: .5rem 0 .5rem 1.1rem; }
  mark { background: linear-gradient(90deg,#fff4e8,#ffe9d2); padding: 0 .15rem; border-radius: 4px; }
`;

const FooterBar = styled.div`
  display: flex; gap: .6rem; justify-content: space-between; align-items: center; margin-top: 1rem; flex-wrap: wrap;
`;

const Pagination = styled.div`
  display: flex; gap: .4rem; align-items: center;
`;
const PageBtn = styled.button`
  appearance: none; border: none; border-radius: 8px; padding: .55rem .9rem; cursor: pointer;
  background: ${({ $active }) => ($active ? "#b96f33" : "#f2eee9")};
  color: ${({ $active }) => ($active ? "#fff" : "#5c5146")};
  font-weight: 700; transition: transform .15s ease, background .2s ease;
  &:hover { transform: translateY(-1px); }
`;

const Callout = styled.div`
  background: #fffdf9; border: 1px dashed rgba(169,111,51,.45); border-radius: 12px; padding: .9rem 1rem; color: #5c5146;
  animation: ${pulse} 3s ease-in-out infinite;
`;

/* =========================
   Données enrichies (FAQ)
========================= */

const RAW_FAQ = [
  /* ——— Services Web / Dév ——— */
  {
    category: "Services Web",
    question: "Quels services propose TIPTAMCode ?",
    answer: "Formation, création de sites et d’applications web sur mesure, intégration d’API (Stripe, Maps, etc.), conseil en performance/SEO et maintenance."
  },
  {
    category: "Services Web",
    question: "Quelles technologies utilisez-vous ?",
    answer: "React/Next.js, Vite, Node.js/Express, MongoDB, Tailwind/Styled-components. Nous travaillons aussi avec des CMS (WordPress, Strapi) selon les besoins."
  },
  {
    category: "Services Web",
    question: "Combien de temps prend la création d’un site ?",
    answer: "Un site vitrine: 2–4 semaines. Une application métier: 2–6 mois selon le périmètre, les intégrations et la complexité UX/UI."
  },
  {
    category: "Services Web",
    question: "Quels sont vos tarifs ?",
    answer: "Nous établissons un devis sur mesure après un bref cadrage (objectifs, fonctionnalités, délais). Des forfaits d’entrée existent pour démarrer rapidement."
  },
  {
    category: "Services Web",
    question: "Assurez-vous la maintenance et le support ?",
    answer: "Oui. Nous proposons des contrats de maintenance (correctifs, mises à jour de sécurité, évolutions mineures, surveillance et sauvegardes)."
  },
  {
    category: "Services Web",
    question: "Proposez-vous des audits SEO et performance ?",
    answer: "Oui. Audit technique (Core Web Vitals, accessibilité, sémantique, maillage), recommandations concrètes et plan d’actions priorisé."
  },
  {
    category: "Services Web",
    question: "Intégrez-vous des paiements et des services tiers ?",
    answer: "Oui, Stripe, PayPal, emailing, analytics, authentification, stockage cloud, etc. Nous respectons les bonnes pratiques de sécurité."
  },

  /* ——— Formations ——— */
  {
    category: "Formations",
    question: "Proposez-vous des formations en ligne et en présentiel ?",
    answer: "Oui. Sessions en visioconférence et en salle, avec ateliers pratiques, projets réels et accompagnement personnalisé."
  },
  {
    category: "Formations",
    question: "Les formations sont-elles certifiantes ?",
    answer: "Oui, nous délivrons une attestation/certification reconnue par notre réseau de partenaires et valorisable auprès des employeurs."
  },
  {
    category: "Formations",
    question: "Y a-t-il des prérequis ?",
    answer: "Débutants acceptés pour les parcours d’initiation. Pour les modules avancés, une base en programmation est recommandée."
  },

  /* ——— Mobilité ÉTUDES (Maroc) ——— */
  {
    category: "Études au Maroc",
    question: "Accompagnez-vous les étudiants qui souhaitent partir étudier au Maroc ?",
    answer: "Oui, nous accompagnons de bout en bout : choix d’établissement, préparation des dossiers, conseils de visa, logement et arrivée sur place."
  },
  {
    category: "Études au Maroc",
    question: "Garantissez-vous l’admission à 100 % dans une école au Maroc ?",
    answer: "Aucune admission n’est garantie à 100 %. Nous maximisons vos chances avec un dossier solide et un réseau de partenaires, mais la décision finale appartient aux établissements et autorités."
  },
  {
    category: "Études au Maroc",
    question: "De quels documents ai-je besoin pour candidater ?",
    answer: "Relevés/diplômes, pièce d’identité/passeport, photos, CV, lettres de motivation/recommandation, et formulaires propres à chaque établissement."
  },
  {
    category: "Études au Maroc",
    question: "Puis-je vous rencontrer pour obtenir plus d’informations ?",
    answer: "Oui. Passez à l’agence (adresse sur notre page Contact) ou écrivez-nous. Nous donnons la liste des documents et un calendrier d’admission détaillé."
  },

  /* ——— Mobilité TRAVAIL/SAISONNIER ——— */
  {
    category: "Travail & Saisonnier",
    question: "Aidez-vous aussi pour partir travailler à l’étranger (saisonnier ou contrat) ?",
    answer: "Oui. Nous orientons vers des offres légales via nos partenaires, aidons à constituer le dossier et préparons aux entretiens (CV, lettre, simulation)."
  },
  {
    category: "Travail & Saisonnier",
    question: "Quels pays et secteurs sont possibles ?",
    answer: "Selon les saisons et partenariats: BTP, agriculture, hôtellerie-restauration, logistique, services. Nous communiquons les destinations disponibles à l’agence."
  },
  {
    category: "Travail & Saisonnier",
    question: "Êtes-vous partenaires avec des agences de voyage ?",
    answer: "Oui, nous travaillons avec des agences de voyage partenaires pour faciliter les démarches (billets, assurance, bagages et conseils pratiques)."
  },

  /* ——— Process & Paiement ——— */
  {
    category: "Process & Paiement",
    question: "Quelle est votre méthodologie de travail ?",
    answer: "Approche agile (sprints courts), points réguliers, livrables incrémentaux, et un espace de suivi partagé (tableau de bord)."
  },
  {
    category: "Process & Paiement",
    question: "Comment suivre l’avancement de mon projet ?",
    answer: "Accès à un tableau de bord (tickets, priorités, jalons, releases). Nous faisons des démos fréquentes et des récap hebdomadaires."
  },
  {
    category: "Process & Paiement",
    question: "Quels moyens de paiement acceptez-vous ?",
    answer: "Virement, carte bancaire, et modalités échelonnées selon devis. Facturation claire et contrat avant démarrage."
  },

  /* ——— Support ——— */
  {
    category: "Support",
    question: "Quels sont vos délais de réponse ?",
    answer: "Nous répondons sous 24 h ouvrées. Un canal prioritaire est prévu pour les clients en maintenance."
  },
  {
    category: "Support",
    question: "Proposez-vous un support après la livraison ?",
    answer: "Oui, 6 mois de support standard inclus sur nos projets web; extensible via contrat de maintenance."
  },
];

/* =========================
   Helpers (perf & UX)
========================= */
// normalisation simple pour la recherche
const norm = (s) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

// surlignage des occurrences
const highlight = (text, term) => {
  if (!term) return text;
  const t = norm(term);
  const parts = text.split(new RegExp(`(${term})`, "gi"));
  return parts.map((p, i) =>
    norm(p) === t ? <mark key={i}>{p}</mark> : <React.Fragment key={i}>{p}</React.Fragment>
  );
};

// composant ligne (mémo) pour limiter les re-renders
const FAQRow = React.memo(function FAQRow({
  item, index, isOpen, onToggle, qId, aId, searchTerm
}) {
  return (
    <Row>
      <QuestionBtn
        aria-expanded={isOpen}
        aria-controls={aId}
        id={qId}
        onClick={() => onToggle(index)}
      >
        <span>{highlight(item.question, searchTerm)}</span>
        <Chevron $open={isOpen}>▼</Chevron>
      </QuestionBtn>

      <AnimatePresence initial={false}>
        {isOpen && (
          <AnswerWrap
            key="content"
            role="region"
            aria-labelledby={qId}
            id={aId}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={accordion}
          >
            <AnswerInner>
              <p>{highlight(item.answer, searchTerm)}</p>
            </AnswerInner>
          </AnswerWrap>
        )}
      </AnimatePresence>
    </Row>
  );
});

/* =========================
   Composant principal FAQ
========================= */
export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [page, setPage] = useState(1);
  const perPage = 6;

  // catégories dynamiques
  const categories = useMemo(
    () => ["Tous", ...Array.from(new Set(RAW_FAQ.map((f) => f.category)))],
    []
  );

  // filtrage & recherche (mémo)
  const filtered = useMemo(() => {
    const byCat = category === "Tous" ? RAW_FAQ : RAW_FAQ.filter(f => f.category === category);
    if (!search.trim()) return byCat;
    const t = norm(search);
    return byCat.filter(f =>
      norm(f.question).includes(t) || norm(f.answer).includes(t)
    );
  }, [category, search]);

  // pagination (mémo)
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = useMemo(
    () => filtered.slice((page - 1) * perPage, page * perPage),
    [filtered, page]
  );

  // reset page quand filtres changent
  useEffect(() => { setPage(1); setActiveIndex(null); }, [category, search]);

  // toggle
  const toggle = useCallback((i) => {
    setActiveIndex((prev) => (prev === i ? null : i));
  }, []);

  // ids accessibles
  const baseId = useId();

  /* ======== JSON-LD SEO (FAQPage) ======== */
  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": RAW_FAQ.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }), []);

  return (
    <FAQContainer aria-label="Foire aux questions TIPTAMCode">
      <HeaderWrap>
        <Title>Foire aux Questions</Title>
        <Subtitle>
          Trouvez rapidement des réponses sur nos services web, nos formations,
          la mobilité (études au Maroc, travail/saisonnier) et notre support.
        </Subtitle>
      </HeaderWrap>

      <Toolbar>
        <Search
          type="search"
          inputMode="search"
          placeholder="Rechercher une question…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Rechercher dans la FAQ"
        />
        <Categories role="tablist" aria-label="Catégories de la FAQ">
          {categories.map((c) => (
            <Tag
              key={c}
              $active={c === category}
              onClick={() => setCategory(c)}
              role="tab"
              aria-selected={c === category}
            >
              {c}
            </Tag>
          ))}
        </Categories>
      </Toolbar>

      <List role="list">
        <AnimatePresence initial={false}>
          {pageItems.length === 0 ? (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              style={{ padding: "1rem 0", color: "#5c5146" }}
              role="status"
            >
              Aucune question ne correspond à votre recherche.
            </motion.div>
          ) : (
            pageItems.map((item, idx) => {
              const globalIndex = (page - 1) * perPage + idx; // pour garder des index uniques
              const qId = `${baseId}-q-${globalIndex}`;
              const aId = `${baseId}-a-${globalIndex}`;
              return (
                <motion.div
                  key={qId}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -6, transition: { duration: .18 } }}
                >
                  <FAQRow
                    item={item}
                    index={globalIndex}
                    isOpen={activeIndex === globalIndex}
                    onToggle={toggle}
                    qId={qId}
                    aId={aId}
                    searchTerm={search}
                  />
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </List>

      <FooterBar>
        <Callout>
          Besoin d’un conseil rapide ? Passez à l’agence (voir <a href="/contact">Contact</a>)
          ou écrivez-nous — nous répondons sous 24 h ouvrées.
        </Callout>

        <Pagination aria-label="Pagination">
          <PageBtn onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            ←
          </PageBtn>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageBtn key={i} $active={page === i + 1} onClick={() => setPage(i + 1)}>
              {i + 1}
            </PageBtn>
          ))}
          <PageBtn onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            →
          </PageBtn>
        </Pagination>
      </FooterBar>

      {/* JSON-LD SEO */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </FAQContainer>
  );
}
