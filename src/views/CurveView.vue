<template>
	<div id="CurveView">
		<el-tabs v-model="activeTab" type="card" @tab-remove="removeTab">
			<el-tab-pane label="选择页" name="0">
		<el-button  type="primary" @click="addTab('year')">取样年份</el-button>
        <el-button  type="primary" @click="addTab('mineral')">矿物含量信息</el-button>
        <el-button  type="primary" @click="addTab('XRD')">XRD分析数据</el-button>
        <el-button  type="primary" @click="addTab('chemical')">化学成分分析</el-button>
        <el-button  type="primary" @click="addTab('physical')">物理结构数据</el-button>
		</el-tab-pane>
			<el-tab-pane v-for="tab in tabsList" :closable="tab.closable" :key="tab.name" :name="tab.name" :label="tab.label">
        <div v-if="tab.id ==='year'">
          <template>
            <v-chart class="chart" :option="option3" />
          </template>
        </div>
        <div v-if="tab.id ==='mineral'">
          <template>
            <v-chart class="chart" :option="option2" />
          </template>
        </div>
        <div v-if="tab.id ==='XRD'">
          <template>
            <v-chart class="chart" :option="option4" />
          </template>
        </div>
        <div v-if="tab.id ==='chemical'">
          <template>
            <v-chart class="chart" :option="option5" />
          </template>
        </div>
        <div v-if="tab.id ==='physical'">
          <template>
            <v-chart class="chart" :option="tab.physical" />
          </template>
        </div>
		</el-tab-pane>
		</el-tabs>
	</div>
</template>


<script>
	import VChart, {
		THEME_KEY
	} from "vue-echarts";
  import {httpGet} from "@/Utils/axios.config";
	export default {
		name: "CurveView",
		provide: {
			[THEME_KEY]: "dark"
		},
		data() {
			return {
				tabsList: [],
				activeTab: '0',
				tabsNumber: 0,
				selected: '',
				components: {
					VChart
				},

				value: '',

        year:{
          backgroundColor: 'white',
          dataset:{
            dimensions:[],
            source:[],
          }
        },
        physical:{
          backgroundColor: 'white',
          dataset:{
            dimensions:['样品号', '显气孔率', '真密度', '吸水率'],
            source:[],
          }
        },


        option5: {
          backgroundColor: 'white',
          legend: {},
          tooltip: {},
          dataset: {
            dimensions: ['product','Na2O','MgO','Al2O3','SiO2','K2O','CaO',
              'Fe2O3'],
            source: [
              { product: '11Y3:9-1', Na2O: 0.76,MgO:1.4, Al2O3: 17.8, SiO2:60.3
                , K2O:2.9,CaO:1,Fe2O3:4.8
              },
              { product: '11Y3:9-2',  Na2O: 2.3,MgO:1.4, Al2O3: 21.2, SiO2:61.9
                , K2O:3,CaO:1,Fe2O3:4.2
              },
              { product: '11Y3:9-3',  Na2O: 2.2,MgO:1.4, Al2O3: 14.3, SiO2:58.6
                , K2O:2.8,CaO:1,Fe2O3:5.5
              },
            ]
          },
          xAxis: { type: 'category' },
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' },{ type: 'bar' },{ type: 'bar' },
            { type: 'bar' },{ type: 'bar' }]
        },
        option6: {
          backgroundColor: 'white',
          legend: {},
          tooltip: {},
          dataset: {
            dimensions: ['product', '显气孔率', '真密度', '吸水率'],
            source: [
              { product: '11Y3:9', 显气孔率: 43.3, 真密度:NaN, 吸水率: 93.7 }
            ]
          },
          xAxis: { type: 'category' },
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
        }
			}
		},
		methods: {
			addTab(id) {
				let isExist = 0;
				this.tabsList.forEach((tab) => {
					if (tab.id === id) {
						this.activeTab = tab.name;
						isExist = 1;
					}
				});
				if (isExist === 0) {
					if(id === 'year'){
            this.tabsList.push({
              id: id,
              name: String(this.tabsNumber + 1),
              closable: true,
              label: '取样年份'
            });
            this.activeTab = String(this.tabsNumber + 1);
            this.tabsNumber++;
          }
          else if(id ==='mineral'){
            this.tabsList.push({
              id: id,
              name: String(this.tabsNumber + 1),
              closable: true,
              label: '矿物含量信息'
            });
            this.activeTab = String(this.tabsNumber + 1);
            this.tabsNumber++;
          }
          else if(id ==='XRD'){
            this.tabsList.push({
              id: id,
              name: String(this.tabsNumber + 1),
              closable: true,
              label: 'XRD分析数据'
            });
            this.activeTab = String(this.tabsNumber + 1);
            this.tabsNumber++;
          }
          else if(id ==='chemical'){
            this.tabsList.push({
              id: id,
              name: String(this.tabsNumber + 1),
              closable: true,
              label: '化学成分分析'
            });
            this.activeTab = String(this.tabsNumber + 1);
            this.tabsNumber++;
          }
          else if(id ==='physical'){
            httpGet.get('api/request/phase/' + id)
                .then(response => {
                  this.tabsList.push({
                    id: id,
                    name: String(this.tabsNumber + 1),
                    closable: true,
                    label: '物理结构数据',
                    physical:{
                      backgroundColor: 'white',
                      dataset:{
                        dimensions:['样品号', '显气孔率', '真密度', '吸水率'],
                        source:[response.data.physicalPorosity],
                      }
                    },
                  });
                  this.activeTab = String(this.tabsNumber + 1);
                  this.tabsNumber++;
                })
                .catch(err => {
                  console.log(err);
                  this.$notify.error({
                    title: '出错了',
                    message: '数据请求错误，样品数据可能不存在',
                    duration: 0
                  });
                })
            this.activeTab = String(this.tabsNumber + 1);
            this.tabsNumber++;
          }
				}
			},
			removeTab(removeName) {
				let tabs = this.tabsList;
				let activeName = this.activeTab;
				if (activeName === removeName) {
					tabs.forEach((tab) => {
						if (tab.name === removeName) {
							activeName = String(tab.name - 1);
						}
					});
				}
				this.activeTab = activeName;
				this.tabsList = tabs.filter(tab => tab.name !== removeName);
				this.tabsList.forEach((tab) => {
					if (tab.name > removeName) {
						tab.name = String(tab.name - 1);
					}
				});
				this.tabsNumber--;
			},
		},
	}
</script>

<style scoped>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-footer,
	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		line-height: 160px;
	}

	.chart {
		height: 400px;
	}

	#CurveView {
		padding: 15px;
	}

  .el-button  {
    width: 250px;
    height: 80px;
    padding: 0;
    font-size: 20px;
  }
	:deep .el-tabs--card>.el-tabs__header {
		background-color: #fff;
		border-bottom: 1px solid #409EFF;
	}
</style>