import { useState } from 'react'
import classes from './ViewToggle.module.css'
import ViewListIcon from '@mui/icons-material/ViewList'
import AppsIcon from '@mui/icons-material/Apps'

export const ViewToggle = ({
  onChange,
}: {
  onChange: (layout: string) => void
}) => {
  const [layout, setLayout] = useState('grid')

  const handleLayoutChange = (newLayout: string) => {
    setLayout(newLayout)
    onChange(newLayout)
  }

  return (
    <div className={classes.ViewButtons}>
      <button
        className={`${classes.LeftButton} ${
          layout === 'grid' ? classes.Selected : ''
        }`}
        onClick={() => handleLayoutChange('grid')}
      >
        <AppsIcon />
      </button>
      <button
        className={`${classes.RightButton} ${
          layout === 'list' ? classes.Selected : ''
        }`}
        onClick={() => handleLayoutChange('list')}
      >
        <ViewListIcon />
      </button>
    </div>
  )
}
