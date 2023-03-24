exports.Query =  {
    products: (parent, { filter }, { products, reviews }) => {
        let filterProducts = products;
        if(filter){
            const { onSale, avgRating } = filter;
            // filter out products based onSale : true or false
            if(onSale){
                filterProducts = products.filter((product) => product.onSale)
            }
            // filter out products that are greater than or equal to avgRating
            if([1,2,3,4,5].includes(avgRating)){
                filterProducts = filterProducts.filter((product) => {
                    let sumRating = 0;
                    let numberOfReviews = 0;
                    // loop through reviews and find reviews that match with the product id
                    reviews.forEach((review) => {
                        if(review.productId === product.id){ 
                            // if the id matches, add the ratings for each instance and number of reviews
                            sumRating += review.rating
                            numberOfReviews++;
                        }
                    })
                    // calculate the average rating for each product
                    const avgProductRating = sumRating / numberOfReviews
                    // return products that has averageProductRating of more than or equal to avgRating
                    return avgProductRating >= avgRating
                })
            }
        }
        return filterProducts;
    },
    //get product based on product id
    product: (parent, { id }, { products }) => {
        return products.find(product => product.id === id);
    },
    categories: (parent, args, {categories }) => categories,
    // get specific category based on category id
    category: (parent, { id }, { categories}) => {
        return categories.find(category => category.id === id)
    },
    reviews: (parent, args, { reviews }) => reviews
}
