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