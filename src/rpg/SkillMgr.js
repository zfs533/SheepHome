var SkillMgr = cc.Class.extend(
{
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
		this.animList = [];
		var resArr = [
		              {plistName:"res/rpg/skill/skill001.plist",imgName:"res/rpg/skill/skill001.png"}
		              ];
		for (var i = 0; i < resArr.length; i++ )
		{
//			this.handleRoleAnimate(resArr[i].plistName,resArr[i].imgName);
		}
	},
	
	getSkill001:function()
	{
		var sp = cc.Sprite.create();
		var animation = cc.Animation.create(this.animList[0], 0.15);
		var animate   = cc.Animate.create(animation);
		var callf = cc.callFunc(function(target){target.removeFromParent();}, this);
		var sequence = cc.sequence(animate,callf);
		sp.runAction(sequence);
		return sp;
	},
	handleRoleAnimate:function(plistName,imgName,dir,frameCount)
	{
		var self = this;
		//加载人物动画资源
		cc.loader.loadTxt(plistName,function(error, txt)
		{
			var dict = cc.plistParser.parse(txt);//字符串转换为JSON对象
			if ( !self.that.animMgr.isAddSpriteFrameFile(plistName) )
			{
				self.that.animMgr.spriteFrameFileArr.push(plistName);
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
			self.PushAnimation(framesArr, animDict,self,dir,frameCount);
		});
	},
	//根据动作封装不同方向角色动画
	PushAnimation:function(frames, metadata,self,dir,frameCount)
	{
		for ( var i = 0; i < dir; i++ )
		{
			var tempFrames = [];
			for ( var j = 0; j < frameCount; j++ )
			{
				tempFrames[j] = frames[i*frameCount + j];
			}
			this.animList[i] = tempFrames;
		}
	},
	//攻击
	playAttackAction:function(type)
	{
		this.that.animMgr.getCurrentAnimation(type,true);
		this.playSkillAction(type);
	},
	playSkillAction:function(type)
	{
		var plistName = "res/rpg/skill/skill01.plist";
		var imgName   = "res/rpg/skill/skill01.png";
		switch (type)
		{
			case this.ATTACK01:
			{
				plistName = "res/rpg/skill/skill01.plist";
				imgName   = "res/rpg/skill/skill01.png";
				this.handleRoleAnimate(plistName,imgName,5,6);
				break;
			}
			case this.ATTACK02:
			{
				plistName = "res/rpg/skill/skill02.plist";
				imgName   = "res/rpg/skill/skill02.png";
				this.handleRoleAnimate(plistName,imgName,5,7);
				break;
			}
			case this.ATTACK03:
			{
				plistName = "res/rpg/skill/skill03.plist";
				imgName   = "res/rpg/skill/skill03.png";
				this.handleRoleAnimate(plistName,imgName,5,6);
				break;
			}
			case this.ATTACK04:
			{
				plistName = "res/rpg/skill/skill04.plist";
				imgName   = "res/rpg/skill/skill04.png";
				this.handleRoleAnimate(plistName,imgName,5,8);
				break;
			}
			case this.ATTACK05:
			{
				plistName = "res/rpg/skill/skill05.plist";
				imgName   = "res/rpg/skill/skill05.png";
				this.handleRoleAnimate(plistName,imgName,5,6);
				break;
			}
			case this.ATTACK06:
			{
				plistName = "res/rpg/skill/skill06.plist";
				imgName   = "res/rpg/skill/skill06.png";
				this.handleRoleAnimate(plistName,imgName,5,8);
				break;
			}
			case this.ATTACK07:
			{
				plistName = "res/rpg/skill/skill07.plist";
				imgName   = "res/rpg/skill/skill07.png";
				this.handleRoleAnimate(plistName,imgName,5,8);
				break;
			}
		}
		this.changeAndPlayAnimation(this.that._dirHistory);
	},
	changeAndPlayAnimation:function(direction)
	{
		var self = this;
		var sp = cc.Sprite.create();
		var dir = direction;
		if(direction == -1 )
		{
			dir = 3;
		}
		else if( direction == -3 )
		{
			dir = 1;
		}
		var animation = cc.Animation.create(this.animList[Math.abs(dir)], 0.2);
		var animate   = cc.Animate.create(animation);
		var callFunc = cc.callFunc(function(target)
		{
			target.removeFromParent();
		}, this);
		var sequence = cc.sequence(animate, callFunc);
		sp.runAction(sequence);
		this.that._role.addChild(sp,1);
		sp.setPosition(this.that._role.width/2,this.that._role.height/2);
		sp.scaleY = 1;
		if ( direction < 0 )
		{
			sp.scaleY = -1;
			sp.y+=100;
		}
	},
});








