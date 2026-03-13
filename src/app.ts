

async function displayMeals() {
  const meals = await fetchMeals()
  const list = document.getElementById("mealList")
  const user = new User(1, "Marc", 30)
  loadOrders(user)
  afficherUser(user)

  if (list) {

      for (let i = 0; i < meals.length; i++) {
          const li = document.createElement("li")
          li.textContent = meals[i].name + " - " + meals[i].price + "€"
          const btn = document.createElement("button")
          btn.textContent = "Commander"
          li.appendChild(btn)
          list.appendChild(li)

          btn.addEventListener("click", function() {
            try {
                user.orderMeal(meals[i])
                saveOrders(user)
                afficherUser(user)
                console.log("commande passée, solde: " + user.wallet + "€")
            } catch(e) {
                console.log(e)
            }
        })
        }
    }
}

displayMeals()


function saveOrders(user: User) {
  localStorage.setItem("orders", JSON.stringify(user.orders))
}

function loadOrders(user: User) {
  const data = localStorage.getItem("orders")
  if (data) {
    user.orders = JSON.parse(data)
  }
}

function afficherUser(user: User) {
  const wallet = document.getElementById("walletDisplay")
  const history = document.getElementById("orderHistory")

  if (wallet) {
    wallet.textContent = String(user.wallet)
  }

  if (history) {
    history.innerHTML = ""
    for (let i = 0; i < user.orders.length; i++) {
      const li = document.createElement("li")
      li.textContent = "Commande " + user.orders[i].id + " - " + user.orders[i].total + "€"
      history.appendChild(li)
    }
  }
}