<template>
  <button @click="confirmInput">confirm</button>
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
  methods:{
    confirmInput(){
      //wanna redirect away programmatically
      //router obj is pushed from vue-router library, push is adding url in main url
      this.$router.push('/teams');
      // this.$router.forward();
      // move back to url which is previously visited page
      // this.$router.back();
    }
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