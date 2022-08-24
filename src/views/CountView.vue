<template>
  <div id="CountView">
  <template>//Element Tabs 自定义增加标签页触发器
    <div style="margin-bottom: 20px;">
      <el-button
          size="small"
          @click="addTab(editableTabsValue)"
      >
        add tab
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
      <template>//
        <el-radio-group v-model="radio">
          <el-radio :label="3">样品号</el-radio>
          <el-radio :label="6">夯土炉壁</el-radio>
          <el-radio :label="9">黏土坯</el-radio>
          <el-radio :label="12">窑坯</el-radio>
          <el-radio :label="15">炉底夯土</el-radio>
          <el-radio :label="18">黏土饼</el-radio>
          <el-radio :label="21">泥质砖</el-radio>
          <el-radio :label="24">草拌泥</el-radio>
          <el-radio :label="27">砂质砖</el-radio>
          <el-radio :label="30">砂质材料</el-radio>
          <el-radio :label="33">炉衬</el-radio>
          <el-radio :label="36">出渣槽衬</el-radio>
        </el-radio-group>
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
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2,
      radio: 12
    };
  },
  methods: {
    addTab(targetName) {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: 'New Tab',
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