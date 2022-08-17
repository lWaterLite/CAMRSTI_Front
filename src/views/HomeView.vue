<template>
	<div id="HomeView">
		<el-tabs v-model="activeTab" type="card" @tab-remove="removeTab">
			<el-tab-pane label="主页" name="0">
				<!-- 徒有其表的搜索 -->
				<template>
					<el-form label-width="80px" :inline="true">
						<el-form-item>
							<el-input placeholder="关键词搜索" clearable prefix-icon="el-icon-search"
								style="margin-bottom: 10px">
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" icon="el-icon-search" size="medium">搜索</el-button>
							<el-button type="primary" icon="el-icon-refresh" size="medium">重置</el-button>
						</el-form-item>
					</el-form>
				</template>
				<!-- 样品基本信息 -->
				<template>
					<el-table :data="tableData" stripe border height="85vh" style="width: 100%">
						<el-table-column sortable prop="sampleId" label="样品号" width="87">
							<template slot-scope="scope">
								<el-link type="primary">
									<el-tag type="success" effect="plain" size="small"
										@click="addTab(scope.row.sampleId,scope.column.property)">
										{{ scope.row.sampleId }}
									</el-tag>
								</el-link>
							</template>
						</el-table-column>
						<el-table-column sortable prop="sampleType" label="样品类型" width="101"></el-table-column>
						<el-table-column sortable prop="sampleSource" label="样品来源" width="120"></el-table-column>
						<el-table-column sortable prop="samplingYear" label="取样年份" width="101">
							<template slot-scope="scope">
								<i class="el-icon-time"></i>
								<span style="margin-left: 8px">{{ scope.row.samplingYear }}</span>
							</template>
						</el-table-column>
						<el-table-column sortable prop="samplingPeople" label="取样人" width="87">
							<template slot-scope="scope">
								<el-tag size="medium">{{ scope.row.samplingPeople }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="imageId" label="照片号" width="260">
							<template slot-scope="scope">
								<el-popover trigger="hover" placement="top" v-for="img in scope.row.imageId" :key="img">
									<el-image style="height: 200px" :src="pageLink+'api/request/img/' + img"
										fit="contain">
										<div slot="error" class="image-slot">
											<i class="el-icon-picture-outline"></i>
										</div>
									</el-image>
									<div slot="reference" class="name-wrapper">
										<a :href="pageLink+'api/request/img/' + img" target="_blank"
											style="text-decoration: none; color: #409EAF">{{ img }}</a>
									</div>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column prop="sampleDescribe" label="描述" width="190"></el-table-column>
						<el-table-column prop="sampleExplain" label="样品制备说明" width="300"></el-table-column>
						<el-table-column prop="experimentId" label="实验编号" width="160">
							<template slot-scope="scope">
								<el-link type="primary" v-for="sc in scope.row.experimentId" :key="sc">
									<el-tag type="success" effect="plain" size="small"
										@click="addTab(scope.row.sampleId,scope.column.property)">
										{{ sc }}
									</el-tag>
								</el-link>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="62">
							<template slot-scope="scope">
								<span style="display: none;">{{ scope.row.sampleId }}</span>
								<el-button size="mini" round plain type="warning" icon="el-icon-edit"></el-button><br>
								<el-popconfirm @confirm="onDelete(scope.row.sampleId)" confirm-button-text='确定'
									cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="确定删除这一条记录吗？">
									<el-button size="mini" round plain type="danger" icon="el-icon-delete"
										slot="reference">
									</el-button>
								</el-popconfirm>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</el-tab-pane>
			<!--    样品信息分页    -->
			<el-tab-pane v-for="tab in tabsList" :closable="tab.closable" :key="tab.name" :name="tab.name"
				:label="tab.label">
				<!-- 样品详细信息 -->
				<div v-if="tab.src === 'sampleId'">
					<!-- 金相信息 -->
					<template>
						<el-descriptions contentClassName="metalPhaseData" title="金相:" border
							:labelStyle="{width: '150px'}">
							<el-descriptions-item label="金相">{{tab.metalPhaseData.metalPhase}}</el-descriptions-item>
							<el-descriptions-item label="样品全图">
								<template>
									<el-popover trigger="hover" placement="top">
										<el-image style="height: 200px"
											:src="pageLink+'api/request/img/'+tab.metalPhaseData.sfFullImg"
											fit="contain">
											<div class="image-slot">
												<i class="el-icon-picture-outline" />
											</div>
										</el-image>
										<div class="name-wrapper" slot="reference">
											<a :href="pageLink+'api/request/img/'+tab.metalPhaseData.sfFullImg"
												target="_blank"
												style="text-decoration: none; color: #409EAF">{{tab.metalPhaseData.sfFullImg}}</a>
										</div>
									</el-popover>
								</template>
							</el-descriptions-item>
							<el-descriptions-item label="样品全图描述">{{tab.metalPhaseData.sfDescription}}
							</el-descriptions-item>
							<el-descriptions-item label="设备">{{tab.metalPhaseData.sfEquipment}}</el-descriptions-item>
							<el-descriptions-item label="放大倍数">{{tab.metalPhaseData.sfZoom}}</el-descriptions-item>
							<el-descriptions-item label="拍摄模式">{{tab.metalPhaseData.sfPhotoMod}}</el-descriptions-item>
							<el-descriptions-item label="金相照片">
								<div v-if="tab.metalPhaseData.sfImgList.length">
									<el-link v-for="Img in tab.metalPhaseData.sfImgList" type="primary" :key="Img">
										<el-tag type="success" effect="plain" size="small">
											{{Img}}
										</el-tag>
									</el-link>
								</div>
								<div v-else>无</div>
							</el-descriptions-item>
						</el-descriptions><br />
					</template>
					<!-- 矿相信息 -->
					<template>
						<el-descriptions contentClassName="minePhaseData" title="矿相:" border
							:labelStyle="{width: '150px'}">
							<el-descriptions-item label="矿相">{{tab.minePhaseData.minePhase}}</el-descriptions-item>
							<el-descriptions-item label="薄片扫描图">
								<template>
									<el-popover trigger="hover" placement="top">
										<el-image style="height: 200px"
											:src="pageLink+'api/request/img/'+tab.minePhaseData.mpFullImg"
											fit="contain">
											<div class="image-slot">
												<i class="el-icon-picture-outline" />
											</div>
										</el-image>
										<div class="name-wrapper" slot="reference">
											<a :href="pageLink+'api/request/img/'+tab.minePhaseData.mpFullImg"
												target="_blank"
												style="text-decoration: none; color: #409EAF">{{tab.minePhaseData.mpFullImg}}</a>
										</div>
									</el-popover>
								</template>
							</el-descriptions-item>
							<el-descriptions-item label="薄片扫描图描述">{{tab.minePhaseData.mpDescription}}
							</el-descriptions-item>
							<el-descriptions-item label="设备">{{tab.minePhaseData.mpEquipment}}
							</el-descriptions-item>
							<el-descriptions-item label="放大倍数">{{tab.minePhaseData.mpZoom}}</el-descriptions-item>
							<el-descriptions-item label="拍摄模式">{{tab.minePhaseData.mpPhotoMod}}
							</el-descriptions-item>
							<el-descriptions-item label="矿相照片">
								<div v-if="tab.minePhaseData.mpImgList.length">
									<el-link v-for="Img in tab.minePhaseData.mpImgList" type="primary" :key="Img">
										<el-tag type="success" effect="plain" size="small">
											{{Img}}
										</el-tag>
									</el-link>
								</div>
								<div v-else>无</div>
							</el-descriptions-item>
						</el-descriptions><br />
					</template>
					<!-- 电子显微信息 -->
					<template>
						<el-descriptions title="电子显微:" border :labelStyle="{width: '150px'}">
							<el-descriptions-item label="电子显微">{{tab.emPhaseData.emPhase}}</el-descriptions-item>
							<el-descriptions-item label="样品全图">
								<template>
									<el-popover trigger="hover" placement="top">
										<el-image style="height: 200px"
											:src="pageLink+'api/request/img/'+tab.emPhaseData.emFullImg" fit="contain">
											<div class="image-slot">
												<i class="el-icon-picture-outline" />
											</div>
										</el-image>
										<div class="name-wrapper" slot="reference">
											<a :href="pageLink+'api/request/img/'+tab.emPhaseData.emFullImg"
												target="_blank"
												style="text-decoration: none; color: #409EAF">{{tab.emPhaseData.emFullImg}}</a>
										</div>
									</el-popover>
								</template>
							</el-descriptions-item>
							<el-descriptions-item label="样品全图描述">{{tab.emPhaseData.emDescription}}
							</el-descriptions-item>
							<el-descriptions-item label="设备">{{tab.emPhaseData.emEquipment}}</el-descriptions-item>
							<el-descriptions-item label="放大倍数">{{tab.emPhaseData.emZoom}}</el-descriptions-item>
							<el-descriptions-item label="拍摄模式">{{tab.emPhaseData.emPhotoMod}}</el-descriptions-item>
							<el-descriptions-item label="电子显微照片">
								<div v-if="tab.emPhaseData.emImgList.length">
									<el-link v-for="Img in tab.minePhaseData.mpImgList" type="primary" :key="Img">
										<el-tag type="success" effect="plain" size="small">
											{{Img}}
										</el-tag>
									</el-link>
								</div>
								<div v-else>无</div>
							</el-descriptions-item>
						</el-descriptions>
					</template>
					<!-- 物理性能 -->
					<template>
						<el-descriptions title="物理性能:" border :labelStyle="{width: '150px'}">
							<el-descriptions-item label="显气孔率(%)">{{tab.physicalPorosity.apparentPorosity}}</el-descriptions-item>
							<el-descriptions-item label="真密度(g/cm3)">{{tab.physicalPorosity.trueDensity}}</el-descriptions-item>
							<el-descriptions-item label="吸水率(%)">{{tab.physicalPorosity.waterAbsorption}}</el-descriptions-item>
						</el-descriptions>
					</template>
				</div>
				<!-- 样品实验详细信息 -->
				<div v-else-if="tab.src === 'experimentId'">
					<template>
						<el-descriptions title="" border :column="1" :labelStyle="{width: '150px'}">
							<el-descriptions-item label="矿物成分分析">
								<el-table :data="tab.mineralContent" stripe border>
									<el-table-column prop="实验编号" label="实验编号" width="90"></el-table-column>
									<el-table-column v-for="name in tab.mineralContentName" :key="name" :prop="name" :label="name" width="90"></el-table-column>
								</el-table>
							</el-descriptions-item>
							<el-descriptions-item label="物相成分分析">
								<el-table :data="tab.XRDContent" stripe border>
									<el-table-column prop="实验编号" label="实验编号" width="90"></el-table-column>
										<el-table-column v-for="name in tab.XRDContentName" :key="name" :prop="name" :label="name" width="90"></el-table-column>
								</el-table>
							</el-descriptions-item>
							<el-descriptions-item label="化学成分分析">
								<el-table :data="tab.chemicalContent" stripe border>
									<el-table-column prop="实验编号" label="实验编号" width="90"></el-table-column>
										<el-table-column v-for="name in tab.chemicalContentName" :key="name" :prop="name" :label="name" width="90"></el-table-column>
								</el-table>
							</el-descriptions-item>
							<el-descriptions-item label="热分析">
								<el-table :data="tab.thermalPerform" stripe border>
										<el-table-column prop="实验编号" label="实验编号" width="90"></el-table-column>
										<el-table-column prop="终止温度" label="终止温度" width="90"></el-table-column>
										<el-table-column prop="耐火度" label="耐火度" width="90"></el-table-column>
								</el-table>
							</el-descriptions-item>
						</el-descriptions>
					</template>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<style scoped>
	#HomeView {
		padding: 15px;
	}

	::v-deep .el-tabs--card>.el-tabs__header {
		background-color: #fff;
		border-bottom: 1px solid #409EFF;
	}
