import { useEffect, useState } from 'react';
import AuthorizationModal from '../components/AuthorizationModal';
import RegistrationModal from '../components/RegistrationModal';
import styles from '../styles/Home.module.scss';
import type { NextPage } from "next";
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../store/interfaces';
import IUserDto from '../store/interfaces';
import Carousel from '../components/Сarousel';
import useIsButtonPressed from '../hooks/UseIsButtonPressed';


const Home: NextPage = () => {
  const buttons = ["a", "s"];
  const [audio] = useState(typeof Audio !== "undefined" && new Audio("/sound1.mp3"));
  const isButtonPressed = useIsButtonPressed(buttons);

  useEffect(() => {
    if (isButtonPressed) {
      (audio as HTMLAudioElement).play();
    }
  }, [isButtonPressed]);
  
  const [isAuthModalOpen, setIsAuthModalOpen]  = useState(false);
  const [isRegModalOpen, setIsRegModalOpen]  = useState(false);
  const [attantion, setAttantion] = useState(false)
  const [infoAttention, setinfoAttention] = useState('')

  const users: IUserDto[] = useSelector((state: IState) => state.users)

  const dispatch = useDispatch();
  
  const getUsers = () => {
    dispatch({type: 'GET_ALL_USERS_FOR_CHECKING', payload: { setAttantion, setinfoAttention }})
  }

  const handleAuthorization = () => {
    setIsAuthModalOpen(prev => !prev)
  }

  const handleRegistration = () => {
    setIsRegModalOpen(prev => !prev)
  }

  const handleCloseAttantion = (e: React.MouseEvent): void=> {
    setinfoAttention('');
    setAttantion(false)
    e.stopPropagation()
  }

  const handleAttantionClick = (e:React.MouseEvent): void => {
    e.stopPropagation()
  }
    
  return (
    <>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <img src='/logo.png' alt='logo' className={styles.mylogo}/>
          <p>About us</p>
          <p>Parking</p> 
          <p>For users</p>
          <div>
            <button className={styles.buttonLight} onClick={handleRegistration}>First time here? Sign up!</button>
            <button className={styles.buttonBlack} onClick={handleAuthorization}>Sign in</button>
          </div>
        </nav>
      </div>
      <main className={styles.main}>
       <div className={styles.bunner}>Comfortable service for parking your car</div>
       <div>
         <input placeholder='Enter parking place...'/>
         <button className={styles.buttonBlackHalf}>Search</button>
       </div>
       
      </main>
      <Carousel/>
      <footer className={styles.footer}>
          Join us: 
          <button onClick={getUsers}> Get user for cheking</button>
          <div></div>
        <div>{users.map((user: IUserDto, index: number)=> {
          return(
            <p key={`${index}-${user.firstName}`}>{user.firstName}</p>
          )
        })}</div>
      </footer>
      {isAuthModalOpen &&
        <AuthorizationModal 
          setIsAuthModalOpen={setIsAuthModalOpen} 
          setAttantion={setAttantion} 
          setinfoAttention={setinfoAttention}
        />
      }
      {isRegModalOpen && 
        <RegistrationModal 
          setIsRegModalOpen={setIsRegModalOpen} 
          setAttantion={setAttantion} 
          setinfoAttention={setinfoAttention}
        />}
      {attantion && 
        <div className={styles.wrapper} onClick={(e) => handleCloseAttantion(e)}>
          <div className={styles.attantion} onClick={(e) => handleAttantionClick(e)}>
            {infoAttention}
          </div>
        </div>
      }
      {isButtonPressed && 
        <div className={styles.wrapper}>
          <img className={styles.joke} src="/pic1.jpeg"></img>
        </div>
      }
    </>
  )
}
 
export default Home;
