<template>
		<div class="box-login">
			<div class="head">
				ĐĂNG NHẬP
			</div>
			<div class="form" >
				<div class="form-group">
					<div class="input-icon">
						
						<input type="text" placeholder="Tên đăng nhập" class="form-control" v-model="request.username" >
						<i class="fa fa-user icon " aria-hidden="true"></i>
					</div>
				</div>
				<div class="form-group mart15">
					<div class="input-icon -show">
						<input type="password" placeholder="Mật khẩu" class="form-control" id="myPass" v-model="request.password" >
						<i class="fa fa-lock icon " aria-hidden="true"></i>
						<span @click="showPass()"><i class=" icon-show" v-bind:class="[isActive ? 'fa fa-eye-slash' : 'fa fa-eye']" aria-hidden="true"></i></span>
						<!-- <i class=" icon-show" aria-hidden="true"></i> -->
					</div>
				</div>
				<div class="actions">
					<button class="btn btn-main"  @click="login($event)"  :disabled="disableButton">
						<i class="fa fa-spinner fa-spin ic-loading"></i>
						Đăng nhập
						
					</button>
				</div>
				<div class="form-group mart10 marb0">
					Đăng nhập bằng tài khoản
				</div>
				<div class="form-group social-text center">
					<div class="social-media">
						<a href="" class="social-icon">
							<i class="fa fa-facebook" title="Facebook" aria-hidden="true"></i>
						</a>
						<a href="" class="social-icon">
							<i class="fa fa-google " title="Google" aria-hidden="true"></i>
						</a>
						<a href="" class="social-icon">
							<i class="fa fa-github" title="Github" aria-hidden="true"></i>
						</a>
					</div> 
				</div>
				<div class="form-group mart0 marb0">
					Đăng ký tài khoản mới <a href="" @click.prevent="onDangky">Đăng ký</a>
				</div>
			</div>
		</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import AuthApi from './AuthApi';
export default {
	name:"Login",
	data(){
        return{
			isActive: false,
            request:{
                username:'',
                password:''
            },
			disableButton:false
        }
    },
	computed: {
		...mapState('user', [
			'accessToken'
		]),
		...mapGetters('user', [
			'isAuthenticated'
		])
	},
	mounted(){
		
	},
    methods:{
		...mapActions('user', [
			'login',
			'setCurrentUser',
			'setAccessInfo',
			'clearCurrentUser'
		]),
		showPass() {
			this.isActive=!this.isActive
			var x = document.getElementById("myPass")
			if (x.type === "password") {
				x.type = "text"
			} else {
				x.type = "password";
			}
		},
		onDangky(){
			this.$router.push({name: 'Register'})
		},
		async login (event) {
			try {
				var rq = {
					'username': this.request.username,
					'password': this.request.password
				};
				this.$('.ic-loading').css('display','inline-block');
				let response = await AuthApi.login(this.axios, rq);
				if(response.data.success){
					this.$('.ic-loading').css('display','none');
					if(response.data.data){
						await this.saveToken(response);
						await this.redirectToHome(response.data.data.user);
						this.disableButton = true;
					}
				}
				else{
					this.$toast.error(response.data.message);
					this.$('.ic-loading').css('display','none');
					this.disableButton = false;
				}

			} catch (err) {
				this.$toast.error(err.message);
				this.$('.ic-loading').css('display','none');
				this.disableButton= false;
			}
		},
		async redirectToHome(rq){
			if(rq.role == 2){
				this.$router.push({name: 'Home'});
			}
			else{
				this.$router.push({name: 'Statistical'});
			}
		},
		async saveToken(response){
			if (typeof Storage !== "undefined") {
                    let value = {
                      token: response.data.data.token.access_token,
					  user:{
						  usid: response.data.data.user.usid,
						  username:response.data.data.user.username,
						  fullname:response.data.data.user.fullname,
					  },
                      expires: response.data.data.token.expires_in,
                      timelogin: new Date().getTime()
                  };
                  var today = new Date();
                  var nexthour = new Date();
                  nexthour.setDate(today.getDate() + 1);
                  document.cookie ="vnpt_news_token=" +JSON.stringify(value);
			}
			else{
				alert("Trình duyệt không được hỗ trợ");
			}
		}
	}
}
</script>
<style  scoped>
    @import url("./login.css");
</style>