interface Product {
  id: string
  name: string
  description: string
  image: string
  price: number
  stock: number
  inStock?: boolean
  specifications: string[]
  rating: number
}

const productUri =
  'https://res.cloudinary.com/imashiksarkar/raw/upload/v1730999568/ph-hosting/gadget-heaven/db/products_js5wui.json'

const categoryUri =
  'https://res.cloudinary.com/imashiksarkar/raw/upload/v1730999569/ph-hosting/gadget-heaven/db/categories_nodcvr.json'

export const fetchAllProducts = async () => {
  const res = await fetch(productUri)
  return (await res.json()) as Product[]
}

export const fetchCategoriesNames = async () => {
  const res = await fetch(categoryUri)

  const categoryKeys = Object.keys(await res.json())

  const category = categoryKeys.reduce((prev, categoryKey) => {
    const splittedKey = categoryKey.split('_')

    const categoryName = splittedKey
      .map((word) => {
        return word.at(0)?.toUpperCase() + word.slice(1)
      })
      .join(' ')

    return [
      ...prev,
      {
        name: categoryName,
        value: categoryKey,
      },
    ]
  }, [] as { name: string; value: string }[])

  return category
}

export const fetchProductsByCategory = async (categoryName: string) => {
  const categories = (await (await fetch(categoryUri)).json()) as Record<
    string,
    string[]
  >

  const productIdsForTheCategory: string[] | null =
    categories[categoryName] || null

  if (productIdsForTheCategory) {
    const allProducts = await fetchAllProducts()

    const filteredProducts = allProducts.filter((product) =>
      productIdsForTheCategory.includes(product.id)
    )

    return filteredProducts
  }

  return await fetchAllProducts()
}

export const fetchProductById = async (id: string) => {
  const products = await fetchAllProducts()
  return products.find((product) => product.id === id) || null
}
