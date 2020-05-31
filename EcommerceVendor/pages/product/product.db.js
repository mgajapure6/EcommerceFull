function addNewProduct() {
    // A Product entry.
    var productData = {
        name: $('#name').val(),
        desc: $('#desc').val(),
        meta_tag_title: $('#meta_tag_title').val(),
        product_tag: $('#product_tag').val(),
        category: $('#category').val(),
        sku: $('#sku').val(),
        color: $('#color').val(),
        size: $('#size').val(),
        product_code: $('#product_code').val(),
        location: $('#location').val(),
        price: $('#price').val(),
        tax_type: $('#tax_type').val(),
        quantity: $('#quantity').val(),
        uom: $('#uom').val(),
        status: $('#status').val(),
        avalability: $('#avalability').val(),
        feature: $('#feature').val()
    };

    // Get a key for a new Product.
    var newProductKey = firebase.database().ref().child('product').push().key;

    // Write the new product's data simultaneously in the products list and the user's products list.
    var updates = {};
    updates['/product/' + newProductKey] = productData;
    updates['/seller-products/' + uid + '/' + newProductKey] = productData;

    return firebase.database().ref().update(updates);
}

function updateProduct() {

}

function deleteProduct() {

}

function fetchProducts() {

}


function createProductBox(product, isGrid) {
    if (isGrid) {
        return '<div class="col-6 col-sm-4 col-lg-3">' +
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
        return '<div class="col-12 col-md-6">' +
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
}