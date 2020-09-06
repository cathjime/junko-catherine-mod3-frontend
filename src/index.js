let recipeDropdown = false

document.addEventListener("DOMContentLoaded", function(e){
    const cuisineContainer = document.querySelector(".container")
    const ingredientsForm = document.querySelector(".form-inline")
    const ingredientsFormInput = document.querySelector(".form-control")
    
    
    cuisineContainer.addEventListener("click", function(e){
        if(e.target.className === "col"){
            let cuisineType = e.target.textContent
            //get image for cuisine to append to second page
            // get cuisine type to append to second page
            
            ingredientsForm.addEventListener("submit", function(e){
                e.preventDefault()

                let formInput = ingredientsFormInput.value
                //use form input to filter and bring up recipes by ingredient

                cuisineContainer.innerHTML = 
                `
                <div id="second-page">
                    <div class="cuisine-bar">${cuisineType}</div>
                    <button id="dairy">Dairy Free 🥛</button>
                    <button id="egg">Egg Free 🥚</button>
                    <button id="nut">Nut Free 🌰</button>
                    <button id="peanut">Peanut Free 🥜</button>
                    <button id="shellfish">Shellfish Free 🦐</button>
                    <button id="wheat">Wheat Free 🌾</button>
                    <button id="soy">Soy Free </button>
                    <button id="fish">Fish Free 🐟</button>
                </div><br>
                <div class="filtered-recipes">
                    **RECIPE TITLE**
                    <button class="like-btn">Like ❤️</button>
                    <button class="recipe-detail-btn">See Detail</button> 
                    <div class="recipe-detail" style="display: none;"> **RECIPE GOES HERE** </div>
                </div>
                `
                const recipeDetailButton = cuisineContainer.children[2].children[1]
                let recipeDetails = cuisineContainer.children[2].children[2]
                
                recipeDetailButton.addEventListener("click", function(e){
                    recipeDropdown = !recipeDropdown
                    if (recipeDropdown) {
                        recipeDetails.style.display = "block";
                        recipeDetailButton.textContent = "Less Detail"
                      } else {
                        recipeDetails.style.display = "none";
                        recipeDetailButton.textContent = "See Detail"
                      }
                })

                const likeButton = cuisineContainer.children[2].children[0]
                likeButton.addEventListener("click", function(e){
                    if(likeButton.textContent === "Like ❤️"){
                        likeButton.textContent = "1 Like ❤️"
                    } else {
                        let updatedLikes = parseInt(likeButton.textContent) + 1
                        likeButton.textContent = `${updatedLikes} Likes ❤️`
                    }
                })
            })
            
            
               
        }
    })

})