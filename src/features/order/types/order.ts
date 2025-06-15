export type OrderItem = {
  productId: string
  name: string
  price: number
  quantity: number
}

export type Order = {
  _id?: string
  createdAt?: string
  name: string
  email: string
  address: string
  phone?: string
  items: OrderItem[]
  total: number
  status: string
}
