<template>
  <button @click="confirmInput">confirm</button>
  <button @click="saveChanges">save changes</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data(){
    return {changesSaved: false}
  },
  methods:{
    confirmInput(){
      this.$router.push('/teams');
    },
    saveChanges(){
      this.changesSaved = true;
    }
  },
  // guard to avoid user to leave the page,
  beforeRouteLeave(to,from,next){
    console.log('userslist cmp beforeRouteLeave');
    console.log(to,from);

    if(this.changesSaved) next();
    else {
      const userWantstoLeave = confirm('Are you sure? You got unsaved changes!');
      next(userWantstoLeave);
    }
  },
  beforeRouteEnter(to,from,next){
    console.log('userslist cmp beforeRouteEnter');
    console.log(to,from);
    next();
  },
  unmounted(){
    console.log('unmounted');
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>

/*
There also is a useful guard, which is triggered when the user wants to leave a page.
Of course, when you leave a page and go to a number of page,all "the before guards" are triggered,

but maybe you also want to run some code on the component that is being left right before it's 
being left. And you possibly want to be able to deny "the leave this page actioned here."

But what do I mean by that?
Let's say on the user's list component, we wanna run code whenever this component is left.
We could do this with the unmounted lifecycle hook vue knows. If I locked this here,
this will be executed whenever we leave the user's page. So if I go to users and I leave to teams,
you see unmounted here.

But the problem is that this runs after the hooks, so after the navigation has been confirmed,
and this gives us no way of canceling the navigation. Now why might we want to cancel the navigation
from inside the component which we're leaving?

Well, let's say you had a form in there, and you wanna make sure that until that form has been saved,
you at least wanna warn the user, that there are unsaved changes, which would be lost if the page 
is left. And we can simulate this with a number button here, save changes and a new data property,

so for that I'm adding data to this user's list component,and there I have to change as saved 
property which initially is false.
*/