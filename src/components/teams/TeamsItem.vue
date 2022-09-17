<template>
  <li>
    <h3>{{ name }}</h3>
    <div class="team-members">{{ memberCount }} Members</div>
    <router-link :to="teamMembersLink">View Members</router-link>
  </li>
</template>

<script>
export default {
  props: ['id','name', 'memberCount'],
  computed:{
    teamMembersLink(){
    //  return '/teams/'+ this.id;
    // 2- instead of passing string we can pass object
    // return {path: '/teams' + this.id};
    // 3- this we did before but we can add name to route and use it here 

    return {name: 'team-members', params:{ teamId: this.id }}

    /*
    5- let's say team instead of teams, then you don't need to go to this team item component,
    and update the path everywhere where you used it, instead, the name didn't change.
    So you don't need to update anything here, and you can still conveniently change the path,
    how often you want. That's why navigating by name instead of by path, might be a useful pattern,
    */
    }
  }
};
</script>

/*
1 - Now imagine a bigger view application where you have dozens, or maybe even hundreds of different 
routes some routes deeply nested in our routes. You can also have multiple levels of nesting,
you could have children here on this nested route as well.

So imagine an application where you have a lot of such nested routes. If you have such an app,
constructing links like recurrently doing it, like this, can quickly become cumbersome,
you always have to add the full path here, and build it out like this.
You have to build such a long string, which describes the path you wanna navigate to.
Now, because this can get cumbersome, the view router offers two very useful features,
which make building such links, which we pass to router link more convenient.
*/

<style scoped>
li {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
}

li h3 {
  margin: 0.5rem 0;
  font-size: 1.25rem;
}

li .team-members {
  margin: 0.5rem 0;
}

a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #11005c;
}

a:hover,
a:active {
  background-color: #220a8d;
}
</style>