<template>
  <div id="CountView">
  <template>

    <div style="margin-bottom: 20px;">
      <el-button
          size="small"
          @click="addTab(editableTabsValue)"
      >
        增加新页面
      </el-button>
    </div>
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
      >
        {{item.content}}
      </el-tab-pane>
      <template>

      </template>
      <template>
        <el-tabs type="border-card">
          <el-tab-pane label="样本编号">样本编号</el-tab-pane>
          <el-tab-pane label="夯土炉壁">夯土炉壁</el-tab-pane>
          <el-tab-pane label="炉底夯土">炉底夯土</el-tab-pane>
          <el-tab-pane label="黏土坯">黏土坯</el-tab-pane>
          <el-tab-pane label="窑坯">窑坯</el-tab-pane>
          <el-tab-pane label="黏土饼">黏土饼</el-tab-pane>
          <el-tab-pane label="泥质砖">泥质砖</el-tab-pane>
          <el-tab-pane label="草拌泥">草拌泥</el-tab-pane>
          <el-tab-pane label="泥质砖">泥质砖</el-tab-pane>
          <el-tab-pane label="砂质砖">砂质砖</el-tab-pane>
          <el-tab-pane label="砂质材料">砂质材料</el-tab-pane>
          <el-tab-pane label="炉衬">炉衬</el-tab-pane>
          <el-tab-pane label="出渣槽衬">出渣槽衬</el-tab-pane>
        </el-tabs>
      </template>
    </el-tabs>
</template>


  </div>
</template>

<script>

export default {
  data () {
    return {
      editableTabsValue: '2',
      editableTabs: [{
        title: '页面 1',
        name: '1',
        content: '页面1内容'
      }, {
        title: '页面 2',
        name: '2',
        content: '页面2内容'
      }],
      tabIndex: 2,

    };
  },
  methods: {
    addTab(targetName) {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: '新页面',
        name: newTabName,
        content: 'New Tab content'
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
}
</script>

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

</style>