import axios from 'axios'
import { useCallback } from 'react'
import { useCarsContext } from '../../../context/carsContext'

export default function UpdateCar() {
  const { setNewRequest, setUpdateCar, updateCar } = useCarsContext()
  const { name, color, id } = updateCar

  const updateSelectCar = useCallback(async () => {
    await axios.put(`http://127.0.0.1:3000/garage/${id}`, {
      name,
      color,
    })
    setNewRequest((prev) => !prev)
    setUpdateCar({ name: '', color: '#ffffff', id: 0 })
  }, [updateCar])

  return (
    <div className='update__container'>
      <input
        className='update__input'
        type='text'
        value={name}
        onChange={(e) => {
          setUpdateCar({ name: e.target.value, color, id })
        }}
        disabled={id === 0}
      />
      <input
        className='update__color'
        type='color'
        value={color}
        onChange={(e) => {
          setUpdateCar({ name, color: e.target.value, id })
        }}
        disabled={id === 0}
      />
      <button className='update__btn btn-parametrs' onClick={updateSelectCar} disabled={id === 0}>
        UPDATE
      </button>
    </div>
  )
}
