<template>
  <button class="normal"
    :class="[type, {disabled: disabled||isLoading}]"
    :disabled="disabled||isLoading"
    :style="{'font-size': fontSize + 'px', 'border-radius': borderRadius+'px'}"
    @click="callback($event)">
        <slot v-if="!isLoading" name="icon">
            <!-- icon -->
        </slot>
        <slot v-if="!isLoading" class="k">
           Submit
        </slot>
        <span v-if="isLoading" class="k spinner"></span>
  </button>
</template>
<script>
//Prop param
//fontSize: unit px
//borderRadius
//disabled
export default {
    name:'k-button',
    props:{
        type: {
            type:String,
            default:'default'
        },
        disabled: {
            type:Boolean,
            default:false
        },
        fontSize:{
            type:Number,
            default: 14
        },
        borderRadius:{
            type:Number,
            default: 6
        },
        loading:{
            type:Boolean,
            default:false
        },

    },
    data(){
        return{
            isLoading:this.loading
        }
    },
    methods:{
        callback: function(e) {
            this.$emit('click', e);
        }
    },
    watch:{
        loading(val){
            this.isLoading=val
        }
    }
}
</script>
<style scoped>
button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  color: #333;
  background-color:#fff;
  border-radius: 4px;
  font-size: 14px;
  font-family: arail;
  cursor: pointer;
  display: inline-block;
}
.disabled{
    cursor: not-allowed;
}
.danger {
    background-color: #ff4949;
    color: #fff;
}
.danger:hover {
    background-color: #fc6d6d;
    color: #fff;
}
.success {
    background-color: #13ce66;
    color: #fff;
}
.success:hover {
    background-color: #3cd882;
    color: #fff;
}
.info {
    background-color: #50bfff;
    color: #fff;
}
.info:hover {
    background-color: #73c5f5;
    color: #fff;
}
.primary{
    color: #fff;
    background-color: #007bff;
}
.primary:hover{
    color: #fff;
    background-color: #409EFF;
}
.default {
    background-color: #409EFF;
    color: #fff;
}
.default:hover {
    background-color: #73c5f5;
    color: #fff;
}
.warning {
    background-color: #ffc107;
    color: #fff;
}
.warning:hover {
    background-color: #f1ce64;
    color: #fff;
}

.spinner {
  animation: spin 1s infinite ease-in-out; 
    /* animation: dash 2s infinite ease-in-out;  */
  border-radius: 50%;
  border-top: 2px solid #fff;
  display: inline-block;
  height: 20px;
  width: 20px;
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg); 
    -o-transform: rotate(360deg); 
    transform: rotate(360deg); 
  }
}

@keyframes dash {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>