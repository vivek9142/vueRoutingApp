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
    //  creating new home route and redirect to teams url
    { path: '/', redirect: '/teams' },
    //another method can be to add alias to which route we can redrect to
    // donwside of this approach is the url don't change it remains as '/'
    {
      path: '/teams',
      component: TeamsList,
      // alias: '/'
    },
    { path: '/users', component: UsersList },
    { path: '/teams/:teamId', component: TeamMembers, props: true },
    // adding catch all routes for all routes except which are defined here
    /*This certainly looks strange but in the end this means, it's a dynamic segment.
      And this here is actually a regular expression. This text is supported by the view router.
      And it simply means any character combination which is being used as a value here,
      should in the handle lead to this route being loaded.That's why this needs to come last.
      Otherwise it would also overwrite the other routes which you wanna have.
    */
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');
