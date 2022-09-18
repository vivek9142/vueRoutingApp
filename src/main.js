import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UserFooter.vue';

/*
Navigation guards can be useful if you add features like authentication where you, for example,
want to avoid that a user is able to access a certain route if he or she is not authenticated,
but they can also be useful to simply be aware of changing pages in case you wanna run some code 
there or they can be useful to ensure that a user doesn't accidentally navigate away from a page
where he or she has unsaved edits in a forum, 

I'm talking about functions, methods, which are called automatically by view router
when a page changes or to be precise, when a navigation action started.
For example, on the router we're creating in main JS on this main router before we pass it to 
our view app, we can call before each, like this. 
*/

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
1 - Before each is a build in method and it wants a function as an argument.
Before each once a function as an argument. And this function will be called by the view router
whenever we navigate from one page to another. Before each navigation action, this function will be 
called. And this function will then receive three arguments from your router
TO, which is the route object off the page we're going to, 
FROM, which is the route object of the page where coming from and 
NEXT, which is a function which we have to call to either confirm or cancel this navigation action.
*/

router.beforeEach(function (to, from, next) {
  console.log('global before each');
  console.log(to, from);
  // next(false); // if next is called so you're allowing to pass to next route but if fale is passed
  //then it will disallow it.
  // next('/users'); //we can sent routes to it to which it will navigate to.

  //we need to check condition before making redirection
  // if (to.name === 'team-members') next();
  // else next({ name: 'team-members', params: { teamId: 't2' } }); //this will trigger infinite redirection

  next();
});

const app = createApp(App);

app.use(router);

app.mount('#app');
