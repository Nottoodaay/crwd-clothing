import { Fragment } from "react"
import { useSelector } from "react-redux"

import { selectCategoriesMap } from "../../store/categories/category.selector"

import CaregoryPreview from "../../components/category-preview/caregory-preview.component"


const CategoriesPreview = () =>{
    const categoriesMap = useSelector(selectCategoriesMap)  

    return(
      <Fragment>
           { Object.keys(categoriesMap).map((title)=>{
            const products = categoriesMap[title]
            return (
                <CaregoryPreview key={title} title={title} products={products}/>
            )
           })}
      </Fragment>
        
    )
}

export default CategoriesPreview