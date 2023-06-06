<template>
  <div class="container">

    <table class="table table-striped">
      <thead>
      <tr>
        <th>
          <a href="#" @click="sortList('type')"><img src="../assets/sort.png"></a>
          Operation
          <input type="text" v-model="operationFilter">
        </th>
        <th>
          <a href="#" @click="sortList('amount')"><img src="../assets/sort.png"></a>
          Cost
        </th>
        <th>
          <a href="#" @click="sortList('operation_response')"><img src="../assets/sort.png"></a>
          Operation Response
        </th>
        <th>
          <a href="#" @click="sortList('date')"><img src="../assets/sort.png"></a>
          Operation Date
        </th>
      </tr>
      </thead>
      <tbody>


      <tr v-for="record in records" :key="record.id">
        <td>{{ record.type }}</td>
        <td>{{ record.amount }}</td>
        <td>{{ record.operation_response }}</td>
        <td>{{ record.date }}</td>
      </tr>

      </tbody>
    </table>

    <div class="form-horizontal">
      <div class="form-group">
        <paginate
            v-model="page"
            :page-count="count"
            :page-range="range"
            :margin-pages="margin"
            :click-handler="clickCallback"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'"
        >
        </paginate>
      </div>
      <div class="form-group">
        <span>Items per page</span>
        <select class="form-select" v-model="items" @change="loadData">
          <option>2</option>
          <option>5</option>
          <option>10</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
import store from '../store'
import Paginate from 'vuejs-paginate-next';

export default {

  data() {
    return {
      operationFilter: undefined,
      response: {data: [], pagination: {}},
      range: 3,
      margin: 1,
      items: 2,
      currentPage: 1,
      sortedByAsc: true,
    };
  },

  components: {
    paginate: Paginate,
  },

  methods: {
    sortList(sortBy) {
      if (this.sortedByAsc) {
        this.response.data.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        this.sortedByAsc = false;
      } else {
        this.response.data.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        this.sortedByAsc = true;
      }
    },
    async clickCallback(pageNum) {
      this.currentPage = pageNum
      await this.loadData()
    },
    async loadData() {
      try {
        const recordsResponse = await fetch(`http://localhost:3000/records?page=${this.currentPage}&items=${this.items}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${store.state.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const responseAsJson = JSON.parse(JSON.stringify(await recordsResponse.json()))
        this.response = responseAsJson['records']
      } catch (e) {
        console.log(e)
      }
    }
  },

  computed: {
    records() {
      if (this.operationFilter) {
        return this.response.data.filter(
            operation => operation.type.toLowerCase().includes(this.operationFilter.toLowerCase())
        )
      }
      return this.response.data || []
    },
    count() {
      return this.response.pagination.total || 0
    },
    page() {
      return this.response.pagination.currentPage || 1
    },
  },

  async mounted() {
    await this.loadData()
  }
};


</script>