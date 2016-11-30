
var Chunk = cc.Layer.extend(
{
	ctor:function()
	{ 
		this._super();
//		var type = Math.floor(Math.random()*7+1);//1-7
		var type = 5;
		this.ui = ccs.load("res/cocosOut/Chunk.json").node;
		this.addChild(this.ui);
		this.setContentSize(cc.size(this.ui.width,this.ui.height));
		this.bg = ccui.helper.seekWidgetByName(this.ui, "chunkBg");
		this.bg.parentBox = this;
		this.resetType(type);
		this.setAnchorPoint(0,0);
		this.bg.setTouchEnabled(true);
		this.bg.addTouchEventListener(this.handleTouchEvent, this);
	},
	setType:function()
	{
		var type = Math.floor(Math.random()*7+1);//1-7
		this.resetType(type);
	},
	setOriginType:function()
	{
		this.resetType(5);
	},
	resetType:function(type)
	{
		for(var i = 1; i < 10; i++ )
		{
			if ( type != i )
			{
				ccui.helper.seekWidgetByName(this.ui, "chunk0"+i).visible = false;
			}
			else
			{
				ccui.helper.seekWidgetByName(this.ui, "chunk0"+i).visible = true;
			}
		}
		this.initVariable(type);
		this.setChannelControl(type);
	},
	initVariable:function(type)
	{
		this.type = type;
		this.bg.hor = 0;
		this.bg.ver = 0;
		this.touchCallBack = null;
		this.parentt = null;
		this.rightChannel = 0;
		this.leftChannel  = 0;
		this.upChannel	  = 0;
		this.downChannel  = 0;
	},
	setChannelControl:function(type)
	{
		switch (type) 
		{
			case 1:
			{			
				this.rightChannel = this.downChannel = 1;
				this.leftChannel  = this.upChannel = 0;
				break;
			}
			case 2:
			{	
				this.leftChannel = this.downChannel = 1;
				this.upChannel   = this.rightChannel = 0;
				break;
			}
			case 3:
			{			
				this.leftChannel = this.upChannel = 1;
				this.rightChannel = this.downChannel = 0;
				break;
			}
			case 4:
			{
				this.rightChannel = this.upChannel = 1;
				this.leftChannel  = this.downChannel = 0;
				break;
			}
			case 5:
			{
				this.rightChannel = this.upChannel = 1;
				this.leftChannel  = this.downChannel = 1;
				break;
			}
			case 6:
			{
				this.downChannel = this.upChannel = 1;
				this.leftChannel = this.rightChannel = 0;
				break;
			}
			case 7:
			{
				this.downChannel = this.upChannel = 0;
				this.leftChannel = this.rightChannel = 1;
				break;
			}
			case 8:
			{			
				break;
			}
	
			default:
				break;
		}
	},
	setVerAndHor:function(ver,hor)
	{
		this.hor = hor;
		this.ver = ver;
		this.bg.hor = hor;
		this.bg.ver = ver;
	},
	handleTouchEvent:function(target,state)
	{
		if ( state != ccui.Widget.TOUCH_ENDED ){return;}
		if ( this.touchCallBack )
		{
			this.touchCallBack.call(this.parentt,target);
		}
	},
	setTouchCallBack:function(callback,parent)
	{
		this.touchCallBack = callback;
		this.parentt = parent;
	}
});












