<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物节</div></nav-bar>
    <tab-control :title="titles"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperLoaded="swiperLoaded"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control :title="titles"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoodsList"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from  './childComps/RecommendView'
import FeatureView from  './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
import BackTop from  'components/content/backTop/BackTop'

import {getMultiData,getProductData} from 'network/home';
import Scroll from 'components/common/scroll/Scroll'
import {debounce} from "common/utils";
import {backTopMixin} from "common/mixin";
import {TOP_DISTANCE, POP, NEW, SELL} from "common/const";
// import Swiper from  'components/common/swiper/Swiper'
// import SwiperItem from  'components/common/swiper/SwiperItem'
// import {Swiper,SwiperItem} from  'components/common/swiper'

  export default {
   name:"Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins: [backTopMixin],
    //用data存储 生命周期函数数据
    data(){
      return {
        banners: [],
        recommends:[],
        titles: [],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType: 'pop',
        isShowBackTop:false,
        tabOffsetTop: 0,
        isTabFixed:false,
        saveY: 0,
        // currentTarget: 'pop' 当前类型 默认是pop
        // currentType: POP,
        showTabControl: false
      //   tabOffsetTop: 0,

      }
    },
      computed:{
          showGoodsList(){
            return this.goods[this.currentType].list
          }
      },

      //生命周期函数  发生网络请求
      //局部变量
      //created函数 当组件一旦创建完之后的话 它就会执行这个函数 在这个比较特殊的函数里
      //做事情的时候 最好只在里面写主要逻辑
      created() {
        //1.请求多个数据
        this.getHomeMultidata()

        //2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

        // 3.监听一些事件
        this.$bus.$on('imgLoad', () => {
          this.$refs.scroll.refresh()
        })
      },
      activated() {
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
        this.$refs.scroll.refresh()
      },
      deactivated() {
        this.saveY = this.$refs.scroll.scrollY
      },
      mounted(){
        //1.图片加载完成的事件监听
        const refresh = debounce(this.$refs.scroll.refresh,50)
        //3.监听item中图片加载完成
        this.$bus.$on('itemImageLoad', () =>{
          // console.log('---------');
          // this.$refs.scroll.refresh()
          refresh()
        })

        //2.获取tabControl的offsetTop
        //所有的组件都有一个属性$el:用于获取组件中的元素
        // console.log(this.$refs.tabControl.$el.offsetTop);
      },
      methods: {
        //抽离
        /**
         * 事件监听相关的方法
         */
        tabClick(index) {
          switch (index) {
            case 0:
              this.currentType = POP
              break
            case 1:
              this.currentType = NEW
              break
            case 2:
              this.currentType = SELL
              break
          }
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
        },
        backClick(){
          this.$refs.scroll.scrollTo(0,0)
        },
        contentScroll(position){
          // console.log(position);
          //1.判断BackTop是否显示
          this.isShowBackTop = (-position.y) > 1000

          //2.决定tabControl是否吸顶(position:fixed)
          this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        loadMore(){
          //监听图片什么时候加载完
          this.getHomeGoods(this.currentType)
          console.log('上拉');

          //refresh()方法重新计算
          // this.$refs.scroll.scroll.refresh()
        },
        swiperLoaded(){
          // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        },
        /**
         * 网络请求相关的方法
         */
        getHomeMultidata() {
          getMultiData().then(res => {
            console.log(res);
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
        },
        //相当于this.getHomeGoods('pop')
        getHomeGoods(type) {
          //调用getHomeGoods('pop')/getHomeGoods('new')/getHomeGoods('sell')
          //page:动态的获取对应的page
          const page = this.goods[type].page + 1

          //一开始页码page是0 加一之后页码page为1
          //上面的page是传递页码参数给的页码值,并没有对真正的页码进行+1操作
          // 外面是获取值，里面是修改值
          getProductData(type, page).then(res => {
            // const newList = res.data.list
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1
            console.log(res);

            // 完成加载更多数据
            this.$refs.scroll.finishPullUp()
          })
        }
      }
    }


</script>

<style scoped>
  #home{
    padding: 44px 0 49px;
    height: 100vh;
    /*padding-bottom: 49px;*/
    position: relative;
  }
  .home-nav{
    background-color:var(--color-tint);
    color: #fffef7;

  /*position: fixed;生成绝对定位的元素，相对于浏览器窗口进行定位。
  元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。*/
    position: fixed;
    /*粘性定位 position: sticky;     	top: 0px;       z-index:999*/
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
  /*回到顶部
    .tab-control{*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/
  .content{
    /*height: calc(100% - 93px);*/
    overflow: hidden;
    position: absolute;
    /*padding-top: 44px;*/
    top: 44px;
    bottom:49px;
    left: 0;
    right: 0;
  }
  .fixed{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /*.content{*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
