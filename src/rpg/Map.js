var Map = cc.Layer.extend(
{
	ctor:function(that)
	{
		this._super();
		this.that = that;
		this.chunkRect = 256;
		this.gridArr = [];
		this.initMap();
	},
	initMap:function()
	{
		var hor = 18;
		var ver = 41;
		for ( var i = 0; i <= hor; i++ )
		{
			for (var j = 0; j <=ver; j++)
			{
				var obj = {};
				obj.isAdded = false;
				obj.url = "res/rpg/map/1010/chunks/"+"ml_"+j+"_"+i+".jpg";
				obj.rect= cc.rect(this.chunkRect*j,this.chunkRect*(hor-i-1),this.chunkRect,this.chunkRect);
				obj.pos = cc.p(this.chunkRect*j,this.chunkRect*(hor-i-1));
				this.gridArr.push(obj);
			}
		}
		this.setContentSize(cc.size(256*ver,256*hor));
	},
	updateMapChunk:function()
	{
		var role = this.that._role;
		for ( var i = 0; i < 4; i++ )
		{
			var pos01 = cc.p(role.x+this.chunkRect*i,role.y)//right
			var pos02 = cc.p(role.x-this.chunkRect*(i+1),role.y);//left
			var pos03 = cc.p(role.x,role.y+this.chunkRect*i);//up
			var pos04 = cc.p(role.x,role.y-this.chunkRect*(i+1));//down;
			var pos05 = cc.p(role.x+this.chunkRect*i,role.y+this.chunkRect*i);
			var pos06 = cc.p(role.x-this.chunkRect*i,role.y+this.chunkRect*i);
			var pos07 = cc.p(role.x+this.chunkRect*i,role.y-this.chunkRect*i);
			var pos08 = cc.p(role.x-this.chunkRect*i,role.y-this.chunkRect*i);
			this.startAddMapChunk(pos01);
			this.startAddMapChunk(pos02);
			this.startAddMapChunk(pos03);
			this.startAddMapChunk(pos04);
			this.startAddMapChunk(pos05);
			this.startAddMapChunk(pos06);
			this.startAddMapChunk(pos07);
			this.startAddMapChunk(pos08);
		}
	},
	startAddMapChunk:function(chunkPos)
	{
		for ( var i = 0; i < this.gridArr.length; i++ )
		{
			if ( cc.rectContainsPoint(this.gridArr[i].rect, chunkPos) && !this.gridArr[i].isAdded )
			{
				var chunk = cc.Sprite.create(this.gridArr[i].url);
				chunk.setAnchorPoint(0,0);
				chunk.setPosition(this.gridArr[i].pos);
				this.addChild(chunk);
				this.gridArr[i].isAdded = true;
			}
		}
	}
});