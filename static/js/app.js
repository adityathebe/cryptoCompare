const CRYPTOCOMPARE_API_URI = "https://min-api.cryptocompare.com";
const COINMARKETCAP_API_URI = "https://api.coinmarketcap.com/";
const BASE_IMAGE_URL = "https://www.cryptocompare.com"
const UPDATE_INTERVAL = 600 * 1000;

let app = new Vue({
    el: '#app',
    data: {
        coins: [],
        coinData : {}
    },
    methods: {
        getCoinData : function() {
            let self = this;
            console.log('Getting Coin Data')

            axios.get(CRYPTOCOMPARE_API_URI + "/data/all/coinlist")
                .then((resp) => {
                    console.log('got Data')
                    this.coinData = resp.data.Data;
                    this.getCoins();
                })
                .catch((err) => {
                    this.getCoins();
                    console.log(err);
                })
        },
        getCoins: function() {
            let self = this;

            axios.get(COINMARKETCAP_API_URI + 'v1/ticker/?limit=7')
                .then((resp) => this.coins = resp.data)
                .catch(err => console.log(err))
        },
        getCoinImage: function(symbol) {
            return BASE_IMAGE_URL + this.coinData[symbol]['ImageUrl'];
        }
    },
    created: function() {
        this.getCoinData();
        this.getCoins();
    },
});

// app.getCoins();
setInterval(() => {
  app.getCoins();
}, UPDATE_INTERVAL);