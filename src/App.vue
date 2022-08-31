<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-container direction="horizontal">
          <el-image
            style="width: 60px; height: 60px"
            :src="require('@/assets/logo.png')"
            fit="contain">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <span>中国古代冶金耐火材料科技信息数据库</span>
        </el-container>
      </el-header>
      <el-container style="height: 94vh" direction="horizontal">
        <el-aside width="200px">
          <el-menu
            default-active="1"
            :default-openeds="['4']"
            @select="handleMenuSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">
              <i class="el-icon-document"></i>
              <span slot="title">数据列表</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document-add"></i>
              <span slot="title">增加数据</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-search"></i>
              <span slot="title">信息检索</span>
            </el-menu-item>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-data-analysis"></i>
                <span>统计信息</span>
              </template>
              <el-menu-item-group>
                <template slot="title">统计</template>
                <el-menu-item index="4-1">计数</el-menu-item>
                <el-menu-item index="4-2">均值</el-menu-item>
                <el-menu-item index="4-3">图表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
          <el-footer>
            Created By Ablocker © <router-link to="/about">关于</router-link>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
  <!--
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
   -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

body {
  margin: 0px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-footer {
  background-color: #f7fbfd;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 25px;
  padding: 0px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

<script>
import router from '@/router'

export default {
  methods: {
    handleMenuSelect(key) {
      switch (key) {
        case '1':
          router.push({
            name: 'HomeView'
          })
          break
        case '2':
          router.push({
            name: 'AddView'
          })
          break
        case '3':
          router.push({
            name: 'SearchView'
          })
          break
        case '4-1':
          router.push({
            name: 'CountView'
          })
          break
        case '4-3':
          router.push({
            name:'CurveView'
          })
          break
        default:
          break
      }
    }
  }
}
</script>
