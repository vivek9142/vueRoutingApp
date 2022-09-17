import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    /*
    1- we can add nested routes here so we can add child attribute in /teams path
    and add route defination in there.
    */
    {
      path: '/teams',
      component: TeamsList,
      children: [{ path: ':teamId', component: TeamMembers, props: true }], // teams/t1
    },
    { path: '/users', component: UsersList },
    //2- copy paste in children attribute of /teams path
    // { path: '/teams/:teamId', component: TeamMembers, props: true },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

/*
3 - if I click view members now we don't load our team members route anymore.
And the reason for that is that Vue, the Vue Router to be precise,
doesn't know anymore where to load this. Because now the team members route,this one here,
is no longer a root route. It's no longer registered directly inside of routes.
It's a child route of another route.
*/

const app = createApp(App);

app.use(router);

app.mount('#app');
