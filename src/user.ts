type Meal = {
  id: number
  name: string
  calories: number
  price: number
}

type Order = {
  id: number
  meals: Meal[]
  total: number
}

class InsufficientFundsError extends Error {
  constructor(message: string) {
    super(message)
  }
}
type MealDraft = Partial<Meal>
type MealPreview = Omit<Meal, "calories">

class User {
  id: number
  name: string
  wallet: number
  orders: Order[]

  constructor(id: number, name: string, wallet: number) {
    this.id = id
    this.name = name
    this.wallet = wallet
    this.orders = []
  }

  orderMeal(meal: Meal) {
  if (this.wallet < meal.price) {
    throw new InsufficientFundsError("Fonds insuffisants, prix: " + meal.price + "€, solde: " + this.wallet + "€")
  }
  this.wallet = this.wallet - meal.price
  const order = {
    id: this.orders.length + 1,
    meals: [meal],
    total: meal.price
  }
  this.orders.push(order)
}
}


