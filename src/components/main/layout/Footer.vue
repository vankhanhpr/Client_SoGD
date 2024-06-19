<template>
    <footer class="footer">
        <div class="row">
            <div class="col-lg-4 col-12">
                <div class="logo">
                    <a class="img">
                        <img src="../../../assets/img/logo.svg">
                    </a>
                    <span class="title-footer">Footer</span>
                </div>
            </div>
            <div class="col-lg-4 col-12">
                <span class="title-name">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    Địa chỉ:Quận 1, Thành phố Hồ Chí Minh |   <br/>
                    <i class="fa fa-volume-control-phone" aria-hidden="true"></i> 
                    Điện thoại: |
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    Email: 
                </span>
                
            </div>
            <div class="col-lg-4 col-12">
                 <span class="title-name"> Kết nối với chúng tôi:
                     <div class="social-medias">
						<a href="" class="social-icons">
							<i class="fa fa-facebook icon-color" title="Facebook" aria-hidden="true"></i>
						</a>
						<a href="" class="social-icons">
							<i class="fa fa-google icon-color" title="Google" aria-hidden="true"></i>
						</a>
						<a href="" class="social-icons">
							<i class="fa fa-github icon-color" title="Github" aria-hidden="true"></i>
						</a>
					</div> 
                 </span>
            </div>
        </div>
        <!-- <div class="container">
            <div class="contact-info">
                <h3>
                    <span class="title-footer">
                        Viễn Thông Thành Phố Hồ Chí Minh VNPT
                    </span>
                    <br/>
                    <span class="title-name">
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        Địa chỉ: 125 Hai Bà Trưng, Quận 1, Thành phố Hồ Chí Minh
                    </span>
                    <br/>
                    <span class="title-name">
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                        Email: hentvh.hcm@vnpt.vn
                    </span>
                    <br/>
                    <span class="title-name">
                        <i class="fa fa-volume-control-phone" aria-hidden="true"></i>
                        Điện thoại: 0969399928 - 0833383352
                    </span>
                    
                </h3>
            </div>
            <div class="footer_right ">
                <h3 class="marl40">
                    <span class="title-footer">
                        Thông tin hỗ trợ
                    </span>
                    <br/>
                    <span class="title-name">
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        Địa chỉ: 125 Hai Bà Trưng, Quận 1
                    </span>
                    <br/>
                    <span class="title-name">
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                        Email: hentvh.hcm@vnpt.vn
                    </span>
                    <br/>
                    <span class="title-name">
                        <i class="fa fa-volume-control-phone" aria-hidden="true"></i>
                        Điện thoại: 0969399928 - 0833383352
                    </span>
                    
                </h3>
            </div>
        </div> -->
    </footer>
</template>

<script>
export default {
    name:"Footer"
}
</script>
<style scoped>
.contact-info, .footer_right {
    width: 50%;
    float: left;
    text-align: left;
    align-items: center;
}
.title-footer{
    border-bottom: 1px solid #fff;
    align-items: center;
}
.title-name{
    font-size: 15px;
    align-items: center;
}
.social-text{
  padding: .7rem 0;
  font-size: 1rem;
}
.social-medias{
  display: flex;
  justify-content: center;
}
.social-icons{
 height: 35px;
 width: 35px;
 border: 2px solid #fff;
 margin: 0 0.45rem;
 display: flex;
 justify-content: center;
 align-items: center;
 text-decoration: none;
 color:#fff;
 font-size: 1.1rem;
 border-radius: 50%;
 transition: all 0.5s ease;
}
.icon-color{
    color: #fff;
}
.social-icon:hover{
  color: #4481eb;
  border-color:var(--main-color) ;
}

/* .fa-facebook{
  color: #4481eb;
}
.fa-google{
  color: #e94235;
} */
</style>