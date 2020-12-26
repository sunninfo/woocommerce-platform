const order = require('../../../models/order')
const Order = require('../../../models/order')
const moment = require('moment')
function orderController() {
    return {
        store(req, res) {
            // console.log(req.body)
            //validate req
            const { phone, address } = req.body
            if (!phone || !address) {
                req.flash('error', 'All fields are required')
                return res.redirect('/cart')
            }

            const order = new Order({    //using models  with help of 'new'
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })

            order.save().then(result => {
                Order.populate(result, { path: 'customerId' }, (err, placedOrder) => {
                    req.flash('success', 'Order Placed sucessfully')
                    delete req.session.cart //to empty the cart after order placed
                    //Emit
                    const eventEmitter = req.app.get('eventEmitter')
                    eventEmitter.emit('orderPlaced', placedOrder)
                    return res.redirect('customers/orders')
                })

            }).catch(err => {
                req.flash('error', 'Somthing went wrong')
                return res.redirect('/cart')

            })
        },
        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id },
                null,
                { sort: { 'createdAt': -1 } })
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
            res.render('customers/orders', { orders: orders, moment })

        },
        async show(req, res) {
            const order = await Order.findById(req.params.id)
            //Authorize user
            if (req.user._id.toString() === order.customerId.toString()) { //we can't compare two objects whithout converting them into string
                res.render('customers/singleOrder', { order })
            } else {
                res.redirect('/')
            }
        }
    }
}


module.exports = orderController