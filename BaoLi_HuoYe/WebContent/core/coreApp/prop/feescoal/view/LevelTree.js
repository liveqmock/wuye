Ext.define("core.prop.feescoal.view.LevelTree",{
	extend:"Ext.tree.Panel",
	alias : "widget.feescoal.levelTree",
	displayField : "text",
	rootVisible : false,
	store : "core.prop.feescoal.store.LevelStore",
	title:"楼宇列表",
    dockedItems: [{
       	 xtype: 'toolbar',dock: 'top',layout : 'hbox',items: [
       	 {
       	  	xtype : "basecombobox",
		     ddCode : "VILAGELIST",
		      width:"100%",
		      ref:"vicombobox"
       	 }
       	 ]
     	}],
	tools : [{
		type:'refresh',
	   	qtip: '刷新',
	   	 handler: function(event, toolEl, header){
	    	var tree=header.ownerCt
	    	tree.getStore().load();
	    	tree.getSelectionModel().deselectAll(true);
	   	 }
	}]
})