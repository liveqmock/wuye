Ext.define('core.base.user.view.ProUserWindow', {		
		  extend : 'Ext.window.Window',
			alias : 'widget.user.prouserwindow',
			layout : 'fit',
			maximizable : true,
			closeAction : 'hide',
			bodyStyle : 'padding : 2px 2px 0',
			shadowOffset : 30,
			style:'border-width:0 0 0 0;',
			layout : 'fit',
			width:600,
			items:[{
			 xtype:"user.prouserform"
			}],
			 listeners: {
		            hide: function (win, eOpts) {
		                win.close();
		            }
		        },
			initComponent : function() {
				this.maxHeight = document.body.clientHeight * 0.98;
				var me = this;
				this.maximized =false;
				this.tools = [{
							type : 'collapse'
						}];
				this.callParent(arguments);
			}
		});
