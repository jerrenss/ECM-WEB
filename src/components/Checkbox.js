import React, { useState } from 'react'

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([])

  const handleToggle = (c) => () => {
    // Return the first index or -1
    const currentCategoryId = checked.indexOf(c)
    const newCheckedCategoryId = [...checked]
    // If currently checked was not already in checked state => push
    // Else => pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c)
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }
    // console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId)
    handleFilters(newCheckedCategoryId)
  }

  return categories.map((c, i) => (
    <div key={i}>
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id === -1)}
        type="checkbox"
      />
      <label>{c.name}</label>
    </div>
  ))
}

export default Checkbox
