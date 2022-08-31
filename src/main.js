import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router'
import store from './store'
import App from './App.vue'

import 'echarts';
import ECharts from 'vue-echarts';

Vue.component('ECharts', ECharts);

Vue.use(ElementUI)

Vue.config.productionTip = false



import { use } from 'echarts/core'

// import ECharts modules manually to reduce bundle size
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
]);

// register globally (or you can do it locally)
Vue.component('v-chart', ECharts)






new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
