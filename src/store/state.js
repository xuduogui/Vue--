export const state = {
		// 切换消失的条件
		'isappear': true,
		// 记录聊天对象
		'chatname': '对方的名字',
		// 聊天列表
		'list': {
		},
		// 自己的信息
		'usermsg': {
			'myid': {
				'name': '登录错误，请重新登录',
				'img': '',
				'imgtwo': '',
				'number': '',
				'hrf': 'link',
				'describe': '我叫许多鬼，来自中国',
				'sex': '男',
				'location': '中国',
				"userId": "myid",
				},
		},
		// 好友列表数据
		'friendsmsg': {
			'robotFriend': {
				'userId': 'robotFriend',
				'name': '小强-robot',
				'img': 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3120358098,62815893&fm=27&gp=0.jpg',
				'describe': '我是小强，一个聪明的机器人',
				'sex': '男',
				'location': '你电脑的某一个隐秘的地方',
				'num': 0,
			},
			'myowmid': {
				'userId': 'myowmid',
				'name': '模拟的登录',
				'img': 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3843743666,3385530918&fm=27&gp=0.jpg',
				'describe': '我就是你，一个奇怪的人',
				'sex': '男',
				'location': '你的椅子上',
				'num': 0,
			},
			
		},
		
		// 聊天的内容
		'chatcontent': {
		},
	'mycookie': 'myowmid',
		// 'testmsg': 'null',
	}