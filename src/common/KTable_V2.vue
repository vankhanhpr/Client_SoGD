<template>
  <div class="table-custom">
    <div class="table-content" :style="{height:tableHeight==0?'auto':(tableHeight+'px')}">
      <table class="table-result table-gachle" >
        <thead class="center">
          <tr>
            <th class="w20"></th>
            <th class="w20" v-if="allowCheckBox&&labelCheckColumn">Chọn</th>

            <th v-if="allowCheckBox&&!labelCheckColumn" class="w20">
              <div class="check-action">
                <input type="checkbox" class="check" v-model="allCheckbox" @change="allChangeCheckbox($event)"/>
                <span class="name"></span>
              </div>
            </th>

            <th v-for="item in columns_data" :key="item.field">{{item.label}}</th>
          </tr>
          <tr v-if="allowFilter">
            <th class="w20"></th>

            <th v-if="allowCheckBox" class="w20">
              <div class="check-action">
                <input type="checkbox" v-if="!labelCheckColumn" :disabled="true" class="check" />
                <input type="checkbox" v-else v-model="allCheckbox" @change="allChangeCheckbox($event)" class="check" />
                <span class="name"></span>
              </div>
            </th>

            <th v-for="item in columns_data" :key="item.field">
              <div v-if="item.allowFilter" class="nput-icon-right">
                <!-- @change input after enter search -->
                <input type="text" class="form-control" @keyup="filterChange" v-model="filterValues[item.field]" />
                <span class="icon nc-icon-outline ui-1_zoom"></span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in pagerData"  :key="index" @click="onSelectedRow(fromIndexPage+index+1, item)" @dblclick="doubleClickRow(fromIndexPage+index+1, item)" :class="{highlight: rowSelected==fromIndexPage+index+1}">
            <td class="w20 center" :class="{highlight1: (rowSelected==fromIndexPage+index+1)}">
                <span class="fa fa-play text-main" v-if="rowSelected==fromIndexPage+index+1"></span>
            </td>
            <td v-if="allowCheckBox" class="w20 center" :class="{highlight1: (rowSelected==fromIndexPage+index+1)}">
              <div class="check-action">
                <input type="checkbox" class="check" v-model="item.checked" @change="onRowCheckChange($event, item)"/>
                <span class="name"></span>
              </div>
            </td>
            <!-- selected: (rowSelected==fromIndexPage+index+1),  -->
            <td v-for="(column, i) in columns_data" :key="i" :class="{highlight1: (rowSelected==fromIndexPage+index+1)}">{{item[column.field]}}</td>

          </tr>
          <tr v-if="numberRecords==0" class="empty">
            <td :colspan="totalColumns" class="text-center">
              Không có bản ghi nào để hiển thị
            </td>
          </tr>

        </tbody>
      </table>
    </div>
    <KPagination :totalRows = "numberRecords" @change="onChangePage" :optionsNumberRowPerPage="optionsNumberRowPerPage" :nowrap="nowrap"/>
  </div>
