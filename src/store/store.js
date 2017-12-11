import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {state} from './state'
import {mutations} from './mutations'
import {actionsAPI} from './actionsAPI'
import { actionEvents } from "./actionsEvent";

Vue.use(Vuex)

const actions = Object.assign(actionsAPI,actionEvents)

export default new Vuex.Store({
	state,
	mutations,
	actions,
})
