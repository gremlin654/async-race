import axios from 'axios'
import { useCallback } from 'react'
import { useCarsContext } from '../../../context/carsContext'

export default function GenerateCars() {
  const { setNewRequest } = useCarsContext()

  const randomCarName = () => {
    const carBrands = [
      'BMW',
      'Lada',
      'Porsche',
      'Lamborghini',
      'Mazda',
      'Huandai',
      'Moskvich',
      'Audi',
      'Mersedes',
      'Acura',
      'Ford',
      'Reno',
      'Peugeot',
      'Honda',
      'Geely',
      'Volkswagen',
      'Skoda',
      'Volvo',
      'GAZ',
      'Mitsubishi',
    ]

    const carModels = [
      'Vesta',
      'Priora',
      '412',
      'A4',
      'A8',
      'Civic',
      'Accord',
      'X6',
      '520',
      '720',
      'Actavia',
      'C90',
      'Pagero',
      'Lancer',
      'X',
      'Coolray',
      'Pasat',
      'Atlas',
      'w140',
      'Solaris',
      'Diablo',
      'Logan',
      '408',
      'Panamera',
      'Cayman',
      'Gallardo',
      'Volga',
      'Mustang',
      'Rapid',
    ]
    const randomBrand = carBrands[Math.floor(Math.random() * carBrands.length)]
    const randomModel = carModels[Math.floor(Math.random() * carModels.length)]
    const randomCar = `${randomBrand} ${randomModel}`
    return randomCar
  }

  const randomColor = () => '#' + (Math.random().toString(16) + '000000').substring(2, 8)

  const getGenerateCars = useCallback(async () => {
    const generateGar = Array.from({ length: 100 }, () => ({
      name: randomCarName(),
      color: randomColor(),
    }))
    Promise.all(generateGar.map((newCar) => axios.post('http://127.0.0.1:3000/garage', newCar)))
    setNewRequest((prev) => !prev)
  }, [])
  return (
    <button className='state-btn__generate btn-parametrs' onClick={getGenerateCars}>
      GENERATE GARS
    </button>
  )
}
