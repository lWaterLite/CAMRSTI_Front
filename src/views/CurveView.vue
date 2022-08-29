<template>
	<div id="CurveView">
		<el-tabs v-model="activeTab" type="card" @tab-remove="removeTab">
			<el-tab-pane label="选择页" name="0">
		<el-button  type="primary" @click="addTab('year')">取样年份</el-button>
        <el-button  type="primary" @click="addTab('mineral')">矿物含量信息</el-button>
        <el-button  type="primary" @click="addTab('XRD')">XRD分析数据</el-button>
        <el-button  type="primary" @click="addTab('chemical')">化学成分分析</el-button>
		</el-tab-pane>
			<el-tab-pane v-for="tab in tabsList" :closable="tab.closable" :key="tab.name" :name="tab.name" :label="tab.label">


		<el-row>
			<el-button>数据集柱状图</el-button>

		</el-row>
		<template>
			<el-select v-model="value" clearable placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</template>
		<template>
			<v-chart class="chart" :option="option1" />
		</template>
		<el-row>
			<el-button type="primary">散点图</el-button>
		</el-row>
		<el-select v-model="value" clearable placeholder="请选择">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
		<template>
			<v-chart class="chart" :option="option2" />
		</template>
        <template>
          <v-chart class="chart" :option="option3" />
        </template>
        <template>
          <v-chart class="chart" :option="option4" />
        </template>
        <template>
          <v-chart class="chart" :option="option5" />
        </template>
        <template>
          <v-chart class="chart" :option="option6" />
        </template>
		</el-tab-pane>
		</el-tabs>
	</div>
</template>


<script>
	import VChart, {
		THEME_KEY
	} from "vue-echarts";
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
        option1:{
          backgroundColor: 'white',
          legend: {},
          tooltip: {},
          dataset: {
            dimensions: ['product','黏土基质','石英粉砂','石英','长石','其他矿物','岩屑','空洞'],
            source: [
              { product: '11Y3:9-1', 黏土基质: 34.7, 石英粉砂: 7.3, 石英: 12.5
                , 长石:2,其他矿物:3,岩屑:25,空洞:15.4
              },
              { product: '11Y3:9-2', 黏土基质: 31.8, 石英粉砂: 6.4, 石英: 10.9
                ,长石:1.6, 其他矿物:4.5,岩屑:29.1,空洞:15.7
              },
              { product: '11Y3:9-3', 黏土基质: 34.2, 石英粉砂: 8.2, 石英: 13.9
                ,长石:1.6,其他矿物:1.3,岩屑:22.9,空洞:17.9
              },
            ]
          },
          xAxis: { type: 'category' },
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' },{ type: 'bar' },{ type: 'bar' },{ type: 'bar' },{ type: 'bar' }]
        },
				option2: {
					backgroundColor: 'white',
					xAxis: {
						name: '黏土基质'
					},

					yAxis: {
						name: '石英粉砂'
					},
					series: [{
						symbolSize: 20,
						data: [
							[34.7, 7.3],
							[31.8, 6.4],
							[34.2, 8.2],
						],
						type: 'scatter'
					}]
				},
        option3 :{
          backgroundColor: 'white',
          xAxis: {
            type: 'category',
            data: ['2018', '2019', '2020', '2021', '2022' ]
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 0],
              type: 'line'
            }
          ]
        },
        option4: {
          backgroundColor: 'white',

          legend: {},
          tooltip: {},
          dataset: {
            dimensions: ['product','石英','钠长石','钾长石','云母','闪石','赤铁矿',
              '磁铁矿','白云石','方沸石','磷石英','方石英','莫来石'],
            source: [
              { product: '11Y3:9-1', 石英: 0.76, 钠长石: 0.24, 云母:NaN
                , 闪石:NaN,赤铁矿:NaN,磁铁矿:NaN,白云石:NaN,方沸石:NaN,磷石英:NaN,方石英:NaN,莫来石:NaN
              },
              { product: '11Y3:9-2', 石英: 0.63, 钠长石: 0.14, 云母: NaN
                , 闪石:NaN,赤铁矿:0.04,磁铁矿:NaN,白云石:NaN,方沸石:NaN,磷石英:NaN,方石英:NaN,莫来石:NaN
              },
              { product: '11Y3:9-3', 石英: 0.45, 钠长石: 0.19, 云母: 0.22
                , 闪石:0.06,赤铁矿:NaN,磁铁矿:0.02,白云石:0.06,方沸石:NaN,磷石英:NaN,方石英:NaN,莫来石:NaN
              },
            ]
          },
          xAxis: { type: 'category' },
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' },{ type: 'bar' },{ type: 'bar' },
            { type: 'bar' },{ type: 'bar' },{ type: 'bar' },{ type: 'bar' },{ type: 'bar' },{ type: 'bar' },{ type: 'bar' }]
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
              { product: '11Y3:9', 显气孔率: 43.3, 真密度: 85.8, 吸水率: 93.7 }
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

	.el-button {
    width: 120px;
    height: 80px;
    padding: 0;
    font-size: 20px;
	}

	::v-deep .el-tabs--card>.el-tabs__header {
		background-color: #fff;
		border-bottom: 1px solid #409EFF;
	}
</style>