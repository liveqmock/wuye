Ext.define("core.base.resident.controller.ResidentFeesController", {
	extend : "Ext.app.Controller",
	mixins: {
		suppleUtil:"core.util.SuppleUtil",
	},
	init : function() {
		var self = this
		alert(0);
		// 事件注册
		this.control({
			"container[xtype=resident.unitlevelTree]":{
				itemclick:function(treeview,node,item,index,e,eOpts){
					var tree=treeview.ownerCt;
					var dataView=treeview.ownerCt.ownerCt.down("dataview[xtype=nuit.dataview]");
					var modue=system.getModuleDefine(node.raw.nodeInfo);
		           var navigate={
                			moduleName:node.raw.nodeInfo,
                			tableAsName:"_t"+modue.tf_moduleId,
                			text:node.raw.text,
                			primarykey:modue.tf_primaryKey,
                		    fieldtitle:node.raw.description,
                		    equalsValue:node.raw.code,
                		    isCodeLevel:false
                	};
                	var store=dataView.store;
                	if(store.navigates){
                		store.navigates.splice(0,store.navigates.length);
                		store.navigates.push(navigate);
                	}
                  	var proxy=store.getProxy();
                  	console.log(proxy.extraParams);
					proxy.extraParams.navigates=Ext.encode(store.navigates);
					proxy.extraParams.moduleType=node.raw.nodeInfoType
					store.load();	  
				}
			},
			
			"container[xtype=resident.unitlevelTree] basecombobox[ref=vicombobox]":{
				 select:function(combo,record,opts) {  
				 	 var  vid=record[0].get("itemCode");
				 	 var tree= combo.ownerCt.ownerCt;
				     var store=tree.getStore();
				   	var proxy=store.getProxy();
											proxy.extraParams.vid=vid;
											store.load();	
											
				}
			},

		"dataview[xtype=nuit.dataview]" : {
		    render: function() {
                                  Ext.getBody().on("contextmenu", Ext.emptyFn,null, {preventDefault: true});
                          },
			itemcontextmenu:function( dataView, record, item, index, e, eOpts ) {
			if (!dataView.menu) {
				dataView.menu = new Ext.menu.Menu({
							items : [{
										text : '查看业主详细信息',
										iconCls : 'return',
										itemId : 'query',
										handler:function( item, e, eOpts ){
											var dataView= Ext.getCmp("phones");
											var records=dataView. getSelectionModel().getSelection();
											if(records.length==0){
											   system.warnInfo("请选中房号进行查看");
											   return;
											}
											var rid=records[0].raw.rid;
										    var viewModel=system.getViewModel(104);
							                var model=core.app.module.factory.ModelFactory.getModelByModule(viewModel.data);
							     /*           var resObje={};
							                model.load(3, {
						                         success: function(result) {
						                        	
						                        		var window = Ext.create('core.app.view.region.BaseWindow', {
															viewModel:viewModel,
														});
														console.log(result);
												       window.down('baseform').setData(result);
												       window.show();
						                         }
						                       });*/
			            model.load(rid, {
					    scope: this,
					    failure: function(record, operation) {
					        //do something if the load failed
					        //record is null
					    },
					    success: function(record, operation) {
					    	   /*  var obje=Ext.decode(Ext.value(record.raw,'{}'));
					    	     alert(obje);
					    		 from.setData(record);*/
					    			var window = Ext.create('core.app.view.region.BaseWindow', {
															viewModel:viewModel,
															grid:dataView
														});
														 var obje=Ext.decode(Ext.value(record.raw,'{}'));
														 record.data=obje;
												       window.down('baseform').setData(record);
												       window.show();
					    		 
					        //do something if the load succeeded
					    },
					    callback: function(record, operation, success) {
					        //do something whether the load succeeded or failed
					        //if operation is unsuccessful, record is null
					    }
					});
											
										}
									}, {
										text : '收费',
										iconCls : 'table_save',
										itemId : 'fees',
										handler:function( item, e, eOpts ){
												var dataView= Ext.getCmp("phones");
											var records=dataView. getSelectionModel().getSelection();
											if(records.length==0){
											   system.warnInfo("请选中房号进行收费");
											   return;
											}
											uniteFees();
											
											
											
											
											
											
											
											
										}
									}, {
										iconCls : 'table_edit',
										text : '查看收费历史',
										itemId : 'history',
										handler:function( item, e, eOpts ){
												var dataView= Ext.getCmp("phones");
											var records=dataView. getSelectionModel().getSelection();
												if(records.length==0){
											   system.warnInfo("请选中房号进行查看");
											   return;
											}
											
										}
									}, '-', {
										text : '查看报修单',
										iconCls : 'table_edit',
										itemId:"repair",
										handler:function( item, e, eOpts ){
										    var dataView= Ext.getCmp("phones");
											var records=dataView. getSelectionModel().getSelection();
												if(records.length==0){
											   system.warnInfo("请选中房号进行查看报修单");
											   return;
											}
											
											
										}
									}]
						});
			         }
			           dataView.menu.showAt(e.getXY());
			          e.stopEvent();
		              },
		            itemclick:function( view, record, item, index, e, eOpts ){
		            	var unitePanel=view.ownerCt;
		                 unitePanel.setTitle(record.get("number")+" "+record.get("rname"));
		                 var uniteDatail= unitePanel.down("#uniteDetail");
		                 var  from=unitePanel.down("#uniteFrom");
		                 var rid=record.raw.rid;
		                 var viewModel=system.getViewModel(104);
		                 var model=core.app.module.factory.ModelFactory.getModelByModule(viewModel.data);
		                 
		                 
		          
		            },    
		              
		              
					}
				});
	},
	views : ["core.base.resident.view.ResidentUnit",
	          'core.base.resident.view.LevelTree',
	          "core.base.resident.view.UnitLevelTree",
			"core.base.resident.view.UnitDataView",
			 "core.base.resident.view.UniteFeesForm",
			 "core.base.resident.view.UniteFeesGrid"
			],
	stores : ["core.base.resident.store.UnitStore",'core.base.resident.store.LevelStore',]
});

function uniteFees(){
	  var win= Ext.createWidget("window",{
	  	title:"客户收费",
	  	width:600,
	   autoHeight:true,
	  	items:[{
	  	 xtype:"unite.unitefeesfrom"
	  	}],
	  });
	  win.show();
	  


}












