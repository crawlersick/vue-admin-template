<template>
  <div>
    <b-table
      id="table-transition-example"
      :items="items"
      :fields="fields"
      :tbody-transition-props="transProps"
      striped
      small
      primary-key="a"
    />
  </div>
</template>

<script>
import BTable from 'bootstrap-vue/es/components/table/table'
export default {
  components: { BTable },
  data() {
    return {
      transProps: {
        // Transition name
        name: 'flip-list'
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
  }
}
</script>
