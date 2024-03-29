import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import './shop.styles.scss'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Caregory from '../category/category.component'

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { setCategories } from '../../store/categories/category.action'

const Shop = () =>{
  const dispatch = useDispatch()

  useEffect(()=>{
    const getCategoriesMap = async() =>{
      const categoriesArray = await getCategoriesAndDocuments()
      
      dispatch(setCategories(categoriesArray))
    
    }
    getCategoriesMap()
    },  [])
    return(
      <Routes>
        <Route index element={<CategoriesPreview/>} />
        <Route path=':category' element={<Caregory/>} />
      </Routes>
    )
}

export default Shop