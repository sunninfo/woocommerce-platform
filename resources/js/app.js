const { update } = require("../../app/models/menu")

import axios from 'axios'
import noty from 'noty'

let addToCart = document.querySelectorAll(".add-to-cart")
let cartCounter = document.querySelector('#cartCounter')


//update the cart
function updateCart(pizza){
    //sending data to server of click on cart using axios

    axios.post('/update-cart',pizza).then(res =>{
        console.log(res)
        cartCounter.innerText = res.data.totalQty
        
        new Noty({
            type: 'success',
            text: 'Item added to cart'

        }).show();
    })
}




//array type

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    //e is for event

    //now we are sending req to server to add product into users cart on every click , and get pizza object from home

    let pizza = JSON.parse(btn.dataset.pizza)

    //update the cart

    updateCart(pizza)

    // console.log(pizza)


  })
})
