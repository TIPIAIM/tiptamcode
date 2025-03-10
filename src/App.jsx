import { Routes, Route, BrowserRouter } from "react-router-dom";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "./composant/Acueil/Acueil";
import Services from "./composant/services/Services";
import Quisommenous from "./composant/aproposdenous/Quisommenous";
import Footerrr from "./composant/Footerrr";
import Navbarrr from "./composant/Navbarrr";
import Contacnous from "./composant/contact/Contacnous";
import Realisations from "./composant/Realisation/Realisations";
import Erreurr from "./composant/Erreur";
import StructuredData from "./Donnestructure";
import Broullons from "./Broullons";
export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  return (
    <div>
      <BrowserRouter>
        {" "}
        <Navbarrr />
        <Broullons />
        <StructuredData />
        <Routes>
          <Route index element={<Hero />} />
          <Route path="*" element={<Erreurr />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contacnous />} />
          <Route path="/apropos" element={<Quisommenous />} />
          <Route path="/realisation" element={<Realisations />} />
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}
