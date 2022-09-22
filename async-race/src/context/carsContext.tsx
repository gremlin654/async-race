/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react'
import { ICarsContext } from '../type/type'

export const CarsContext = createContext<ICarsContext>({
  cars: [],
  winners: [],
  newCar: { name: '', color: '' },
  updateCar: { name: '', color: '#ffffff', id: 0 },
  page: 1,
  winnersPage: 1,
  sortWinners: { sort: 'id', order: 'DESC' },
  newRequest: false,
  carsAll: [],
  setCarsAll: () => [],
  setCars: () => [],
  setWinners: () => [],
  setNewCar: () => {},
  setNewRequest: () => false,
  setUpdateCar: () => {},
  setPage: () => 1,
  setWinnersPage: () => 1,
  setSortWinners: () => {},
})

export const useCarsContext = () => useContext(CarsContext)
