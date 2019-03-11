<template>
  <div>
    <div>
      <b-modal id="modaxl" ref="myModalRef" size="xl" title="Large Modal">
        <div>
          <b-table
            id="table-transition-example"
            :items="items"
            :fields="fields"
            striped
            small
            primary-key="a"
          />
        </div>
      </b-modal>
    </div>
    <div>
      <vepie :data="piechartData1" :settings="piechartSettings1" :events="piechartEvents1"/>
    </div>
  </div>
</template>

<script>
import vepie from 'v-charts/lib/pie.common'
import BModal from 'bootstrap-vue/es/components/modal/modal'
import BTable from 'bootstrap-vue/es/components/table/table'
export default {
  components: { vepie, BModal, BTable },
  data() {
    var self = this
    this.piechartEvents1 = {
      click: function(e) {
        // self.name = e.name
        console.log(e)
        console.log(e.data['name'])
        console.log(e.data['value'])
        self.$refs.myModalRef.show()
      }
    }
    this.piechartSettings1 = {
      dataType: 'percent'
    }
    return {
      piechartData1: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': '1/1', '访问用户': 1393 },
          { '日期': '1/2', '访问用户': 3530 },
          { '日期': '1/3', '访问用户': 2923 },
          { '日期': '1/4', '访问用户': 1723 },
          { '日期': '1/5', '访问用户': 3792 },
          { '日期': '1/6', '访问用户': 4593 }
        ]
      },
      items: [
        { a: 2, b: 'Two', c: 'Moose' },
        { a: 1, b: 'Three', c: 'Dog' },
        { a: 3, b: 'Four', c: 'Cat' },
        { a: 4, b: 'One', c: 'Mouse' }
      ],
      fields: [
        { key: 'a', sortable: true },
        { key: 'b', sortable: true },
        { key: 'c', sortable: true }
      ]
    }
  },
  methods: {
    showModal() {
      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    }
  }
}
</script>
