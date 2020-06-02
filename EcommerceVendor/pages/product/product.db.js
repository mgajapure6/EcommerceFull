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


