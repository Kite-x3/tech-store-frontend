import { useContext, useEffect } from 'react'
import classes from './CategorySideBar.module.css'
import { NavLink } from 'react-router-dom'
import { CategoryContext } from '../../../context/CategoryContext'

export const CategorySideBar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const context = useContext(CategoryContext)

  if (!context) return <div>No context available</div>

  useEffect(() => {}, [isOpen])

  const { categories } = context

  return (
    <div className={`${classes.SideBar} ${isOpen ? classes.Open : ''}`}>
      {categories.map((e, i) => {
        return (
          <NavLink
            to={`/category/${e.categoryId}`}
            key={i}
            className={classes.Links}
            onClick={onClose}
          >
            {e.name}
          </NavLink>
        )
      })}
    </div>
  )
}
