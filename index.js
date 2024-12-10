import { menuArray } from "/data.js"

const menuList = document.getElementById("menu-list")
const order = document.getElementById("order")
const orderList = []

menuArray.map(element => {
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



const addToButtonList = document.querySelectorAll(".add-to")

function getDataFromClickedButton(buttonId) {
    const result = menuArray.find(product => product.id === Number(buttonId));
    if (!result) {
        console.error(`id not found: ${buttonId}`);
        return null;
    }
    return result;
}

addToButtonList.forEach((button) => {
    button.addEventListener("click", () => {
        selectedElement = getDataFromClickedButton(button.id)

        const exists = orderList.some(item => 
            item.id === selectedElement.id
        )
        if (exists) {
            orderList = {...orderList, 
        }
        orderList.push(selectedElement)

        if (orderList.length > 0) {

            const htmlOrderList = orderList.map(element => {
                const { name, id, price } = element
                const htmlElement = document.createElement("li")
                htmlElement.className = 'element';
                htmlElement.innerHTML =
            `            
                <div class="name">
                    ${name}
                    <span class="remove-container">
                        <button id=${id} class="remove">remove</button>
                    </span>
                </div>
                <div class="price">$${price}</div>
            `;
            })

            const totalPrice = orderList.reduce((accumulator, item) => {
                return accumulator + item.price;
            }, 0)

            order.innerHTML =
            `            
                <div class="title">
                    Your order
                </div>
                <ul class="order-list">
                    ${htmlOrderList}
                </ul>
                <div class="total">
                    <div class="title">Total price:</div>
                    <div class="price">${totalPrice}$</div>
                </div>
                <div class="button-container">
                    <button class="complete">Complete order</button>
                </div>
             `;
        } else {
            order.innerHTML = ""
        }



    })
});


