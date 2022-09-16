import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/teams', component: TeamsList },
    { path: '/users', component: UsersList },
    /*there is another config we can add here link active class which we can change 
    but default is router-link-active and router-link-exact-active*/
    // linkActiveClass:'active'
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');
