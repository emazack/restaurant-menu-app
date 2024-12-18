import { menuArray } from "/data.js"

const menuList = document.getElementById("menu-list")
const order = document.getElementById("order")
const modal = document.getElementById("modal")
let orderList = []
let totalPrice = 0

function getItemById(buttonId, arrayToSearch) {
    const result = arrayToSearch.find(product => product.id === Number(buttonId));
    if (!result) {
        console.error(`id not found: ${buttonId}`);
        return null;
    }
    return result;
}

const renderDataList = () => {
    menuArray.forEach(element => {
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
}

const renderOrderList = () => {
    order.innerHTML = "";
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
            <div class="price">$${totalPrice}</div>
        </div>
        <div class="button-container">
            <button id="complete-order" class="complete">Complete order</button>
        </div>
     `;
        handleModal()
        handleRemoveItem()
    } else {
        order.innerHTML = ""
    }
}

const attachAddToOrderEventListeners = () => {
    const addToButtonList = document.querySelectorAll(".add-to")
    addToButtonList.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedElement = getItemById(button.id, menuArray)

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
            renderOrderList()
        })
    });
}


const handleModal = () => {
    const completeOrderButton = document.getElementById("complete-order")
    completeOrderButton.addEventListener("click", () => {
        modal.classList.remove("not-visible")
    })
}

const handlePayment = () => {
    const paymentButton = document.getElementById("pay-button");
    paymentButton.addEventListener("click", () => {
        orderList = []
        totalPrice = 0
    })
}


const handleRemoveItem = () => {
    const removeButtons = document.querySelectorAll(".remove")
    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedElement = getItemById(button.id, orderList)
            if (selectedElement) {
                orderList = orderList.filter(item => item !== selectedElement);
                renderOrderList()
            }
        })
    })
}


renderDataList()
attachAddToOrderEventListeners()
handlePayment()
