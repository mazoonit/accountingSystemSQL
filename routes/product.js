var express = require('express');
var router = express.Router();
var product=require('../decryptoric/product.js');
var models=require('../models');


router.post('/frontGet',function(req,res,next){
  var id=req.body.id;
  var type=req.body.productType;
  product.getProduct(id,type).then((productObj)=>{
    if(productObj){
      res.status(200).send(productObj);
    }
    else{
      res.status(404).send("Product not found!");
    }
  }).catch((error)=>{
    res.status(500).send(error);
  });
});

router.post('/frontGetByMoveId',function(req,res,next){
  var moveId=req.body.moveId;
  var type=req.body.productType;
  product.getProductByMoveId(moveId,type).then((productObj)=>{
    if(productObj){
      res.status(200).send(productObj);
    }
    else{
      res.status(404).send("Product not found!");
    }
  }).catch((error)=>{
    console.log(error);
    res.status(500).send(error);
  });
});



router.post('/',function(req,res,next){
  var productObj=req.body;
  productObj.userId=req.session.user.id;
  product.addProduct(productObj).then((productRaw)=>{
    res.status(200).send(productRaw);
  }).catch((err)=>{
    res.status(500).send(err);
  });
});

router.put('/',function(req,res,next){
  var productObj=req.body;
  productObj.userId=req.session.user.id;
  product.editProduct(productObj).then((flag)=>{
    if(flag){
      res.status(200).send("Product has been updated successfully!");
    }
    else{
      res.status(404).send("Product not found!");
    }
  }).catch((err)=>{
    console.log(err);
    res.status(500).send(err);
  });
});





router.delete('/',function(req,res,next){
  // entries.deleteEntry(req.body.id).then(()=>{
  //   res.status(200).send("Entry has been deleted successfully!");
  // }).catch((error)=>{
  //   res.status(500).send(error);
  // });
  var id=req.body.id
  var type=req.body.productType;
  product.deleteProduct(id,type).then((result)=>{
    if(result==true){
      res.status(200).send("Product has been deleted successfully.");
    }
    else{
      res.status(404).send("Product not found!");
    }

  });
});


router.post("/getSupplierProducts",function(req,res,next){
  var supplierAccount=req.body.supplierAccount;
  var fromDate=req.body.fromDate;
  var toDate=req.body.toDate;
  var productType=req.body.productType;

  product.getSupplierProducts(supplierAccount,fromDate,toDate,productType).then((products)=>{
    console.log(products);
    res.status(200).send(products);
  }).catch((error)=>{
    res.status(500).send(error);

  });
});

router.post("/getAllProducts",function(req,res,next){
  var fromDate=req.body.fromDate;
  var toDate=req.body.toDate;
  var productType=req.body.productType;

  product.getAllProducts(fromDate,toDate,productType).then((products)=>{
    console.log(products);
    res.status(200).send(products);
  }).catch((error)=>{
    res.status(500).send(error);

  })

});

router.post("/getEmployerProducts",function(req,res,next){
  var fromDate=req.body.fromDate;
  var toDate=req.body.toDate;
  var productType=req.body.productType;
  var employerId=req.body.employerId;


  product.getEmployerProducts(employerId,fromDate,toDate,productType).then((products)=>{
    console.log(products);
    res.status(200).send(products);
  }).catch((error)=>{
    res.status(500).send(error);

  })

});




module.exports=router;
