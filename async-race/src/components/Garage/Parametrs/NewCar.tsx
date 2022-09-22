import axios from 'axios'
import { useCallback } from 'react'
import { useCarsContext } from '../../../context/carsContext'

export default function NewCar() {
  const { newCar, setNewCar, setNewRequest } = useCarsContext()
  const { name, color } = newCar

  const createNewCar = useCallback(async () => {
    await axios.post('http://127.0.0.1:3000/garage', {
      name,
      color,
    })
    setNewCar({ name: '', color })
    setNewRequest((prev) => !prev)
  }, [newCar])

  return (
    <div className='create__container'>
      <input className='create__input' type='text' value={name} onChange={(e) => setNewCar({ name: e.target.value, color })} autoComplete='on' />
      <input className='create__color' type='color' value={color} onChange={(e) => setNewCar({ name, color: e.target.value })} />
      <button className='create__btn btn-parametrs' onClick={createNewCar}>
        CREATE
      </button>
    </div>
  )
}
