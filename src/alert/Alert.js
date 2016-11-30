var Alert = cc.Layer.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit()
	},
	zinit:function()
	{
		this.setContentSize(WinSize);
	},
	alertChess:function()
	{
		var self = this;
		var txt = new ccui.Text();
		txt.setString("无效落子区域！");
		txt.setColor(cc.color.RED);
		txt.setFontSize(24);
		txt.setPosition(WinSize.width/2,WinSize.height/2);
		this.addChild(txt);
		var link = cc.blink(2, 3);
		var callFunc = cc.callFunc(function(){self.removeFromParent();}, this);
		var sequence = cc.sequence(link,callFunc);
		txt.runAction(sequence);
	}
});



Alert.Show = function(type)
{
	var alert = new Alert();
	alert.alertChess();
	cc.director.getRunningScene().addChild(alert, 10000);
};