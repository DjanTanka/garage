import {useState} from "react";
import {сarousel} from "../../constants";
import styles from "./styles.module.scss";

const Carousel = () => {
  const [carousel, setCarousel] = useState(сarousel);

  const handleChangeOrder = (type: string) => {
    if (type === "asc") {
      const newCarusel = carousel?.map((el) =>
        el.order == 3 ? {...el, order: 1} : {...el, order: el.order + 1}
      );
      setCarousel(newCarusel);
    }
    if (type === "desc") {
      const newCarusel = carousel?.map((el) =>
        el.order == 1 ? {...el, order: 3} : {...el, order: el.order - 1}
      );
      setCarousel(newCarusel);
    }
  };
  return (
    <div className={styles.list}>
      <div
        className={styles.changeScaleItem}
        onClick={() => handleChangeOrder("desc")}
      ></div>
      {carousel
        ?.sort((a, b) => a.order - b.order)
        .map((el) => {
          return (
            <div
              key={el.title}
              className={
                styles.item + " " + (el.order == 2 ? styles.scale : "")
              }
            >
              <div className={styles.picture}>
                <img src={el.picture} />
              </div>
              <div className={styles.description}>
                <span>{el.title}</span>
              </div>
            </div>
          );
        })}
      <div
        className={styles.changeScaleItem}
        onClick={() => handleChangeOrder("asc")}
      ></div>
    </div>
  );
};

export default Carousel;
