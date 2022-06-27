
interface IData{
    areaTree:IAreaTree[],
	chinaDayList:any[],
    chinaTotal:{
    	today:{input:any,confirm:any,dead:any,heal:any},
    	total:{input:any,confirm:any,dead:any,heal:any},
    	extData:any
    }
    china:any[],
    type:number,
    showlist:any[],
    hbData:{name:string, 
        today:{input:any,confirm:any,dead:any,heal:any},
        total:{input:any,confirm:any,dead:any,heal:any}}
}

interface IAreaTree{
	id:string,
	children:any[]

}




export type{
	IData,
	IAreaTree}

const a:Array<{x:1}>[]=[[],[],[{x:1}]]