
document.addEventListener("DOMContentLoaded", function(e){

    const cuisineContainer = document.querySelector(".container")
    const ingredientsForm = document.querySelector(".form-inline")
    const ingredientsFormInput = document.querySelector(".form-control")
    const apiUrl = "http://localhost:3000/api/v1/cuisines"
    const commentsUrl = "http://localhost:3000/api/v1/comments"
    let filterKeywords = []
    let cuisineType = ""
    let ingredient = ""

    let fetchApiData = () => {
        fetch(apiUrl)
        .then(resp => resp.json())
        .then(data => console.log(data))
    }
    fetchApiData()

    cuisineContainer.addEventListener("click", function(e){
        if(e.target.className === "cuisine"){
            cuisineType = e.target.id
            let cuisineCapitalized = e.target.textContent

            ingredientsForm.addEventListener("submit", function(e){
                e.preventDefault()

                ingredient = ingredientsFormInput.value.toLowerCase()
                
                cuisineContainer.innerHTML = 
                `
                <div id="second-page">
                    <div class="cuisine-nav">
                        <div class="cuisine-bar">${cuisineCapitalized}</div>
                        <button class="filter-btn" id="dairy" data-status="off">Dairy Free 🥛</button>
                        <button class="filter-btn" id="egg"  data-status="off">Egg Free 🥚</button>
                        <button class="filter-btn" id="nut"  data-status="off">Nut Free 🥜</button>
                        <button class="filter-btn" id="shellfish"  data-status="off">Shellfish Free 🦐</button>
                        <button class="filter-btn" id="wheat"  data-status="off">Wheat Free 🌾</button>
                        <button class="filter-btn" id="soy"  data-status="off">Soy Free 🌱</button>
                    </div>
                    <div class="recipe-container"></div>
                </div><br>
                `
                document.querySelector("video").remove()
                document.body.style.background = "url(images/kitchen.jpg) no-repeat center"
                const recipeContainer = document.querySelector(".recipe-container")
            
                let fetchFilteredRecipes = () => {
                    fetch(`${apiUrl}/${cuisineType}/?ingredient=${ingredient}`)
                    .then(resp => resp.json())
                    .then(data => {
                        allRecipesArray = data 
                        renderRecipes(recipeContainer, data)})  
                }
                fetchFilteredRecipes()

                const secondPageContainer = document.querySelector("#second-page")                
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


                //********
                const recipesContainer = cuisineContainer.children[0].children[1]
                
                recipesContainer.addEventListener("submit", function(e){
                    e.preventDefault()
                    console.log(e.target.id)
                    let newComment = e.target.children[0].value
                    console.log(newComment)
                    let newCommentLi = document.createElement("li")
                    newCommentLi.textContent = newComment
                    console.log(newCommentLi)
                    let recipeId = e.target.id

                    let comments = e.target.previousElementSibling
                    console.log(comments)
                    comments.append(newCommentLi)
                })
                //
                

               
              
            })
        } else if (e.target.className === "filter-btn") {
            if (e.target.dataset.status === "off") {
                e.target.dataset.status = "on"
                filterKeywords.push(`&${e.target.id}_free=1`)
                fetchRecipes(e.target.parentElement.nextElementSibling)
            } else {
                e.target.dataset.status = "off"
                filterKeywords = filterKeywords.filter( word => word !== `&${e.target.id}_free=1`)
                fetchRecipes(e.target.parentElement.nextElementSibling)
            }
        }        
    })
    
              //render all recipes
    const renderRecipes = (container, recipesArray) => {
        document.querySelector('.recipe-container').innerHTML = ""

        recipesArray.forEach(recipe => {
            renderRecipe(container, recipe)
        })
    }
                //render single recipe
    const renderRecipe = (container, recipe) => {
        let recipeId = recipe.id
        let recipeDiv = document.createElement("div")
        recipeDiv.dataset.id = recipe.id
        recipeDiv.className = "filtered-recipes"
        recipeDiv.innerHTML = 
        `
        <br>
        ${recipe.title}
        <button class="like-btn">Like ❤️</button>
        <button class="recipe-detail-btn" data-id=${recipeId}>See Detail</button> 
        <div class="recipe-detail" id=${recipeId} style="display: none;"> ${recipe.content} </div>
        <ul class="comments" id=${recipe.id}>
        </ul>
        <form class="comment-form" id=${recipe.id}>
            <input class="comment-input" type="text" name="comment" placeholder="Add a comment..."/>
            <button class="comment-button" type="submit">Add Comment</button>
        </form>
        <br>
        `
        container.append(recipeDiv)
    }

    const fetchRecipes = container => {
        const filterKeyword = filterKeywords.join('')
        if (ingredient === "") {
            fetch(`${apiUrl}/${cuisineType}?${filterKeyword}`)
            .then(resp => resp.json())
            .then(data => renderRecipes(container, data))   
        } else {
            fetch(`${apiUrl}/${cuisineType}?ingredient=${ingredient}&${filterKeyword}`)
            .then(resp => resp.json())
            .then(data => renderRecipes(container, data))  
        }
    }
})


//add comments to database 

                // commentForm.addEventListener("submit", function(e){
                //     e.preventDefault()
                //     let newComment = document.querySelector(".comment-input").value

                //     // fetch(commentsUrl, {
                //     //     method: "POST",
                //     //     headers:{
                //     //         "Content-Type": "application.json",
                //     //         "Accepts": "application/json"
                //     //     },
                //     //     body: JSON.stringify({
                //     //         comments: newComment
                //     //     })
                //     // })
                //     // .then(resp => resp.json())
                //     // .then(recipe => renderRecipe(recipe))
                      
                // })



                   
                    
                        
              