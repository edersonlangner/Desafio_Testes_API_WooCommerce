const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      
    },
    env: {
      wooCommerce: "https://cena.reset.cwi.com.br/index.php",
      productReview: "/wp-json/wc/v3/products/reviews"
    },
    specPattern: 'cypress/api/**/*.{js,jsx,ts,tsx}',
  }

})