<template>
    <div>
        <el-dialog title="add/update" :visible.sync="dialogFormVisible" >
        <el-form :model="form" :rules="rules" ref="my_add_update_form" v-loading="logdata_loading">

            <el-form-item label="数据级别" :label-width="formLabelWidth" prop="data_level">
            <el-select v-model="form.data_level" placeholder="请选择数据级别">
                <el-option label="app" value="app"></el-option>
                <el-option label="node" value="node"></el-option>
            </el-select>
            </el-form-item>

            <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            
            <el-form-item label="状态列表"  :label-width="formLabelWidth" >
                <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
                </el-tag>
                <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-form-item>


            <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
            <el-input type="textarea" :rows="3" v-model="form.remark" autocomplete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer"  v-loading="logdata_loading">
            <el-button @click="concelclick">取 消</el-button>
            <el-button type="primary" @click="confirmclick">确 定</el-button>
        </div>
        </el-dialog>

        <el-button type="primary" plain size="mini" @click="addnewitem">新增</el-button>
    </div>
</template>
<script>
import { add_data_index } from '@/views/data_manage/js/data_manage.js'
import { Message } from 'element-ui'

export default {
    methods:{
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
            this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },

        concelclick(){
            this.dialogFormVisible = false
            this.logdata_loading = false
            this.$emit('set_table_loading',false)
            
        },

        confirmclick(){
            
            if(this.dynamicTags.length  != 0 && this.dynamicTags.length<2){
                Message.info('状态列表标签应该大于1,或为空')
                return 
            }
            this.$refs.my_add_update_form.validate(
                (valid) => {
                    if(valid){
                        this.logdata_loading=true
                        console.log(this.form)
                        var postdata={}
                        postdata.dataitem={}
                        postdata.dataitem.index_name=this.form.name
                        postdata.dataitem.index_level=this.form.data_level
                        postdata.dataitem.remark=this.form.remark
                        postdata.actiontype=this.actiontype

                        if (this.dynamicTags.length > 1){
                            postdata.dataitem.index_tags=this.dynamicTags.join(',')
                        }else
                        {
                            postdata.dataitem.index_tags='NA'
                        }

                        if(this.actiontype=='add')
                        {

                            console.log('--- request to add  ---')
                            this.$emit('set_table_loading',true)
                            add_data_index(postdata, this.add_update_callbackmethod)
                        }
                        if(this.actiontype=='update')
                        {
                            
                            console.log('--- request to update  ---')
                            postdata.dataitem.index_id=this.index_id_for_update
                            this.$emit('set_table_loading',true)
                            add_data_index(postdata, this.add_update_callbackmethod)
                        }

                    }
                }
            )
        },
        add_update_callbackmethod(data){
            this.logdata_loading=false
            console.log('>>>>>>>>>>>>>>>>>>>>this is add_update_callbackmethod')
            console.log(data)

            if(data.response=="update done"){
                this.dialogFormVisible = false
                this.$emit('refresh_index_data')
                return
            }

            if(data.response=="add done"){
                this.dialogFormVisible = false
                this.$emit('refresh_index_data')
                return
            }

            if(data.response=="duplicated index_level and index_name"){
                Message.error('重复数据')
            }else{
                Message.error('未知错误： '+data.response)
            }
            
            
        },

        addnewitem(){
            console.log('--------------    this is  addnewitem in data_index_add_update  ----------------------------')
            this.formdata_reset()
            this.dialogFormVisible = true
            this.actiontype='add'

        },
        updateitem(data){
            console.log('--------------    this is  updateitem  in data_index_add_update ----------------------------')
            this.index_id_for_update=data.index_id
            this.form.name=data.index_name
            this.form.data_level=data.index_level
            this.form.remark=data.remark

            if(data.index_tags == 'NA'){
                this.dynamicTags=[]
            }else{
                this.dynamicTags=data.index_tags.split(',')
            }
            
            this.dialogFormVisible = true
            this.actiontype='update'
        },
        formdata_reset(){
            this.form.name=''
            this.form.remark=''
            this.form.data_level=null
            this.dynamicTags=[]
        }
    },
    data() {
        return {
            logdata_loading:false,
            index_id_for_update:'',
            actiontype:'',
            rules: {
                name: [{ required: true, message: '请输入', trigger: 'blur' },
                    { min: 3, max: 44, message: '长度在 3 到 44 个字符', trigger: 'blur' },
                    { pattern: /^[a-zA-Z_]+[0-9a-zA-Z_]+$/, message: '数据名应该由字母或数字组成，以英文字母开头,可由下划线连接' }
                    ],
                remark: [{ required: true, message: '请输入', trigger: 'blur' },
                    { min: 3, max: 200, message: '长度在 3 到 200 个字符', trigger: 'blur' }],
                data_level: [{ required: true, message: '请输入', trigger: 'blur' }]
                    },
            dialogFormVisible: false,
            form: {
            name: '',
            remark: '',
            data_level: null
            },
            formLabelWidth: '120px',

            dynamicTags: [],
            inputVisible: false,
            inputValue: ''

            }
      }
}
</script>
<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>>