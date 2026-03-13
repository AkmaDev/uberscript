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

        const btnMenu = document.createElement("button")
        btnMenu.textContent = "Ajouter au menu"
        btnMenu.addEventListener("click", function() {
          menu.push(meals[i])
          const liMenu = document.createElement("li")
          liMenu.textContent = meals[i].name
          const menuList = document.getElementById("menuList")
          if (menuList) menuList.appendChild(liMenu)
        })
        li.appendChild(btnMenu)
        }
    }
}

displayMeals()

let menu: Meal[] = []

const calculateBtn = document.getElementById("calculateMenuBtn")
if (calculateBtn) {
  calculateBtn.addEventListener("click", function() {
    let total = 0
    for (let i = 0; i < menu.length; i++) {
      total = total + menu[i].price
    }
    const ht = document.getElementById("menuTotalHT")
    const ttc = document.getElementById("menuTotalTTC")
    if (ht) ht.textContent = String(total)
    if (ttc) ttc.textContent = String(total * 1.2)
  })
}

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