<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <!-- if you're another route another than team 2 members it will not do anything
      except changing url
     -->
    <router-link to='/teams/t2'>Go to team 2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject:['users','teams'],
  components: {
    UserItem
  },
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  methods:{
    loadTeamMembers(route){
      const teamId = route.params.teamId;
    const selectedTeam = this.teams.find(team => team.id === teamId);

    const members = selectedTeam.members;
    const selectedMembers = [];

    for(const member of members){
      const selectedUser = this.users.find(user => user.id === member);
      selectedMembers.push(selectedUser);
    }
    this.members = selectedMembers;
    this.teamName = selectedTeam.name;
    }
  },
  created(){
    /* the route param change in every url change so we can watch on changes in route */
    // will add this in new method so that we can change routein url change

    // const teamId = this.$route.params.teamId;
    // const selectedTeam = this.teams.find(team => team.id === teamId);

    // const members = selectedTeam.members;
    // const selectedMembers = [];

    // for(const member of members){
    //   const selectedUser = this.users.find(user => user.id === member);
    //   selectedMembers.push(selectedUser);
    // }
    // this.members = selectedMembers;
    // this.teamName = selectedTeam.name;

    this.loadTeamMembers(this.$route);
  },
  watch:{
    /*now we're watching changes in routes*/
    $route(newRoute){
      this.loadTeamMembers(newRoute);
    }
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>