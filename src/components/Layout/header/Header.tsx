import { useState } from 'react'
import { Logo } from '../logo/Logo'
import classes from './Header.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { CategorySideBar } from '../categorySideBar/CategorySideBar'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useAuth } from '../../../context/AuthContext'
import { Avatar, Button, IconButton, Typography } from '@mui/material'

export const Header = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  const { user, logout } = useAuth()

  const navigate = useNavigate()

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
      <div className={classes.RightSide}>
        {user ? (
          <>
            <Typography sx={{ lineHeight: 1 }}>
              {user.userName.charAt(0).toUpperCase() + user.userName.slice(1)}
            </Typography>
            <IconButton
              onClick={() => {
                logout()
                navigate('/')
              }}
              color='inherit'
              sx={{ p: 0 }}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {user.userName.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </>
        ) : (
          <Button
            color='inherit'
            onClick={() => navigate('/login')}
            sx={{ whiteSpace: 'nowrap' }} // Запрещаем перенос текста
          >
            Войти
          </Button>
        )}
      </div>

      <CategorySideBar isOpen={isSideBarOpen} />
    </header>
  )
}
