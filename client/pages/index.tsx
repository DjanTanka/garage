import {useState} from "react";
import AuthorizationModal from "../src/components/AuthorizationModal";
import RegistrationModal from "../src/components/RegistrationModal";
import styles from "./styles.module.scss";
import type {NextPage} from "next";
import Carousel from "../src/components/Сarousel";
import Navigation from "../src/components/Navigation";
import BunnerAndSearch from "../src/components/BunnerAndSearch";
import Footer from "../src/components/Footer";

const Home: NextPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [attention, setAttention] = useState<boolean>(false);
  const [infoAttention, setinfoAttention] = useState<string>("");

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
