
import { Fragment, useContext } from "react"

import { CategoriesContext } from "../../contexts/categories.context"

import CaregoryPreview from "../../components/category-preview/caregory-preview.component"


const CategoriesPreview = () =>{
    const {categoriesMap} = useContext(CategoriesContext)
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