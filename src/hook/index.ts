
import type { IData,IAreaTree } from '../type/index';
import {normal} from '../http/index'
import * as echarts from 'echarts';
import chinaJson from '../assets/china.json'


const getPageList=(list:any[])=>{

const arr:Array<any[]>[]=[]
for (let index=0;index<list.length;index+=30) {
   arr.push(list.slice(index,index+30))

}
return arr;
}
type EchartsOption=echarts.EChartsOption

class InteData implements IData{

	 areaTree:IAreaTree[]=[{id:'xxx',children:[]}]
	chinaDayList:any[]=[]
    chinaTotal:{
        today:{input:any,confirm:any,dead:any,heal:any},
        total:{input:any,confirm:any,dead:any,heal:any},
        extData:any
    }={today:
        {input:'unk',confirm:'any',dead:'any',heal:'any'},
        total:{input:'unk',confirm:'any',dead:'any',heal:'any'},
        extData:{}}
    china:any[]=[]
    type:number=1
    hbData:{name:string, 
        today:{input:any,confirm:any,dead:any,heal:any},
        total:{input:any,confirm:any,dead:any,heal:any}}
        = {name:'unk',
            today:{input:'unk',confirm:'any',dead:'any',heal:'any'},
        total:{input:'unk',confirm:'any',dead:'any',heal:'any'}}
    showlist:any[]=[]

}

const seriesOption={   type:'map',
        map:'china',
        colorBy:'series',
        top:80,
        label:{

        	show:true,
        	fontSize:10,
        	color:'#333'
        }}

const optionDrift={
	grid:{
		left:25,
		containLabel: true,
	},
	title:{
	text:'确诊新增走势',
},
    xAxis:{
    	type:'category',
    }
    ,
    yAxis:{
    	type:'value',
    	offset:20,
    	nameTextStyle:{
    		overflow:'break',

    	}
    }
    ,tooltip:{
    	show:true
    }

}

const seriesDrift={
	type:'line',


        top:80,
        label:{

        	show:false,
        	fontSize:10,
        	color:'#333'
        }
}

let map1:any;;
let optionMap:EchartsOption;

let drift:any;

const EchartsInit=(data:InteData)=>{
	const mapDom:HTMLElement|null=document.getElementById("map");
     optionMap={
     title:{
     	text:'疫情分布图',
     	subtext:'单击省份可查看具体数据'
     },
     tooltip:{
     	trigger:'item',
     	formatter:"现有确诊病例<br/>{b}:{c}"
     },
     visualMap:{
     	show:false
     }
    }
   map1=echarts.init(mapDom as HTMLElement);
    map1.showLoading()
}

const DriftInit=(data:IData)=>{
	const driftDom:HTMLElement=document.getElementById("confirmDrift") as HTMLElement;
     drift=echarts.init(driftDom as HTMLElement);
    drift.showLoading();
}










const getData=(data:InteData)=>{
    	normal().then(res=>{

		data.areaTree=res.data.data.areaTree;
		data.showlist=getPageList(data.areaTree)[0]
		data.chinaDayList=res.data.data.chinaDayList;
		data.chinaTotal=res.data.data.chinaTotal;
        data.china=(data.areaTree.find((v)=>v.id==='0') as IAreaTree).children;
             
        data.hbData=data.china.find((v)=>v.id==="360000");

        /*地图数据获取*/
        let mapData:any[]=[]
        data.china.map((v:any)=>{
        	mapData.push({
        		name:v.name,
        		value:v.total.confirm-v.total.dead-v.total.heal||0
        	})
        })
        map1.hideLoading();
        echarts.registerMap("china",chinaJson as any);
     map1.setOption({...optionMap,series:{
     	...seriesOption,
     
     	data:mapData}})

        /*走势数据获取*/
        const driftData:any[]=[]
        
        data.chinaDayList.forEach((v)=>{
        	driftData.push([v.date,v.today.confirm])
        })


     drift.setOption({...optionDrift,series:{
     	...seriesDrift,
   data:driftData}})
     drift.hideLoading()
   console.log(data.hbData)
	})
}

let page:number=0;



export{
	InteData,
	getData,
	EchartsInit,
	DriftInit,

}


