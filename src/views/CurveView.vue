<template>
	<div id="CurveView">
		<el-tabs v-model="activeTab" type="card" @tab-remove="removeTab">
			<el-tab-pane label="选择页" name="0">
		<el-button  type="primary" @click="addTab('year')">取样年份</el-button>
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
			<v-chart class="chart" :option="option" />
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
				option: {
					backgroundColor: 'white',
					legend: {
						orient: 'horizontal',
						x: 'center',
						y: 'top',
						itemGap: 40
					},
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
					xAxis: {
						type: 'category'
					},
					yAxis: {},
					// Declare several bar series, each will be mapped
					// to a column of dataset.source by default.
					series: [{
						type: 'bar'
					}, {
						type: 'bar'
					}, {
						type: 'bar'
					}, {
						type: 'bar'
					}, {
						type: 'bar'
					}]
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
					if(id === 'year')
					this.tabsList.push({
						id: id,
						name: String(this.tabsNumber + 1),
						closable: true,
						label: '取样年份'
					});
					this.activeTab = String(this.tabsNumber + 1);
					this.tabsNumber++;
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
	  width: 90px;
	  height: 60px;
	  padding: 0;
	  font-size: 20px;
	}

	::v-deep .el-tabs--card>.el-tabs__header {
		background-color: #fff;
		border-bottom: 1px solid #409EFF;
	}
</style>
