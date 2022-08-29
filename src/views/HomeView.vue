<template>
	<div id="HomeView">
		<el-tabs v-model="activeTab" type="card" @tab-remove="removeTab">
			<el-tab-pane label="主页" name="0">
				<!-- 样品基本信息 -->
				<template>
					<el-table :data="tableData" stripe border height="80vh" style="width: 100%">
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
							<el-descriptions-item label="金相">
								<el-select size="small" v-model="tab.metalPhaseData.metalPhase" v-show="tab.metalEditable">
									<el-option label="有" value="有"></el-option>
									<el-option label="无" value="无"></el-option>
								</el-select>
								<span v-show="!tab.metalEditable">{{tab.metalPhaseData.metalPhase}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="样品全图">
								<el-upload v-show="tab.metalEditable" ref="upload" :auto-upload="false" action=""
									multiple style="width: 100%" :limit="1">
									<i class="el-icon-upload"></i>
									<div class="el-upload__text"><em>点击上传</em></div>
									<div class="el-upload__tip" slot="tip">只能上传jpg/png文件(可传1张)</div>
								</el-upload>
								<span v-show="!tab.metalEditable">
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
								</span>
							</el-descriptions-item>
							<el-descriptions-item label="样品全图描述">
								<el-input type="textarea" autosize v-model="tab.metalPhaseData.sfDescription"
									v-show="tab.metalEditable"></el-input>
								<span v-show="!tab.metalEditable">{{tab.metalPhaseData.sfDescription}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="设备">
								<el-input type="text" v-model="tab.metalPhaseData.sfEquipment" v-show="tab.metalEditable">
								</el-input>
								<span v-show="!tab.metalEditable">{{tab.metalPhaseData.sfEquipment}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="放大倍数">
								<el-input type="text" v-model="tab.metalPhaseData.sfZoom" v-show="tab.metalEditable">
								</el-input>
								<span v-show="!tab.metalEditable">{{tab.metalPhaseData.sfZoom}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="拍摄模式">
								<el-select size="small" v-model="tab.metalPhaseData.sfPhotoMod" v-show="tab.metalEditable">
									<el-option label="明场" value="明场"></el-option>
									<el-option label="暗场" value="暗场"></el-option>
								</el-select>
								<span v-show="!tab.metalEditable">{{tab.metalPhaseData.sfPhotoMod}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="金相照片">
								<el-upload v-show="tab.metalEditable" ref="upload" :auto-upload="false" action=""
									multiple style="width: 100%" :limit="30">
									<i class="el-icon-upload"></i>
									<div class="el-upload__text"><em>点击上传</em></div>
									<div class="el-upload__tip" slot="tip">只能上传jpg/png文件(可传30张)</div>
								</el-upload>
								<span v-show="!tab.metalEditable">
									<div v-if="tab.metalPhaseData.sfImgList.length">
										<el-link v-for="Img in tab.metalPhaseData.sfImgList" type="primary" :key="Img">
											<el-popover trigger="hover" placement="top">
												<el-image style="height: 200px" :src="pageLink+'api/request/img/'+Img"
													fit="contain">
													<div class="image-slot">
														<i class="el-icon-picture-outline" />
													</div>
												</el-image>
												<el-tag type="success" effect="plain" size="small" slot="reference"
													@click.native="addTab(Img,'Image')">
													{{Img}}
												</el-tag>
											</el-popover>
										</el-link>
									</div>
									<div v-else>无</div>
								</span>
							</el-descriptions-item>
						</el-descriptions><br />
					</template>
					<!-- 修改按钮 -->
					<template>
						<el-row>
							<template>
								<el-button v-show="tab.metalEditable" type="primary" icon="el-icon-circle-close" @click="unedit(tab.name,'metalPhaseData')">取消</el-button>
								<span v-show="!tab.metalEditable">
							<el-button type="primary" icon="el-icon-edit" @click="edit(tab.name,'metalPhaseData')">修改</el-button>
							</span>
							</template>
							<el-button type="primary" icon="el-icon-upload">上传</el-button>
						</el-row><br />
					</template>
					<!-- 矿相信息 -->
					<template>
						<el-descriptions contentClassName="minePhaseData" title="矿相:" border
							:labelStyle="{width: '150px'}">
							<el-descriptions-item label="矿相">
								<el-select size="small" v-model="tab.minePhaseData.minePhase" v-show="tab.mineEditable">
									<el-option label="有" value="有"></el-option>
									<el-option label="无" value="无"></el-option>
								</el-select>
								<span v-show="!tab.mineEditable">{{tab.minePhaseData.minePhase}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="薄片扫描图">
								<el-upload v-show="tab.mineEditable" ref="upload" :auto-upload="false" action=""
									multiple style="width: 100%" :limit="1">
									<i class="el-icon-upload"></i>
									<div class="el-upload__text"><em>点击上传</em></div>
									<div class="el-upload__tip" slot="tip">只能上传jpg/png文件(可传1张)</div>
								</el-upload>
								<span v-show="!tab.mineEditable">
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
								</span>
							</el-descriptions-item>
							<el-descriptions-item label="薄片扫描图描述">
								<el-input type="textarea" autosize v-model="tab.minePhaseData.mpDescription"
									v-show="tab.mineEditable"></el-input>
								<span v-show="!tab.mineEditable">{{tab.minePhaseData.mpDescription}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="设备">
								<el-input type="text" autosize v-model="tab.minePhaseData.mpEquipment"
									v-show="tab.mineEditable"></el-input>
								<span v-show="!tab.mineEditable">{{tab.minePhaseData.mpEquipment}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="放大倍数">
								<el-input type="text" autosize v-model="tab.minePhaseData.mpZoom" v-show="tab.mineEditable">
								</el-input>
								<span v-show="!tab.mineEditable">{{tab.minePhaseData.mpZoom}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="拍摄模式">
								<el-select size="small" v-model="tab.minePhaseData.mpPhotoMod" v-show="tab.mineEditable">
									<el-option label="XPL" value="XPL"></el-option>
									<el-option label="PPL" value="PPL"></el-option>
								</el-select>
								<span v-show="!tab.mineEditable">{{tab.minePhaseData.mpPhotoMod}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="矿相照片">
								<el-upload v-show="tab.mineEditable" ref="upload" :auto-upload="false" action=""
									multiple style="width: 100%" :limit="30">
									<i class="el-icon-upload"></i>
									<div class="el-upload__text"><em>点击上传</em></div>
									<div class="el-upload__tip" slot="tip">只能上传jpg/png文件(可传30张)</div>
								</el-upload>
								<span v-show="!tab.mineEditable">
									<div v-if="tab.minePhaseData.mpImgList.length">
										<el-link v-for="Img in tab.minePhaseData.mpImgList" type="primary" :key="Img">
											<el-popover trigger="hover" placement="top">
												<el-image style="height: 200px" :src="pageLink+'api/request/img/'+Img"
													fit="contain">
													<div class="image-slot">
														<i class="el-icon-picture-outline" />
													</div>
												</el-image>
												<el-tag type="success" effect="plain" size="small" slot="reference"
													@click.native="addTab(Img,'Image')">
													{{Img}}
												</el-tag>
											</el-popover>
										</el-link>
									</div>
									<div v-else>无</div>
								</span>
							</el-descriptions-item>
						</el-descriptions><br />
					</template>
					<!-- 修改按钮 -->
					<template>
						<el-row>
							<template>
								<el-button v-show="tab.mineEditable" type="primary" icon="el-icon-circle-close" @click="unedit(tab.name,'minePhaseData')">取消</el-button>
								<span v-show="!tab.mineEditable">
							<el-button type="primary" icon="el-icon-edit" @click="edit(tab.name,'minePhaseData')">修改</el-button>
							</span>
							</template>
							<el-button type="primary" icon="el-icon-upload">上传</el-button>
						</el-row><br />
					</template>
					<!-- 电子显微信息 -->
					<template>
						<el-descriptions title="电子显微:" border :labelStyle="{width: '150px'}">
							<el-descriptions-item label="电子显微">
								<el-select size="small" v-model="tab.emPhaseData.emPhase" v-show="tab.emEditable">
									<el-option label="有" value="有"></el-option>
									<el-option label="无" value="无"></el-option>
								</el-select>
								<span v-show="!tab.emEditable">{{tab.emPhaseData.emPhase}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="样品全图">
								<template>
									<el-upload v-show="tab.emEditable" ref="upload" :auto-upload="false" action=""
										multiple style="width: 100%" :limit="1">
										<i class="el-icon-upload"></i>
										<div class="el-upload__text"><em>点击上传</em></div>
										<div class="el-upload__tip" slot="tip">只能上传jpg/png文件(可传1张)</div>
									</el-upload>
									<span v-show="!tab.emEditable">
										<el-popover trigger="hover" placement="top">
											<el-image style="height: 200px"
												:src="pageLink+'api/request/img/'+tab.emPhaseData.emFullImg"
												fit="contain">
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
									</span>
								</template>
							</el-descriptions-item>
							<el-descriptions-item label="样品全图描述">
								<el-input type="textarea" autosize v-model="tab.emPhaseData.emDescription"
									v-show="tab.emEditable"></el-input>
								<span v-show="!tab.emEditable">{{tab.emPhaseData.emDescription}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="设备">
								<el-input type="text" autosize v-model="tab.emPhaseData.emEquipment"
									v-show="tab.emEditable"></el-input>
								<span v-show="!tab.emEditable">{{tab.emPhaseData.emEquipment}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="放大倍数">
								<el-input type="text" autosize v-model="tab.emPhaseData.emZoom" v-show="tab.emEditable">
								</el-input>
								<span v-show="!tab.emEditable">{{tab.emPhaseData.emZoom}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="拍摄模式">
								<el-select size="small" v-model="tab.emPhaseData.emPhotoMod" v-show="tab.emEditable">
									<el-option label="SE" value="SE"></el-option>
									<el-option label="BSE" value="BSE"></el-option>
								</el-select>
								<span v-show="!tab.emEditable">{{tab.emPhaseData.emPhotoMod}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="电子显微照片">
								<el-upload v-show="tab.emEditable" ref="upload" :auto-upload="false" action=""
									multiple style="width: 100%" :limit="30">
									<i class="el-icon-upload"></i>
									<div class="el-upload__text"><em>点击上传</em></div>
									<div class="el-upload__tip" slot="tip">只能上传jpg/png文件(可传30张)</div>
								</el-upload>
								<span v-show="!tab.emEditable">
									<div v-if="tab.emPhaseData.emImgList.length">
										<el-link v-for="Img in tab.emPhaseData.emImgList" type="primary" :key="Img">
											<el-popover trigger="hover" placement="top">
												<el-image style="height: 200px" :src="pageLink+'api/request/img/'+Img"
													fit="contain">
													<div class="image-slot">
														<i class="el-icon-picture-outline" />
													</div>
												</el-image>
												<el-tag type="success" effect="plain" size="small" slot="reference"
													@click.native="addTab(Img,'Image')">
													{{Img}}
												</el-tag>
											</el-popover>
										</el-link>
									</div>
									<div v-else>无</div>
								</span>
							</el-descriptions-item>
						</el-descriptions>
					</template><br />
					<!-- 修改按钮 -->
					<template>
						<el-row>
							<template>
								<el-button v-show="tab.emEditable" type="primary" icon="el-icon-circle-close" @click="unedit(tab.name,'emPhaseData')">取消</el-button>
								<span v-show="!tab.emEditable">
							<el-button type="primary" icon="el-icon-edit" @click="edit(tab.name,'emPhaseData')">修改</el-button>
							</span>
							</template>
							<el-button type="primary" icon="el-icon-upload">上传</el-button>
						</el-row><br />
					</template>
					<!-- 物理性能 -->
					<template>
						<el-descriptions title="物理性能:" border :labelStyle="{width: '150px'}">
							<el-descriptions-item label="显气孔率(%)">
								<el-input type="text" autosize v-model="tab.physicalPorosity.apparentPorosity"
									v-show="tab.physicalEditable"></el-input>
								<span v-show="!tab.physicalEditable">{{tab.physicalPorosity.apparentPorosity}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="真密度(g/cm3)">
								<el-input type="text" autosize v-model="tab.physicalPorosity.trueDensity"
									v-show="tab.physicalEditable"></el-input>
								<span v-show="!tab.physicalEditable">{{tab.physicalPorosity.trueDensity}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="吸水率(%)">
								<el-input type="text" autosize v-model="tab.physicalPorosity.waterAbsorption"
									v-show="tab.physicalEditable"></el-input>
								<span v-show="!tab.physicalEditable">{{tab.physicalPorosity.waterAbsorption}}</span>
							</el-descriptions-item>
						</el-descriptions>
					</template><br />
					<!-- 修改按钮 -->
					<template>
						<el-row>
							<template>
								<el-button v-show="tab.physicalEditable" type="primary" icon="el-icon-circle-close" @click="unedit(tab.name,'physicalPorosity')">取消</el-button>
								<span v-show="!tab.physicalEditable">
							<el-button type="primary" icon="el-icon-edit" @click="edit(tab.name,'physicalPorosity')">修改</el-button>
							</span>
							</template>
							<el-button type="primary" icon="el-icon-upload">上传</el-button>
						</el-row>
					</template>
				</div>
				<!-- 样品实验详细信息 -->
				<div v-else-if="tab.src === 'experimentId'">
					<template>
						<el-descriptions title="" border :column="1" :labelStyle="{width: '150px'}">
							<el-descriptions-item label="矿物成分分析">
								<el-table :data="tab.mineralContent" stripe border style="width: 175vh">
									<el-table-column prop="实验编号" label="实验编号" width="90"></el-table-column>
									<el-table-column v-for="name in tab.mineralContentName" :key="name" :prop="name"
										:label="name" width="150">
										<template slot="header" slot-scope="scope">
											<el-row>
												<el-input size="mini" name="colNameList" :value="name"></el-input>
												<el-button size="mini" type="danger" icon="el-icon-delete">
												</el-button>
											</el-row>
										</template>
										<template slot-scope="scope">
											<el-input size="mini" v-model="scope.row[name]"></el-input>
										</template>
									</el-table-column>
								</el-table>
							</el-descriptions-item>
							<el-descriptions-item label="物相成分分析">
								<el-table :data="tab.XRDContent" stripe border style="width: 175vh">
									<el-table-column prop="实验编号" label="实验编号" width="90"></el-table-column>
									<el-table-column v-for="name in tab.XRDContentName" :key="name" :prop="name"
										:label="name" width="150"></el-table-column>
								</el-table>
							</el-descriptions-item>
							<el-descriptions-item label="化学成分分析">
								<el-table :data="tab.chemicalContent" stripe border style="width: 175vh">
									<el-table-column prop="实验编号" label="实验编号" width="90"></el-table-column>
									<el-table-column v-for="name in tab.chemicalContentName" :key="name" :prop="name"
										:label="name" width="150"></el-table-column>
								</el-table>
							</el-descriptions-item>
							<el-descriptions-item label="热分析">
								<el-table :data="tab.thermalPerform" stripe border>
									<el-table-column prop="实验编号" label="实验编号" width="90"></el-table-column>
									<el-table-column v-for="name in tab.thermalPerformName" :key="name" :prop="name"
										:label="name" width="150"></el-table-column>
								</el-table>
							</el-descriptions-item>
						</el-descriptions>
					</template><br />
					<!-- 修改按钮 -->
					<template>
						<el-row>
							<el-button type="primary" icon="el-icon-edit" @click="edit(tab.name)">修改</el-button>
							<el-button type="primary" icon="el-icon-upload">上传</el-button>
						</el-row>
					</template>
				</div>
				<!-- 照片详细信息页 -->
				<div v-else-if="tab.src === 'Image'">
					<template>
						<el-descriptions border :labelStyle="{width: '150px'}">
							<el-descriptions-item label="照片">
								<el-image style="height: 200px" :src="pageLink+'api/request/img/'+tab.imageIndex"
									fit="contain">
									<div class="image-slot">
										<i class="el-icon-picture-outline" />
									</div>
								</el-image>
							</el-descriptions-item>
							<el-descriptions-item label="描述">
								<el-input type="textarea" autosize v-model="tab.omDescription" v-show="tab.editable">
								</el-input>
								<span v-show="!tab.editable">{{tab.omDescription}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="设备">
								<el-input type="text" v-model="tab.omEquipment" v-show="tab.editable">
								</el-input>
								<span v-show="!tab.editable">{{tab.omEquipment}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="放大倍数">
								<el-input type="text" v-model="tab.omZoom" v-show="tab.editable">
								</el-input>
								<span v-show="!tab.editable">{{tab.omZoom}}</span>
							</el-descriptions-item>
							<el-descriptions-item label="拍摄模式">
								<el-input type="text" v-model="tab.omPhotoMod" v-show="tab.editable">
								</el-input>
								<span v-show="!tab.editable">{{tab.omPhotoMod}}</span>
							</el-descriptions-item>
						</el-descriptions>
					</template><br />
					<!-- 修改按钮 -->
					<template>
						<el-row>
							<el-button type="primary" icon="el-icon-edit" @click="edit(tab.name)">修改</el-button>
							<el-button type="primary" icon="el-icon-upload">上传</el-button>
						</el-row>
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

	/*::v-deep .el-tabs--card>.el-tabs__header {*/
	/*	background-color: #fff;*/
	/*	border-bottom: 1px solid #409EFF;*/
	/*}*/
</style>

<script>
	import {
		httpGet,
		httpPost,
		httpImg
	} from "@/Utils/axios.config";

	export default {
		name: 'HomeView',
		data() {
			return {
				pageLink: httpImg, // img解析前缀链接
				tableData: [],
				metalPhaseData: {
					metalPhase: '',
					sfFullImg: '',
					sfDescription: '',
					sfEquipment: '',
					sfZoom: '',
					sfPhotoMod: '',
					sfImgList: []
				},
				minePhaseData: {
					minePhase: '',
					mpFullImg: '',
					mpDescription: '',
					mpEquipment: '',
					mpZoom: '',
					mpPhotoMod: '',
					mpImgList: []
				},
				emPhaseData: {
					emPhase: '',
					emFullImg: '',
					emDescription: '',
					emEquipment: '',
					emZoom: '',
					emPhotoMod: '',
					emImgList: []
				},
				physicalPorosity: {
					apparentPorosity: '',
					trueDensity: '',
					waterAbsorption: ''
				},
				experimentId: [],
				mineralContent: [],
				XRDContent: [],
				chemicalContent: [],
				thermalPerform: [],
				isRouterAlive: true,
				activeTab: "0",
				tabsNumber: 0,
				tabsList: [],
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			getData: function() {
				httpGet.get("api/request/base")
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
				httpPost.post('api/request/delete', {
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
			addTab(id, type) {
				let isExist = 0;
				if (type === "sampleId") {
					this.tabsList.forEach((tab) => {
						if (tab.label === id) {
							this.activeTab = tab.name;
							isExist = 1;
						}
					});
					if (isExist === 0) {
						// axios请求
						httpGet.get('api/request/phase/' + id)
							.then(response => {
								this.tabsList.push({
									label: id,
									name: String(this.tabsNumber + 1),
									closable: true,
									metalEditable: false,
									mineEditable: false,
									emEditable: false,
									physicalEditable: false,
									src: type,
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
				} else if (type === "experimentId") {
					this.tabsList.forEach((tab) => {
						if (tab.label === (id + "的实验")) {
							this.activeTab = tab.name;
							isExist = 1;
						}
					})
					if (isExist === 0) {
						httpGet.get('api/request/experiment/' + id)
							.then(response => {
								let data = Object.values(response.data);
								let mineralContentName = Object.keys(data[0].mineralContent);
								mineralContentName = mineralContentName.filter(name => name !== '实验编号')
								let XRDContentName = Object.keys(data[0].XRDContent);
								XRDContentName = XRDContentName.filter(name => name !== '实验编号')
								let chemicalContentName = Object.keys(data[0].chemicalContent);
								chemicalContentName = chemicalContentName.filter(name => name !== '实验编号')
								let thermalPerformName = Object.keys(data[0].thermalPerform);
								thermalPerformName = thermalPerformName.filter(name => name !== '实验编号')
								let Id = [];
								let mineral = [];
								let XRD = [];
								let chemical = [];
								let thermal = [];
								data.forEach((data) => {
									Id.push(data.experimentId);
									mineral.push(data.mineralContent);
									XRD.push(data.XRDContent);
									chemical.push(data.chemicalContent);
									thermal.push(data.thermalPerform);
								});
								this.tabsList.push({
									label: id + "的实验",
									name: String(this.tabsNumber + 1),
									closable: true,
									editable: false,
									src: type,
									experimentId: Id,
									mineralContentName: mineralContentName,
									XRDContentName: XRDContentName,
									chemicalContentName: chemicalContentName,
									thermalPerformName: thermalPerformName,
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
				} else if (type === "Image") {
					this.tabsList.forEach((tab) => {
						if (tab.label === id) {
							this.activeTab = tab.name;
							isExist = 1;
						}
					})
					if (isExist === 0) {
						this.tabsList.push({
							label: id,
							name: String(this.tabsNumber + 1),
							closable: true,
							editable: false,
							src: type,
							imageIndex: id,
							omDescription: 0,
							omEquipment: 0,
							omZoom: 0,
							omPhotoMod: 0,
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
			edit(name,element) {
				this.tabsList.forEach((tab) => {
					if (tab.name === name) {
						if (element === "metalPhaseData") {
							tab.metalEditable = true;
						}
						else if (element === "minePhaseData") {
							tab.mineEditable = true
						}
						else if (element === "emPhaseData") {
							tab.emEditable = true
						}
						else if (element === "physicalPorosity") {
							tab.physicalEditable = true
						}
					}
				});
			},
			unedit(name,element) {
				this.tabsList.forEach((tab) => {
					if (tab.name === name) {
						if (element === "metalPhaseData") {
							tab.metalEditable = false;
						}
						else if (element === "minePhaseData") {
							tab.mineEditable = false;
						}
						else if (element === "emPhaseData") {
							tab.emEditable = false;
						}
						else if (element === "physicalPorosity") {
							tab.physicalEditable = false;
						}
					}
				});
			}
		},
	}
</script>
