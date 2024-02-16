<template>
    <div>
        <input type="text" name="username" placeholder="username" v-model="username"><br><br>
        <input type="text" name="password" placeholder="password" v-model="password"><br><br>
        <button @click="registerUser">SignUp</button>
        {{ $store.state.loggedIn }}
        <button @click="loginUser">Login</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            username:null,
            password:null
        }
    },
    computed: {
        registerUser(){
            //console.log(this.$data)
            this.$store.dispatch("registerUser",this.$data)
        },
        loginUser(){
            this.$store.dispatch('loginUser',this.$data)
        }
    }
}
</script>
<style>
    
</style>