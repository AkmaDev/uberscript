const API_URL = "https://keligmartin.github.io/api/meals.json"

async function fetchMeals() {
  try {
    const res = await fetch(API_URL)
    const data = await res.json()
    console.log("meals:", data)
    return data
  } catch(e) {
    console.log("Erreur lors du chargement des repas")
    return []
  }
}