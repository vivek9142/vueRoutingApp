import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UserFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      // Route Meta Field
      meta: { needsAuth: true },
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

export default router;
