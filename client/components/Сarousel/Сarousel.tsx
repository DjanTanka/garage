import { useState } from 'react'
import styles from './styles.module.scss'

const Carousel = () => {

  const arr = [
    {
      title: 'convenient parking location',
      picture: '/converoment.png',
      order: 1
    },
    {
      title: 'Experienced craftsmen are always ready to service your auto',
      picture: '/sexyCraftmen.png',
      order: 2
    },
    {
      title: '24/7 contactless car wash',
      picture: '/contactlessWashing.png',
      order: 3
    }
  ]

  const [carousel, setCarousel] = useState(arr)

  const handleChangeOrder = (type: string) => {
    if (type === 'asc') {
      const newCarusel = carousel?.map(el => el.order == 3 ? {...el, order: 1} : {...el, order: el.order + 1})
      setCarousel(newCarusel)
    }
    if (type === 'desc') {
      const newCarusel = carousel?.map(el => el.order == 1 ? {...el, order: 3} : {...el, order: el.order - 1})
      setCarousel([...newCarusel])
    }
  }
  return (
    <div className={styles.list}>
      <div className={styles.picture}>
        <div onClick={() => handleChangeOrder('desc')}></div>
        {
          carousel?.sort((a,b) => a.order-b.order).map((el) => {
            return (
            <div key={el.title} className={styles.item + ' ' + ((el.order == 2) ? styles.scale : '') }>
              <img src={el.picture}/>
            </div>) 
          })
        }
        <div onClick={() => handleChangeOrder('asc')}></div>
      </div>
      <div className={styles.description}>
      {
        carousel?.sort((a,b) => a.order-b.order).map((el) => {
          return (
          <div key={el.title} className={styles.item + ' ' + ((el.order == 2) ? styles.scale : '') }>
            <p style={{padding: '10px'}}>{el.title}</p>
          </div>)
        })
      }
      </div>
    </div>
  )
}

export default Carousel