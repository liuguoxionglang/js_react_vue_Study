import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Directives from '../views/directives.vue'
import DefinedDirective from '../views/directives_myDefined.vue'
import SpecialAttr from '../views/specialAttr.vue'
import LifeCycle from '../views/lifecycle.vue'
import InstanceAttr from '../views/instanceAttr.vue'
import InstanceMethods from '../views/instanceMethods.vue'
import VueOptions from '../views/vueoptions.vue'
import OverallApi from '../views/overallApi.vue'
import Config from '../views/config.vue'
import Communication from '../views/communication/communication.vue'
import BuildInComponent from '../views/buildInComponent.vue'



Vue.use(Router)
/**
 * 可以按照业务类型，组合方式等把路由文件分开，为一次性的引入多文件，利用了webpack中的require.context()方法，一次性的引入了路由文件，
 */

const routerList=[];

function importAll(r){
    r.keys().forEach(filename => {
        routerList.push( r(filename).default)
    });

}
// 一次性的引入当前目录中符合条件的路由文件
importAll(require.context('.',false,/\.routers\.js/));
console.log(routerList,"..............routerList.........")
export default new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            component:BuildInComponent
        },
       ...routerList

    ]
})