import { FunctionComponent } from 'react'

// Utilities
import Category from '../../types/category.types'

// Styles
import {
  CategoryContainer,
  CategoryTitle,
  ProductsContainer
} from './category-overview-styles'

// Components
import ProdcutItem from '../product-item/product-item-component'

interface CategoryOverviewProps {
  category: Category
}

const CategoryOverview: FunctionComponent<CategoryOverviewProps> = ({
  category
}) => {
  return (
    <CategoryContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>

      <ProductsContainer>
        {category.products.slice(0, 4).map((product) => (
          <ProdcutItem key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </CategoryContainer>
  )
}

export default CategoryOverview
