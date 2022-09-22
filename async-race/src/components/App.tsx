import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import '../styles/App.scss'
import Header from './pages/Header'
import Main from './pages/Main'
import Winners from './pages/Winners'
import { CarsContext } from '../context/carsContext'
import { ICars, IWinners } from '../type/type'

function App() {
  const [newCar, setNewCar] = useState({ name: '', color: '#ffffff' })
  const [updateCar, setUpdateCar] = useState<ICars>({ name: '', color: '#ffffff', id: 0 })
  const [newRequest, setNewRequest] = useState(false)

  const [carsAll, setCarsAll] = useState<ICars[]>([])
  const [cars, setCars] = useState<ICars[]>([])
  const [page, setPage] = useState(1)

  const [winners, setWinners] = useState<IWinners[]>([])
  const [winnersPage, setWinnersPage] = useState(1)
  const [sortWinners, setSortWinners] = useState({ sort: 'id', order: 'ASC' })

  return (
    <CarsContext.Provider
      value={{
        cars,
        newCar,
        updateCar,
        page,
        winners,
        winnersPage,
        sortWinners,
        newRequest,
        carsAll,
        setCarsAll,
        setCars,
        setNewCar,
        setNewRequest,
        setUpdateCar,
        setPage,
        setWinners,
        setWinnersPage,
        setSortWinners,
      }}
    >
      <div className='app'>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/winners' element={<Winners />} />
        </Routes>
      </div>
    </CarsContext.Provider>
  )
}

export default App
