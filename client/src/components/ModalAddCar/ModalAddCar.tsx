import {useRouter} from "next/dist/client/router";
import {FC, useState} from "react";
import {useDispatch} from "react-redux";
import {IModalAddCar} from "../../../store/interfaces";
import {AppDispatch} from "../../../store/store";
import styles from "../AuthorizationModal/styles.module.scss";

const ModalAddCar: FC<IModalAddCar> = ({
  setModalAddCar,
  setAttention,
  setinfoAttention,
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [carDate, setCarDate] = useState<string>("");
  const [mileage, setMileage] = useState<string>("");

  const handleCloseModal = (e: React.MouseEvent): void => {
    setModalAddCar(false);
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
      case "registrationNumber":
        setRegistrationNumber(e.target.value);
        e.stopPropagation();
        break;

      case "model":
        setModel(e.currentTarget.value);
        break;

      case "carDate":
        setCarDate(e.currentTarget.value);
        break;

      case "mileage":
        setMileage(e.currentTarget.value);
        break;

      default:
        break;
    }
  };

  const handleRegister = () => {
    dispatch({
      type: "ADD_CAR",
      payload: {
        registrationNumber,
        model,
        carDate,
        mileage,
        userId: router.query.id,
        setModalAddCar,
        setAttention,
        setinfoAttention,
      },
    });
  };

  return (
    <div className={styles.conteiner} onClick={(e) => handleCloseModal(e)}>
      <div className={styles.main} onClick={(e) => handleModalClick(e)}>
        <h2>Car Info</h2>
        Put info about your car
        <form>
          <div>
            <label>
              Car Number*:
              <input
                value={registrationNumber}
                onChange={(e) => handleChangeUserData(e, "registrationNumber")}
              />
            </label>
          </div>
          <div>
            <label>
              Сar model:
              <input
                value={model}
                onChange={(e) => handleChangeUserData(e, "model")}
              />
            </label>
          </div>
          <div>
            <label>
              Сar release date:
              <input
                type="date"
                value={carDate}
                onChange={(e) => handleChangeUserData(e, "carDate")}
              />
            </label>
          </div>
          <div>
            <label>
              Сar mileage:
              <input
                value={mileage}
                onChange={(e) => handleChangeUserData(e, "mileage")}
              />
            </label>
          </div>
        </form>
        <button onClick={() => handleRegister()}>Add Car</button>
      </div>
    </div>
  );
};

export default ModalAddCar;
