Vue.component('product-tabs', {
    template: `
    <div>
        <ul>
            <span class="tab"
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                @click="selectedTab = tab"
            >{{ tab }}</span>
        </ul>
        <div v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                <p>{{ review.name }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>
        <div v-show="selectedTab === 'Make a Review'">
        <product-review
@review-submitted="addReview"></product-review>
    </div>
</div>
    `,
    data() {
    return {
    tabs: ['Reviews', 'Make a Review'],
    selectedTab: 'Reviews' 
    }
    }
})

Vue.component('product-details', {
    props:  {
        details: {
            type: Array,
            required: true
        },
    },
    template:`
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
  })

  Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
     <b>Please correct the following error(s):</b>

    <ul>
        <li v-for="error in errors">{{ error }}</li>
    </ul>
    </p>

    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
    </p>

    <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
    </p>

    <p>You recomend me?</p>

    <div class="recomend">
	    <input type="radio" name="radio" value="1">
	    <label for="radio-3">Yes!</label>
    </div>

    <div class="recomend">
        <input type="radio" name="radio" value="2">
        <label for="radio-3">No!</label>
    </div>

    <p>
        <input type="submit" value="Submit">
    </p>    
</form>
    `,
    data() {
    return {
        name: null,
        review: null,
        rating: null,
        recomend: null,
        errors: []
        }
    },
    methods: {
            onSubmit() {
                if(this.name && this.review && this.rating && recomend) {
                    let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recomend: this.recomend
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recomend = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recomend) this.errors.push("Recomend required.")
            }
        }    
    }
})
    

Vue.component('product', {
    props: {
        premium: {
        type: Boolean,
        required: true,
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
        <product-details :details="details"/>
        <p>Shipping: {{ shipping }}</p>
        <div
            class="color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{ backgroundColor:variant.variantColor
    }"
            @mouseover="updateProduct(index)"
    ></div>

        <p v-if="onSale">On Sale</p>
            <div class="buttons">
            <button v-on:click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock}" >
                Add to cart
            </button>
            <button v-on:click="removeToCart">Remove to Cart</button>
             </div>
             <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviewsyet.</p>

                <ul>
                    <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                    </li>
                </ul>
                </div> <product-review
@review-submitted="addReview"></product-review>
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
        reviews: []
    }
    },
    methods: {         
        addReview(productReview) {
            this.reviews.push(productReview)
        },
        
        addToCart() {
            this.$emit('add-to-cart',
            this.variants[this.selectedVariant].variantId);
        },
        
        removeToCart() {
            this.$emit('remove-to-cart',
            this.variants[this.selectedVariant].variantId);
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
        },

        shipping() {
            if (this.premium) {
            return "Free";
            } else {
            return 2.99
            }
        }
    }
})    

let app = new Vue({
    el: '#app',
    data: {
    premium: true,
    cart: [],
    },
    methods: {
    updateCart(id) {
        this.cart.push(id);
        },
    
    removeCart(id){
        this.cart.shift(id)
    }
},
})


    
    
 
    
