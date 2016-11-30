var AnimationMgr = cc.Class.extend(
{
	WALK:0,
	STAND:1,
	ATTACK01:2,
	ATTACK02:3,
	ATTACK03:4,
	ATTACK04:5,
	ATTACK05:6,
	ATTACK06:7,
	ATTACK07:8,
	ctor:function(that)
	{
		this.that = that;
		this.spriteFrameFileArr = [];
		this.currentType = 0;
	},
	//处理角色动画
	handleRoleAnimate:function(plistName,imgName,dir,frameCount)
	{
		var self = this;
		//加载人物动画资源
		cc.loader.loadTxt(plistName,function(error, txt)
		{
			var dict = cc.plistParser.parse(txt);//字符串转换为JSON对象
			if ( !self.isAddSpriteFrameFile(plistName) )
			{
				self.spriteFrameFileArr.push(plistName);
				cc.spriteFrameCache.addSpriteFrames( plistName,  imgName );
			}
			var frameDict = dict["frames"];
			var animDict  = dict["metadata"];
			var framesArr = [];
			for (var key in frameDict) 
			{
				var mm = cc.spriteFrameCache.getSpriteFrame(key);
				if ( mm.getTexture() instanceof Object )
				{
					framesArr.push(mm);
				}
			}
			self.pushAnimation(framesArr, animDict,self,dir,frameCount);
		});
	},
	//根据动作封装不同方向角色动画
	pushAnimation:function(frames, metadata,self,dir,frameCount)
	{
		var animList = [];
		for ( var i = 0; i < dir; i++ )
		{
			var tempFrames = [];
			for ( var j = 0; j < frameCount; j++ )
			{
				tempFrames[j] = frames[i*frameCount + j];
			}
			animList[i] = tempFrames;
		}
		this.that._animList = animList;
	},
	//角色动画
	getCurrentAnimation:function(type,isOnce)
	{
		this.currentType = type;
		this.addRoleRes(type);
		if ( isOnce )
		{
			this.that.changeAndPlayAnimation(this.that._dirHistory);
		}
		else
		{
			this.that._ChangeAndPlayAnimation(this.that._dirHistory,true);
		}
	},
	addRoleRes:function(type)
	{
		var plistName = "res/rpg/role/xiaoxue001.plist";
		var imgName   = "res/rpg/role/xiaoxue001.png";
		switch (type)
		{
			case this.WALK:
			{
				plistName = "res/rpg/role/xiaoxue001.plist";
				imgName   = "res/rpg/role/xiaoxue001.png";
				this.handleRoleAnimate(plistName,imgName,5,12);
				break;
			}
			case this.STAND:
			{
				plistName = "res/rpg/role/stand.plist";
				imgName   = "res/rpg/role/stand.png";
				this.handleRoleAnimate(plistName,imgName,5,8);
				break;
			}
			case this.ATTACK01:
			{
				plistName = "res/rpg/attack/attack01.plist";
				imgName   = "res/rpg/attack/attack01.png";
				this.handleRoleAnimate(plistName,imgName,5,5);
				break;
			}
			case this.ATTACK02:
			{
				plistName = "res/rpg/attack/attack02.plist";
				imgName   = "res/rpg/attack/attack02.png";
				this.handleRoleAnimate(plistName,imgName,5,7);
				break;
			}
			case this.ATTACK03:
			{
				plistName = "res/rpg/attack/attack03.plist";
				imgName   = "res/rpg/attack/attack03.png";
				this.handleRoleAnimate(plistName,imgName,5,4);
				break;
			}
			case this.ATTACK04:
			{
				plistName = "res/rpg/attack/attack04.plist";
				imgName   = "res/rpg/attack/attack04.png";
				this.handleRoleAnimate(plistName,imgName,5,6);
				break;
			}
			case this.ATTACK05:
			{
				plistName = "res/rpg/attack/attack05.plist";
				imgName   = "res/rpg/attack/attack05.png";
				this.handleRoleAnimate(plistName,imgName,5,6);
				break;
			}
			case this.ATTACK06:
			{
				plistName = "res/rpg/attack/attack06.plist";
				imgName   = "res/rpg/attack/attack06.png";
				this.handleRoleAnimate(plistName,imgName,5,5);
				break;
			}
			case this.ATTACK07:
			{
				plistName = "res/rpg/attack/attack07.plist";
				imgName   = "res/rpg/attack/attack07.png";
				this.handleRoleAnimate(plistName,imgName,5,6);
				break;
			}
		}
	},
	isAddSpriteFrameFile:function(fileName)
	{
		for ( var i = 0; i < this.spriteFrameFileArr.length; i++ )
		{
			if ( this.spriteFrameFileArr[i] == fileName )
			{
				return true;
			}
		}
		return false;
	}
});