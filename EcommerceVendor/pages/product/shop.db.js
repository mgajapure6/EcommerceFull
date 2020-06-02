'use strict'

function fetchGridProducts() {
    var db = firebase.firestore();
    var seller = JSON.parse(localStorage.getItem('currentUser'));
    $('.products-row').empty();
    var productsRef = db.collection("products").where("sellerid", "==", seller.uid).get().then(function(querySnapshot) {
        console.log('querySnapshot',querySnapshot)
        if(querySnapshot.empty){

        }else{
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                var product = doc.data();
                console.log(doc.id, " => ", product);
                createProductBox(product, true)
            });
        }
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function fetchListProducts() {
    var db = firebase.firestore();
    var seller = JSON.parse(localStorage.getItem('currentUser'));
    $('.products-row').empty();
    var productsRef = db.collection("products").where("sellerid", "==", seller.uid).get().then(function(querySnapshot) {
        console.log('querySnapshot',querySnapshot)
        if(querySnapshot.empty){
            
        }else{
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                var product = doc.data();
                console.log(doc.id, " => ", product);
                createProductBox(product, false);
            });
        }
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}


function createProductBox(product, isGrid) {
    var productBox = null;
    if (isGrid) {
        productBox =  '<div class="col-6 col-sm-4 col-lg-3">' +
            '<div class="card top-product-card mb-3">' +
            '<div class="card-body"><span class="badge badge-success">' + product.feature + '</span>' +
            '<a class="product-thumbnail d-block" href="single-product.html"><img class="mb-2" src="' + product.thumbnail_img + '" alt=""></a><a class="product-title d-block" href="single-product.html">' + product.name + '< /a>' +
            '<p class="sale-price">Rs. ' + product.price + ' <span>Rs. ' + product.price + '</span></p>' +
            '<div class="product-rating"><i class="lni-star-filled"></i><i class="lni-star-filled"></i><i class="lni-star-filled"></i><i class="lni-star-filled"></i><i class="lni-star-filled"></i></div>' +
            '<a class="btn btn-success btn-sm view-product" href="#"><i class="lni-eye"></i>View</a>' +
            '</div>' +
            '</div>' +
            '</div>';
    } else {
        productBox =  '<div class="col-12 col-md-6">' +
            '<div class="card weekly-product-card mb-3">' +
            '<div class="card-body d-flex align-items-center">' +
            '<div class="product-thumbnail-side"><span class="badge badge-success">' + product.feature + '</span>' +
            '<a class="product-thumbnail d-block" href="single-product.html"><img src="' + product.thumbnail_img + '" alt=""></a></div>' +
            '<div class="product-description"><a class="product-title d-block" href="single-product.html">' + product.name + '</a>' +
            '<p class="sale-price"><i class="lni-inr"></i>Rs. ' + product.price + '<span>Rs. ' + product.price + '</span></p>' +
            '<div class="product-rating"><i class="lni-star-filled"></i>' + product.avg_rating_count + ' (' + product.tot_rating + ')</div><a class="btn btn-success btn-sm view-product" href="#"><i class="mr-1 lni-eye"></i>View</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }

    $('.products-row').append(productBox);
}