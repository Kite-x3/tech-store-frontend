import classes from './CategorySideBar.module.css'
import { Categories } from '../../../helpers/Categories/Categories'
import { NavLink } from 'react-router-dom'

export const CategorySideBar = ({ isOpen }: { isOpen: boolean }) => {
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
