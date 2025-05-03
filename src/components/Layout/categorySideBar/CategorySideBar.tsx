import classes from './CategorySideBar.module.css'
import { NavLink } from 'react-router-dom'

export const CategorySideBar = ({ isOpen }: { isOpen: boolean }) => {
  const Categories = [{ name: 'sadasd' }, { name: 'sadasd' }]
  return (
    <div className={`${classes.SideBar} ${isOpen ? classes.Open : ''}`}>
      {Categories.map((e, i) => {
        return (
          <NavLink to={`/category/${e.name}`} key={i} className={classes.Links}>
            {e.name}
          </NavLink>
        )
      })}
    </div>
  )
}
