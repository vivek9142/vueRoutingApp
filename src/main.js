import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';

//createWebHistory uses web browser traditional history
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // component is rendered when specific path is visited
    { path: '/teams', component: TeamsList },
    { path: '/users', component: UsersList },
  ],
});

const app = createApp(App);

/*This is a built in method,which in the end allows us to connect 
our view app, with a third party package,with some other 
functionality. */

app.use(router);

app.mount('#app');
