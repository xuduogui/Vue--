import {state} from './state'
import Vue from 'vue'

export const mutations = {
		// 导航的消失与出现
		disappear (state) {
			state.isappear = false
		},
		appear (state) {
			state.isappear = true
		},
		// 添加聊天入口列表，list
		// 获得一个对象名字
		addData (state,obj) {
			/* 
			 * 这个地方没有实现动态刷新，
			 * 导致在聊天的时候刷新会清空聊天数据
			 * 已经实现动态刷新
			 * 添加聊天入口列表
			 */
			state.list[obj] = Object.assign({}, state.list[obj], state.friendsmsg[obj])
			state.list[obj].userId = state.mycookie
			state.list[obj] = Object.assign({},state.list[obj],{
				"aimUserId": state.friendsmsg[obj].userId
			})
			state.list = Object.assign({},state.list,{})
		},
		// 删除一个入口列表
		DELETELIST (state,obj) {
			Vue.delete(state.list,obj)
		},

		// 添加空的聊天内容列表,chatcontent
		ADDCHATCONTENT (state,obj) {
			// 添加聊天内容列表，并给个空的初值（数组）
			if(state.chatcontent[obj]) {return}
			state.chatcontent[obj] = Object.assign({}, state.chatcontent[obj], obj)
			state.chatcontent[obj] = []
		},

		// 发送消息
		TACKCHAT (state,aim) {
			// aim包涵了两参数，聊天的对象名字，发送的内容
			// 将消息直接push进对应的对象
			state.chatcontent[aim.id].push(aim.msg)
		},
		// 切出好友界面
		// 改变好友列表最后的聊天信息
		CHANGELASTMSG (state) {
			// 遍历聊天列表进行更新数据
			for (let item in state.list) {
				// 如果该元素在聊天内容列表有
				if (state.chatcontent[item]) {
					// 获得聊天的长度
					let chatlength = state.chatcontent[item].length
					// 如果有聊天记录则保存列表到聊天入口列表
					// 如果没有聊天记录则删除入口处列表，暂时没做
					if (state.chatcontent[item].length > 0) {
						// 改变好友列表最后的聊天信息
						state.friendsmsg[item] = Object.assign({},state.friendsmsg[item],{"lastmsg":state.chatcontent[item][chatlength-1].msg})
						// 改变聊天列表最后的聊天信息
						state.list[item] = Object.assign({},state.list[item],{"lastmsg":state.chatcontent[item][chatlength-1].msg})
						// 改变好友列表聊天信息最后时间
						state.list[item] = Object.assign({},state.list[item],{"time": state.chatcontent[item][chatlength-1].time})
					} else {
						// 改变聊天列表最后的聊天信息
						state.list[item] = Object.assign({},state.list[item],{"lastmsg":"暂无新消息"})
					}
				}
			}
		},

		// 第一次后台数据的入口
		// 获得后台数据，通过action
		// 好友列表数据，聊天好友列表数据
		GETFRIENDSDATA (state,msg) {
			// 更新好友列表
			state.friendsmsg = Object.assign({}, state.friendsmsg, msg.data.data.friendsList)
			// 更新聊天好友列表
			// state.list = msg.data.data.chatList
			state.list = Object.assign({}, state.list, msg.data.data.chatList)
			// 增加时间项目
			// 目前userId在前端取出来，觉得不合理，准备交流
			for (let p in state.list) {
				state.list[p] = Object.assign({}, state.list[p], {
					'time': '',
					'lastmsg': '无新消息',
					'aimUserId': state.friendsmsg[p].userId,
					'userId': state.mycookie,
				})
				// 添加聊天内容列表，并给个空的初值（数组）
				state.chatcontent[p] = Object.assign({}, state.chatcontent[p], p)
				state.chatcontent[p] = []
			}
		},
		// 第一次加载，获取聊天记录
		GETCHATCONTENT (state,msg) {
			if (!msg.data.data.chatContent) {return}
			//数组
			let list = msg.data.data.chatContent
			// 遍历获取的聊天记录
			for (let i = 0; i < list.length; i++) {
				// 遍历好友列表
				for (let q in state.friendsmsg) {
					// 这里注意好友列表里面有自己
					if ((list[i].send_id == state.friendsmsg[q].userId || list[i].receive_id == state.friendsmsg[q].userId) && state.friendsmsg[q].userId != state.mycookie) {
						// 如果不存在该聊天列表
						if (!state.chatcontent[q]) {
							// 添加聊天内容列表，并给个空的初值（数组）
							state.chatcontent[q] = Object.assign({}, state.chatcontent[q], q)
							state.chatcontent[q] = []
							// 判断发送者，加入数据
							if (list[i].send_id == state.mycookie) {
								state.chatcontent[q].push({
									'msg': list[i].msg,
									'time': list[i].date,
									'hrf': state.usermsg.myid.img,
									'chatwith': state.friendsmsg[q].name,
									'userId': state.mycookie,
									'aimUserId': list[i].receive_id,
								})
							} else {
								state.chatcontent[q].push({
									'msg': list[i].msg,
									'time': list[i].date,
									'hrf': state.friendsmsg[q].img,
									'chatwith': state.usermsg.myid.name,
									'userId': list[i].receive_id,
									'aimUserId': state.mycookie,
								})
							}
						} else {
							// 已经存在该好友的聊天内容列表
							if (list[i].send_id == state.mycookie) {
								state.chatcontent[q].push({
									'msg': list[i].msg,
									'time': list[i].date,
									'hrf': state.usermsg.myid.img,
									'chatwith': state.friendsmsg[q].name,
									'userId': state.mycookie,
									'aimUserId': list[i].receive_id,
								})
							} else {
								state.chatcontent[q].push({
									'msg': list[i].msg,
									'time': list[i].date,
									'hrf': state.friendsmsg[q].img,
									'chatwith': state.usermsg.myid.name,
									'userId': list[i].receive_id,
									'aimUserId': state.mycookie,
								})
							}
						}
					}
				}
			}
		},

		// 接受好友消息
		RECEIVEMSG (state,msg) {
			console.log(msg)
			let num = 0
			// 如果聊天入口栏里面有
			for (let p in state.list) {
				// 这个地方
				if (state.list[p].aimUserId == msg.data.data.send_id) {
					// 改变聊天入口列表
					state.list[p] = Object.assign({},state.list[p],{
						"lastmsg": msg.data.data.msg,
						"time": msg.data.data.date,
					})
					// 改变聊天内容列表
					state.chatcontent[p].push({
						"aimUserId": msg.data.data.send_id,
						"chatwith": state.usermsg.myid.name,
						"hrf": state.list[p].img,
						"msg": msg.data.data.msg,
						"time": msg.data.data.date,
						"userId": state.mycookie,
					})
					num++
				}
			}
			// 如果聊天入口栏没有
			if (num == 0) {
				for (let item in state.friendsmsg) {
					// 这里默认只有好友才能聊天
					if (msg.data.data.send_id == state.friendsmsg[item].userId) {
						// 创建聊天列表
						// 更新聊天入口列表数据
						state.list[item] = Object.assign({}, state.list[item], state.friendsmsg[item])
						state.list[item] = Object.assign({},state.list[item],{
							"aimUserId": state.friendsmsg[item].userId,
							"lastmsg": msg.data.data.msg,
							"time": msg.data.data.date,
							"userId": state.mycookie,
						})
						state.list = Object.assign({},state.list,{})

						// 添加聊天内容列表，并给个空的初值（数组）
						state.chatcontent[item] = Object.assign({}, state.chatcontent[item], item)
						state.chatcontent[item] = []

						state.chatcontent[item].push({
							'hrf': state.friendsmsg[item].img,
							'chatwith': state.usermsg.myid.name,
							'msg': msg.data.data.msg,
							'time': msg.data.data.date,
							'userId': state.mycookie,
							'aimUserId': msg.data.data.send_id,
						})
						num++
					}
				}
			}
			// 如果好友列表里面没有
			if (num == 0) {
				alert('有一条消息来自陌生人，但是我就是不收')
			}
		},

		// 获取cookie,因为业务需求，只取单cookie
		// 保存在mycookie
		GETCOOKIE (state,name) {
			if (!document.cookie) {return}
			let	start = document.cookie.indexOf('=');
			state.mycookie = decodeURIComponent(document.cookie.substring(start+1))
		},

		// 更新个人信息,利用cookie匹配
		// 这个地方可以优化
		// 有多次引用，可以考虑只留请求中的更新
		CHANGEMYMSG (state) {
			for (let p in state.friendsmsg) {
				if (state.friendsmsg[p].userId == state.mycookie) {
					state.usermsg.myid = state.friendsmsg[p]
				}
			}
		},

	}