import {FC, useState} from "react";
import {useDispatch} from "react-redux";
import {ModalVerifyCodeProps} from "../../../store/interfaces";
import styles from "./styles.module.scss";


const ModalVerifyCode: FC<ModalVerifyCodeProps> = ({
  email,
  setAttention,
  setinfoAttention,
}) => {
  const dispatch = useDispatch();
  const [verifyCode, setVerifyCode] = useState("");

  const handleVerifyCode = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVerifyCode(e.target.value);
  };

  const handleSendVerifyCode = () => {
    dispatch({
      type: "ACTIVATE_USER",
      payload: {email, verifyCode, setinfoAttention, setAttention},
    });
  };

  return (
    <div className={styles.modalVerifyCode}>
      <div className={styles.text}>
        {`A verification code has come to your mail ${email}. Please enter 
          that code in the field below to complete the registration on the site`}
      </div>
      <input
        type="number"
        className={styles.buttonLight}
        onChange={(e) => handleVerifyCode(e)}
      />
      <button className={styles.buttonBlack} onClick={handleSendVerifyCode}>
        Verify
      </button>
    </div>
  );
};

export default ModalVerifyCode;