</style>

<script>
	import {
		localGet,
		localPost,
		localImg
	} from "@/Utils/axios.config";

	export default {
		name: 'HomeView',
		data() {
			return {
				pageLink: localImg, // img解析前缀链接
				tableData: [],
				metalPhaseData: {},
				minePhaseData: {},
				experimentId: [],
				mineralContent: [],
				XRDContent: [],
				chemicalContent: [],
				thermalPerform: [],
				isRouterAlive: true,
				activeTab: "0",
				tabsNumber: 1,
				tabsList: [{
					label: "分页",
					name: "1",
					closable: true,
					src: "sampleId",
					metalPhaseData: {
						metalPhase: "无",
						sfFullImg: "无",
						sfDescription: "无",
						sfEquipment: "无",
						sfZoom: "无",
						sfPhotoMod: "暗场",
						sfImgList: []
					},
					minePhaseData: {
						minePhase: "无",
						mpFullImg: "无",
						mpDescription: "无",
						mpEquipment: "无",
						mpZoom: "无",
						mpPhotoMod: "PPL",
						mpImgList: []
					},
					emPhaseData: {
						emPhase: '无',
						emFullImg: '无',
						emDescription: '无',
						emEquipment: '无',
						emZoom: '无',
						emPhotoMod: '无',
						emImgList: []
					},
					physicalPorosity: {
						apparentPorosity: 0,
						trueDensity: 0,
						waterAbsorption: 0
					}
				}],
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			getData: function() {
				localGet.get("api/request/base")
					.then(response => {
						this.tableData = [];
						for (let i = 0; i < response.data.length; ++i) {
							this.tableData.push(response.data[i])
						}
					})
					.catch(error => {
						if (error.isAxiosError) {
							this.$notify.error({
								title: '出错了',
								message: '数据请求错误，请检查后端和数据库运行情况',
								duration: 0
							});
							console.log(error);
						}
					})
			},
			onDelete: function(s) {
				localPost.post('api/request/delete', {
						'sampleId': s
					})
					.then(() => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getData();
					})
					.catch(error => {
						this.$message.error('删除失败，请检查后端和数据库运行情况');
						console.log(error);
					})
			},
			addTab(sampleId, column) {
				let isExist = 0;
				if (column === "sampleId") {
					this.tabsList.forEach((tab) => {
						if (tab.label === sampleId) {
							this.activeTab = tab.name;
							isExist = 1;
						}
					});
					if (isExist === 0) {

						// axios请求
						localGet.get('api/request/phase/' + sampleId)
							.then(response => {
                console.log(response);
								this.tabsList.push({
									label: sampleId,
									name: String(this.tabsNumber + 1),
									closable: true,
									src: column,
									metalPhaseData: response.data.metalPhaseData,
									minePhaseData: response.data.minePhaseData,
									emPhaseData: response.data.emPhaseData,
                  physicalPorosity: response.data.physicalPorosity
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
					}
				} else if (column === "experimentId") {
					this.tabsList.forEach((tab) => {
						if (tab.label === (sampleId + "的实验")) {
							this.activeTab = tab.name;
							isExist = 1;
						}
					})
					if (isExist === 0) {
							localGet.get('api/request/experiment/' + sampleId)
							.then(response => {
								let data=Object.values(response.data);
								let mineralContentName=Object.keys(data[0].mineralContent);
								let XRDContentName=Object.keys(data[0].XRDContent);
								let chemicalContentName=Object.keys(data[0].chemicalContent);
								let Id=[];
								let mineral=[];
								let XRD=[];
								let chemical=[];
								let thermal=[];
								data.forEach((data) =>
								{
									Id.push(data.experimentId);
									mineral.push(data.mineralContent);
									XRD.push(data.XRDContent);
									chemical.push(data.chemicalContent);
									thermal.push(data.thermalPerform);
								});
								this.tabsList.push({
									label: sampleId + "的实验",
									name: String(this.tabsNumber + 1),
									closable: true,
									src: column,
									experimentId: Id,
									mineralContentName: mineralContentName,
									XRDContentName: XRDContentName,
									chemicalContentName: chemicalContentName,
									mineralContent: mineral,
									XRDContent: XRD,
									chemicalContent: chemical,
									thermalPerform: thermal
								});

						this.activeTab = String(this.tabsNumber + 1);
						this.tabsNumber++;
					})
					.catch(err => {
						console.log(err);
						this.$notify.error({
							title: '出错了',
							message: '数据请求错误，请联系管理员检查运行情况',
							duration: 0
						});
					});
				}
				}
				// this.tabsList.push({
				// 	label: sampleId,
				// 	name: String(this.tabsNumber + 1),
				// 	closable: true,
				//   metalPhaseData: this.metalPhaseData,
				//   minePhaseData: this.minePhaseData
				// })
				// console.log(this.tabsList)
				// this.activeTab = String(this.tabsNumber + 1);
				// this.tabsNumber++;
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
