import type {NextPage} from "next";
import {useRouter} from "next/dist/client/router";
import styles from "../../pages/styles.module.scss";
import ModalVerifyCode from "../../src/components/ModalVerifyCode";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ModalAddCar from "../../src/components/ModalAddCar/ModalAddCar";
import {selectUser} from "../../store/slices/user";
import {selectCarsOfUser} from "../../store/slices/cars";
import TableApp from "../../src/components/TableApp";
import Footer from "../../src/components/Footer";
import Navigation from '../../src/components/Navigation';

const User: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [attention, setAttention] = useState<boolean>(false);
  const [modalAddCar, setModalAddCar] = useState<boolean>(false);
  const [infoAttention, setinfoAttention] = useState<string>("");

  const user = useSelector(selectUser);
  const carsOfUser = useSelector(selectCarsOfUser);
  const {isActivated, email} = user.userData;

  const handleCloseAttention = (e: React.MouseEvent): void => {
    setinfoAttention("");
    setAttention(false);
    e.stopPropagation();
  };

  const handleAttentionClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  const handleAddCar = () => {
    setModalAddCar(true);
  };

  useEffect(() => {
    if (router.query.id) {
      dispatch({
        type: "GET_USER_AND_CARS_BY_ID",
        payload: {id: router.query.id, isUserActivated: user.userData.isActivated},
      });
    }
  }, [router.query.id]);

  return (
    <div
      style={{display: "flex", alignItems: "center", flexDirection: "column", height: '100vh'}}
    >
      <Navigation/>
      <TableApp title="Cars" data={carsOfUser.cars} />
      <button
        className={styles.buttonBlack} 
        onClick={handleAddCar}>
          {carsOfUser.cars.length === 0 ? 'Add your car' : "Add one more car"}
      </button>
      <Footer style={{position: 'absolute', bottom: '0px'}}/>
      {!isActivated && (
        <ModalVerifyCode
          email={email}
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
      {modalAddCar && (
        <ModalAddCar
          setModalAddCar={setModalAddCar}
          setAttention={setAttention}
          setinfoAttention={setinfoAttention}
        />
      )}
    </div>
  );
};

export default User;
