import {useState} from "react";
import AuthorizationModal from "../src/components/AuthorizationModal/AuthorizationModal";
import RegistrationModal from "../src/components/RegistrationModal/RegistrationModal";
import styles from "./styles.module.scss";
import type {NextPage} from "next";
import Carousel from "../src/components/Сarousel/Сarousel";
import Navigation from "../src/components/Navigation/Navigation";
import BunnerAndSearch from "../src/components/BunnerAndSearch/BunnerAndSearch";
import Footer from "../src/components/Footer/Footer";

const Home: NextPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [attention, setAttention] = useState(false);
  const [infoAttention, setinfoAttention] = useState("");

  const handleOpenMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handleAuthorization = () => {
    setIsAuthModalOpen((prev) => !prev);
  };

  const handleRegistration = () => {
    setIsRegModalOpen((prev) => !prev);
  };

  const handleCloseAttention = (e: React.MouseEvent): void => {
    setinfoAttention("");
    setAttention(false);
    e.stopPropagation();
  };

  const handleAttentionClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  return (
    <>
      <Navigation
        isMenuOpen={isMenuOpen}
        handleRegistration={handleRegistration}
        handleAuthorization={handleAuthorization}
        handleOpenMenu={handleOpenMenu}
      />
      <BunnerAndSearch />
      <Carousel />
      <Footer />
      {isAuthModalOpen && (
        <AuthorizationModal
          setIsAuthModalOpen={setIsAuthModalOpen}
          setAttention={setAttention}
          setinfoAttention={setinfoAttention}
        />
      )}
      {isRegModalOpen && (
        <RegistrationModal
          setIsRegModalOpen={setIsRegModalOpen}
          setAttention={setAttention}
          setinfoAttention={setinfoAttention}
        />
      )}
      {attention && (
        <div
          className={styles.wrapper}
          onClick={(e) => handleCloseAttention(e)}
        >
          <div
            className={styles.attention}
            onClick={(e) => handleAttentionClick(e)}
          >
            {infoAttention}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
