<template>


		<div class="box-login">
			<div class="head">
				Đăng ký
			</div>
			<div class="form"  >
				<div class="form-group marr5">
					<div class="input-icon">
						<i class="fa fa-envelope-o icon padr5" aria-hidden="true"></i>
						<input type="text" ref="inputEmail" placeholder="Nhập email" class="form-control" v-model="request.email" >
						
					</div>
				</div>
				<div class="form-group mart15 marr5">
					<div class="input-icon">
						<input type="text" ref="inputFullname" placeholder="Họ và tên" class="form-control" v-model="request.fullname" >
						<i class="fa fa-user-circle  icon padr5" aria-hidden="true"></i>
					</div>
				</div>
				<div class="form-group mart15 marr5">
					<div class="input-icon">
						<input type="text" ref="inputPhone" placeholder="Nhập số điện thoại" class="form-control" v-model="request.phone" >
						<i class="fa fa-phone icon" aria-hidden="true"></i>
					</div>
				</div>
				<div class="form-group mart15 marr5">
					<div class="input-icon">
						<input type="text" ref="inputUsername" placeholder="Tên đăng nhập" class="form-control" v-model="request.username" >
						<i class="fa fa-user icon " aria-hidden="true"></i>
					</div>
				</div>
				<div class="form-group mart15 marr5">
					<div class="input-icon -show">
						<input type="password" ref="inputPassword" placeholder="Mật khẩu" class="form-control" id="myPass" v-model="request.password" >
						<i class="fa fa-lock icon " aria-hidden="true"></i>
						<span @click="showPass()"><i class=" icon-show" v-bind:class="[isActive ? 'fa fa-eye-slash' : 'fa fa-eye']" aria-hidden="true"></i></span>
						<!-- <i class=" icon-show" aria-hidden="true"></i> -->
					</div>
				</div>
				<div class="actions">
					<button class="btn btn-main" @click="Register">Đăng ký</button>
				</div>
                <div class="form-group mart15 marb0">
					Đã có tài khoản <a href="" @click.prevent="onDangNhap">Đăng nhập</a>
				</div>
			</div>
		</div>
</template>

<script>
import RegisterApi from './AuthApi'
export default {
	name:"Login",
	data(){
        return{
			isActive: false,
			RegisterList:[],
            request:{
                email:'',
				phone:'',
				username:'',
                passwword:'',
				fullname:''
            },
        }
    },
	computed: {
	},
    methods:{
		showPass() {
			this.isActive=!this.isActive
			var x = document.getElementById("myPass")
			if (x.type === "password") {
				x.type = "text"
			} else {
				x.type = "password";
			}
		},
        onDangNhap(){
            this.$router.push({name: 'Login'})
        },
		validateEmail() {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.request.email)) {
               return true
            } else {
                return false
            }
        },
		async Register(){
			try{
                if(!this.validateEmail()){
                    this.$toast.warning("Bạn nhập email chưa hợp lệ!");
                    this.$refs.inputEmail.focus()
                    return
                }
				if(this.request.fullname.trim() == ""){
                    this.$toast.warning("Bạn chưa nhập họ và tên!");
                    this.$refs.inputFullname.focus()
                    return
                }
				if(this.request.phone.trim() == ""){
                    this.$toast.warning("Bạn chưa nhập số điện thoại!");
                    this.$refs.inputPhone.focus()
                    return
                }
				if(this.request.username.trim() == ""){
                    this.$toast.warning("Bạn chưa nhập tên người dùng!");
                    this.$refs.inputUsername.focus()
                    return
                }
				if(this.request.password.trim() == ""){
                    this.$toast.warning("Bạn chưa nhập mật khẩu!");
                    this.$refs.inputPassword.focus()
                    return
                }
				let data = this.request
				let response = await RegisterApi.Register(this.axios, data)
				if(response.data.success){
					
					this.RegisterList=response.data.data
					this.$toast.success('Bạn đăng ký thành công, vui lòng vào đăng nhập!')
					this.redirectToLogin()
				}
				else{
					this.$toast.error(response.data.message)
				}
			}catch(e){
				this.$toast.error(e.message)	
			}
			
		}, 
		redirectToLogin(){
			this.$router.push({name: 'Login'})
		}
	}
}
</script>