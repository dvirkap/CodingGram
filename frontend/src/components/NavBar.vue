<template>
    <div class="NavBar">
        nav-bar <Search></Search>
        nav buttons <NavBarButtons></NavBarButtons>
    </div>

</template>

<script>
import Search from '@/components/Search.vue'
import NavBarButtons from '@/components/NavBarButtons.vue'

export default {
name: "NavBar",
components: {
    Search,
    NavBarButtons,
  },
}
</script>

<style>
    
</style>
