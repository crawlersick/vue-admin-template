<template>
    <div>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules">
            <el-form-item label="活动名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
        </el-dialog>

        <el-button type="primary" plain size="mini" @click="addnewitem">新增</el-button>
    </div>
</template>
<script>
export default {
    methods:{
        addnewitem(){
            console.log('--------------    this is  addnewitem in data_index_add_update  ----------------------------')
            this.dialogFormVisible = true

        },
        updateitem(){
            console.log('--------------    this is  updateitem  in data_index_add_update ----------------------------')
            this.dialogFormVisible = true
        }
    },
    data() {
        return {
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]},
            dialogFormVisible: false,
            form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
            },
            formLabelWidth: '120px'
            }
      }
}
</script>