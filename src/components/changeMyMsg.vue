<template>
    <div>
        <mt-field label="用户名" :placeholder="$store.state.usermsg.myid.name" v-model="msg.name" class="list-item"></mt-field>
        <mt-field label="性别" :placeholder="$store.state.usermsg.myid.sex" v-model="msg.sex"></mt-field>
        <mt-field label="地址" :placeholder="$store.state.usermsg.myid.location" v-model="msg.location"></mt-field>
        <!-- <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model=""></mt-field>
        <mt-field label="网站" placeholder="请输入网址" type="url" v-model=""></mt-field>
        <mt-field label="数字" placeholder="请输入数字" type="number" v-model=""></mt-field>
        <mt-field label="生日" placeholder="请输入生日" type="date" v-model=""></mt-field> -->
        <mt-field label="个性签名" :placeholder="$store.state.usermsg.myid.describe" type="textarea" rows="3" v-model="msg.describe" class="list-item"></mt-field>
        <mt-button type="primary" size="large" class="submitBt" @click="submitMyMsg">确 认</mt-button>
    </div>
</template>

<<script>
export default {
    data () {
        return {
            msg: {
                'name': '',
				'describe': '',
				'sex': '',
				'location': '',
            }
        }
    },
    mounted () {
        // 隐藏导航
        this.$store.commit('disappear')
    },
    methods: {
        submitMyMsg () {
            // this.$messagebox({
            //     title: '提示',
            //     message: '确认?',
            //     showCancelButton: true
            // });
            this.$messagebox.confirm("暂时未写后台修改信息模块", "提示").then(function (action) {
                console.log(action)
            }).catch(function (err) {
                console.log(err)
            });
        }
    }
}
</script>

<style>
    .list-item {
        border-bottom: 1px solid #ddd;
    }
    .submitBt {
        padding: 10px;
        margin-top: 50px;
        background-color: #FFA500;
    }
</style>


