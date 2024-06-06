import { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'

// Components
import CategoryItem from '../category-item/category-item-component'

// Styles
import './categories.styles.css'
import { db } from '../../config/firebase.config'
import { categoryConverter } from '../../converters/firestore-converters'

// Utilities
import Category from '../../types/category.types'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const fetchCategories = async () => {
    try {
      const categoriesFromFirestore: Category[] = []
      const querySnapshot = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter)
      )

      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data())
      })

      setCategories(categoriesFromFirestore)
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className='categories-container'>
      <div className='categories-content'>
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
