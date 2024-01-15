let app = new Vue({
    el: '#app',
    data: {
    onSale: true,
    description: "A pair of warm, fuzzy socks.",
    link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
    product: "Socks",
    image: "../img/vmSocks-green-onWhite.jpg",
    altText: "A pair of socks",
    inStock: true,
    details: ['80% cotton', '20% polyester', 'Gender-neutral'],
    variants: [
        {
            variantId: 2234,
            variantColor: 'green'
        },
        {
            variantId: 2235,
            variantColor: 'blue'
        }],
        cart: 0,
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        variants: [
            {
            variantId: 2234,
            variantColor: 'green',
            variantImage: "../img/vmSocks-green-onWhite.jpg",
            },
            {
            variantId: 2235,
            variantColor: 'blue',
            variantImage: "../img/vmSocks-blue-onWhite.jpg",
            }
            ],
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeToCart() {
            this.cart -= 1
            if (this.cart < 0){
                this.cart = 0
            }
        },
        updateProduct(variantImage) {
            this.image = variantImage
            }
    }
})

