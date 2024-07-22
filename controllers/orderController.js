const asyncHandler = require("express-async-handler");
const UserOrder = require("../models/userOrderModel");
const SellerOrder = require("../models/sellerOrderModel");
const { clearCart } = require("../services/cartService");

const createOrder = asyncHandler(async (req,res)=>{
    if(!req.body.orderDetails || !req.body.orderItems || !req.body.deliveryAddress || !req.body.buyerName || !req.body.buyerEmail || !req.body.buyerContactNumber ){
        res.status(400);
        throw new Error("Mandatory fields missing");
    }
    let userOrderObj = {
        userId : req.user.userId,
        orderDetails : req.body.orderDetails,
        orderItems : req.body.orderItems,
        deliveryAddress : req.body.deliveryAddress
    }
    const createdUserOrder = await UserOrder.create(userOrderObj);
    if(createdUserOrder){
        let uniqueSellers = new Set(req.body.orderItems.map(item => item.sellerId));
        let sellerOrders = new Array(uniqueSellers.size);
        let index = 0;
        uniqueSellers.forEach((item)=>{
            sellerOrders[index] = {
                sellerId : item,
                orderItems : req.body.orderItems.filter(obj => obj.sellerId == item),
                buyerName : req.body.buyerName,
                buyerEmail : req.body.buyerEmail,
                buyerContactNumber : req.body.buyerContactNumber,
                deliveryAddress : req.body.deliveryAddress,
                totalAmount : item.itemTotal,
                userOrderId : createdUserOrder._id
            }
            index++;
        })
        const createdSellerOrder = await SellerOrder.insertMany(sellerOrders);
        if(createdSellerOrder){
            clearCart(req.user.userId);
            res.json({
                "success":true,
                "userOrderId":createdUserOrder._id
            })
        }
    }
    else{
        res.status(500);
        throw new Error("Internal server error");
    }
});

module.exports = {createOrder};