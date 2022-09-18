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
    <router-link to='/teams/t2'>Go to team 2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  props:['teamId'],
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
    loadTeamMembers(teamId){
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
    this.loadTeamMembers(this.teamId);
    console.log(this.$route.query); 
  },
  watch:{
    teamId(newId){
      this.loadTeamMembers(newId);
    }
  },
  /*
  5 - One is the before route update guard, which you call directly inside of a component.
  To be precise, inside of components which are reused, which in our case would be the team members 
  component. Here we got the parameter, the team ID parameter, and it's absolutely possible that we 
  are on the page of one team and we load another team members page.
  
  And then this team members page never leaves the screen and hence is reused, as you learned.
  In such cases, view router will call another nice method in the component conflict object.
  Maybe here next to created, there you can add the beforeRouteUpdate method 
  and view will call this method whenever this component is about to be reused with new data,
  because the route changed. So here we also get to, from and next,
  and then you can also deny or confirm the navigation just as you know it, just as I explained it 
  before on the Global beforeEach hook, it's the same here.

  Now of course, we already have logic in place here to handle the changing team ID route parameter
  in this component, so we don't need beforeRouteUpdate for that, but using beforeRouteUpdate
  would be an alternative to watching the team ID prop, for example. Though of course, with that 
  hook, we again bind this component to be used with routing. We use props instead of route params
  to make this component more flexible. When we use this alternative, 
  we would make it less flexible, because this is only called if this component is loaded
  and reloaded through routing of course.
  */

 beforeRouteUpdate(to,from,next){
  console.log('team members cmp beforeRouteUpdate');
  console.log(to,from);
  // this.loadTeamMembers(to.params.teamId);
  next();
 },

  // 3- added beforeRouteEnter to guard comp when the route comp is accessed
  beforeRouteEnter(to,from,next){
    console.log('userslist cmp beforeRouteEnter');
    console.log(to,from);
    next();
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