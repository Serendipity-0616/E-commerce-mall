<template>
<!--  ref/children -> -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>

<!--  <div ref="wrapper" class="wrapper">-->
<!--    <div>-->
<!--      <slot></slot>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      //把它定义为一个属性
      pullUpLoad:{
        type:Boolean,
        default: false
      }
    },
    data(){
      return{
        scroll:null
      }
    },
    mounted() {
      //实例被挂载后调用，这时 `el` 被新创建的 `vm.$el` 替换了。
      // 如果根实例挂载到了一个文档内的元素上，当 `mounted` 被调用时 `vm.$el` 也在文档内。

      // this.scroll = new BScroll(this.$refs.wrapper,{
      //   click: true,taps:true
      // })

      //1.创建BScroll对象
       this.scroll = new BScroll(this.$refs.wrapper, {
         click: true,
         // mouseWheel: true, observeDOM: true,
         probeType:this.probeType,
         pullUpLoad: this.pullUpLoad
      })

      //2.监听滚动的位置
      if(this.probeType===2 || this.probeType===3){
        this.scroll.on('scroll',(position) => {
          // console.log(position);
          this.$emit('scroll',position)
        })
      }

      // 监听scroll滚动底部
      if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          // console.log('底部');
          this.$emit('pullingUp')
        })
      }

      // //3.监听上拉加载更多事件
      // this.scroll.on('pullingUp',() =>{
      //
      //   // console.log('上拉加载');
      // })
        // this.scroll.scrollTo(x,y,毫秒)
        // this.scroll.scrollTo(0, 0,500)
    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      }
    }
    // updated() {
    //   this.scroll = new BScroll(this.$refs.wrapper, {
    //     probeType: 2, click: true,  mouseWheel: true, observeDOM: true
    //   })
    //
    // }









    //   props: {
  //     probeType: {
  //       type: Number,
  //       default: 0
  //     },
  //     click: {
  //       type: Boolean,
  //       default: true
  //     },
  //     pullUpLoad: {
  //       type: Boolean,
  //       default: false
  //     },
  //     data: {
  //       type: Array,
  //       default() {
  //         return []
  //       }
  //     }
  //   },
  //   data() {
  //     return {
  //       scroll: null
  //     }
  //   },
  //   computed: {
  //   	scrollY() {
  //   		return this.scroll.y
  //     }
  //   },
  //   mounted() {
  //     setTimeout(this._initScroll, 20)
  //   },
  //   methods: {
  //     _initScroll() {
  //       // 1.创建BetterScroll
  //       this.scroll = new BScroll(this.$refs.wrapper, {
  //         probeType: this.probeType,
  //         click: this.click,
  //         pullUpLoad: this.pullUpLoad
  //       })
  //
  //       // 2.事件滚动
  //       if (this.probeType === 2 || this.probeType === 3) {
  //         this.scroll.on('scroll', position => {
  //           // console.log(position);
  //           this.$emit('scroll', position)
  //         })
  //       }
  //
  //       // 3.上拉加载
  //       if (this.pullUpLoad) {
  //         this.scroll.on('pullingUp', () => {
  //           // console.log('上拉加载更多');
  //           this.$emit('pullingUp')
  //         })
  //       }
  //     },
  //     refresh() {
  //       this.scroll && this.scroll.refresh && this.scroll.refresh()
  //     },
  //     finishedPullUp() {
  //       this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
  //     },
  //     scrollTo(x, y, time=100) {
  //       this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
  //     }
  //   },
  //   watch: {
  //     data() {
	//       setTimeout(this.refresh, 20)
  //     }
  //   }
  }
</script>

<style scoped>
</style>
