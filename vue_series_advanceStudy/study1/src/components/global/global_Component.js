import Vue from 'vue'


// 字符串首字母大写
function changeStr(str){
    return str.charAt(0).toUpperCase()+str.slice(1)
}

// 哪个目录下的 不包含子目录中的 以.vue结尾的文件
const requireComponent = require.context(".",false,/\.vue$/);

console.log(requireComponent,requireComponent.keys(),"......global...///////////")
requireComponent.keys().forEach(fileName => {
    const config = requireComponent(fileName);

    const componentName = changeStr(fileName.replace(/\.\//,'').replace(/\.\w+$/,''));
    // 注册vue组件
    Vue.component(componentName,config.default || config)
    
});