</template>
<script>
// callback
// onSelectedRow return item
// onRowSelectedIndex return index row begin 1
// doubleClickRow return item
// dataCheckeds return data is checked
import KPagination from './KPagination.vue'
export default {
    name:'k-table_v2',
    props:{
        dataSources:{
          type:Array,
          default: ()=>[],
          required: true
        },

        optionsNumberRowPerPage:{
            type:Array,
            default: function () {
                return [15, 30]
            }
        },
        allowFilter:{
            type:Boolean,
            default:false
        },
        allowCheckBox:{
            type:Boolean,
            default:false
        },
        tableHeight:{
          //exm: 120px
          type:Number,
          default:0
        },
        nowrap:{
          type:Boolean,
          default: false
        },
        //begin 1-> size row
        rowSelectedIndex:{
          type:Number,
          default:-1
        },

        labelCheckColumn:{
          type:Boolean,
          default:false
        },
        columns:{
            type:Array,
            default:()=>[],
            required: false
        },

    },
    data(){
        return{
            filterValues:{},
            dataSourceFilters:[],
            pagerData:[],
            fromIndexPage:0,
            rowSelected:this.rowSelectedIndex,
            allCheckbox:false,
            dataChecks:[],
            columns_data: this.columns
        }
    },
    methods:{
        onChangePage(data){
         // { currentPage: this.currentPage, perPage: this.perPage }
            if(data.currentPage>0){

              let to=data.currentPage*data.perPage
              let from =to-data.perPage
              this.fromIndexPage=from
              this.pagerData=this.dataSourceFilters.slice(from, to)
            }else{
              this.pagerData=[]
            }

        },
        onSelectedRow(rowIndex, item){
          this.rowSelected=rowIndex
          this.$emit('onSelectedRow', item)
          this.$emit('onRowSelectedIndex', this.rowSelected)
        },
        doubleClickRow(rowIndex, item){
          this.$emit('doubleClickRow', item)
        },
        filterChange(){
          self=this;
          this.dataSourceFilters=this.dataSources.filter((item)=>{
            var result=true;
            self.columns_data.forEach((column)=>{
              if(column.allowFilter&&self.filterValues[column.field]){
                result=result&&((item[column.field]!=null?item[column.field].toString().trim().toLowerCase():"").indexOf(self.filterValues[column.field].toString().trim().toLowerCase())>-1)
              }
            })
            return result;
          })
        },
        allChangeCheckbox(event){
          if (event.target.checked) {
            this.dataChecks=[]
            this.dataSources.forEach((item)=>{
              item.checked=true
              this.dataChecks.push(item)
            })
            this.$emit('dataCheckeds',this.dataChecks)
          }else{
            this.dataSources.forEach((item)=>{
              item.checked=false
            })
            this.dataChecks=[]
            this.$emit('dataCheckeds',this.dataChecks)
          }
        },
        onRowCheckChange(event, item){
          if (event.target.checked) {
            this.dataChecks.push(item)
          }else{
            const index = this.dataChecks.indexOf(item);
            if (index > -1) {
              this.dataChecks.splice(index, 1);
            }
          }
          this.allCheckbox=false
          this.$emit('dataCheckeds',this.dataChecks)
        },
        renderTitleAndData(dataViews){
            if(dataViews.length<=0){
                return;
            }
            var self= this;
            self.dataSources = [];
            self.columns_data = [];
            Object.keys(dataViews[0]).forEach((key) => {
                self.columns_data.push(key.toLowerCase());
            });

            dataViews.forEach(element => {
                var  listTemp =[];
                Object.keys(element).forEach((key) => {
                    listTemp.push(element[key]);
                });
                self.dataSources.push(listTemp);
            });
        },
    },
    watch: {
          
      	  dataSources: function(newVal, oldVal) { // watch it
           newVal.forEach((item)=>{
             item.checked=false
           })
          
           if(newVal.length>0 && this.columns.length ==0 ){
            this.columns_data=[]
              Object.keys(newVal[0]).forEach((key) => {
                  this.columns_data.push({
                    field: key,
                    label: key.toLowerCase(),
                    allowFilter: true
                  })
              });
              const index = this.columns_data.findIndex(x=>x.field == "checked")
              if (index > -1) {
                this.columns_data.splice(index, 1);
              }
           }


           this.pagerData=[]

           this.dataSourceFilters=newVal

           //reset filter
           this.filterValues={

           }
           this.dataChecks=[]
           this.rowSelected=this.rowSelectedIndex
           this.allCheckbox=false
        },
        rowSelectedIndex(val){
          this.rowSelected=val
        },
        // columns(val){
        //   this.columns_data =val
        // }
    },
    computed:{
      numberRecords(){
        return this.dataSourceFilters.length;
      },
      totalColumns(){
          var total=this.columns_data.length+1
          if(this.allowCheckBox)
            return total+1
          return total
      }
    },
    // created(){
    //   this.columns_data = this.columns
    // },
    components:{
        KPagination,

    },
}
</script>
<style scoped>
.k{
  position: relative;
  float: left;
}
.table-custom{
    /* margin:5px; */
    position: relative;
    float: left;
    width: 100%;
}
th{
    font-size: 14px;
}
.table-content {
  overflow: auto;
  margin-bottom: 10px;
}
.table-content .bootstrap-table {
  margin-bottom: 0px;
}
.table-result {
  width: 100%;
  font-size: 14px;
  background: #fff;
  white-space: nowrap;
}
.table-result td, .table-result th {
  padding: 5px 7px;
  /* border: 1px solid #f8f6ff; */
  border: 0.5px solid rgba(28, 117, 188 , 0.5) !important;
  height: 35px;
}
.table-result td.selected, .table-result th.selected {
  border-left: 2px solid #035FCC;
}
.table-result td.selected1, .table-result th.selected1 {
  border-right: 2px solid #035FCC;
}
.table-result th {
  background-color: #008acc;
  border: 1px solid #FFFFFF !important;
  white-space: nowrap;
}
.table-result th.selected {
  border-left: 2px solid #035FCC;
}
.table-result th.selected1 {
  border-right: 2px solid #035FCC;
}
.table-result th {
  font-weight: 600;
  color: white;
}
.table-result tbody tr:nth-child(2n+2) {
  background: #f8f6ff;
}
.table-result .form-control {
  height: 28px;
  min-width: 40px;
}
.table-result .highlight {
  background-color: #FFF9EB !important;
  cursor: pointer !important;
}
.table-result .highlight1 {
  background-color: #F9E1A9 !important;
}
.table-result .highlight4 {
  background-color: #FFF0C8 !important;
}
.table-result .highlight2 {
  background-color: #6c7ae0 !important;
}
.table-result .highlight3 {
  background: #99D7F8 !important;
}

