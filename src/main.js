import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UserFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      components: {
        default: TeamsList,
        footer: TeamsFooter,
      },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      //1- beforeEnter to guard users specific route
      // beforeEnter(to, from, next) {
      //   console.log('users before enter');
      //   console.log(to, from);
      //   next();
      // },
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) return savedPosition;
    else
      return {
        left: 0,
        top: 0,
      };
  },
});

router.beforeEach(function (_, _2, next) {
  next();
});

router.afterEach(function (to, from) {
  //sending analytics data
  console.log('global afterEach');
  console.log(to, from);
});

const app = createApp(App);

app.use(router);

app.mount('#app');
