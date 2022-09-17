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
1- Let's start with controlling the scrolling behavior.Well, let's say we're on the Teams page,
we load our team here and then I scroll down so that I can load the Client Consulting team.
If I click that, of course you component updates, but I have to scroll up there to see that.
Maybe we want to scroll up there automatically, when we switch the route here.

That could be something we might wanna do, in general, maybe. Whenever we switch a route,
we wanna scroll to top so that the user always sees the full new page and isn't stuck somewhere 
down the page. And that's something we can add with the vue router.

In main js, where we create our router, besides registering all those routes
and then setting some global conflict like the link active class.
You can also add a scroll behavior property.

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
  //2- adding scrollBehaviour
  scrollBehavior(to, from, savedPosition) {
    // console.log(to, from, savedPosition);
    /*
    3 - saved position is null here, because saved position is only set,
    if you're using the back button. Then you see saved position is actually an object
    with a left and a top property, describing where the user scroll to,
    when this page, you just went back to what's left.
    */

    /*
    4 - This scroll behavior method should return an object describing where the browser should 
    scroll  to, up on the page change. And here the object you return, should have a left and the top 
    property.Just as the safe position has it, when it is available.
    */

    //5- we can see to saved psition and check if its present we'll move to its prev  position else

    if (savedPosition) return savedPosition;
    else
      return {
        // got to the top
        left: 0,
        top: 0,
      };
    //this will scroll to top
  },
});

const app = createApp(App);

app.use(router);

app.mount('#app');
