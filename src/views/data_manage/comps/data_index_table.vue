<template>
<div>
  
  <div>
    
  </div>

  <div>
    <div style="margin-left:10px">
    <dataindexaddupdate ref="dataindexaddupdate" @refresh_index_data="refresh_index_data" @set_table_loading="set_table_loading">
    </dataindexaddupdate>
    </div>
    <div style="margin-top:10px">
    <el-table  border :data="tabledata" style="width: 100%;" v-loading="data_loading">
      <template v-for="colConfig in colConfigs"  >
  
        <template v-if="colConfig.slot==='name'">
          <el-table-column  label="数据名" width="110px" v-bind:key="colConfig.prop">
            <div slot-scope="{ row }">
              <el-tag size="mini">{{ row.index_name }}</el-tag>
            </div>
          </el-table-column> 
        </template>
  
        <template v-if="colConfig.slot==='opt'" >
          <el-table-column label="操作" width="150px"  v-bind:key="colConfig.slot" >
            
            <div slot-scope="{ row }">
            <el-button size="mini"  type="success" @click="editfunc(row)">编辑</el-button>
            <el-popconfirm title="确定删除" @onConfirm="deletefunc(row)">
              <el-button slot="reference" size="mini"  type="danger" >删除</el-button>
            </el-popconfirm>
            </div>
          </el-table-column>
        </template>
  
        <el-table-column v-bind="colConfig" v-bind:key="colConfig.prop" ></el-table-column>
        
      </template>  
    </el-table>
    </div>
  </div>

</div>
</template>
<script>
import { add_data_index } from '@/views/data_manage/js/data_manage.js'
import { Message } from 'element-ui'
import dataindexaddupdate from '@/views/data_manage/comps/data_index_add_update'

export default {
  data() {  
    return {
      data_loading:true
    }
  },
  components:{dataindexaddupdate},
  props: ['colConfigs', 'tabledata'],
  methods:{
      set_table_loading(v){this.data_loading=v},
      delete_callbackmethod(data){
        console.log(' ----------- this is delete_callbackmethod in data_index_table --------------')
        console.log(data)
        this.refresh_index_data()
      },
      refresh_index_data(){this.$emit('refresh_index_data')},
      editfunc(data){
          //this.set_table_loading(true)
          console.log('this is editfunc func in data_index_table')
          console.log(data)
          this.$refs.dataindexaddupdate.updateitem(data)
          //this.$emit('upperfeedback',data)
      },
      deletefunc(data){
          this.set_table_loading(true)
          console.log('this is deletefunc func in data_index_table')
          console.log(data)
          var postdata={}
          postdata.dataitem=data
          postdata.actiontype='delete'
          add_data_index(postdata, this.delete_callbackmethod)

      }
  }
}
</script>
<style scoped>
.el-table >>> .cell {
    white-space: pre-line;
}
</style>
