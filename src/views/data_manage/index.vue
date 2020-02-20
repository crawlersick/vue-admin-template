<template>
  <div>
    <div>
      <el-divider content-position="left">状态数据配置</el-divider>
      <setdatacontent :level_list="level_list">
      </setdatacontent>
    </div>

    <div>

      <el-divider content-position="left">数据字段动态配置</el-divider>
      <dataindextable :tabledata="indexdata" :colConfigs="indexcol" @upperfeedback="dataindextable_feedback" @refresh_index_data="data_manage_get_index_data">
      </dataindextable>

    </div>
  </div>
</template>
<script>
import dataindextable from '@/views/data_manage/comps/data_index_table'
import setdatacontent from '@/views/data_manage/comps/set_data_content'
import {request} from '@/utils/httpaxios.js'
import {data_manage_get_dst_col} from '@/views/data_manage/js/data_manage'

export default {
  created(){
    data_manage_get_dst_col('index_level',this.callback_data_manage_get_dst_col)

    this.data_manage_get_index_data()


    console.log('this is created in data_manage')
    console.log(this.GLOBAL.util)
  },
  methods:{
    callback_data_manage_get_dst_col(data){

      console.log('---------this is callback_data_manage_get_dst_col --------------')
      console.log(data)
      this.level_list=data
      
    },
    data_manage_get_index_data(){
      request(
        {
          method:'post',
          data: {'dummykey':'dummyvalue'},
          url:this.GLOBAL.util.BASE + '/data_manage_get_index_data'
        }
        ).then(
          resp => {
            console.log('-- init request for data_manage_get_index_data --')
            console.log(resp)
            this.indexdata=resp.data.index_data
          }
        ).catch(
          err => {
            console.log('-- error when init request for testing --')
            console.log(err)
          }
        )

    },
    dataindextable_feedback(data){
      console.log('---------------   this is method dataindextable_feedback in index  ---------------')
      console.log(data)
    }
  },
  components:{
    dataindextable,
    setdatacontent
    },
  data() {
    return {
      level_list:[],

        indexcol:[
      { prop: 'index_id', label: 'ID' , width: '80px' },
      { prop: 'index_level', label: '层级' },
      //{ prop: 'index_name', label: '数据名' },
      { slot: 'name' },
      { prop: 'index_tags', label: '状态列表' },
      { prop: 'remark', label: '备注' },
      { prop: 'update_um', label: '更新人' },
      { prop: 'update_time', label: '更新时间' },
      // 模版中的元素需要对应的有 slot="opt" 属性
      { slot: 'opt' }
    ],

        indexdata: []
    }
  }
}
</script>
