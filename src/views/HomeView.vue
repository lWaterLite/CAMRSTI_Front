<template>
  <div id="HomeView">
    <el-table
    :data="tableData"
    stripe
    border
    height="85vh"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="table-expand">
          <el-form-item label="金相">
            <span>{{ props.row.test }}</span>
          </el-form-item>
          <el-form-item label="样品全图">
            <span>{{ props.row.test }}</span>
          </el-form-item>
          <el-form-item label="描述">
            <span>{{ props.row.test }}</span>
          </el-form-item>
          <el-form-item label="设备">
            <span>{{ props.row.test }}</span>
          </el-form-item>
          <el-form-item label="放大倍数">
            <span>{{ props.row.test }}</span>
          </el-form-item>
          <el-form-item label="拍摄模式">
            <span>{{ props.row.test }}</span>
          </el-form-item>
          <el-form-item label="金相照片">
            <span>{{ props.row.test }}</span>
          </el-form-item>
          <el-form-item label="描述">
            <span>{{ props.row.test }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column sortable prop="sampleId" label="样品号" width="87"></el-table-column>
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
            <el-image
                style="height: 200px"
                :src="'http://localhost:5000/api/request/img/' + img"
                fit="contain">
                <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
            <div slot="reference" class="name-wrapper">
                <a :href="'http://localhost:5000/api/request/img/' + img" target="_blank" style="text-decoration: underline; color: #409EAF">{{ img }}</a>
            </div>
            </el-popover>
          </template>
      </el-table-column>
      <el-table-column prop="sampleDescribe" label="描述" width="190"></el-table-column>
      <el-table-column prop="sampleExplain" label="样品制备说明" width="300"></el-table-column>
      <el-table-column prop="experimentId" label="实验编号" width="160">
      <template slot-scope="scope">
          <el-link type="primary" v-for="sc in scope.row.experimentId" :key="sc">
          <el-tag type="success" effect="plain" size="small">
              {{ sc }}
          </el-tag>
          </el-link>
      </template>
      </el-table-column>
      <el-table-column label="操作" width="62">
        <template slot-scope="scope">
          <span style="display: none;">{{ scope.row.sampleId }}</span>
          <el-button size="mini" round plain type="warning" icon="el-icon-edit"></el-button><br>
          <el-button size="mini" round plain type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
#HomeView {
  padding: 15px;
}

.table-expand {
  font-size: 0;
}

.table-expand label {
  width: 90px;
  color: #99a9bf;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'HomeView',
  data() {
    return {
      tableData: []
      // tableData: [
      //   {
      //     sampleId: '11Y1:9',
      //     sampleType: '炉壁',
      //     sampleSource: '北京延庆水泉沟',
      //     samplingYear: 2019,
      //     samplingPeople: '刘海峰',
      //     imageId: 'IMG_20190512_33333',
      //     describe: '取自炉体上半部分，红色，质地疏松多空',
      //     explain: '自内向外取三处，分别做薄片后矿相观察，制备粉末样品开展XRD分析',
      //     experimentId: ["11Y3:9-1", "11Y3:9-2", "11Y3:9-3"],
      //     test: '无'
      //   },
      //   {
      //     sampleId: '11Y1:8',
      //     sampleType: '炉壁',
      //     sampleSource: '北京延庆水泉沟',
      //     samplingYear: 2019,
      //     samplingPeople: '刘海峰',
      //     imageId: 'IMG_20190512_33333',
      //     describe: '取自炉体上半部分，红色，质地疏松多空',
      //     explain: '自内向外取三处，分别做薄片后矿相观察，制备粉末样品开展XRD分析',
      //     experimentId: ['11Y3:9-1', '11Y3:9-2', '11Y3:9-3'],
      //     test: '无'
      //   }
      // ]
    }
  },
  mounted: function () {
    const that = this;
    axios.get("http://localhost:5000/api/request/base")
        .then(function (response) {
          // console.log(response.data.count);
          for (let i=0;i<response.data.length;++i) {
            that.tableData.push(response.data[i])
          }
          // console.log(that.tableData);
        })
        .catch(function (error) {
          // console.log(error)
          if (error.isAxiosError) {
            alert('数据请求失败，请检查后端和数据库是否正在运行')
          }
        })
  }
}
</script>
