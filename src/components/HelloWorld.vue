<script  setup lang="ts">
import { ref ,onMounted,reactive,toRefs} from 'vue';
/*defineProps<{ msg: string }>()*/
import {InteData,getData,EchartsInit,DriftInit} from '../hook/index'

import List from './List.vue'
import ScrollCom from './ScrollCom.vue'

const data=reactive(new InteData()
);


onMounted(()=>{
getData(data);
EchartsInit(data);
DriftInit(data);
});



const {areaTree,chinaTotal,chinaDayList,hbData,china}=toRefs(data);



const count = ref(0)

const tabchange=(type:number)=>{
	data.type=type;
}
</script>

<template>
  <div class="box">
  	<div class="top-box">
  	 	<div class="black"></div>
  	 	 <div class="title-text">
     	<h1>科学防护 共渡难关</h1>
        <h2>疫情防护实时数据</h2>
     </div>

     <div class="cover_cards">
     	
<div class="cover-tab">
	<div @click="tabchange(1)" :class="{active:data.type===1}">全国疫情数据</div>
	<div @click="tabchange(2)" :class="{active:data.type===2}">{{hbData.name}}疫情数据</div>
	</div>
	<div class="cover-infos" v-show="data.type==1"  v-if="chinaTotal.today">
       <div class="cover-info">
       	
<h4>境外输入</h4>

<p style="color:orange">{{chinaTotal.total.input}}</p>
<p>
	<span>较昨日</span>
      <span>+{{chinaTotal.today.input}}</span>
</p>
       </div>
             <div class="cover-info"  >
       	
<h4>无症状感染</h4>
<p style="color: blue">{{chinaTotal.extData.noSymptom}}</p>
<p>
	<span>较昨日</span>
      <span>+{{chinaTotal.extData.incrNoSymptom}}</span>
</p>
       </div>
             <div class="cover-info">
       	
<h4>确诊</h4>
<p style="color: red">{{chinaTotal.total.confirm}}</p>
<p>
	<span>较昨日</span>
      <span>+{{chinaTotal.today.confirm}}</span>
</p>
       </div>

             <div class="cover-info">
       	
<h4>死亡</h4>
<p>{{chinaTotal.total.dead}}</p>
<p>
	<span>较昨日</span>
      <span>+{{chinaTotal.today.dead}}</span>
</p>
       </div>
             <div class="cover-info">
       	
<h4>治愈</h4>
<p style="color: rgba(122,233,255);">{{chinaTotal.total.heal}}</p>
<p>
	<span>较昨日</span>
      <span>+{{chinaTotal.today.heal}}</span>
</p>
       </div>
             <div class="cover-info">
       	
<h4>现有确诊</h4>
<p>{{chinaTotal.total.confirm-chinaTotal.total.heal-chinaTotal.total.dead}}</p>
<p>
	<span>较昨日</span>
      <span>+{{chinaTotal.today.confirm-chinaTotal.today.heal-chinaTotal.today.dead}}</span>
</p>
       </div>

</div>
    

     <div class="cover-infos" v-show="data.type==2" v-if="hbData.total">
       <div class="cover-info" >
       	
<h4>境外输入</h4>

<p>{{hbData.total.input}}</p>
<p>
	<span>+{{hbData.today.input||0}}</span>
</p>
       </div>
             <div class="cover-info">
       	
<h4>累计确诊</h4>
<p>{{hbData.total.confirm}}</p>
<p>
	<span>较昨日</span>
      <span>+{{hbData.today.confirm}}</span>
</p>
       </div>
             <div class="cover-info">
       	
<h4>治愈</h4>
<p>{{hbData.total.heal}}</p>
<p>
	<span>较昨日</span>
      <span>+{{hbData.today.heal}}</span>
</p>
       </div>

</div>
  	</div>
    
 </div>
 <div id="map"></div>
 <div id="confirmDrift"></div>

 <div>
  中国病例
  <ScrollCom :distance="100" :isScroll="true" >
   <List :list="china" v-if="china.length" :top="true"/>
</ScrollCom>
 </div>
  </div>
</template>

<style scoped lang="less">
@backcolor:black;
@frontcolor:white;

.black{
	background-color:black;
	width: 100%;
    height: 250px;

}
.top-box{
  margin-bottom: 40px;
	position: relative;
   .title-text{
   	position:absolute;
   	z-index: 2;
   	color: white;
   	top: 40px;
   	left: 20px;
   }

   
   .cover_cards{
   		position:absolute;
   	  	left: 50%;
   	  	top: 150px;
   	  width: calc(100% - 2rem);
   	  border-radius: 20px 20px 0 0;
   	  overflow: hidden;
   	 transform: translateX(-50%);
     	display: flex;
   	justify-content: space-between;
   	align-items: center;
   	flex-wrap: wrap; 




   	
   	z-index: 3;
   	background: white;
   	>div{

   	&.cover-tab{
   		width: 100%;
   		
   	    display: flex;
   		>div{
text-align: center;
   			width: 50%;
   				background:#efefef;
   			height: 40px;
   			line-height: 40px;
   				&.active{
   			background:#fff;
   		}
   		}
   	
   	}
  &.cover-infos{
  	width: 100%;
  	display: flex;
   	justify-content: space-between;
   	align-items: center;
   	flex-wrap: wrap; 
   	.cover-info{


   		&>p:first-of-type{
   			font-size: 20px;
   			font-weight: bold;
   		}
   		flex-basis: 33%;
   		text-align: center;
   	}
}
   	}
   }
}
#map{
  position:relative;
  width: calc(100% - 2rem);
  height: 400px;
  top: 40px;
margin: 0 auto;
}

#confirmDrift{
    position:relative;
  width: calc(100% - 2rem);
  height: 300px;
  top: 40px;
margin: 0 auto;
}
</style>
