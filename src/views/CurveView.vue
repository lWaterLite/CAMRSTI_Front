<template>
 <div id="CurveView">

   <el-container>
     <el-header>
                                           曲线
     </el-header>
     <el-main>
       <el-row>
         <el-button>数据集柱状图</el-button>

       </el-row>
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
     <el-footer>
       <el-row>

         <el-button type="primary">散点图</el-button>
       </el-row>
       <el-select v-model="value" clearable placeholder="请选择">
         <el-option
             v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value">
         </el-option>
       </el-select>
       <template>
         <v-chart class="chart" :option="option2" />
       </template>
     </el-footer>
   </el-container>
 </div>
</template>


<script>
import VChart, { THEME_KEY } from "vue-echarts";
export default {
  name: "CurveView",
  provide: {
    [THEME_KEY]: "dark"
  },
  data() {
    return {
      selected: '',
      components: {
        VChart
      },
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
        backgroundColor: 'white',
        legend: {orient: 'horizontal', x: 'center', y: 'top', itemGap: 40},
        tooltip: {},
        dataset: {
          source: [
            ['product', '黏土基质', '石英粉砂', '空洞', '砂或岩屑', '其他矿物'],
            ['HXJFM1', 62.3, 21.7, 12.7, 1.3, 2],
            ['HXJFM2', 60.7, 21.7, 17, NaN, 0.7],
            ['HXJFM3', 60.3, 20.3, 18.7, NaN, 0.7],
            ['HXJFM4', 70, 19, 9.3, NaN, 1.7],
          ]
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{type: 'bar'}, {type: 'bar'}, {type: 'bar'}, {type: 'bar'}, {type: 'bar'}]
      },
      option2: {
        backgroundColor: 'white',
        xAxis: {name: '黏土基质'},

        yAxis: {name: '石英粉砂'},
        series: [{
          symbolSize: 20,
          data: [
            [34.7, 7.3],
            [31.8, 6.4],
            [34.2, 8.2],
          ],
          type: 'scatter'
        }
        ]
      },
    }
  }
}
</script>

<style >
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-footer,.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.chart {
  height: 400px;
}


</style>