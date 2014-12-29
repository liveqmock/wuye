Ext.define("core.base.user.view.ProUserGrid", {
			extend : 'Ext.grid.Panel',
			alias : 'widget.user.prouser',
			autoHeight : true,
			style : 'border-width:0 0 0 0;',
			columnLines : true, // 加上表格线
			multiSelect : true,
			width : "100%",
			enableLocking : true, // 使grid可以锁定列
			store:"core.base.user.store.ProUserStore",
			title:"分配配管理员" ,
			columns:[
		  {text : "Id",
		     dataIndex : "id",
		     width : 150,
		   columnType : "textfield",
		     hidden:true
		},
	  {text : "手机号",
		     dataIndex : "loginCode",
		     width : 150,
		   columnType : "textfield"
		},
		{text : "用户名称",
		dataIndex : "userName",
		width : 150,
		columnType : "textfield"
		},
				{text : "创建时间",
		dataIndex : "createTime",
		width : 320,
		columnType : "textfield"
		},		{text : "所属物业",
		dataIndex : "proid",
		width : 320,
		columnType : "textfield"
		}
			
			],
			initComponent : function() {
				var self = this;
				var thar = [{
							text : '新增',
							ref : 'addButton',
							itemId : 'new',
							glyph : 0xf016
						}, {
							text : '修改',
							glyph : 0xf044,
							itemId : 'edit',
							ref : "editButton"
						}, {
							text : '删除',
							disabled : true,
							glyph : 0xf014,
							ref : "removeButton",
							itemId : 'delete'
						}, '-', '-', '筛选', {
							width : 60,
							xtype : 'gridsearchfield',
							// store : this.grid.getStore() //
							// 现在用的local数据，不可以进行筛选
							store : Ext.create('Ext.data.Store', {
										proxy : {
											type : 'rest'
										}
									})
						}];
				this.dockedItems = [{
							xtype : 'toolbar', // 按钮toolbar
							dock : 'top',
							items : thar,
							grid : this,

						}, {
							xtype : 'pagingtoolbar', // grid数据分页
							store : this.store,
							displayInfo : true,
							prependButtons : true,
							dock : 'bottom',
							items : [{ // 在最前面加入grid方案的选择Combo
									// xtype : 'gridschemecombo'
									}]
						}];
				this.selType = 'rowmodel';
				this.callParent(arguments);
			}
		})