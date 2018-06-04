<template>
  <div>
    <top-menu go-back upload extend>
      设置
      <template slot="extend">
        <search
          placeholder="请输入的插件名称"
          @search="searchPlugins"
        ><i class="iconfont icon-global" /></search>
      </template>
    </top-menu>

    <ul>
      <li class="plugin" v-for="(plugin, index) in plugins" :key="index">
        <span class="name">{{plugin.name}}</span>
        <span class="author">{{plugin.author}}</span>
        <span class="description">{{plugin.description}}</span>
        <div class="operation">
          <i class="iconfont icon-download available" />
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import request from 'superagent'


export default {
  initialData: async function () {
    this.searchPlugins()
  },

  data() {
    return {
      plugins: [],
      pageSize: 10,
    }
  },

  methods: {
    async searchPlugins (keyword = '') {
      const res = await request
        .get('/api/plugins')
        .query({ keyword, offset: this.plugins.length, limit: this.pageSize })

      this.plugins = res.body
    },
  }
}
</script>
<style lang="postcss" scoped>
ul {
  padding: 0;
  margin: 0 30px;
}

.plugin {
  position: relative;
  list-style: none;
  padding: 40px 0;
  border-bottom: 1px solid #e5e5e5;

  & .name {
    display: inline-block;
    margin: 0 10px 10px 0;

    font-size: 36px;
    font-weight: bolder;
    color: #333;
  }

  & .author {
    font-size: 28px;
    color: #999999;
  }

  & .description {
    display: block;
    font-size: 28px;
    color: #666;
  }

  & .operation {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    & > * {
      vertical-align: middle;
    }
  }
}
</style>
