
document.addEventListener("DOMContentLoaded", function(e){

    const cuisineContainer = document.querySelector(".container")
    const ingredientsForm = document.querySelector(".form-inline")
    const ingredientsFormInput = document.querySelector(".form-control")
    const apiUrl = "http://localhost:3000/api/v1/cuisines"
    const commentsUrl = "http://localhost:3000/api/v1/comments"
    let recipeContent


    let filterKeywords = []


    let fetchApiData = () => {
        fetch(apiUrl)
        .then(resp => resp.json())
        .then(data => console.log(data))
    }
    fetchApiData()

    cuisineContainer.addEventListener("click", function(e){
        if(e.target.className === "cuisine"){
            let cuisineType = e.target.id
            let cuisineCapitalized = e.target.firstChild.textContent

            ingredientsForm.addEventListener("submit", function(e){
                e.preventDefault()

                let formInput = ingredientsFormInput.value.toLowerCase()
                
                cuisineContainer.innerHTML = 
                `
                <div id="second-page">
                    <div class="cuisine-bar">${cuisineCapitalized}</div>
                    <button class="filter-btn" id="dairy" data-status="off">Dairy Free 🥛</button>
                    <button class="filter-btn" id="egg"  data-status="off">Egg Free 🥚</button>
                    <button class="filter-btn" id="nut"  data-status="off">Nut Free 🥜</button>
                    <button class="filter-btn" id="shellfish"  data-status="off">Shellfish Free 🦐</button>
                    <button class="filter-btn" id="wheat"  data-status="off">Wheat Free 🌾</button>
                    <button class="filter-btn" id="soy"  data-status="off">Soy Free 🌱</button>
                </div><br>
                `
                const secondPageContainer = document.querySelector("#second-page")
            
                let fetchFilteredRecipes = () => {
                    fetch(`${apiUrl}/${cuisineType}/?ingredient=${formInput}`)
                    .then(resp => resp.json())
                    .then(data => {
                        renderRecipes(data)})  
                }
                fetchFilteredRecipes()

//                 //render single recipe
                let renderRecipe = (recipe) => {
                    let recipeId = recipe.id
                    console.log(recipe.content)
                    //console.log(recipeContent)
                    let recipeDiv = document.createElement("div")
                    recipeDiv.className = "filtered-recipes"
                    recipeDiv.innerHTML = 
                    `
                    <br>
                    ${recipe.title}
                    <button class="like-btn">Like ❤️</button>
                    <button class="recipe-detail-btn" data-id=${recipeId}>See Detail</button> 
                    <div class="recipe-detail" id=${recipeId} style="display: none;"> ${recipe.content} </div>
                    <ul class="comments">
                        <li>**USER COMMENT 1**</li>
                        <li>**USER COMMENT 2**</li>
                    </ul>
                    <form class="comment-form">
                        <input class="comment-input" type="text" name="comment" placeholder="Add a comment..."/>
                        <button class="comment-button" type="submit">Add Comment</button>
                    </form>
                    <br>
                    `
                    secondPageContainer.append(recipeDiv)
                }

//                 //render all recipes
                let renderRecipes = (recipesArray) => {
                    recipesArray.forEach(recipe => {
                        renderRecipe(recipe)
                    })
                }

//                 // const recipeDetails = document.querySelector(".recipe-detail") 
//                 // console.log(recipeDetails)
//                 // const recipeDetailButton = document.querySelector(".recipe-detail-btn")
//                 // console.log(recipeDetailButton)


//             //const commentForm = document.querySelector(".comment-form")
//             // const commentButton = document.querySelector(".comment-button")

                
                secondPageContainer.addEventListener("click", function(e){
                    if(e.target.className === "recipe-detail-btn"){
                        const recipeDetails = e.target.nextElementSibling
                                console.log("button click working")
                        if(recipeDetails.id === e.target.dataset.id && recipeDetails.style.display === "none"){
                            recipeDetails.style.display = "block"
                            e.target.textContent = "See Less"
                        } else if(recipeDetails.id === e.target.dataset.id && recipeDetails.style.display === "block"){
                            recipeDetails.style.display = "none"
                            e.target.textContent = "See Detail"
                        }
                
                    }
                })
             

               
              
            })
        } else if (e.target.className === "filter-btn") {
            // e.target.dataset.status = e.target.dataset.status === "off" ? "on" : "off"
            if (e.target.dataset.status === "off") {
                e.target.dataset.status = "on"
                filterKeywords.push(`&${e.target.id}_free=1`)
                fetchRecipes()
            } else {
                e.target.dataset.status = "off"
                filterKeywords = filterKeywords.filter( word => word !== `&${e.target.id}_free=1`)
                fetchRecipes()
            }
        }        
    })

    const fetchRecipes = () => {
        const filterKeyword = filterKeywords.join('')
        // fetch(`${apiUrl}/${cuisine}/?ingredient=${ingredient}?${filterKeyword}`)
        // // .then(resp => resp.json())
        // // .then(data => {
        // //     // allRecipesArray = data 
        // //     console.log(allRecipesArray)
        // //         renderRecipes(data)})  
    }
})

//add comments to database 

//                 // commentForm.addEventListener("submit", function(e){
//                 //     e.preventDefault()
//                 //     let newComment = document.querySelector(".comment-input").value

//                 //     // fetch(commentsUrl, {
//                 //     //     method: "POST",
//                 //     //     headers:{
//                 //     //         "Content-Type": "application.json",
//                 //     //         "Accepts": "application/json"
//                 //     //     },
//                 //     //     body: JSON.stringify({
//                 //     //         comments: newComment
//                 //     //     })
//                 //     // })
//                 //     // .then(resp => resp.json())
//                 //     // .then(recipe => renderRecipe(recipe))
//                 //       
//                 // })



                   
                    
                        
              