var Welcome = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit();
		this.keyEvent();
	},
	zinit:function()
	{
		this.setContentSize(WinSize);
		this.ui = ccs.load("res/cocosOut/WelcomeLayer.json").node;
		this.addChild(this.ui);
		
		var clound01 = ccui.helper.seekWidgetByName(this.ui, "clound01");
		clound01.runAction(this.getActionn(5).repeatForever());
		var clound02 = ccui.helper.seekWidgetByName(this.ui, "clound02");
		clound02.runAction(this.getActionn(7).repeatForever());
		var clound03 = ccui.helper.seekWidgetByName(this.ui, "clound03");
		clound03.runAction(this.getActionn(5).repeatForever());
		var startBtn = ccui.helper.seekWidgetByName(this.ui, "startBtn");
		startBtn.addTouchEventListener(this.startGameEvent, this);
	},
	getActionn:function(time)
	{
		var moveBy01 = cc.moveBy(time,0,20);
		var moveBy02 = cc.moveBy(time,0,-20);
		var sequence = cc.sequence(moveBy01,moveBy02);
		var easeOut  = cc.EaseBounceOut.create(sequence);
		return easeOut;
	},
	startGameEvent:function(target,state)
	{
		if ( state == ccui.Widget.TOUCH_BEGAN )
		{
			target.scale = 1.1;
		}
		if ( state != ccui.Widget.TOUCH_ENDED ){return;}
		target.scale = 1;
		if ( this.isStarted )
		{
			return;
		}
		this.scheduleOnce(function()
		{
			var scene = new GameSceness();
			cc.director.replaceScene(cc.TransitionFade.create(0.5, scene));			
		},0.1);
		this.isStarted = true;
	},
	keyEvent:function()
	{
		cc.eventManager.addListener(
		{
			event: cc.EventListener.KEYBOARD,
			onKeyReleased: function(keyCode, event)
			{
				if(keyCode == cc.KEY.back)
				{
					cc.director.end();
				}
				else if(keyCode == cc.KEY.menu)
				{
				}
			}
		}, this);
	}
});




var WelcomeScenes= cc.Scene.extend({
	onEnter:function () {
		this._super();
		var ly = cc.LayerColor.create(cc.color.RED);
		this.addChild(ly);
		var welcome = new Welcome();
		this.addChild(welcome);
	}
});


