import { menuArray } from "/data.js"

const menuList = document.getElementById("menu-list")

menuArray.map((element) => {
    const { name, ingredients, id, price, emoji } = element
    const htmlElement = document.createElement("li")
    htmlElement.className = 'element';
    htmlElement.innerHTML = 
            `            
            <div class="container">
                <span class="emoji">${emoji}</span>
            </div>
            <div class="info">
                <div class="name">
                    ${name}
                </div>
                <div class="ingredients">
                    ${ingredients}
                </div>
                <div class="price">
                    $${price}
                </div>
            </div>
            <div class="button">
                <button id=${id} class="add-to">
                    +
                </button>
            </div>
            `;
    menuList.appendChild(htmlElement)
})

const getPriceFromClickedButton = (buttonId) => {
    const selectedEl = menuArray.find(product => product.id === buttonId)
    return selectedEl.price
}

const addToButtonList = document.querySelectorAll(".add-to")
addToButtonList.forEach((button) => {
    button.addEventListener("click", getPriceFromClickedButton(button.id))
});


