Ext.define("core.bl.ac.view.AppClassifyItemPanel",{
	extend:"core.app.base.BasePanel",
	alias:"widget.bl.appClassifyItemPanel",
	funCode:"appClassifyItem_main",
	funData:{
	        action:"/bl/acitem", //请求Action
	        whereSql:"",//表格查询条件
	        orderSql:"operatingTime",//表格排序条件
	        pkName:"itemid",
	        modelName:"org.yingqu.baoli.model.AppClassifyItem",//实体全路径
	        tableName:"AppClassifyItem",//表名
	        defaultObj:{enabled:"1"},//默认信息，用于表格添加的时候字段默认值
	        isChildren:true,//是否子功能
	        parentCode:"appClassify_main",//主功能功能编码
	        connectFields:[{//关联字段
			mainFieldCode:"cid",//主功能字段名
			childFieldCode:"ac",//子功能字段名
			foreignKey:"foreignKey",//外键虚字段
			isQuery:true
			}]
	},
		items:[{
			xtype:"bl.appClassifyItemGrid",
			region:"center"
		}]
});
