var Fond = cc.Class.extend(
{
	ctor:function(that)
	{
		this.that = that;
		this.gap = this.that.gap;
	},
	getFond:function()
	{
		var fond = cc.Sprite.createWithSpriteFrameName("003.png");
		return fond;
	},
	addFond:function()
	{
		var ww = Math.floor(WinSize.width/this.gap);
		var hh = Math.floor(WinSize.height/this.gap);
		var xx = Math.ceil(Math.random()*ww)*this.gap;
		var yy = Math.ceil(Math.random()*hh)*this.gap;
		var bool = this.that.star.checkSnake(cc.p(xx,yy));
		if ( !bool )
		{
			this.fond = cc.Sprite.createWithSpriteFrameName("003.png");
			this.fond.scale = this.that.normalScale;
			this.fond.setPosition(xx,yy);
			cc.log("xx= "+xx+" yy= "+yy);
			this.that.map.addChild(this.fond);
		}
		else
		{
			this.addFond();
		}
	},
	checkCollision:function()
	{
		if ( this.fond )
		{
			var pos = this.that.snake.getPosition();
			var rec = this.fond.getBoundingBox();
			if ( cc.rectContainsPoint(rec, pos) )
			{
				this.fond.removeFromParent();
				this.fond = null;
				this.that.eattingFondAndChangeLength();
			}
		}
	}
});