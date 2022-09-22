import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useCarsContext } from '../../context/carsContext'
import '../../styles/Winners.scss'
import { IWinners } from '../../type/type'
import WinnerCar from '../Winners/WinnerCar'

const LIMIT_WINNERS = 10

export default function Winners() {
  const { winners, setWinners, winnersPage, setWinnersPage, setSortWinners, sortWinners } = useCarsContext()

  const { order, sort } = sortWinners
  const [allWinners, getAllWinners] = useState([])

  const getWinnersAllCars = useCallback(async () => {
    const response = await axios.get('http://127.0.0.1:3000/winners')
    getAllWinners(response.data)
  }, [])

  useEffect(() => {
    getWinnersAllCars()
  }, [winnersPage])

  const getWinnersCars = useCallback(async () => {
    const response = await axios.get(`http://127.0.0.1:3000/winners?_page=${winnersPage}&_limit=${LIMIT_WINNERS}&_sort=${sort}&_order=${order}`)
    setWinners(response.data)
  }, [winnersPage, order, sort])

  useEffect(() => {
    if (winnersPage < 1) {
      setWinnersPage(1)
    }
    getWinnersCars()
  }, [winnersPage, sort, order])

  return (
    <>
      <h1 className='winners__title'>Winners ({allWinners.length})</h1>
      <h2 className='winners__pages'>Page #{winnersPage}</h2>

      <table className='winners__table' cellPadding={0} cellSpacing={0} border={0}>
        <thead>
          <tr>
            <th onClick={() => setSortWinners({ ...sortWinners, sort: 'id', order: sortWinners.order === 'ASC' ? 'DESC' : 'ASC' })}>Number</th>
            <th>Car</th>
            <th>Name</th>
            <th onClick={() => setSortWinners({ ...sortWinners, sort: 'wins', order: sortWinners.order === 'ASC' ? 'DESC' : 'ASC' })}>
              Wins (times)
            </th>
            <th onClick={() => setSortWinners({ ...sortWinners, sort: 'time', order: sortWinners.order === 'ASC' ? 'DESC' : 'ASC' })}>
              Best time (seconds)
            </th>
          </tr>
        </thead>
        <tbody>
          {winners.map((winnerCar: IWinners, index) => (
            <WinnerCar number={index + 1} key={winnerCar.id} id={winnerCar.id} time={winnerCar.time} wins={winnerCar.wins} />
          ))}
        </tbody>
      </table>
      <div className='winners__pagination'>
        <button
          disabled={winnersPage === 1}
          className={`page ${winnersPage === 1 ? 'disabled' : ''}`}
          onClick={() => setWinnersPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <button
          disabled={Math.ceil(allWinners.length / 10) === winnersPage}
          className={`page ${Math.ceil(allWinners.length / 10) === winnersPage ? 'disabled' : ''}`}
          onClick={() => setWinnersPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </>
  )
}
