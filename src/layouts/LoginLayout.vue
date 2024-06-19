<template>
    <div class="page">
        <div class="login-wrapper">
            <div class="logo">
                <div class="text">
                    Trung tâm dạy học
                </div>
            </div>
		    <div class="bg" ></div>
                 <router-view/>
            <div class="copyright">
                Bản quyền &copy; Sở
            </div>
        </div>
    </div>
</template>

<script>

import '../assets/css/style.css'
import '../assets/css/size.css'
import "../assets/bootstrap/css/bootstrap.css"

export default {
    name:"LoginLayout"

}
</script>