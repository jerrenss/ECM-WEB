import React from 'react'
import { API } from '../config'

const ImageDisplay = ({ item, url }) => (
  <div>
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      style={{
        height: '300px',
        width: '225px',
        maxHeight: '100%',
        maxWidth: '100%',
      }}
    />
  </div>
)

export default ImageDisplay
