import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import chat from '@/components/chat'
import friends from '@/components/friends'
import more from '@/components/more'
import user from '@/components/users'
import chatwith from '@/components/chat/chatwith'
import friendsmsg from '@/components/friends/friendsmsg'

import wait from '@/components/wait/wait'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: chat,
     
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat,
    },
    {
      path: '/friends',
      name: 'friends',
      component: friends
    },
    {
      path: '/more',
      name: 'more',
      component: more
    }
    ,
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/chatwith/:id',
      name: 'chatwith',
      component: chatwith
    },
    {
      path: '/friendsmsg/:id',
      name: 'friendsmsg',
      component: friendsmsg
    },
    {
      path: '/wait',
      name: wait,
      component: wait
    }
  ]
})
