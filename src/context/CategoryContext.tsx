import { ReactNode, createContext, useEffect, useState } from 'react'
import { Category } from '../interfaces/category'
import CategoryService from '../services/CategoryService'

interface CategoryContextProps {
  categories: Category[]
  getCategories: () => Promise<Category[]>
  getCategoryById: (id: number) => Promise<Category>
  createCategory: (category: Omit<Category, 'id'>) => Promise<Category>
  updateCategory: (
    id: number,
    category: Omit<Category, 'id'>
  ) => Promise<Category>
  deleteCategory: (id: number) => Promise<void>
}

export const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
)

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const data = await CategoryService.getCategories()
    setCategories(data || [])
  }

  const getCategories = async () => {
    const data = await CategoryService.getCategories()
    return data
  }

  const getCategoryById = async (id: number): Promise<Category> => {
    const data = await CategoryService.getCategoryById(id)
    return data
  }

  const createCategory = async (
    category: Omit<Category, 'id'>
  ): Promise<Category> => {
    const data = await CategoryService.createCategory(category)
    return data
  }

  const updateCategory = async (
    id: number,
    category: Omit<Category, 'id'>
  ): Promise<Category> => {
    const data = await CategoryService.updateCategory(id, category)

    const newCategories: Category[] = categories.map((c) =>
      c.categoryId === id ? data : c
    )

    setCategories(newCategories)

    return data
  }

  const deleteCategory = async (id: number): Promise<void> => {
    await CategoryService.deleteCategory(id)
    const newCategories: Category[] = categories.filter(
      (c) => c.categoryId !== id
    )
    setCategories(newCategories)
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
