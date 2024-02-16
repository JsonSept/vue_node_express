<template>
  <button @click="getFriends">Get Friends</button>
  <table>
    <tr>
      <th>ID</th>
      <th>NAME</th>
      <th>AGE</th>
    </tr>
    <tbody v-for="item,index in $store.state.friends" :key="item">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.age }}</td>
      <button @click="deleteFriend(item.name)">Delete</button>
      <button @click="editFriend(item.id)">Edit</button>

    </tbody>
  </table>
<input type="text" name="name" placeholder="name" v-model="name">
<input type="text" name="age" placeholder="age" v-model="age">

<button @click="addFriend()">Add</button>
</template>
<script>


export default {
  data(){
  return {
    name:null,
    age:null
  }
},
 methods: {
  deleteFriend(name){
      this.$store.dispatch('deleteFriend',name)
    },
    editFriend(id){
      let edit = {
        id:id,
        name:this.name,
        age:this.age
      }
      this.$store.dispatch('editFriend',id)
    }
  },
  computed:{
    postFriends(){
      this.$store.dispatch('postFriends',this.$data)
    },
    getFriends(){
      this.$store.dispatch('getFriends')
    },
   
  },
  mounted(){
    
    this.postFriends
    // this.deleteFriends
  },

}
</script>

<style>
table {
  border: solid 3px white;
}
 td {
  border: solid 3px white;
 } 
</style>