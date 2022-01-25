import { useState } from 'react'
import styles from './styles.module.scss'
import GoogleLogin from "react-google-login";
import { useRouter } from 'next/dist/client/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { AuthModalProps } from '../../store/interfaces';

const AuthorizationModal = ({setIsAuthModalOpen, setAttantion, setinfoAttention}: AuthModalProps ) => {

  const history = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const responseGoogle = (response: any) => {
    dispatch({
      type: 'LOGIN_USER', 
      payload: { 
        history, 
        email: response.profileObj.email, 
        password, 
        setAttantion, 
        setinfoAttention, 
        googleId: response.googleId
      }
    })
  };

  const handleCloseModal = (e: React.MouseEvent): void=> {
    setIsAuthModalOpen(false);
    e.stopPropagation()
  }

  const handleModalClick = (e:React.MouseEvent): void => {
    e.stopPropagation()
  }

  const handleChangeUserData = (e:React.ChangeEvent<HTMLInputElement>, type: string): void => {
    switch (type) {
      case 'email':
        setEmail(e.target.value)
        e.stopPropagation()
      break;

      case 'password':
        setPassword(e.currentTarget.value)
      break;

      default:
      break;
    }
  }

  const handleAuthorization = () => {
    dispatch({type: 'LOGIN_USER', payload: { history, email, password, setAttantion, setinfoAttention }})
  }

  return (
    <div className={styles.conteiner} onClick={(e) => handleCloseModal(e)}>
      <div className={styles.main} onClick={(e) => handleModalClick(e)}>
        <h2>Authorization</h2>
        <div>
          <div>
            <label>
              E-mail:
              <input type='email' onChange={(e) => handleChangeUserData(e, 'email')}/>
            </label>
          </div>
          <div>
            <label>
              Password:
              <input type="password" onChange={(e) => handleChangeUserData(e, 'password')}/>
            </label>
          </div>
        </div>
        <button onClick={handleAuthorization}>Enter</button>
        or
        <GoogleLogin
          className={styles.googleAuth}
          clientId="721806998845-rg8u9tllju3nrfks38p3tms41qq5vpbd.apps.googleusercontent.com"
          buttonText="Login by Google account"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    </div>
  )
}

export default AuthorizationModal