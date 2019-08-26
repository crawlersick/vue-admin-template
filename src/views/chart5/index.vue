<template>
  <div id="cy" style="width: 100%;height: 100%;"></div>
</template>

<script>
import cyqtip from 'cytoscape-qtip'
// var cytoscape = require("cytoscape");
// var cyqtip = require('cytoscape-qtip');
import cytoscape from 'cytoscape'
cyqtip( cytoscape ); // register extension

export default {
  name: "Cytoscape",
  components: {},
  created: function() {},
  data: function() {
    return {
      input: "",
      output: "",
      msg: "vue to cytoscape",
      count: 0,
      ele:{
          nodes: [
            { data: { id: "cat" }, classes: ["aa"] },
            { data: { id: "bird" } },
            { data: { id: "ladybug" } },
            { data: { id: "aphid" } },
            { data: { id: "rose" } },
            { data: { id: "grasshopper" } },
            { data: { id: "plant" } },
            { data: { id: "wheat" } }
          ],
          edges: [
            { data: { source: "cat", target: "bird",label:"this is a edge label!!!" }, classes: ["bb"] },
            { data: { source: "bird", target: "ladybug",label:"this is a edge label!!!" } },
            { data: { source: "bird", target: "grasshopper",label:"this is a edge label!!!" } },
            { data: { source: "grasshopper", target: "plant",label:"this is a edge label!!!" } },
            { data: { source: "grasshopper", target: "wheat",label:"this is a edge label!!!" } },
            { data: { source: "ladybug", target: "aphid",label:"this is a edge label!!!" } },
            { data: { source: "aphid", target: "rose" ,label:"this is a edge label!!!"} }
          ]
        }
    };
  },
  methods: {
    add_node: function() {
      console.info(this.cy);
      this.cy.add([
        {
          group: "nodes",
          data: { id: "node" + this.count },
          position: { x: 300, y: 200 }
        },
        {
          group: "edges",
          data: {
            id: "edge" + this.count,
            source: "node" + this.count,
            target: "cat"
          }
        }
      ]);
    },
    view_init: function() {
      this.cy = cytoscape({
        container: document.getElementById("cy"),
        boxSelectionEnabled: false,
        autounselectify: true,
        style: cytoscape
          .stylesheet()
          .selector("node")
          .css({
            height: 80,
            width: 80,
            "background-fit": "cover",
            "border-color": "#000",
            "border-width": 3,
            "border-opacity": 0.5,
            content: "data(id)",
            "text-valign": "center"
          })
          .selector(".aa")
          .css({
            height: 80,
            width: 80,
            "background-fit": "cover",
            "border-color": "red",
            "border-width": 3,
            "border-opacity": 0.5,
            "background-color": "red",
            content: "data(id)",
            "text-valign": "center",
            "line-color": "red",
          })
          
          .selector("edge")
          .css({
            width: 6,
            "target-arrow-shape": "triangle",
            "line-color": "#ffaaaa",
            "target-arrow-color": "#ffaaaa",
            "curve-style": "bezier",
            
            'edge-text-rotation': 'autorotate',
            'label': 'data(label)' ,
            'text-margin-x':30
          })
          .selector(".bb")
          .css({
            "line-color": "#000",
          }),

        elements: this.ele,
        layout: {
          name: "breadthfirst",
          directed: true,
          padding: 10
        }
      });
      this.cy.on('mouseover', 'node', function(event) {
          var node = event.cyTarget;
          node.qtip({
              content: 'hello',
              show: {
                  event: event.type,
                  ready: true
              },
              hide: {
                  event: 'mouseout unfocus'
              }
          }, event);
      });
      
    }
  },
  computed: {},
  mounted: function() {
    this.view_init();
  }
};
</script>
<style scoped>
#cy {
  width: 100%;
  height: 80%;
  position: absolute;
  top: 50px;
  left: 0px;
  text-align: left;
}
.aa {
  color: red;
}

body {
  /* font: 14px helvetica neue, helvetica, arial, sans-serif; */
}
</style>
