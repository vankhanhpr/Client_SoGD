<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
.owl-theme .owl-nav{
    width: 100%;
    text-align: right !important;
    margin-top: 0px !important;
}
.owl-theme .owl-nav .owl-next,
.owl-theme .owl-nav .owl-prev{
    border: 1px solid #e0e0e0;
    background-color: #fff !important;
    color: #2c3e50;
    transition: .2s ease;
}
.owl-theme .owl-nav .owl-next:hover,
.owl-theme .owl-nav .owl-prev:hover{
    border: 1px solid #e0e0e0;
    background-color: #fff !important;
    color: #2c3e50;
    transition: .2s ease;
}
.brd{
    display: none !important;
}


</style>
