<template>
<div>

  <dataindexaddupdate ref="dataindexaddupdate">
  </dataindexaddupdate>

  <el-table  border :data="tabledata">
    <template v-for="colConfig in colConfigs">

      <template v-if="colConfig.slot==='opt'" >
        <el-table-column label="opt">
          <el-button size="mini" slot-scope="{ row }" @click="editfunc(row)">查看{{row.name}}</el-button>
        </el-table-column>
      </template>

      <el-table-column v-bind="colConfig"></el-table-column>
    </template>  
  </el-table>
</div>
</template>
<script>

import dataindexaddupdate from '@/views/data_manage/comps/data_index_add_update'

export default {
  components:{dataindexaddupdate},
  props: ['colConfigs', 'tabledata'],
  methods:{
      editfunc(data){
          console.log('this is editfunc func in data_index_table')
          console.log(data)
          this.$refs.dataindexaddupdate.updateitem()
          this.$emit('upperfeedback',data)
      },
      deletefunc(data){
          console.log('this is deletefunc func in data_index_table')
          console.log(data)
      }
  }
}
</script>
