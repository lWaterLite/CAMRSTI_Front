import axios from "@/Utils/axios.config";

export function getPhaseData(sampleId, that) {
  axios.localGet.get('api/request/phase/'+sampleId)
    .then(response => {
        that.metalPhaseData = response.data.metalPhaseData
        that.minePhaseData = response.data.minePhaseData
        console.log(that.metalPhaseData);
    })
    .catch(err => {
      console.log(err);
      that.$notify.error({
        title: '出错了',
        message: '数据请求错误，请联系管理员检查运行情况'
      });
    });
}
