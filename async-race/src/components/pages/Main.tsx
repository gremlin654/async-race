import { useCallback, useEffect, useReducer, useState } from 'react'
import { useCarsContext } from '../../context/carsContext'
import Car from '../Garage/Car/Car'
import GenerateCars from '../Garage/Parametrs/GenerateCars'
import NewCar from '../Garage/Parametrs/NewCar'
import UpdateCar from '../Garage/Parametrs/UpdateCar'
import { ICars, IWinner } from '../../type/type'
import '../../styles/Main.scss'
import axios from 'axios'

const initialWinner = { id: 0, name: '', time: 0 }

const reduserWinner = (state: IWinner, action: IWinner) => {
  if (state.id === 0 && action.id !== 0) {
    const { id, time } = action
    axios
      .get(`http://127.0.0.1:3000/winners/${id}`)
      .then(({ data }) =>
        axios.put(`http://127.0.0.1:3000/winners/${id}`, {
          wins: data.wins + 1,
          time: data.time > time ? time : data.time,
        }),
      )
      .catch(({ response }) => {
        if (response.status === 404) axios.post('http://127.0.0.1:3000/winners', { id, time, wins: 1 })
      })
    return { ...action }
  }
  if (action.id === 0) return initWinner(action)
  return state
}

const initWinner = (state: IWinner) => {
  return { ...state }
}

const LIMIT_GARAGE = 7

export default function Main() {
  const { page, setPage, cars, setCars, newRequest, carsAll, setCarsAll } = useCarsContext()

  const [winner, dispatchWinner] = useReducer(reduserWinner, initialWinner, initWinner)

  const [allRace, setAllRace] = useState(false)

  const [isReset, setIsReset] = useState(false)

  const [closeModal, setCloseModal] = useState(false)

  const getCarsOnPage = useCallback(async () => {
    const response = await axios.get(`http://127.0.0.1:3000/garage?_page=${page}&_limit=${LIMIT_GARAGE}`)
    setCars(response.data)
  }, [page, newRequest])

  const getAllCars = useCallback(async () => {
    const response = await axios.get('http://127.0.0.1:3000/garage')
    setCarsAll(response.data)
  }, [])

  useEffect(() => {
    getAllCars()
  }, [page, newRequest])

  useEffect(() => {
    if (page < 1) {
      setPage(1)
    }
    getCarsOnPage()
  }, [page, newRequest])

  useEffect(() => {
    setAllRace(false)
    dispatchWinner(initialWinner)
    setCloseModal(false)
  }, [page])

  return (
    <main className='main__container'>
      <NewCar />
      <UpdateCar />
      <div className='state-btn__container'>
        <button disabled={allRace} className={`state-btn__race btn-parametrs ${allRace ? 'disabled' : ''}`} onClick={() => setAllRace(true)}>
          RACE
        </button>
        <button
          disabled={isReset}
          className='state-btn__reset btn-parametrs '
          onClick={() => {
            dispatchWinner(initialWinner)
            setIsReset(true)
            setCloseModal(false)
          }}
        >
          RESET
        </button>
        <GenerateCars />
      </div>
      <div className='items__container'>
        <h1 className='items__title'>Garage ({carsAll.length})</h1>
        <h2 className='items__page'>Page #{page}</h2>
        {cars.map((car: ICars) => (
          <Car
            key={car.id}
            name={car.name}
            color={car.color}
            id={car.id}
            dispatchWinner={dispatchWinner}
            allRace={allRace}
            setAllRace={setAllRace}
            isReset={isReset}
            setIsReset={setIsReset}
          />
        ))}
        <div className='pagination'>
          <button disabled={page === 1} className={`page ${page === 1 ? 'disabled' : ''}`} onClick={() => setPage((prev) => prev - 1)}>
            Prev
          </button>
          <button
            disabled={Math.ceil(carsAll.length / 7) === page}
            className={`page ${Math.ceil(carsAll.length / 7) === page ? 'disabled' : ''}`}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>

        {winner.id !== 0 ? (
          <h3 className={`modal ${closeModal ? 'modal__close' : ''}`} onClick={() => setCloseModal(true)}>
            Wins car {winner.name} time {winner.time}s!
          </h3>
        ) : (
          ''
        )}
      </div>
    </main>
  )
}
