import { useState } from 'react'
import { Logo } from '../logo/Logo'
import classes from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { CategorySideBar } from '../categorySideBar/CategorySideBar'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export const Header = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  return (
    <header className={classes.Header}>
      <div className={classes.LeftSide}>
        <NavLink to='/'>
          <Logo className={classes.Logo} />
        </NavLink>
        <button
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className={classes.CategoriesButton}
        >
          <ArrowForwardIosIcon
            style={{
              transform: isSideBarOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          ></ArrowForwardIosIcon>
          Каталог
        </button>
      </div>
      <div className={classes.Navigation}>
        <NavLink className={classes.NavLink} to='/'>
          Главная
        </NavLink>
        <NavLink className={classes.NavLink} to='/'>
          Пункты выдачи
        </NavLink>
        <NavLink className={classes.NavLink} to='/'>
          Скидки
        </NavLink>
      </div>
      <Logo className={classes.Avatar} />

      <CategorySideBar isOpen={isSideBarOpen} />
    </header>
  )
}
