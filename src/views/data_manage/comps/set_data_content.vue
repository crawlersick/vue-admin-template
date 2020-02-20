<template>
    <div>

        <el-drawer
        title="更新日志"
        :visible.sync="showlog"
        direction="rtl"
        size="50%">
        <el-table :data="logdata" v-loading="logdata_loading">
            <el-table-column property="index_level" label="层级"></el-table-column>
            <el-table-column property="index_name" label="名称"></el-table-column>
            <el-table-column property="data_content" label="状态"></el-table-column>
            <el-table-column property="data_uniq_id" label="数据识别"></el-table-column>
            <el-table-column property="update_time" label="update" width="160"></el-table-column>
            <el-table-column property="update_um" label="um" width="150"></el-table-column>
            </el-table>
        </el-drawer>

        <el-form :inline="true" :model="form" :rules="rules" ref="my_data_form">
            
            <el-form-item label="数据级别" :label-width="formLabelWidth" prop="data_level">
            <el-select v-model="form.data_level" placeholder="请选择数据级别" @change="select_level">
                <el-option
                  v-for="item in level_list"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
            </el-select>
            </el-form-item>

            <el-form-item label="数据名" :label-width="formLabelWidth" prop="data_name">
            <el-select v-model="form.data_name" placeholder="请选择数据状态"  @change="select_dataname">
                <el-option
                  v-for="item in data_list"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
            </el-select>
            </el-form-item>

            
            <template v-if="tags_info.tags_remark[form.data_name]">

<el-row>
            <el-form-item label="备注说明" :label-width="formLabelWidth" >
                {{tags_info.tags_remark[form.data_name]}}
            </el-form-item>
</el-row>

                <template v-if="tags_info.tags_type[form.data_name] === 'list'">
                    <el-form-item label="选择状态" :label-width="formLabelWidth" prop="selected_tag">
                        <el-select v-model="form.selected_tag" placeholder="请选择数据状态"  @change="select_tag">
                            <el-option
                            v-for="item in tags_info.tags_list[form.data_name]"
                            :key="item"
                            :label="item"
                            :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <template v-if="tags_info.tags_type[form.data_name] === 'string'" >
                    <el-form-item label="填写状态" :label-width="formLabelWidth" prop="selected_tag">
                        <el-input
                        placeholder="请输入自定义状态"
                        v-model="form.selected_tag">
                        </el-input>
                    </el-form-item>
                </template>

                <el-form-item label="目标数据ID" :label-width="formLabelWidth" prop="data_target">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入要更新的目标数据，如APPID或IP列表，可由换行或空格隔开"
                    v-model="form.data_target">
                    </el-input>
                </el-form-item>

                <el-row>
                    <el-form-item label=" " :label-width="formLabelWidth">
                        <el-button size="mini" type="primary" @click="onSubmit">数据更新</el-button>
                    </el-form-item>
                </el-row>
            </template>
          <el-form-item label=" " :label-width="formLabelWidth">
              <el-button size="mini" type="primary" @click="getlog">查看日志</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {data_manage_get_col_lv2,data_manage_set_data_content,data_manage_get_data_update_log} from '@/views/data_manage/js/data_manage'
import { Message } from 'element-ui'

export default { 
  props:["level_list"],
  methods:{
    callback_data_manage_get_data_update_log(data){
        console.log('------------callback_data_manage_get_data_update_log----------------')
        console.log(data)
        this.logdata=data.data_update_log
        this.logdata_loading=false
    },
    getlog(){
        this.logdata_loading=true
        this.showlog=true
        data_manage_get_data_update_log({"dummy":"dummy"},this.callback_data_manage_get_data_update_log)
    },
    callback_data_manage_set_data_content(data){
        console.log('------------callback_data_manage_set_data_content----------------')
        console.log(data)
        if(data.response=="update done"){
            Message.info('完成更新')
            this.form.data_level=null
            this.form.selected_tag=null
            this.form.data_name=null
            this.form.data_target=null
            this.getlog()
        }else{
            Message.error('更新出错')
        }
        
    },
    onSubmit(){
      
      this.$refs.my_data_form.validate(
          (valid) => {

              if(valid){

                var templist=this.form.data_target.split(/\s+/)
                if(this.form.data_target){
                    
                    console.log(templist)
                    console.log(this.form.data_level)
                    for(var i=0;i<templist.length;i++){
                        console.log(templist[i])
                        var regstr=''
                        if(this.form.data_level=="app"){
                            regstr='^[0-9]+$'
                        }
                        if(this.form.data_level=="node"){
                            regstr='^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$'
                        }
                        if(!templist[i].match(regstr)){
                            Message.info(templist[i] + ' 格式不匹配 '+this.form.data_level)
                            console.log(templist[i] + ' not match '+this.form.data_level)
                            return
                        }
                    }
                }

                  console.log('validate!')
                  
                  console.log(this.form.data_name)
                  console.log(this.tags_info.name2id[this.form.data_name])
                  var itemlist=[]
                  for(var i=0;i<templist.length;i++){
                      var postitem={}
                      postitem.index_id=this.tags_info.name2id[this.form.data_name]
                      postitem.data_uniq_id=templist[i]
                      postitem.data_content=this.form.selected_tag
                      itemlist.push(postitem)
                  }
                  console.log(itemlist)
                  data_manage_set_data_content(itemlist,this.form.data_level,
                  this.form.data_name,
                  this.callback_data_manage_set_data_content)

              }
              })

    },
    select_tag(data){
      console.log('---------this is select_tag in set_data_content --------------')
      console.log(data)
      this.form.data_target=null
    },
    select_dataname(data){
      console.log('---------this is select_dataname in set_data_content --------------')
      console.log(data)
      console.log('---------remark is  --------------')
      console.log(this.tags_info.tags_remark[data])
      this.form.selected_tag=null
      this.form.data_target=null

    },
    select_level(data){
      console.log('---------this is select_level in set_data_content --------------')
      console.log(data)
      this.form.data_name=null
      data_manage_get_col_lv2(data,this.callback_data_manage_get_col_lv2)
      

    },
    callback_data_manage_get_col_lv2(data){

      console.log('---------this is callback_data_manage_get_col_lv2 --------------')
      console.log(data)
      this.data_list=data.namelist
      this.tags_info.tags_type=data.name2tags_type
      this.tags_info.tags_remark=data.remarks
      this.tags_info.tags_list=data.tags
      this.tags_info.name2id=data.name2id
      
    }
  }, 
  data() {  
    return {
      logdata_loading:true,
      logdata:[],
      showlog:false,
      tags_info:{
          tags_remark:{},
          tags_type:{},
          tags_list:{},
          name2id:{}
      },
      data_list:[],
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