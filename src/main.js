import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'

import axios from 'axios'
import VueAxios from 'vue-axios'

import { 
  Button,
  Tabbar, 
  TabbarItem,
  Tab,
  Tabs,
  Icon,
  Rate,
  Progress,
  Popup,
  List,
  Cell,
  CellGroup,
  Search,
  NavBar,
  Field,
  Form,
  Lazyload,
  ActionSheet,
  Empty,
  Loading,
  DropdownMenu,
  DropdownItem,
  Sidebar,
  SidebarItem,
  Col,
  Row,
  Card,
  SwipeCell,
  ShareSheet,
  PasswordInput,
  NumberKeyboard
 } from 'vant';

Vue
   .use(Button)
   .use(Tabbar)
   .use(TabbarItem)
   .use(Tab)
   .use(Tabs)
   .use(Icon)
   .use(Rate)
   .use(Progress)
   .use(Popup)
   .use(List)
   .use(Cell)
   .use(CellGroup)
   .use(Search)
   .use(NavBar)
   .use(Field)
   .use(Form)
   .use(ActionSheet)
   .use(Empty)
   .use(Loading)
   .use(DropdownMenu)
   .use(DropdownItem)
   .use(Sidebar)
   .use(SidebarItem)
   .use(Col)
   .use(Row)
   .use(Card)
   .use(SwipeCell)
   .use(ShareSheet)
   .use(PasswordInput)
   .use(NumberKeyboard)
   .use(Lazyload),{lazyComponent: true,}

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
