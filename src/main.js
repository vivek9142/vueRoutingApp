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
1- I now wanna move on to another feature, which can be useful in some applications.
And that would be multiple router views on the same level. We already have multiple router views in 
this demo app. 

We have one in App vue and we have one in the team's list component
for the nested routes that belong to the route that loads the team's list component.

But you can also have multiple router views on the same level.So for the same set of routes,
for example, here in App vue, we could have a footer element let's see,
but that's not mandatory. But in there we could have another router view.
Now, of course, having two router views on the same level, which are there for dealing with the 
same routes we now just see that every page has loaded twice.

Of course, because we have two router views. That's probably not the behavior you want.
But instead multiple router views on the same level, allow you to add another cool functionality.

the main thing is that you have two different components that should be loaded as a footer,
depending on whether you're in the teams area or the users area of pages.
And that could absolutely be a requirement you have in your app.

With the view router, that's easy to implement. In your route config,
you can register more than one component per route. Here, for example, on teams,
instead of just having one component here, we can add components.
this now takes an object. And in this object, you can now define key value piers where the keys
identify different router views, and the values are the components that should be loaded 
into this router view.

And that now works if you give those router views names, just as you can give names to slots.
We could give this router view in the footer, a name of footer, but the name is up to you.
We could also give this router view a name,but just as we have slots, you are allowed to have 
one unnamed router view on the same level, which will then be the default router view.
*/

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      // component: TeamsList,
      //4-  setting components for routing components based on name for Teams page.
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
    //5- setting components for routing components based on name for Users page.
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');

/*
6 - So named router views can be helpful to allow you to construct more complex user interfaces
where you wanna load more than one component for a given path.
For example, to not just have flexible main pages, but all the flexible footers.
*/
