<template>
 <div id="CurveView">

   <el-container>
     <el-header>
       曲线
     </el-header>
     <el-main>
       <template>
         <el-select v-model="value" clearable placeholder="请选择">
           <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
           </el-option>
         </el-select>
       </template>
       <template>
         <v-chart class="chart" :option="option" />
       </template>
     </el-main>
   </el-container>
 </div>
</template>


<script>

export default {
  name: "CurveView",
  provide: {
    [THEME_KEY]: "dark"
  },
  data(){
    return {
      selected: '',

      options: [{
        value: '选项1',
        label: '样品号'
      }, {
        value: '选项2',
        label: '夯土炉壁'
      }, {
        value: '选项3',
        label: '炉底夯土'
      }, {
        value: '选项4',
        label: '黏土坯'
      }, {
        value: '选项5',
        label: '窑坯'
      }],
      value: '',
      option: {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      }
    };

  },
};
</script>
<style >
.chart {
  height: 400px;
}
</style>