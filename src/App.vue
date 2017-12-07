<template>
  <div id="app">
    <div id="apphead">
      <router-link
        to="/chat"
        v-if="!$store.state.isappear"
      >
         <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=838537442,2292847737&fm=27&gp=0.jpg" height="25" width="25">
      </router-link>
      <div v-if="$store.state.isappear" class="outheadbox">
        <div id="outapphead">
          <div class="logmsg">柒零</div>
          <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=616721060,353505085&fm=27&gp=0.jpg" width="25" height="25">
        </div>
        
        
      </div>
       
    </div>
    
    <div id="routerHeight">
      <router-view></router-view>
    </div>
    <!-- 导航 -->
    <div class="allIndex" v-if="$store.state.isappear">
      <router-link to="/chat"><img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1105922480,1672123235&fm=27&gp=0.jpg" width="40" height="40"></router-link>
      <router-link to="/friends"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511003826222&di=c482483d746ba5c8422e83d3b86a87e8&imgtype=0&src=http%3A%2F%2Fimage5.huangye88.com%2F2013%2F03%2F21%2F5f2bd87a90a70229.jpg" width="40" height="40"></router-link>
      <router-link to="/more"><img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3572258698,3789554449&fm=27&gp=0.jpg" width="40" height="40"></router-link>
      <router-link to="/user"><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1608661816,3207861660&fm=27&gp=0.jpg" width="40" height="40"></router-link>
    </div>
  </div>
</template>

<script>
// import store from './store/store'

export default {
  name: 'app',

  mounted () {
    var h = document.documentElement.clientHeight;
    var view = document.getElementById('routerHeight');
    var app = document.getElementById('app');
    var apphead = document.getElementById('apphead');
    
    var allindex = document.getElementsByClassName('allIndex')[0];
    var h1 = h-h*0.16;
    var h2 = h-h*0.8;
    apphead.style.height = h*0.08 + 'px';
    // allindex.style.top = h2 + 'px';
    view.style.height = h1 + 'px';
    app.style.height = h + 'px';

    
    // 获取cookie
    this.$store.commit('GETCOOKIE')
    // 获得后台数据
    // 好友列表，聊天栏列表
    this.$store.dispatch('getChatData')
    // 调用接收请求
    this.$store.dispatch('receiveMsg')   
  },
}

</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #eee;


  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
/*头部样式*/
#apphead {
  background-color: #444;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#apphead img {
  margin: 0 10px;
  border: none;
  border-radius: 6px;

}
.outheadbox {
  width: 100%;
  height: 100%;
}
#outapphead {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  font: 1.2rem '微软雅黑';
  color: #eee;
  letter-spacing: 4px;
}
.logmsg {
  width: 90%;
  display: flex;
  justify-content: center;
  padding-left: 10%;
}

/*导航样式*/
.allIndex {
  /*position: absolute;*/
  /*bottom: 0;*/
  /*bottom: 0;*/
  width: 100%;
  height: 8%;
  background: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.allIndex a {
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/*显示背景样式*/
#routerHeight {
  width: 100%;
  background: #eee;
  overflow: auto;
}
</style>
