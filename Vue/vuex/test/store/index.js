import Vue from 'vue';
import Vuex from 'vuex';
import cart from './modules/cart';
import produces from './modules/produces';
import logger from './modules/logger';

Vue.use(Vuex);

const debug = process.env.NODE_DEV !== 'production';

export default new Vuex.store({
    modules: {
        cart,
        produces
    },
    strict: debug,
    plugins: debug ? [logger] : []
});
