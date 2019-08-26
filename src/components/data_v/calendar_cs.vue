<template>
  <el-calendar>
    <template
      slot="dateCell"
      slot-scope="{date, data}">
      {{ data.day.split('-').slice(1).join('-') }}
    </template>
  </el-calendar>
</template>
<script>
export default {
  components: {
  }
}
</script>
