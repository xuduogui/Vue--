import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { state } from './state';
import { mutations } from './mutations';
import { actions } from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
	state: state,
	mutations: mutations,
	actions: actions
});