const express = require("express");
const userSignUpController = require("../controller/user/userSignUp");
const useSignInController = require("../controller/user/userSignIn");
const userController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken"); 
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers"); 
const updateUserRole = require("../controller/user/updateUser");
const uploadProductController = require("../controller/product/uploadProduct");
const uploadProductPermission = require("../helper/permission");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProductController = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProductsController = require("../controller/product/getCategoruWiseProducts");
const getProductDetailsController = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCart");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewController = require("../controller/user/addToCartView");
const updateAddToCartProductController = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const sendEmail = require("../controller/user/sendEmail");
const verifyCode = require("../controller/user/verifyCode");


const router = express.Router() 

router.post("/signup",userSignUpController);
router.post("/signin",useSignInController)
router.get("/user-details",authToken,userController);
router.get("/userlogout",userLogout);
router.post("/send-email",sendEmail);
router.post("/verify-code",verifyCode)

//admin panel
router.get("/all-users",authToken,allUsers);

//update user
router.post("/update-user",authToken,updateUserRole);



//uploading Product
router.post("/upload-product",authToken,uploadProductController);

//all-products
router.get("/all-products",getProductController);

//update-product
router.post("/update-product",authToken,updateProductController);
router.get("/get-categoryProduct",getCategoryProductController);
router.post("/category-product",getCategoryWiseProductsController)
router.post("/product-detail",getProductDetailsController );
router.get("/search",searchProduct)
router.post("/filter-products",filterProductController)


//add to cart
router.post("/addtocart",authToken,addToCartController);
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-cart-product",authToken,addToCartViewController); 
router.post("/update-cart-product",authToken,updateAddToCartProductController);
router.post("/delete-cart-product",authToken,deleteAddToCartProduct);


module.exports = router;