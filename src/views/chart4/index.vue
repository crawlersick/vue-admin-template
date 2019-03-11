<template>
  <b-container fluid>
    <!-- Main table element -->
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
    />

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          :total-rows="totalRows"
          :per-page="perPage"
          :filter="filter"
          v-model="currentPage"
          class="my-0"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  data() {
    return {
      items: [
        { a: 2, b: 'Two', c: 'Moose' },
        { a: 1, b: 'Three', c: 'Dog' },
        { a: 3, b: 'Four', c: 'Cat' },
        { a: 4, b: 'One', c: 'Mouse' },
        { a: 2, b: 'Two', c: 'Moose' },
        { a: 1, b: 'Three', c: 'Dog' },
        { a: 3, b: 'Four', c: 'Cat' },
        { a: 4, b: 'One', c: 'Mouse' }
      ],
      fields: [
        { key: 'a', sortable: true },
        { key: 'b', sortable: true },
        { key: 'c', sortable: true }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 8,
      filter: null
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
