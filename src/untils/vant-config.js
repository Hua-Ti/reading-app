import { Tabbar, TabbarItem, Search, Tab, Tabs, Swipe, SwipeItem, Lazyload, Grid, GridItem, Image as VanImage, Icon, Cell, CellGroup, NavBar, List, Sidebar, SidebarItem, Popup, Progress, Toast,Slider ,Dialog ,Button } from 'vant';

export default {
    install(Vue) {
        Vue.use(Tabbar);
        Vue.use(TabbarItem);
        Vue.use(Search);
        Vue.use(Tab);
        Vue.use(Tabs);
        Vue.use(Swipe);
        Vue.use(SwipeItem);
        Vue.use(Grid);
        Vue.use(GridItem);
        Vue.use(VanImage);
        Vue.use(Icon);
        Vue.use(Cell);
        Vue.use(CellGroup);
        Vue.use(NavBar);
        Vue.use(List);
        Vue.use(Sidebar);
        Vue.use(SidebarItem);
        Vue.use(Popup);
        Vue.use(Progress);
        Vue.use(Toast);
        Vue.use(Lazyload);
        Vue.use(Slider);
        Vue.use(Dialog );
        Vue.use(Button );
    }
}