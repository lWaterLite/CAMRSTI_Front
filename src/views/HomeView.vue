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
                :src="'http://1.13.21.160:5001/api/request/img/' + img"
                fit="contain">
                <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
            <div slot="reference" class="name-wrapper">
                <a :href="'http://1.13.21.160:5001/api/request/img/' + img" target="_blank" style="text-decoration: underline; color: #409EAF">{{ img }}</a>
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
          <el-popconfirm
              @confirm="onDelete(scope.row.sampleId)"
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="确定删除这一条记录吗？">
            <el-button size="mini" round plain type="danger" icon="el-icon-delete" slot="reference"></el-button>
          </el-popconfirm>
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

</style>

<script>
import axios from 'axios'

export default {
  name: 'HomeView',
  data() {
    return {
      tableData: [],
      isRouterAlive: true
    }
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    getData: function () {
      axios.get("http://1.13.21.160:5001/api/request/base")
          .then( response => {
            this.tableData = [];
            for (let i=0;i<response.data.length;++i) {
              this.tableData.push(response.data[i])
            }
          })
          .catch(function (error) {
            if (error.isAxiosError) {
              this.$notify.error({
                title: '出错了',
                message: '数据请求错误，请检查后端和数据库运行情况'
              });
              console.log(error);
            }
          })
    },
    onDelete: function (s) {
      axios.post('http://1.13.21.160:5001/api/request/delete', {'sampleId': s})
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
    }
  }
}
</script>