.table-result .fa-play {
  font-size: 12px;
}
.table-result .td-input {
  position: relative;
  cursor: pointer;
}
.table-result .td-input .form-control {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 10;
  height: auto;
  border: 0px;
  border-radius: 0px;
  background-color: none;
  display: none;
}
.table-result .td-input.showinput .form-control {
  display: block;
}
.table-result thead .filter th, .table-result thead .filter td {
  padding: 5px;
}
.table-result tfoot, .table-result .tfoot {
  background-color: #F5F5F5 !important;
  margin-top: 10px;
}
.table-result tfoot td, .table-result .tfoot td {
  padding: 7px 2px;
  border-color: transparent;
}
.table-result .act {
  display: inline-block;
  text-decoration: none;
  padding: 0px 5px;
  color: #666;
  font-size: 16px;
}
.table-result .act:hover {
  color: #035FCC;
}
.table-result .btn {
  padding: 2px 5px;
}
.table-result .btn-remove {
  background: #CF1322;
  color: #fff;
  width: 24px;
  height: 24px;
  line-height: 24px;
  padding: 0px;
  border-radius: 4px;
  text-align: center;
}
.table-result .btn-remove:hover {
  background: #a00f1a;
}
.table-result tr:hover {
  background-color: #FFF9EB !important;
}
.table-result.table-border-none th, .table-result.table-border-none td {
  border: 0px;
}
.table-result .check-action .name {
  min-height: 16px;
  padding-left: 16px;
}
.table-result .check-action .name:before {
  width: 16px;
  height: 16px;
  line-height: 14px;
}
.table-result .check-action input:checked + .name:before {
  font-size: 12px;
}
.table-result .check-action input[type=radio]:checked + .name:after {
  width: 8px;
  height: 8px;
}
.center {
  text-align: center;
}
.w20 {
  width: 20px !important;
}
.check-action {
  position: relative;
  display: inline-block;
}
.check-action input {
  height: 100%;
  width: 100%;
  z-index: 2;
  opacity: 0;
  left: 0px;
  top: 0px;
  position: absolute;
  margin: 0px;
}
.check-action .name {
  position: relative;
  display: block;
  padding-left: 22px;
  min-height: 20px;
}
.check-action .name:before {
  width: 18px;
  height: 18px;
  line-height: 16px;
  border-radius: 0px;
  text-align: center;
  display: inline-block;
  font-family: "ap";
  border: 1.5px solid #8C8C8C;
  content: "";
  background: #fff;
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 2px;
}
.check-action input:checked + .name:before {
  background: #fff;
  color: #0176FF;
  border-color: #0176FF;
  content: "\2713";
  font-size: 14px;
}
.check-action input[type=checkbox]:disabled + .name:before {
  background: #E0E0E0;
  border-color: transparent;
}
.check-action input[type=checkbox]:checked:disabled + .name:before {
  background: #666;
  border-color: #666;
  color: #fff;
}
.check-action input:disabled + .name:before {
  opacity: 0.8;
}
.check-action input[type=radio] + .name:before {
  border-radius: 50%;
}
.check-action input[type=radio]:checked + .name:before {
  content: "";
  color: #0176FF;
  background: #fff;
  font-size: 12px;
  border-color: #0176FF;
}
.check-action input[type=radio]:checked + .name:after {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  content: "";
  position: absolute;
  top: 4px;
  z-index: 2;
  left: 4px;
  background: #0176FF;
}
.check-action input[type=radio]:disabled + .name {
  color: #8c8c8c;
}
.check-action input[type=radio]:disabled + .name:before {
  border-color: #8c8c8c;
}
.check-action input[type=radio]:disabled:checked + .name:before {
  border-color: #8c8c8c;
  background: #fff;
  color: #8c8c8c;
}
.check-action input[type=radio]:disabled:checked + .name:after {
  background: #8c8c8c;
}
.check-action.-color .name:before {
  border-color: #0176FF;
  color: #fff;
}
.check-action.-color input:checked + .name:before {
  background: #0176FF;
  color: #fff;
}
.check-action.check-color input:checked + .name:before {
  background: #0176FF;
  color: #fff;
}
.check-action.check-right .name {
  padding-left: 0px;
  padding-right: 20px;
}
.check-action.check-right .name:before {
  left: auto;
  right: 0px;
}
.check-action.check-right input[type=radio]:checked + .name:after {
  left: auto;
  right: 4px;
}
.check-action.-danger {
  color: #C00000;
}
.check-action.-danger input[type=radio]:checked + .name:before {
  color: #C00000;
  border-color: #C00000;
}
.check-action.-danger input[type=radio]:checked + .name:after {
  background: #C00000;
}
.input-icon-right {
  position: relative;
}
.input-icon-right .form-control {
  padding-right: 30px;
}
.input-icon-right .icon {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  position: absolute;
  top: 0px;
  right: 5px;
  bottom: 0px;
  color: #666;
  margin: auto;
}
.text-main {
  color: #0176FF !important;
}
.k-wrapper {
    width: 100%;
    height: 400px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: scroll;
}
.table-custom .table-content{
  /* height: 400px !important; */
}
</style>