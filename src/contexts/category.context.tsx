import { FunctionComponent, ReactNode, createContext, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'

// Utilities
import Category from '../types/category.types'
import { db } from '../config/firebase.config'
import { categoryConverter } from '../converters/firestore-converters'

interface ICategoryContext {
  categories: Category[]
  fetchCategories: () => Promise<void>
  isLoading: boolean
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  fetchCategories: () => Promise.resolve(),
  isLoading: false
})

interface CategoryContextProviderProps {
  children: ReactNode
}

const CategoryContextProvider: FunctionComponent<
  CategoryContextProviderProps
> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const fetchCategories = async () => {
    try {
      setIsLoading(true)

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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CategoryContext.Provider
      value={{ categories, fetchCategories, isLoading }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContextProvider
