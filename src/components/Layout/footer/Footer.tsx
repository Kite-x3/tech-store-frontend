import classes from './Footer.module.css'

import { Logo } from '../logo/Logo'
import { NavLink } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className={classes.Name}>
        <Logo className={classes.Logo}></Logo>
        <strong>TechStore</strong>
      </div>
      <div className={classes.Links}>
        <NavLink to='/' className={classes.NavLink}>
          Главная
        </NavLink>
        <NavLink to='/' className={classes.NavLink}>
          Помощь
        </NavLink>
        <NavLink to='/' className={classes.NavLink}>
          Вакансии
        </NavLink>
      </div>
      <div className={classes.Socials}>
        <NavLink to='/' className={classes.NavLink}>
          VK
        </NavLink>
        <NavLink to='/' className={classes.NavLink}>
          TG
        </NavLink>
        <NavLink to='/' className={classes.NavLink}>
          YouTube
        </NavLink>
      </div>
    </footer>
  )
}
