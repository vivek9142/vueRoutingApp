import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/teams', component: TeamsList },
    { path: '/users', component: UsersList },
    // add dynamic id
    { path: '/teams/:teamId', component: TeamMembers },
    /* new route should be before dynamic id
    this route will become active if the user enters /teams and then anything thereafter,
    therefore the order matters by the way,if you had another route here /teams/new,
    so not a dynamic segment, but simply the text new,you should put this first because otherwise 
    this path here this route would match this route as well, because new would be interpreted as a 
    team ID.
    */
    // { path: '/teams/new' },
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');
