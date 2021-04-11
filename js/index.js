document.addEventListener("DOMContentLoaded", () => {
  
  let page = 1
  
  fetchMonstersByPage(page)

  const createMonsterFormDiv = document.getElementById("create-monster")
  createMonsterFormDiv.innerHTML = `
    <form id="monster-form">
      <input id="name" placeholder="name...">
      <input id="age" placeholder="age...">
      <input id="description" placeholder="description...">
      <button>Create</button>
    </form>
  `
  const monsterForm = document.getElementById("monster-form")
  monsterForm.addEventListener("submit", event => {
    event.preventDefault()
    const newMonsterData = {
      name: event.target.name.value,
      age: event.target.age.value,
      description: event.target.description.value
    }

    const configObj = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify(newMonsterData)
    }

    fetch('http://localhost:3000/monsters', configObj)
    .then(response => response.json())
    .then(createdMonster => alert(`Succesfully added ${createdMonster.name} to the list!`))
    .catch(error => {
      const errorPTag = document.createElement("p")
      errorPTag.textContent = error.message
      createMonsterFormDiv.prepend(errorPTag)
    })
    
    monsterForm.reset()
  })
  
  const forwardButton = document.getElementById("forward")
  forwardButton.addEventListener("click", () => {
    page += 1
    const monsterContainer = document.getElementById("monster-container")
    monsterContainer.innerHTML = ""
    fetchMonstersByPage(page)
  })
  
  const backButton = document.getElementById("back")
  backButton.addEventListener("click", () => {
    if (page > 1) {  
      page -= 1
      const monsterContainer = document.getElementById("monster-container")
      monsterContainer.innerHTML = ""
      fetchMonstersByPage(page)
    }  
  })
  
})  

const fetchMonstersByPage = page =>{
  fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
  .then(response => response.json())
  .then(data => {
    data.forEach(monster => renderMonster(monster))
  })
}    

const renderMonster = monsterObj => {
  const monsterContainer = document.getElementById("monster-container")
  const monsterDiv = document.createElement("div")
  monsterDiv.innerHTML = `
    <h2>${monsterObj.name}</h2>
    <h4>Age: ${monsterObj.age}</h4>
    <p>Bio: ${monsterObj.description}</p>    
  `
  monsterContainer.append(monsterDiv)
}