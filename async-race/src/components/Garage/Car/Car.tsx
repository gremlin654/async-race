import '../../../styles/Car.scss'
import { ICarsProps } from '../../../type/type'
import { ReactComponent as CarImg } from '../../../assets/svg/car.svg'
import { ReactComponent as Finish } from '../../../assets/svg/finish.svg'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useCarsContext } from '../../../context/carsContext'

export default function Car({ name, id, color, dispatchWinner, allRace, setAllRace, isReset, setIsReset }: ICarsProps) {
  const { updateCar, setUpdateCar, setNewRequest } = useCarsContext()

  const [startDisabled, setStartDisabled] = useState(false)
  const [stopDisabled, setStopDisabled] = useState(true)

  const getCars = useCallback(() => {
    setUpdateCar({ name: name, color: color, id: +`${id}` })
  }, [name, id, color, updateCar])

  const deleteCar = useCallback(async () => {
    setUpdateCar({ name: '', color: '#ffffff', id: 0 })
    await axios.delete(`http://127.0.0.1:3000/garage/${id}`)
    axios.delete(`http://127.0.0.1:3000/winners/${id}`).catch(() => {
      console.log(`delete car ${id} is not winner`)
    })
    setNewRequest((prev) => !prev)
  }, [])

  const stopEngine = async () => {
    const car = document.getElementById(`${id}`) as HTMLElement
    await axios.patch(`http://127.0.0.1:3000/engine?id=${id}&status=stopped`).then(() => {
      car.style.animation = ''
      setStartDisabled(false)
      setStopDisabled(true)
    })
  }

  const startEngine = async () => {
    const car = document.getElementById(`${id}`) as HTMLElement
    await stopEngine()
    setStartDisabled(true)
    setStopDisabled(false)
    const response = await axios.patch(`http://127.0.0.1:3000/engine?id=${id}&status=started`)
    const secondTime = Math.floor(response.data.distance / response.data.velocity / 10) / 100
    car.style.animation = `move ${secondTime}s linear forwards running`
    await axios
      .patch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`)
      .then(() => {
        if (allRace) {
          dispatchWinner({ id, name, time: secondTime })
        }
      })
      .catch((err) => {
        console.log(err)
        car.style.animationPlayState = 'paused'
      })
      .finally(() => {
        setStopDisabled(false)
      })
    // setNewRequest((prev) => !prev)
  }

  useEffect(() => {
    if (allRace) {
      startEngine()
    }
  }, [allRace])

  useEffect(() => {
    if (isReset) {
      stopEngine()
      setIsReset(false)
      setAllRace(false)
    }
  }, [isReset])

  return (
    <div className='car__item'>
      <div className='item__top'>
        <button disabled={startDisabled} className='item__select-btn' onClick={getCars}>
          SELECT
        </button>
        <button disabled={startDisabled} className='item__remove-btn' onClick={deleteCar}>
          REMOVE
        </button>
        <div className='item__name'>{name}</div>
      </div>
      <div className='item__track'>
        <button disabled={startDisabled} className={`item__go ${startDisabled ? 'disabled' : ''}`} onClick={startEngine}>
          A
        </button>
        <button disabled={stopDisabled} className={`item__stop ${stopDisabled ? 'disabled' : ''}`} onClick={stopEngine}>
          B
        </button>
        <CarImg className='item__car' fill={color} width='100px' height='50px' id={`${id}`} />
        <div className='item__finish-container'>
          <Finish className='item__finish' fill='red' width='40px' height='40px' />
        </div>
      </div>
    </div>
  )
}
