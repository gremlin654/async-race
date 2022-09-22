import React from 'react'

export interface ICars {
  name: string
  color: string
  id: number
}

export interface ICarsContext {
  cars: ICars[]
  setCars: React.Dispatch<React.SetStateAction<ICars[]>>

  winners: IWinners[]
  setWinners: React.Dispatch<React.SetStateAction<IWinners[]>>

  newCar: {
    name: string
    color: string
  }
  setNewCar: React.Dispatch<
    React.SetStateAction<{
      name: string
      color: string
    }>
  >
  newRequest: boolean
  setNewRequest: React.Dispatch<React.SetStateAction<boolean>>

  updateCar: ICars
  setUpdateCar: React.Dispatch<React.SetStateAction<ICars>>

  page: number
  setPage: (page: React.SetStateAction<number>) => void

  winnersPage: number
  setWinnersPage: (page: React.SetStateAction<number>) => void

  sortWinners: {
    sort: string
    order: string
  }
  setSortWinners: React.Dispatch<
    React.SetStateAction<{
      sort: string
      order: string
    }>
  >

  carsAll: ICars[]
  setCarsAll: React.Dispatch<React.SetStateAction<ICars[]>>
}

export interface IUsePaginationProps {
  contentPerPage: number
  count: number
}

export interface IUsePaginationReturn {
  page: number
  totalPages: number
  firstContentIndex: number
  lastContentIndex: number
  nextPage: () => void
  prevPage: () => void
  setPage: (page: number) => void
}

export type UsePagination = (arg0: IUsePaginationProps) => IUsePaginationReturn
export interface ICarsProps {
  name: string
  color: string
  id: number

  dispatchWinner: React.Dispatch<IWinner>

  // dispatchReset: React.Dispatch<number>

  allRace: boolean
  setAllRace: React.Dispatch<React.SetStateAction<boolean>>

  isReset: boolean
  setIsReset: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IWinners {
  id: number
  time: number
  wins: number
}

export interface IWinnerCarProps {
  number: number
  id: number
  time: number
  wins: number
}

export interface IWinner {
  id: number
  name: string
  time: number
}

export type TypeInitialState = { initialWinner: IWinner }
