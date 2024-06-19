<template>
    <div class="page">
        <Header />
        <Sidebar />
        <div class="main-wrapper">
            <!-- <div class="page-content"> -->
                <transition name="router-main">
                    <router-view />
                </transition>
            <!-- </div> -->
            <!-- <Footer /> -->
        </div>
        <!-- <a id="back-to-top" href="#" class="btn btn-primary back-to-top" role="button" aria-label="Scroll to top" @click="topFunction()">
            <i class="fas fa-chevron-up"></i>
        </a> -->
        
        <Loader/>
    </div>
</template>

<script>

import "../assets/bootstrap/css/bootstrap.min.css"
import "../../src/assets/css/style.css"
import "../../src/assets/css/size.css"
import "../../src/assets/font-awesome/css/font-awesome.css"
import '../assets/css/loader.css'
import "../assets/jquery/split.js"
import "../assets/jquery/popper.js"
import "../components/config/config.css"

// Notification

import Header from "@/components/main/layout/Header.vue"
import Sidebar from "@/components/main/layout/Sidebar.vue"
import Footer from "@/components/main/layout/Footer.vue"
import Loader from "@/common/Loader.vue"


export default {
    name:"AdminLayout",
    components:{
        Header,
        Sidebar,
        Footer,
        Loader,
    },
    mounted(){
       
    }, 
    methods:{
        
    }
}
</script>
<style scoped>
   
</style>