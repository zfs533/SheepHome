var Chess = ccui.ImageView.extend(
{
	ctor:function()
	{
		this._super();
	},
	createChess:function(type,hor,ver)
	{
		if ( type == CHESS_TYPE_BAI )
		{
			this.loadTexture("chessbai.png", ccui.Widget.PLIST_TEXTURE);
		}
		else if ( type == CHESS_TYPE_HEI )
		{
			this.loadTexture("chesshei.png", ccui.Widget.PLIST_TEXTURE);
		}
		this.type = type;
		this.hor = hor;
		this.ver = ver;
	}
});