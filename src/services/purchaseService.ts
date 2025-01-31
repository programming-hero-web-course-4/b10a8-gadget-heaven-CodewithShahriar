const purchaseKey = 'purchasedProducts'

interface CartItem {
  id: string
  name: string
  price: number
  qty: number
  image: string
  description: string
}

export const fetchPurchasedProducts = () => {
  try {
    return JSON.parse(localStorage.getItem(purchaseKey) || '') as CartItem[]
  } catch (error) {
    localStorage.setItem(purchaseKey, JSON.stringify([]))
  }

  return JSON.parse(localStorage.getItem(purchaseKey)!) as CartItem[]
}

export const savePurchasedProducts = (
  cartProducts: Record<CartItem['id'], CartItem>
) => {
  const oldProducts = fetchPurchasedProducts()

  console.log(oldProducts)
  const products = [...oldProducts]

  for (const productId in cartProducts) {
    products.push(cartProducts[productId])
  }

  localStorage.setItem(purchaseKey, JSON.stringify(products))
}

export const fetchOrderDataForChart = () => {
  const orderedProducts = fetchPurchasedProducts()

  const productObj = orderedProducts.reduce((prev, current) => {
    const existingPriceForTheProduct = prev[current.name] || 0

    const price = parseFloat(
      (current.qty * current.price + existingPriceForTheProduct).toFixed(2)
    )

    prev[current.name] = price

    return prev
  }, {} as { [productName: string]: number })

  const products = Object.entries(productObj).map((product) => ({
    name: product[0],
    price: product[1],
  }))

  return products
}
