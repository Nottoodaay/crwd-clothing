import { Routes, Route } from 'react-router-dom'

import './shop.styles.scss'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Caregory from '../category/category.component'

const Shop = () =>{
    return(
      <Routes>
        <Route index element={<CategoriesPreview/>} />
        <Route path=':category' element={<Caregory/>} />
      </Routes>
    )
}

export default Shop