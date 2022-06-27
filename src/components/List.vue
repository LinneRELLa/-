<script setup lang="ts">
import {watchEffect,ref} from 'vue'



	const props=defineProps({

		list:[Object],
    top:Boolean
	})
let select:any=ref<string>('');

const changeSel:(id:string)=>void=(id)=>{

  if(props.top){
    if(select.value==id){
      select.value='';
      return 
    }
  select.value=id;

}
}








</script>



		
<template>
<div style="border: 1px solid blue;margin: 1rem;width: calc(100% - 3rem);" >
	 <div class="top row" :class="{sticky:props.top}">
	<div class="grid-content ep-bg-purple" >地区</div>
 <div class="grid-content ep-bg-purple" >累计确诊</div>
   <div class="grid-content ep-bg-purple" >新增确诊</div>
   <div class="grid-content ep-bg-purple" >境外输入</div>
	 </div>
<div class="cbox">
  <div  class="row" v-for="x of props.list" @click="changeSel(x.id)" :key="x.id">
   <div class="grid-content ep-bg-purple" >{{x.name}}</div>
   <div class="grid-content ep-bg-purple" >{{x.total.confirm}}</div>
    <div class="grid-content ep-bg-purple" >{{x.today.confirm}}</div>
   <div class="grid-content ep-bg-purple" >{{x.total.input}}</div>
    <div v-if="x.children" v-show="x.id==select" class="child"><div class="grid-content ep-bg-purple" ><List :list="x.children"/></div>
  </div>
  </div>
  </div>
</div>
</template>




<style scoped lang="less">
.top{
  background: rgb(245,246,247);
}
.cbox{
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0;
}
	.div {
  margin-bottom: 20px;
  cursor: pointer;
}
.div:last-child {
  margin-bottom: 0;

}
.div {
  border-radius: 4px;
  text-align: center;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.row{
  display: flex;
  flex-wrap: wrap;
  >.grid-content{
    flex-basis: 25%;
  }
  border-bottom:1px solid rgba(3,4,5,0.1)
}

.child{
  width: 100%;
}
</style>