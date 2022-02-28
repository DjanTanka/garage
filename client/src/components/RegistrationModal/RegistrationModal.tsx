import {useRouter} from "next/dist/client/router";
import {FC, useState} from "react";
import {useDispatch} from "react-redux";
import {RegModalProps} from "../../../store/interfaces";
import {AppDispatch} from "../../../store/store";
import styles from "../AuthorizationModal/styles.module.scss";

const RegistrationModal: FC<RegModalProps> = ({
  setIsRegModalOpen,
  setinfoAttention,
  setAttention,
}) => {
  const history = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCloseModal = (e: React.MouseEvent): void => {
    setIsRegModalOpen(false);
    e.stopPropagation();
  };

  const handleModalClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  const handleChangeUserData = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ): void => {
    switch (type) {
      case "name":
        setFirstName(e.target.value);
        e.stopPropagation();
        break;

      case "lastName":
        setLastName(e.currentTarget.value);
        break;

      case "email":
        setEmail(e.currentTarget.value);
        break;

      case "password":
        setPassword(e.currentTarget.value);
        break;

      default:
        break;
    }
  };

  const handleRegister = () => {
    dispatch({
      type: "CREATE_USER",
      payload: {
        history,
        firstName,
        lastName,
        email,
        password,
        setinfoAttention,
        setAttention,
      },
    });
  };

  return (
    <div className={styles.conteiner} onClick={(e) => handleCloseModal(e)}>
      <div className={styles.main} onClick={(e) => handleModalClick(e)}>
        <h2>Registration</h2>
        Personal Information
        <form>
          <div>
            <label>
              Name*:
              <input
                value={firstName}
                onChange={(e) => handleChangeUserData(e, "name")}
              />
            </label>
          </div>
          <div>
            <label>
              Surname:
              <input
                value={lastName}
                onChange={(e) => handleChangeUserData(e, "lastName")}
              />
            </label>
          </div>
          <div>
            <label>
              E-mail*:
              <input
                value={email}
                onChange={(e) => handleChangeUserData(e, "email")}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                value={password}
                onChange={(e) => handleChangeUserData(e, "password")}
              />
            </label>
          </div>
          <div>
            <label>
              Repeat password:
              <input />
            </label>
          </div>
        </form>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default RegistrationModal;
