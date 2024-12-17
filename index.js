import { menuArray } from "/data.js"

const menuList = document.getElementById("menu-list")
const order = document.getElementById("order")
let orderList = []
let totalPrice = 0

const handleMainList = () => {
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
        handleOrderList()
    })
}




function getDataFromClickedButton(buttonId) {
    const result = menuArray.find(product => product.id === Number(buttonId));
    if (!result) {
        console.error(`id not found: ${buttonId}`);
        return null;
    }
    return result;
}

const handleOrderList = () => {
    const addToButtonList = document.querySelectorAll(".add-to")

    addToButtonList.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedElement = getDataFromClickedButton(button.id)

            const exists = orderList.some(item =>
                item.id === selectedElement.id
            )
            if (exists) {
                orderList = orderList.map(item => {
                    if (item.id === selectedElement.id) {
                        return item = { ...item, price: item.price * 2 }
                    }
                    return item;
                });
            } else {
                orderList = [...orderList, selectedElement];
            }

            if (orderList.length > 0) {
                let htmlElement
                const htmlOrderList = orderList.map(element => {
                    const { name, id, price } = element

                    htmlElement =
                        `
                <li class="element">            
                    <div class="name">
                        ${name}
                        <span class="remove-container">
                            <button id=${id} class="remove">remove</button>
                        </span>
                    </div>
                    <div class="price">$${price}</div>
                </li>
                `;
                    return htmlElement
                })

                totalPrice = orderList.reduce((accumulator, item) => {
                    return accumulator + item.price;
                }, 0)

                order.innerHTML =
                    `            
                <div class="title">
                    Your order
                </div>
                <ul class="order-list">
                    ${htmlOrderList.join("")}
                </ul>
                <div class="total">
                    <div class="title">Total price:</div>
                    <div class="price">${totalPrice}$</div>
                </div>
                <div class="button-container">
                    <button id="complete-order" class="complete">Complete order</button>
                </div>
             `;
                handleModal()
            } else {
                order.innerHTML = ""
            }
        })
    });
}


const handleModal = () => {
    const modal = document.getElementById("modal")
    const completeOrderButton = document.getElementById("complete-order")
    completeOrderButton.addEventListener("click", () => {
        modal.classList.remove("not-visible")
    })
    handlePayment()
}

const handlePayment = () => {
    const paymentButton = document.getElementById("pay-button");
    paymentButton.addEventListener("click", () => {
        orderList = []
        totalPrice = 0
    })
}


handleMainList();
