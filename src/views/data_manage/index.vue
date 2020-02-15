<template>
<div>
123
<dataindextable :tabledata="indexdata" :colConfigs="indexcol" @upperfeedback="dataindextable_feedback">
</dataindextable>
</div>
</template>
<script>
import dataindextable from '@/views/data_manage/comps/data_index_table'

export default {
  methods:{
    dataindextable_feedback(data){
      console.log('---------------   this is method dataindextable_feedback in index  ---------------')
      console.log(data)
    }
  },
  components:{dataindextable},
  data() {
    return {

        indexcol:[
      { prop: 'date', label: '日期' },
      { prop: 'name', label: '姓名' },
      { prop: 'address', label: '地址' },
      // 模版中的元素需要对应的有 slot="opt" 属性
      { slot: 'opt' }
    ],

        indexdata: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }]
    }
  }
}
</script>