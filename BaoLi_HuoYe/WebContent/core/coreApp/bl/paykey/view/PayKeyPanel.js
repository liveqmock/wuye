Ext.define("core.bl.paykey.view.PayKeyPanel",{
	extend:"core.app.base.BasePanel",
	alias:"widget.bl.payKeyPanel",
	funCode:"payKey_main",
	funData:{
	        action:"/bl/paykey", //请求Action
	        whereSql:"",//表格查询条件
	        orderSql:"operatingTime",//表格排序条件
	        pkName:"pid",
	        modelName:"org.yingqu.baoli.model.PayKey",//实体全路径
	        tableName:"PayKey",//表名
	        defaultObj:{enabled:"1"},//默认信息，用于表格添加的时候字段默认值
	        isChildren:false,//是否子功能
	},
		items:[{
		xtype:"basecenterpanel",
		autoScroll : false,
				items:[{
					xtype:"basequerypanel",
					region:"north",
					autoScroll : false,
					items:[
			  {
				xtype:"basequeryfield",
				queryType:"textfield",
				fieldLabel:"帐号人姓名",
				name:"realname",
				config:{
				}
			},
			]
			},{
			xtype:"bl.payKeyGrid",
			region:"center"
		}]
	},{
	xtype:"bl.payKeyForm",
		hidden:true
	}]
});
