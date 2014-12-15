Ext.define("core.bl.gd.store.GoodImageStore", {
	extend : "Ext.data.Store",
	model : factory.ModelFactory.getModelByName(
			"org.yingqu.baoli.model.GoodImage", "").modelName,
	proxy : {
		type : "ajax",
		url : "/bl/gdimg/load.action",
		actionMethods : {
			create : "POST",
			read : "GET",
			update : "POST",
			destroy : "POST"
		},
		reader : {
			type : "json",
			root : "rows",
			totalProperty : 'totalCount'
		},
		writer : {
			type : "json"
		}
	},
	autoLoad : true
});