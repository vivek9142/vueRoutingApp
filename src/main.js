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
    { path: '/teams/:teamId', component: TeamMembers, props: true },
    /*
    3 - the teamid on passing as props will give error since it isn't passing props to component
    from router. so we need to enable it in to send props.
    */
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');
