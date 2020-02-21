<template>
    <div>
        <el-form :inline="true" :model="form" :rules="rules" ref="my_data_form" v-loading="myformloading">
            
            <el-form-item label="数据级别" :label-width="formLabelWidth" prop="data_level">
            <el-select v-model="form.data_level" placeholder="请选择数据级别">
                <el-option
                  v-for="item in level_list"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
            </el-select>
            </el-form-item>

            <el-form-item label="目标数据ID" :label-width="formLabelWidth" prop="data_target">
                <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入要更新的目标数据，如APPID或IP列表，可由换行或空格隔开"
                v-model="form.data_target">
                </el-input>
            </el-form-item>

            
                <el-form-item >
                    <el-button size="mini" type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            

        </el-form>
        <el-table  border :data="tabledata" style="width: 100%;" v-loading="data_loading">
            <template v-for="colConfig in colConfigs"  >
                <el-table-column v-bind="colConfig" v-bind:key="colConfig.prop" ></el-table-column>
            </template>
        </el-table>
    </div>
</template>
<script>

import {data_manage_get_data_content_list} from '@/views/data_manage/js/data_manage.js'

export default { 
  props:["level_list"],
  methods:{
    callback_data_manage_get_data_content_list(data){
        this.data_loading=false
        console.log('----------------- callback_data_manage_get_data_content_list ---------------')
        console.log(data)
        if(data.length>0){
            var col=Object.keys(data[0])
            console.log(col)
            this.colConfigs=[]
            for(var i=0;i<col.length;i++){
                console.log('>>>')
                this.colConfigs.push({'prop':col[i],'label':col[i]})
            }
            this.tabledata=data
        }
        
    },
    onSubmit(){
      this.$refs.my_data_form.validate(
          (valid) => {
              if(valid){
                console.log('do query')
                console.log(this.form)
                var postdata={}
                postdata.data_id_list=this.form.data_target.split(/\s+/)
                postdata.index_level=this.form.data_level
                this.data_loading=true
                data_manage_get_data_content_list(postdata,this.callback_data_manage_get_data_content_list)
              }
              }
              )
    }
 
  }, 
  data() {  
    return {
      tabledata:[],
      colConfigs:[],
      data_loading:false,
      myformloading:false,
      formLabelWidth: '120px',
      rules: {
          data_level: [{ required: true, message: '请输入', trigger: 'blur' }],
          data_name: [{ required: true, message: '请输入', trigger: 'blur' }],
          selected_tag: [{ required: true, message: '请输入', trigger: 'blur' }],
          data_target: [{ required: true, message: '请输入', trigger: 'blur' }]
              },
      form: {
        data_level: null,
        data_name: null,
        selected_tag:null,
        data_target:null
        },
      }  
    }
  }
</script>