<template>
    <div class="tc-pagination" :class="{nowrap:nowrap, ovauto: nowrap, h36:nowrap}">
        <a href="javascript:void(0)" class="btn fa fa-angle-double-left" :class="disabledPreviousButton" @click="pageChange(currentPage = 1)"></a>
        <!-- <a href="javascript:void(0)" class="btn fa fa-angle-double-left" :class="disabledDoublePreviousButton" @click="pageChange(currentPage = currentPage - 2)"></a> -->
        <a href="javascript:void(0)" class="btn fa fa-angle-left" :class="disabledPreviousButton" @click="pageChange(--currentPage)"></a>
        <span class="text">Bản ghi</span>
        <div class="dropdowns inline" :data-bss_pagination_identify="identify" :class="showDropdown">
            <div class="fw6 input-number" :data-bss_pagination_identify="identify" data-toggle="dropdown" @click="toggleDropdown">
                <span class="text-main" :data-bss_pagination_identify="identify">{{textMain}}</span>/{{totalRows}}
            </div>
            <div class="dropdown-menu" :data-bss_pagination_identify="identify" :class="showDropdown">
                <a href="javascript:void(0)" :data-bss_pagination_identify="identify" class="dropdown-item" v-for="item in optionsNumberRowPerPage" :key="item" @click="selectDropdownItem(item)">{{item}}</a>
            </div>
        </div>
        <a href="javascript:void(0)" class="btn fa fa-angle-right" :class="disabledNextButton" @click="pageChange(++currentPage)"></a>
        <!-- <a href="javascript:void(0)" class="btn fa fa-angle-double-right" :class="disabledDoubleNextButton" @click="pageChange(currentPage = currentPage + 2)"></a> -->
        <a href="javascript:void(0)" class="btn fa fa-angle-double-right" :class="disabledNextButton" @click="pageChange(currentPage = totalPage)"></a>
    </div>
</template>
<script>

export default {
    name: 'KPagination',
    props: {
        totalRows: Number,
        nowrap:{
            type:Boolean,
            default: false
        },
        optionsNumberRowPerPage:{
            type:Array,
            default:function () {
                return [10, 20]
            }
        }
    },
    computed: {
        disabledPreviousButton () {
            return this.currentPage > 1 ? '' : 'disabled'
        },
        disabledDoublePreviousButton () {
            return this.currentPage > 2 ? '' : 'disabled'
        },
        disabledNextButton () {
            return this.currentPage < this.totalPage ? '' : 'disabled'
        },
        disabledDoubleNextButton () {
            return this.currentPage < this.totalPage -1 ? '' : 'disabled'
        },
        totalPage () {
            return Math.ceil(this.totalRows / this.perPage)
        }
    },
    methods: {
        selectDropdownItem (value) {
            this.toggleDropdown()
            this.perPage = value
        },
        toggleDropdown () {
            this.showDropdown = !this.showDropdown ? 'show' : ''
        },
        considerHideDropdown (event) {
            if (event.target.getAttribute('data-bss_pagination_identify') != this.identify) {
                this.showDropdown = ''
            }
        },
        pageChange (pageIndex) {
            this.textMain = pageIndex == this.totalPage ? this.totalRows : pageIndex * this.perPage
            this.$emit('change', { currentPage: pageIndex, perPage: this.perPage })
        }
    },
    watch: {
        totalRows (newVal) {
            this.textMain = newVal > this.perPage ? this.perPage : newVal
            this.currentPage = newVal > 0 ? 1 : 0
            this.$emit('change', { currentPage: this.currentPage, perPage: this.perPage })
        },
        perPage (newVal) {

            if (this.currentPage > this.totalPage) {
                this.currentPage = this.totalPage
            }
            this.textMain = this.currentPage == this.totalPage ? this.totalRows : this.currentPage * newVal
            this.$emit('change', { currentPage: this.currentPage, perPage: this.perPage })
        }
    },
    mounted () {
        document.addEventListener('click', this.considerHideDropdown)
        this.$emit('change', { currentPage: this.currentPage, perPage: this.perPage })
    },
    data () {

        let defaultPerPage = this.optionsNumberRowPerPage[0]

        return {
            identify: Date.now() + '-' + Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 1000),
            perPage: defaultPerPage,
            textMain: this.totalRows > defaultPerPage ? defaultPerPage : this.totalRows,
            currentPage: this.totalRows > 0 ? 1 : 0,
            showDropdown: ''
        }
    }
}
</script>
<style scoped>
.text{
    
    margin-right: 5px;
}
.btn {
  padding: 5px 10px;
  border-radius: 4px;
  margin: 2px;
  background-color: #99a2e6 !important;
  border-color: #caedff !important;
}
.tc-pagination .btn {
  width: 24px;
  padding: 0px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background: #99a2e6 ;
  border-radius: 4px;
  color: #333333!important;
  font-size: 14px;
  display: inline-block;
}
.tc-pagination .btn:hover {
  background-color: #99a2e6 !important;
  color: #fff!important;
}
.tc-pagination .text {
  font-size: 12px;
  display: inline-block;
}
.tc-pagination .select-custom {
  display: inline-block;
}
.tc-pagination .form-control {
  height: 30px;
  font-size: 12px;
}
.tc-pagination .dropdown .input-number {
  height: 30px;
  font-size: 12px;
  border: 1px solid #C3C8D2;
  border-radius: 4px;
  padding: 0px 5px;
  padding-right: 20px;
  display: inline-block;
  vertical-align: middle;
  line-height: 30px;
  width: 90px;
}
.tc-pagination .dropdown .input-number:before, .tc-pagination .dropdown .input-number:after {
  height: 10px;
  width: 17px;
  background-color: #fff;
  content: "";
  position: absolute;
  right: 5px;
  font-family: ap;
  pointer-events: none;
  line-height: 10px;
  text-align: center;
  font-size: 9px;
  font-weight: normal;
}
.tc-pagination .dropdown .input-number:before {
  content: "";
  top: 6px;
}
.tc-pagination .dropdown .input-number:after {
  bottom: 6px;
  content: "";
}
.nowrap {
  white-space: nowrap !important;
}
.ovauto {
  overflow: auto !important;
}
.h36 {
  height: 36px !important;
}
.inline {
  display: inline-block !important;
}
.fw6 {
  font-weight: 400;
  font-size: 14px;
}
.text-main {
  color: #0176FF !important;
}
.dropdown-menu a {
  display: block;
  padding: 7px 10px;
  text-decoration: none;
  color: #000;
}
.dropdown-menu a:hover {
  background-color: #f9f9f9;
  color: #035FCC;
}
.dropdown-menu a.active {
  background-color: rgba(1, 118, 255, 0.1);
}
.disabled{
  cursor: default;
  pointer-events: none;
  text-decoration: none!important;
  color: grey!important;
}
</style>
