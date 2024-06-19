<template>
     <div class="header">
        <!-- <div class="nav-toggle">
            <span class="fa  fa-bars"></span>
        </div> -->
        <div class="pull-left">
            <div class="logo">
                <a class="img">
                    <!-- <img src="../../../assets/img/logo.svg"> -->
                </a>
                <span class="text txtmobile">THÀNH PHỐ HỒ CHÍ MINH</span> 
               
            </div>
        </div>
        <div class="">
           
        </div>
        <div class="pull-right">
           
            
            <!-- <div class="menus-right" v-show="isLogin">
                
                <ul class="dropdown_profile">
                    <li>
                        <a href="#">  <div class="avatar" ></div> <span class="username"> Tạ Văn Hoàng Hên</span></a>
                        <ul>
                            <li><a href=""> Thông tin cá nhân</a></li>
                            <li><a href="#">Ngôn Ngữ</a>
                                <ul>
                                    <li><a href="">Tiếng Việt</a></li>
                                    <li><a href="">Tiếng Anh</a></li>
                                    <li><a href="#">Dropdown</a>
                                        <ul>
                                            <li><a href="">Submenu - 1</a></li>
                                            <li><a href="">Submenu - 2</a></li>
                                            <li><a href="">Submenu - 3</a></li>
                                        </ul>
                                    </li> 
                                </ul>
                            </li>
                            <li><a href="">Đổi mật khẩu</a></li>
                            <li><a href="">Đăng xuất</a></li>
                        </ul>
                    </li>
                </ul>
            </div> -->
            <span class="text-company pad5" > 
                <i class="fa fa-envelope-o padr5" aria-hidden="true" title="hentvh.hcm@vnpt.vn"></i> 
                <span class="txtmobile" title="Email">cabcvnpt.vn</span>
            </span> |
            <span class="text-company pad5" title="Số điện thoại" > 
                <i class="fa fa-phone" aria-hidden="true" title="1800 1091"></i>
                <span class="txtmobile"> 1800 1000 </span>  
            </span> |
            <span class=" text-company padr30 pad5" title="Địa chỉ"> 
                <a class="btnhover text-company" href="https://maps.app.goo.gl/xQEvrTEmAS2shV2K9"> 
                     <i class="fa fa-map-marker" aria-hidden="true"></i> 
                </a> 
            </span>  
            <span class=" sitename" v-if="isLogin"> 
                <a class="btnhover" href="login"> 
                    <span class="txt-us"> {{this.fullname}} | </span>  
                </a> 
            </span> 
            <span class=" sitename"> 
                <a class="btnhover" @click="handleLogin"> 
                    <i class="fa fa-sign-out padr5 padl5" aria-hidden="true" v-if="isLogin"></i> 
                    <i class="fa fa-sign-in padr5 padl5" aria-hidden="true" v-if="!isLogin"></i>
                    <span class="txtmobile">{{this.labelLogin}} </span> 
                </a>
            </span> | 
            <span class="languageimg padl7 padr7" title="Tiếng việt"> 
                <a href="">
                    <img src="../../../assets/img/language/vn.jpg" alt=""> 
                </a>
            </span>
            <!-- <span class="languageimg padl7 padr7" title="Tiếng Anh"> 
                <a href="">
                    <img src="../../../assets/img/language/en.jpg" alt=""> 
                </a>
            </span> -->
        </div>

    </div>
</template>

<script>
export default {
    name:"Header",
    data(){
        return{
            isLogin:false, 
            username:'',
            fullname:''
            
        }
    },
    mounted(){
         this.fullname= this.$token.getFullname()
         this.isLogin = this.$token.getToken()!=null

    },
    computed:{
        labelLogin(){
            return this.isLogin?"Đăng xuất":"Đăng nhập"
        }
    },
    methods:{
        handleLogin(){
            if(this.isLogin){
                this.logout()
            }else{
                this.login()
            }
        },
        login(){
            this.$router.push({ name: "Login" });
        },
        redirectToRegister(){
			this.$router.push({name: 'Register'})
		},
        logout(){
            document.cookie = "vnpt_news_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            window.location='/';

        }
        
    },

}
</script>

<style>
   @import url("./header.css");
    

</style>