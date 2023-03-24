exports.Category = {
    products: ({id: categoryId }, { filter }, { products, reviews }) => {
        // filter out products based on their category
        let filterdProducts = products.filter(product => product.categoryId === categoryId)
        if(filter){
            const { onSale, avgRating } = filter;
            // filter out products based onSale : true or false
            if(onSale) filterdProducts = filterdProducts.filter((product) => product.onSale)
            // filter out products that are greater than or equal to avgRating
            if([1,2,3,4,5].includes(avgRating)) {
                filterdProducts = filterdProducts.filter((product) => {
                    let sumRating = 0;
                    let numOfRatings = 0;
                    reviews.forEach((review) => {
                        // loop through reviews and find reviews that match with the product id
                        if(product.id === review.productId){
                            // if the id matches, add the ratings for each instance and number of reviews
                            sumRating+=review.rating
                            numOfRatings++
                        }
                    })
                    // calculate the average rating for each product
                    const averageProductRating = sumRating/numOfRatings;
                    // return products that has averageProductRating of more than or equal to avgRating
                    return averageProductRating >= avgRating;    
                });
            }
        }
        return filterdProducts
    }
}
