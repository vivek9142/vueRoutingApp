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

/*
This beforeEach function here will run on every navigation action,
no matter which route is being used, no matter from which route we go to which other route,
this will always run. 

Sometimes this is what you need, sometimes it's not,sometimes you just wanna protect individual 
routes. You could do this, of course,with a if check here, where you check your to and from route 
objects, to also run different logic based on different routes.

But you can also set up the beforeEach navigation guard on single routes.

2 - Here in your component usersList config object, you can add all those view lifecycle methods,
like created or mounted and you can also add the beforeRouteEnter method.
If you use the view router, which we do, this will be called before navigation
to this component is confirmed. And here again, you get to, from and next,
and therefore we can do what he did before.
We can console.log('usersList Cmp beforeRouteEnter').
We can then console.log(to, from) of course and we can call next or run any logic we wanna run
to confirm or deny navigation to next or redirect the user.

4 -Global guard is always first, then the route conflict level and then the component level.
that's the order in which these navigation guards execute.
*/

router.beforeEach(function (_, _2, next) {
  next();
});

const app = createApp(App);

app.use(router);

app.mount('#app');
