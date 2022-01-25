import {useState} from "react";
import AuthorizationModal from "../components/AuthorizationModal/AuthorizationModal";
import RegistrationModal from "../components/RegistrationModal/RegistrationModal";
import styles from "./styles.module.scss";
import type {NextPage} from "next";
import {useDispatch, useSelector} from "react-redux";
import {IState} from "../store/interfaces";
import IUserDto from "../store/interfaces";
import Carousel from "../components/Сarousel/Сarousel";

const Home: NextPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [attantion, setAttantion] = useState(false);
  const [infoAttention, setinfoAttention] = useState("");

  const users: IUserDto[] = useSelector((state: IState) => state.users);

  const dispatch = useDispatch();

  const getUsers = () => {
    dispatch({
      type: "GET_ALL_USERS_FOR_CHECKING",
      payload: {setAttantion, setinfoAttention},
    });
  };

  const handleAuthorization = () => {
    setIsAuthModalOpen((prev) => !prev);
  };

  const handleRegistration = () => {
    setIsRegModalOpen((prev) => !prev);
  };

  const handleCloseAttantion = (e: React.MouseEvent): void => {
    setinfoAttention("");
    setAttantion(false);
    e.stopPropagation();
  };

  const handleAttantionClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <img src="/logo.png" alt="logo" className={styles.mylogo} />
          <p>About us</p>
          <p>Parking</p>
          <p>For users</p>
          <div className={styles.buttonsSign}>
            <button className={styles.buttonLight} onClick={handleRegistration}>
              First time here? Sign up!
            </button>
            <button
              className={styles.buttonBlack}
              onClick={handleAuthorization}
            >
              Sign in
            </button>
          </div>
          <div className={styles.burger}></div>
        </nav>
      </div>
      <main className={styles.main}>
        <div className={styles.bunner}>
          <span>Comfortable service for parking your car</span>
        </div>
        <div className={styles.searchBlock}>
          <input className={styles.input} placeholder="Enter parking place..." />
          <button className={styles.buttonForSearch}>Search</button>
        </div>
      </main>
      <Carousel />
      <footer className={styles.footer}>
        Join us:
        <button onClick={getUsers}> Get user for cheking</button>
        <div></div>
        <div>
          {users.map((user: IUserDto, index: number) => {
            return <p key={`${index}-${user.firstName}`}>{user.firstName}</p>;
          })}
        </div>
      </footer>
      {isAuthModalOpen && (
        <AuthorizationModal
          setIsAuthModalOpen={setIsAuthModalOpen}
          setAttantion={setAttantion}
          setinfoAttention={setinfoAttention}
        />
      )}
      {isRegModalOpen && (
        <RegistrationModal
          setIsRegModalOpen={setIsRegModalOpen}
          setAttantion={setAttantion}
          setinfoAttention={setinfoAttention}
        />
      )}
      {attantion && (
        <div
          className={styles.wrapper}
          onClick={(e) => handleCloseAttantion(e)}
        >
          <div
            className={styles.attantion}
            onClick={(e) => handleAttantionClick(e)}
          >
            {infoAttention}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
