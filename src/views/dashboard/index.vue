<template>
<div >
<Plotly :data="getdate_data" :layout="date_layout" :display-mode-bar="false"></Plotly>
<div>

</div>

<div class="mydivclass1">
<Plotly :data="data" :layout="layout" :display-mode-bar="false"></Plotly>
</div>

<div class="mydivclass1">
<Plotly :data="data2" :layout="layout2" :display-mode-bar="false" @click=rdclick></Plotly>
</div>



<div>
    <b-table striped hover :items="items" :fields="fields" bordered fixed class="mytableclass"></b-table>
</div>

</div>

</template>

<script>
import { Plotly } from 'vue-plotly'
import { BTable } from 'bootstrap-vue'
import heatmap from 'v-charts/lib/heatmap.common'

export default {
  mounted(){
    console.log(this.getdate_data)
  },

  methods:{
    rdclick(data){
      console.log(data)
    }

  },

  computed: {
    getdate_data: function(){
      Date.prototype.getWeek = function () {var onejan = new Date(this.getFullYear(), 0, 1);return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);}
      var dn = new Date()
      var date = new Date(dn.getFullYear(), 0, 1)
      var days = []
      var days_str = []
      var weekdays_in_year = []
      var weeknumber_of_dates = []
      var z = []
      var colorscale=[[false, "#eeeeee"], [true, "#76cf63"]]
      while (date.getFullYear() === dn.getFullYear()) {
        days.push(date)
        weekdays_in_year.push(date.getDay())
        weeknumber_of_dates.push((date.getMonth()+1) +'月 - 周：'+ date.getWeek())
        if (Math.floor(Math.random() * 10)>5){z.push(10)}else(z.push(0))
        
        days_str.push(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate())
        date.setDate(date.getDate() + 1)
      }

      var date_data=[
        {
          type: 'heatmap',
          x:weeknumber_of_dates,
          y:weekdays_in_year,
          z:z,
          text:days_str,
          hoverinfo:"text",
          xgap:3,
          ygap:3,
          showscale:false,
          colorscale:colorscale
        }

      ]

      return date_data
    }

  },

  components: {
    Plotly,
    heatmap
  },

    data() {


    return {
        date_layout:{
          title:"activity chart",
          height:280,
          yaxis:{
                  showline:false, showgrid:false, zeroline:false,tickmode:"array",ticktext:["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],tickvals:[1,2,3,4,5,6,0]
          },
          xaxis:{
                  showline:false, showgrid:false, zeroline:false,
          },
          font:{"size":"10", "color":"#9e9e9e"},
          plot_bgcolor:("#fff"),
          margin :{t:40}
        },


        fields: [
          {
            key: 'last_name',
            sortable: true
          },
          {
            key: 'first_name',
            sortable: false
          },
          {
            key: 'age',
            label: 'Person age',
            sortable: true,
            // Variant applies to the whole column, including the header and footer
            variant: 'danger'
          }
        ],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson111111111111111111111111111111111111111111111', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ],

      data:[{
        x: [1,2,3,4],
        y: [10,15,13,17],
        type:"scatter"
      }],
      layout:{
        title: "My graph"
      },

      data2: [{
        type: 'scatterpolar',
        r: [39, 28, 8, 7, 28, 39],
        theta: ['A','B','C', 'D', 'E', 'A'],
        fill: 'toself'
      }],
      layout2:{
        polar: {
          radialaxis: {
            visible: true,
            range: [0, 50]
          }
        },
        title: "My graph2",
        showlegend: false
      }

    }
  }

}
</script>

<style lang="scss" scoped>
.mytableclass{

            word-wrap: break-word;

}

.mydivclass1{
float: left;
width: 50%;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
