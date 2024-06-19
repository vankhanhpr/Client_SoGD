<template>
    <div class="main-wrapper">
        <k-table :columns = "colums" :dataSources ="dataSources"  @dataCheckeds="dataCheckeds"
                @onRowCheckChange = "onRowCheckChange" :allowCheckBox ="true" :allowFilter ="true">
        </k-table>
    </div>

</template>

<script>
// js
// import PostsApi from './PostsApi';
// const baseUrl = process.env.API + "/news/";
// const baseUrlSV = process.env.API + "/services/";
// const baseUrl_Banner = process.env.API + "/banner/";
export default {
    name:"Home",
    data(){
        return{
            dataSources:[
            ],
        colums:[
            {
                field: "id",
                label: "id",
                allowFilter: true
            },
            {
                field: "name",
                label: "Họ và tên",
                allowFilter: true
            },
            {
                field: "address",
                label: "Địa chỉ",
                allowFilter: true
            },
            {
                field: "email",
                label: "Email",
                allowFilter: true
            }
        ]
        }
    },
    methods:{
        redirectToNews(){
            this.$router.push({name: 'News'});
		},
        redirectToService(){
            this.$router.push({name: 'Service'});
		},
        goToLink(link){
            if(link ==0){
                window.location.href='/tin-tuc';
            }
            else{
                
                window.location.href='/dich-vu';
            }
        },
        onRowCheckChange(data){
        },
        dataCheckeds(data){
        }
    },
    async mounted(){
        this.dataSources =[
            {
                id:1,
                name:"Nguyen van A",
                address: "Q1 TP.HCM",
                email:"Abc@gmail.com"
            },
            {
                id:2,
                name:"Nguyen van B",
                address: "Q1 TP.HCM",
                email:"Abc@gmail.com"
            },
            {
                id:3,
                name:"Nguyen van C",
                address: "Q1 TP.HCM",
                email:"Abc@gmail.com"
            },
        ]
    },
    components: { 
    },
}
</script>

<style scoped>
    @import url("./home.css");
</style>