import { Link } from 'react-router-dom'
import '../../styles/Header.scss'

export default function Header() {
  return (
    <header className='header__container'>
      <button className='header__button'>
        <Link to='/'>TO GARAGE</Link>
      </button>
      <button className='header__button'>
        <Link to='/winners'>TO WINNERS</Link>
      </button>
    </header>
  )
}
