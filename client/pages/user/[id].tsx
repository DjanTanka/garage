import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Home.module.scss";
import ModalVerifyCode from "../../components/ModalVerifyCode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ModalAddCar from "../../components/ModalAddCar";
import { selectUser } from "../../store/slices/user";
import { selectCarsOfUsers } from "../../store/slices/cars";
import TableApp from "../../components/TableApp";
import { Column } from "react-table";
import { ICar } from "../../store/interfaces";
//sas
const User: NextPage = () => {
  const history = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();

  const [attantion, setAttantion] = useState(false);
  const [modalAddCar, setModalAddCar] = useState(false);
  const [infoAttention, setinfoAttention] = useState("");

  const user = useSelector(selectUser);
  const carsOfUser = useSelector(selectCarsOfUsers);
  const { isActivated, email, firstName, lastName } = user.userData;

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT_USER", payload: { history } });
  };

  const handleCloseAttantion = (e: React.MouseEvent): void => {
    setinfoAttention("");
    setAttantion(false);
    e.stopPropagation();
  };

  const handleAttantionClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  const handleAddCar = () => {
    setModalAddCar(true);
  };

  useEffect(() => {
    if (router.query.id) {
      dispatch({
        type: "GET_USER_AND_CARS_BY_ID",
        payload: { id: router.query.id },
      });
    }
  }, [router.query.id]);

  const columns: Column<ICar>[] = [
    {
      Header: "Model",
      accessor: "model", // accessor is the "key" in the data
    },
    {
      Header: "Number car",
      accessor: "registrationNumber",
    },
    {
      Header: "VehicalWeare",
      accessor: "vehicalWeare",
    },
    {
      Header: "Delete",
      accessor: "del",
    },
  ];

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div
        className={[
          styles.container,
          `${!isActivated && user.userData._id && styles.opacity}`,
        ].join(" ")}
      >
        <div className={styles.nav}>
          <img src="/logo.png" alt="logo" className={styles.mylogo} />
          <div className={styles.infoUser}>
            <div>
              {firstName}
              <br />
              {lastName}
            </div>
            <img className={styles.avatarImg} src={"/avatar.png"} />
            <button
              disabled={
                !isActivated && user.status != "loading..." ? true : false
              }
              onClick={handleLogOut}
            >
              {" "}
              Log out{" "}
            </button>
          </div>
        </div>
      </div>
      {carsOfUser.length > 0 && (
        <TableApp title="Cars" columns={columns} data={carsOfUser} />
      )}
      <button className={styles.buttonBlack} onClick={handleAddCar}>
        Add your car
      </button>
      {!isActivated && (
        <ModalVerifyCode
          email={email}
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
      {modalAddCar && (
        <ModalAddCar
          setModalAddCar={setModalAddCar}
          setAttantion={setAttantion}
          setinfoAttention={setinfoAttention}
        />
      )}
    </div>
  );
};

export default User;
