import axios from 'axios'
import {state} from './state'

export const actionsAPI = {
	// 告诉后台删除某个好友聊天入口列表
	deleteChatList (context,list) {
		axios({
			method: 'post',
			url: 'chatOut.action',
			data: {"user_id": state.mycookie, "friends_id": state.friendsmsg[list].userId}
		}).then(function (params) {
			context.commit('DELETELIST', list)
		}).catch(function (params) {
			// 暂时用错误回调mutations
			context.commit('DELETELIST', list)
		})
	},

    // 获得聊天栏数据，包括聊天记录
    getChatData (context) {
      axios({
        method: 'post',
        url: 'load.action',
        data: {"userId": state.mycookie}
      }).then(function (res) {
      	// 请求更新数据
      	context.commit('GETFRIENDSDATA', res)
      	// 更新个人信息
    	context.commit('CHANGEMYMSG')
    	// 更新聊天记录
      	context.commit('GETCHATCONTENT', res)
      	// 更新聊天列表信息
      	context.commit('CHANGELASTMSG')
      }).catch(function (err) {
      	// 测试
      	// 更新个人信息,这里只是方便自己测试
    	context.commit('CHANGEMYMSG')
      	alert('服务器获取数据失败')
      })
    },


    // 接受好友消息，成功回调
    receiveMsg (context) {
    	axios({
    		method: 'post',
    		url: 'receive.action',
    		data: {"userId": state.mycookie}
    	}).then(function (res) {
    		// 使用判断条件，确定在线情况
    		if (res.data.status == 7) {
    			// 函数回调
    			context.dispatch('receiveMsg')
    		} else {
    			// 处理从后台接收的好友消息
	    		context.commit('RECEIVEMSG', res)
	    		// 函数回调
	    		context.dispatch('receiveMsg')
    		}
    	}).catch(function (err) {
    		alert('聊天消息的一次重大失败')
    	})
    },


    // 发送消息到后台
    sendMyMsg (context,msg) {
    	axios({
    		method: 'post',
    		url: 'send.action',
    		data: msg,
    	}).then(function (res) {
    		// 发送成功
    	}).catch(function (err) {
    		// 发送失败
    	})
    },

    // 发起聊天向后台传递列表创建数据
    sendChatList (context,msg) {
    	axios({
    		method: 'post',
    		url: 'chatIn.action',
    		data: msg,
    	}).then(function () {
    		// body...
    	}).catch(function () {
			// 发送失败
    	})
    },
}