let app = new Vue({
    el: '#app',
    data: {

    selectedVariant: 0,

    description: "A pair of warm, fuzzy socks.",

    link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",

    product: "Socks",

    brand: "Vue Mastery",

    altText: "A pair of socks",


    details: ['80% cotton', '20% polyester', 'Gender-neutral'],

    cart: 0,

    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],

    variants: [
        {
            variantId: 2234,
            variantColor: 'green',
            variantImage: "../img/vmSocks-green-onWhite.jpg",
            variantQuantity: 10
        },
        {
            variantId: 2235,
            variantColor: 'blue',
            variantImage: "../img/vmSocks-blue-onWhite.jpg",
            variantQuantity: 0
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

        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        }
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },

        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
    
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },

        onSale() {
            return this.variants[this.selectedVariant].variantQuantity
        }
    },
})

