<template>
    <div class="page-content" style="top:0px;"> 
        <div class="container">
            <div class="box-form">
                <div class="legend-titles ">
                    <div class="header-name padt10"> Giới thiệu chung</div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>

<script>
import About from './company/About.vue'
import OrganizationalStructure from './company/OrganizationalStructure.vue'
import MissionVision from './company/MissionVision.vue'
import VNPTCultural from './company/VNPTCultural.vue'
import ServiceQuality from './company/ServiceQuality.vue'
import DevelopmentCooperation from './company/DevelopmentCooperation.vue'
export default {
    data(){
        return{
            currentTab:1,
        }
    },
    methods:{
        changeTab(tab){
            // if(this.currentTab==tab){
            //     return
            // }
            // this.currentTab=tab
        },
    },
    components:{
        About,
        OrganizationalStructure,
        MissionVision,
        VNPTCultural,
        ServiceQuality,
        DevelopmentCooperation
    }
}
</script>

<style scoped>
    @import url("./Introduce.css");
</style>