import { IWinnerCarProps } from '../../type/type'
import { ReactComponent as CarImg } from '../../assets/svg/car.svg'
import { useCarsContext } from '../../context/carsContext'
import '../../styles/Winners.scss'

export default function WinnerCar({ id, time, wins, number }: IWinnerCarProps) {
  const { carsAll } = useCarsContext()

  const currentCar = carsAll.find((car) => car.id === id)

  return (
    <tr>
      <th>{number}</th>
      <th>
        <CarImg fill={currentCar?.color} width={50} height={40} />
      </th>
      <th>{currentCar?.name}</th>
      <th>{wins}</th>
      <th>{time}</th>
    </tr>
  )
}
