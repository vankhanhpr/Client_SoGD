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

            <th v-for="item in columnsD" :key="item.field">{{item.label}}</th>
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

            <th v-for="item in columnsD" :key="item.field">
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
            <td v-for="(column, i) in columnsD" :key="i" :class="{highlight1: (rowSelected==fromIndexPage+index+1)}">{{item[column.field]}}</td>
        
          </tr>
          <tr v-if="numberRecords==0" class="empty">
            <td :colspan="totalColumns" class="text-center">
              Không có bản ghi nào để hiển thị
            </td>
          </tr>

        </tbody>
      </table>
    </div>
    <Pagination :totalRows = "numberRecords" @change="onChangePage" :optionsNumberRowPerPage="optionsNumberRowPerPage" :nowrap="nowrap"/>
  </div>
</template>
<script>
// callback
// onSelectedRow return item
// onRowSelectedIndex return index row begin 1
// doubleClickRow return item
// dataCheckeds return data is checked
import Pagination from './KPagination.vue'
export default {
    name:'k-table',
    props:{
        dataSources:{
          type:Array,
          default: ()=>[],
          required: true
        },
       columns:{
          type:Array,
          default: ()=>[]
       },
       isColumns:{
         type:Boolean,
         default:false
       },
        optionsNumberRowPerPage:{
            type:Array,
            default: function () {
                return [15, 30, 50]
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
            columnsD:[]
            //columns:[]
            
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
            self.columnsD.forEach((column)=>{
              if(column.allowFilter&&self.filterValues[column.field]&&item[column.field]){
                result=result&&(item[column.field].toString().toLowerCase().indexOf(self.filterValues[column.field].toString().trim().toLowerCase())>-1)
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
            self.columnsD = [];
            Object.keys(dataViews[0]).forEach((key) => {
                self.columnsD.push(key.toLowerCase());
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
          
          if(!this.isColumns){
             this.columnsD=[]
            if(newVal.length>0){
                Object.keys(newVal[0]).forEach((key) => {
                    this.columnsD.push({
                      field: key,
                      label: key.toLowerCase(),
                      allowFilter: true
                    })
                });
                const index = this.columnsD.findIndex(x=>x.field == "checked")
                if (index > -1) {
                  this.columnsD.splice(index, 1);
                }
            }
          }else{
            this.columnsD=[]
            this.columns.forEach((item)=>{
              this.columnsD.push(item)
            })
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
        columns(val){
          if(this.isColumns){
            this.val.forEach((item)=>{
              this.columnsD.push(item)
            })
          }
        }

    },
    computed:{
      numberRecords(){
        return this.dataSourceFilters.length;
      },
      totalColumns(){
          var total=this.columnsD.length+1
          if(this.allowCheckBox)
            return total+1
          return total
      }
    },
    components:{
        Pagination,
        
    },
}
</script>