<template>
  <div id="AddView">
    <el-form class="form" ref="form" :rules="rules" :model="form" label-width="100px" label-position="right" style="width: 800px;" >
        <el-form-item label="样品编号" prop="sampleId">
          <el-input v-model="form.sampleId"></el-input>
        </el-form-item>
        <el-form-item label="样品类型" prop="sampleType">
          <el-select v-model="form.sampleType" placeholder="请选择样品类型" style="width: 100%">
            <el-option label="炉渣" value="炉渣"></el-option>
            <el-option label="炉壁" value="炉壁"></el-option>
            <el-option label="陶范" value="陶范"></el-option>
            <el-option label="坩埚" value="坩埚"></el-option>
            <el-option label="鼓风管" value="鼓风管"></el-option>
            <el-option label="铜" value="铜"></el-option>
            <el-option label="铁" value="铁"></el-option>
            <el-option label="不明" value="不明"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="样品来源" prop="sampleSource">
          <el-input v-model="form.sampleSource"></el-input>
        </el-form-item>
        <el-form-item label="取样年份" prop="samplingYear">
          <el-date-picker type="year"
                          value-format="yyyy"
                          placeholder="选择年份"
                          v-model="form.samplingYear"
                          style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="取样人员" prop="samplingPeople">
          <el-input v-model="form.samplingPeople"></el-input>
        </el-form-item>
        <el-form-item label="样片照片" prop="imageId">
          <!-- <el-input v-model="form.imageId"></el-input> -->
          <el-upload
              ref="upload"
              :auto-upload="false"
              :on-change="handleChange"
              show-file-list
              drag
              action=""
              :http-request="uploadFile"
              multiple
              style="width: 100%">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1Mb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="样品描述" prop="sampleDescribe">
          <el-input type="textarea" :maxlength="300" show-word-limit autosize v-model="form.sampleDescribe"></el-input>
        </el-form-item>
        <el-form-item label="制备说明" prop="sampleExplain">
          <el-input type="textarea" :maxlength="500" show-word-limit autosize v-model="form.sampleExplain"></el-input>
        </el-form-item>
        <el-form-item label="实验编号" prop="experimentId">
          <el-input type="textarea"
                    placeholder="实验编号请使用分号间隔，结尾无需添加。eg: 19Y1:1;19Y1:2;19Y1:3"
                    :autosize="{minRows: 1, maxRows: 3}"
                    v-model="form.experimentId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即增加</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
<!--    <button @click="testButton">test</button>-->
  </div>
</template>

<style scoped>
#AddView {
  background: #fff;
  padding-top: 20px;
  padding-left: 10px;
  padding-bottom: 10px;
}
</style>

<script>
import axios from "axios";

export default {
  name: 'AddView',
  mounted() {
  },
  data() {
    // let validateExpId = (rule, value, callback) => {
    //   try {
    //     value.split
    //   }
    // };
    return {
      form: {
        sampleId: '',
        sampleType: '',
        sampleSource: '',
        samplingYear: undefined,
        samplingPeople: '',
        imageId: [],
        sampleDescribe: '',
        sampleExplain: '',
        experimentId: ''
      },
      rules: {
        sampleId: [
          {required: true, message: '请输入样品编号', trigger: 'blur'},
          {max: 20, trigger: 'blur', message: '样品编号不能超过20个字符'}
        ],
        sampleType: [
          {required: true, trigger: 'blur', message: '请选择样品类型'}
        ],
        sampleSource: [
          {required: true, message: '请输入样品来源', trigger: 'blur'},
          {max: 30, trigger: 'blur', message: '样品来源不能超过30个字符'}
        ],
        samplingYear: [
          {required: true, trigger: 'blur', message: '请选择取样年份'}
        ],
        samplingPeople: [
          {required: true, trigger: 'blur', message: '请输入取样人员'},
          {max: 6, trigger: 'blur', message: '取样人员不能超过6个字符'}
        ],
        imageId: [
          {required: true, message: '请选择样品图片', trigger: 'blur'},
        ],
        sampleDescribe: [
          {required: true, trigger: 'blur', message: '请输入样品描述'},
          // {max: 300, trigger: 'blur', message: '样品描述不能超过300个字符'}
        ],
        sampleExplain: [
          {required: true, trigger: 'blur', message: '请输入制备说明'},
          // {max: 500, trigger: 'blur', message: '制备说明不能超过500个字符'}
        ],
        experimentId: [
          {required: true, trigger: 'blur', message: '请输入实验编号'},

        ]
      }
    }
  },
  methods: {
    // testButton: function () {
    //   this.$refs.upload.submit();
    // },
    uploadFile: function (param) {
      let fileObj = param.file
      let form = new FormData()
      form.append("fileToUpload", fileObj)
      axios.post("http://127.0.0.1:5000/api/upload/img", form)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        this.$notify.error({
          title: '错误',
          message: '图片上传发生了错误，请检查后端状况\n错误信息：' + err,
          duration: 0
        });
      })
    },
    handleChange: function (file, fileList) {
      this.form.imageId = fileList.map((item) => {
        return item.name
      });
    },
    onSubmit() {
      if (!this.form.imageId.length) {
        this.$refs.form.validate((valid) => {
          return valid;
        })
      } else {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.experimentId = this.form.experimentId.split(';'); // 实验编号处理
            axios.post('http://127.0.0.1:5000/api/upload/base', this.form)
                .then(() => {
                  // 数据库上传成功后上传图片
                  this.$refs.upload.submit();
                  this.$notify({
                    title: '上传成功',
                    message: '数据上传成功',
                    type: 'success',
                    duration: 2000
                  });
                  this.$refs.form.resetFields();   //上传成功后清空表单
                })
                .catch(err => {
                  this.$notify.error({
                    title: '错误',
                    message: '数据上传发生了错误，请检查数据库和后端状况\n错误信息：' + err,
                    duration: 0
                  });
                })
          }
        });
      }
    },
    cancel: function () {
      this.$refs.form.resetFields();
    }
  }
}
</script>
