const { Router } = require("express");
const { prettifyErrors } = require("../lib/utils");
const { Trader, Article, Order} = require("../models/sequelize");
const jwt = require('jsonwebtoken');
const router = Router();

router
  .get("/", (req, res) => {
    const {
      page = 1,
      perPage = 10,
      ...query
    } = req.query;
    Order.findAll({
      where: query,
      limit: parseInt(perPage),
      offset: (parseInt(page) - 1) * parseInt(perPage),
      paranoid: false,
    })
      .then((data) => res.json(data))
      .catch((e) => res.sendStatus(500));
  })
  .post("/add-article-to-cart", async (req, res) => {
    const {
      articleId
  } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  try {
      let cart = await Order.findAll();
      let articleDetails = await Article.findByPk(articleId);
           if (!articleDetails) {
          return res.status(500).json({
              type: "Not Found",
              msg: "Invalid request"
          }) 
  }
  if (cart) {
            //---- Check if index exists ----
            const indexFound = cart.items.findAll((item => item.productId.id == productId));
            //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
            if (indexFound !== -1 && quantity <= 0) {
                cart.items.splice(indexFound, 1);
                if (cart.items.length == 0) {
                    cart.subTotal = 0;
                } else {
                    cart.subTotal = cart.items.map(item => item.totalPrice).reduce((acc, next) => acc + next);
                }
            }
            //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
            else if (indexFound !== -1) {
                cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                cart.items[indexFound].totalPrice = cart.items[indexFound].quantity * articleDetails.price;
                cart.items[indexFound].price = articleDetails.price
                cart.subTotal = cart.items.map(item => item.totalPrice).reduce((acc, next) => acc + next);
            }
            //----Check if quantity is greater than 0 then add item to items array ----
            else if (quantity > 0) {
                cart.items.push({
                    articleId: articleId,
                    quantity: quantity,
                    price: articleDetails.price,
                    totalPrice: parseInt(articleDetails.price * quantity)
                })
                cart.subTotal = cart.items.map(item => item.totalPrice).reduce((acc, next) => acc + next);
            }
            //----If quantity of price is 0 throw the error -------
            else {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid request"
                })
            }
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Process successful",
                data: data
            })
        }
        //------------ This creates a new cart and then adds the item to the cart that has been created------------
        else {
            const cartData = {
                items: [{
                    productId: articleId,
                    quantity: quantity,
                    totalPrice: parseInt(productDetails.price * quantity),
                    price: articleDetails.price
                }],
                subTotal: parseInt(articleDetails.price * quantity)
            }
            cart = await new Article({cartData, ...req.body});
            // let data = await cart.save();
            res.json(cart);
        }

}  catch (err) {
      console.log(err)
      res.status(400).json({
          type: "Invalid",
          msg: "Something went wrong",
          err: err
      })
  }
})
.get("/get-cart", async (req, res) => {
  try {
    let cart = await Order.findAll();
    if (!cart) {
        return res.status(400).json({
            type: "Invalid",
            msg: "Cart not Found",
        })
    }
    res.status(200).json({
        status: true,
        data: cart
    })
} catch (err) {
    console.log(err)
    res.status(400).json({
        type: "Invalid",
        msg: "Something went wrong",
        err: err
    })
}
})
  .delete("/emptyCart", async (req, res) => {
    try {
      let cart = await Order.findAll();
      cart.items = [];
      cart.subTotal = 0
      let data = await cart.save();
      res.status(200).json({
          type: "success",
          mgs: "Cart has been emptied",
          data: data
      })
  } catch (err) {
      console.log(err)
      res.status(400).json({
          type: "Invalid",
          msg: "Something went wrong",
          err: err
      })
  }
  });

module.exports = router;


// .post("/addArticleToCart", (req, res) => {
//   const {
//     articleId
// } = req.body;
// const quantity = Number.parseInt(req.body.quantity);
// try {
//     let cart = await Order.findAll();
//     let articleDetails = await Article.findByPk(articleId);
//          if (!articleDetails) {
//         return res.status(500).json({
//             type: "Not Found",
//             msg: "Invalid request"
//         })
//     }
//     //--If Cart Exists ----
//     if (cart) {
//         //---- Check if index exists ----
//         const indexFound = cart.items.findIndex(item => item.articleDetails.id == articleDetails);
//         //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
//         if (indexFound !== -1 && quantity <= 0) {
//             cart.items.splice(indexFound, 1);
//             if (cart.items.length == 0) {
//                 cart.subTotal = 0;
//             } else {
//                 cart.subTotal = cart.items.map(item => item.totalPrice).reduce((acc, next) => acc + next);
//             }
//         }
//         //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
//         else if (indexFound !== -1) {
//             cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
//             cart.items[indexFound].totalPrice = cart.items[indexFound].quantity * articleDetails.price;
//             cart.items[indexFound].price = articleDetails.price
//             cart.subTotal = cart.items.map(item => item.totalPrice).reduce((acc, next) => acc + next);
//         }
//         //----Check if quantity is greater than 0 then add item to items array ----
//         else if (quantity > 0) {
//             cart.items.push({
//                 articleId: articleId,
//                 quantity: quantity,
//                 price: articleDetails.price,
//                 totalPrice: parseInt(articleDetails.price * quantity)
//             })
//             cart.subTotal = cart.items.map(item => item.totalPrice).reduce((acc, next) => acc + next);
//         }
//         //----If quantity of price is 0 throw the error -------
//         else {
//             return res.status(400).json({
//                 type: "Invalid",
//                 msg: "Invalid request"
//             })
//         }
//         let data = await cart.save();
//         res.status(200).json({
//             type: "success",
//             mgs: "Process successful",
//             data: data
//         })
//     }
//     //------------ This creates a new cart and then adds the item to the cart that has been created------------
//     else {
//         const cartData = {
//             items: [{
//                 productId: articleId,
//                 quantity: quantity,
//                 totalPrice: parseInt(productDetails.price * quantity),
//                 price: articleDetails.price
//             }],
//             subTotal: parseInt(articleDetails.price * quantity)
//         }
//         cart = await new Article({cartData, ...req.body});
//         // let data = await cart.save();
//         res.json(cart);
//     }
// } catch (err) {
//     console.log(err)
//     res.status(400).json({
//         type: "Invalid",
//         msg: "Something went wrong",
//         err: err
//     })
// }
// })