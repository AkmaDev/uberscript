async function displayMeals() {
  const meals = await fetchMeals()
  const list = document.getElementById("mealList")

  if (list) {

      for (let i = 0; i < meals.length; i++) {
          const li = document.createElement("li")
          li.textContent = meals[i].name + " - " + meals[i].price + "€"
          const btn = document.createElement("button")
          btn.textContent = "Commander"
          li.appendChild(btn)
          list.appendChild(li)
        }
    }
}

displayMeals()