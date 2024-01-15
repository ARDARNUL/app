Vue.component('product', {
    props: {
        premium: {
        type: Boolean,
        required: true
        }
    },        
    template: `
    <div class="product">
     <div class="product-image">
        <img :src="image" :alt="altText"/>
    </div>

    <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In stock</p>
        <p v-else>Out of Stock</p>
        <ul>
        <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <p>Shipping: {{ shipping }}</p>
        <div
            class="color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{ backgroundColor:variant.variantColor
    }"
            @mouseover="updateProduct(index)"
    ></div>

    <div class="cart">
        <p>Cart({{ cart }})</p>
    </div>

        <p v-if="onSale">On Sale</p>
            <div class="buttons">
            <button v-on:click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock}" >
                Add to cart
            </button>
            <button v-on:click="removeToCart">Remove to Cart</button>
             </div>
             <a v-bind:href="link"> More products like this</a>    
             </div>
        </div>
    </div>
    `,
    data() {
    return {
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
    }
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
    }
})    

let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})
    

