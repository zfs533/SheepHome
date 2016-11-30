//var Direction = {up:0,down:4,right:2,left:-2};
var Direction = {up:1,down:0,right:2,left:-2};
var Game = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.initVariable();
		this.zinit();
		this.layoutChunk();
		this.addUI();
		this.scheduleOnce(this.gameStart,2);
	},
	initVariable:function()
	{
		this.chunkArr = [];
		this.roleAnimateArr = [];
		this.hor = 5;
		this.ver = 10;
		this.moveDistance = 98;
		this.moveSpeed = 0.2;
		this.roleSpeed = 1;
		this.isMoving = false;
		this.currentChunk = null;
		this.nextChunk = null;
		this.isUpLevel = false;
		this.dirHistory = -100;
		this.offsetX = WinSize.width-this.moveDistance*this.ver>>1;
		this.offsetY = WinSize.height-this.moveDistance*this.hor>>1;
	},
	zinit:function()
	{
		var bg02 = ccs.load("res/cocosOut/GameLayer.json").node;
		bg02.setPosition(0,20);
		this.addChild(bg02);
		this.startLayoutPoint = ccui.helper.seekWidgetByName(bg02, "start").getWorldPosition();
		this.offsetX = this.startLayoutPoint.x;
		this.offsetY = this.startLayoutPoint.y;
		this.ui = bg02;
		
//		var custom = new customcontrol();
//		this.role = custom._role;
//		this.addChild(custom, 100);
//		this.roleController = custom;
//		this.setRoleDirection(Direction.up);
		this.role = new cc.Sprite();
		this.role.anchorY = 0;
		this.addChild(this.role,100);
		this.changeAndPlayAnimation(Direction.up);
	},
	addUI:function()
	{
		var sheep = ccui.helper.seekWidgetByName(this.ui, "sheep");
		sheep.visible = false;
		this.spriteSheep = new cc.Sprite();
		this.spriteSheep.setPosition(sheep.getWorldPosition());
		this.spriteSheep.scale = 1.2;
		this.addChild(this.spriteSheep);
		
		ccui.helper.seekWidgetByName(this.ui, "timeBg_0").setLocalZOrder(100);
		var timeBg = ccui.helper.seekWidgetByName(this.ui, "timeBg");
		this.timeSprite = new cc.Sprite();
		this.timeSprite.setPosition(timeBg.width/2,timeBg.height/2);
		timeBg.addChild(this.timeSprite);
		
		var pauseBtn = ccui.helper.seekWidgetByName(this.ui, "pauseBtn");
		pauseBtn.addTouchEventListener(this.pauseBtnEvent, this);
		var musicBtn = ccui.helper.seekWidgetByName(this.ui, "musicBtn");
		musicBtn.addTouchEventListener(this.musicBtnEvent, this);
	},
	pauseBtnEvent:function(target,state)
	{
		if ( state == ccui.Widget.TOUCH_ENDED )
		{
			this.passedLevel();
		}
	},
	musicBtnEvent:function(target,state)
	{
		if ( state == ccui.Widget.TOUCH_ENDED )
		{
			this.scheduleUpdate();
			this.reSetChunckType();
		}
	},
	gameStart:function()
	{
		this.reSetChunckType();
		this.handleAnimation();
		this.setStartAndEndChunk();
		this.scheduleUpdate();
	},
	setRoleDirection:function(direction)
	{
		this.roleDirection = direction;
	},
	initRolePosition:function(startChunk)
	{
		var chunk = startChunk;
		this.role.x = this.offsetX + chunk.width*chunk.ver  + chunk.width/2;
		this.role.y = this.offsetY + chunk.height*chunk.hor + chunk.height/2;
		var currentChunk = this.findRoleCurrentStandChunk();
		var direction = Direction.up;
		if ( currentChunk.rightChannel )
		{
			direction = Direction.right;
		}
		else if (currentChunk.leftChannel )
		{
			direction = Direction.left;
		}
		else if ( currentChunk.upChannel )
		{
			direction = Direction.up;
		}
		else if ( currentChunk.downChannel )
		{   
			direction = Direction.down;
		}
		this.setRoleDirection(direction);
	},
	update:function()
	{
		var currentChunk = this.findRoleCurrentStandChunk();
		if ( !currentChunk )
		{
			this.resetRoleDirection();
		}
		this.resetRoleDirectionOnCurrentChunk();
//		this.roleController._ChangeAndPlayAnimation(this.roleDirection);
		this.changeAndPlayAnimation(this.roleDirection);
		this.controllerRoleMoving(this.roleDirection);
		if ( currentChunk.hor < 0 && !this.isUpLevel )
		{
			this.isUpLevel = true;
			this.passedLevel();
		}
	},
	layoutChunk:function()
	{
		var hor = this.ver;
		var ver = this.hor;
		for ( var i = 0; i < hor; i++ )
		{
			this.chunkArr.push([]);
			for ( var j = 0; j < ver; j++ )
			{
				var chunk = new Chunk();
				chunk.setVerAndHor(i,j);
//				chunk.setTouchCallBack(this.handleTouchEvent,this);
				chunk.x = i*(chunk.width)  + this.offsetX;
				chunk.y = j*(chunk.height) + this.offsetY;
				this.addChild(chunk);
				this.chunkArr[i][j] = chunk;
			}
		}
	},
	setStartAndEndChunk:function()
	{
		var verStart = Math.floor(Math.random()*this.ver);  
		var horStart = this.hor;
		var verEnd = Math.floor(Math.random()*this.ver);
		var horEnd = -1;
		
		var startChunk = new Chunk();
		startChunk.setVerAndHor(verStart,horStart); 
		startChunk.x = verStart*(startChunk.width)  + this.offsetX;
		startChunk.y = horStart*(startChunk.height) + this.offsetY;
		startChunk.resetType(6);
		this.addChild(startChunk);
		this.chunkArr[verStart][horStart] = startChunk;
		
		var endChunk = new Chunk();
		endChunk.setVerAndHor(verEnd,horEnd);
		endChunk.x = verEnd*(endChunk.width)  + this.offsetX;
		endChunk.y = horEnd*(endChunk.height) + this.offsetY;
		endChunk.resetType(6);
		this.addChild(endChunk);
		this.chunkArr[verEnd][horEnd] = endChunk;
		this.initRolePosition(startChunk);
	},
	randomRemoveItem:function()
	{    
		var ver = Math.floor(Math.random()*this.ver);
		var hor = Math.floor(Math.random()*this.hor);
		this.removeChild(this.chunkArr[ver][hor]);
		this.chunkArr[ver][hor] = null;
	},
	handleTouchEvent:function(target)
	{
		if ( this.isMoving ){return;}
		var ver = target.ver, hor = target.hor; 
		if ( !this.checkMove(ver+1, hor) )//右边
		{
			this.startMoveChunk(Direction.right,target);
			this.changeChunk(target,ver+1, hor);
		}
		else if ( !this.checkMove(ver-1, hor) )//左边
		{
			this.startMoveChunk(Direction.left,target);
			this.changeChunk(target,ver-1, hor);
		}
		else if ( !this.checkMove(ver, hor+1))//上边
		{
			this.startMoveChunk(Direction.up,target);
			this.changeChunk(target,ver, hor+1);
		}
		else if ( !this.checkMove(ver, hor-1))//下边
		{
			this.startMoveChunk(Direction.down,target);
			this.changeChunk(target,ver, hor-1);
		}
	},
	startMoveChunk:function(direction,target)
	{
		var moveBy = null;
		this.isMoving = true;
		switch (direction)
		{
			case Direction.up:
			{
				moveBy = cc.moveBy(this.moveSpeed,0,this.moveDistance);
				break;
			}
			case Direction.down:
			{
				moveBy = cc.moveBy(this.moveSpeed,0,-this.moveDistance);
				break;
			}
			case Direction.right:
			{
				moveBy = cc.moveBy(this.moveSpeed,this.moveDistance,0);
				break;
			}
			case Direction.left:
			{
				moveBy = cc.moveBy(this.moveSpeed,-this.moveDistance,0);
				break;
			}
		}
		var callFunc = cc.callFunc(function(){this.isMoving = false}, this);
		var sequence = cc.sequence(moveBy, callFunc);
		target.parentBox.runAction(sequence);
	},
	changeChunk:function(target,ver,hor)
	{
		this.chunkArr[target.ver][target.hor] = null;
		target.ver = ver;
		target.hor = hor;
		target.parentBox.ver = ver;
		target.parentBox.hor = hor;
		this.chunkArr[ver][hor] = target.parentBox;
	},
	checkMove:function(ver, hor)
	{
		if( ver > this.ver-1 || ver < 0 || hor > this.hor-1 || hor < 0 )
		{
			return true;
		}
		return this.chunkArr[ver][hor];
	},
	findRoleCurrentStandChunk:function()
	{  
		for ( var i = 0; i < this.ver; i++ )
		{
			for ( var j = -1; j < this.hor + 1; j++ )
			{
				var chunk = this.chunkArr[i][j];
				if ( chunk )
				{
					if (  this.role.x > chunk.x && this.role.x < chunk.x+chunk.width && this.role.y > chunk.y && this.role.y < chunk.y+chunk.height )
					{
//						cc.log("i= "+i+" j= "+j);
						this.currentChunk = chunk;
						this.nextChunk = this.getRoleNextStandChunk(chunk);
						return chunk;
					}
			
				}
			}
		}
		return false;
	},
	getRoleNextStandChunk:function(currentChunk)
	{
		if ( !currentChunk ){return false;}
		var nextChunk = null;
		var ver = currentChunk.ver, hor = currentChunk.hor;
		switch (this.roleDirection) 
		{
			case Direction.up:
			{
				nextChunk = this.getValidChunk(ver,hor+1);
				break;
			}
			case Direction.down:
			{
				nextChunk = this.getValidChunk(ver,hor-1);
				break;
			}
			case Direction.right:
			{
				nextChunk = this.getValidChunk(ver+1,hor);
				break;
			}
			case Direction.left:
			{
				nextChunk = this.getValidChunk(ver-1,hor);
				break;
			}
	
			default:
			{
				break;
			}
		}
		return nextChunk;
	},
	getValidChunk:function(ver,hor)
	{
		if( !this.chunkArr[ver] )  
		{ 
			return null;
		}
		return this.chunkArr[ver][hor] ? this.chunkArr[ver][hor] : null;
	},
	controllerRoleMoving:function(direction)
	{
		switch (direction) 
		{
			case Direction.up:
			{
				this.role.y += this.roleSpeed;
				break;
			}
			case Direction.down:
			{
				this.role.y -= this.roleSpeed;
				break;
			}
			case Direction.right:
			{
				this.role.x += this.roleSpeed;
				break;
			}
			case Direction.left:
			{
				this.role.x -= this.roleSpeed;
				break;
			}

			default:
			{
				break;
			}
		}
	},
	getRoleReverseDirection:function()
	{
		var direction = this.roleDirection;
		switch (direction) 
		{
			case Direction.up:
			{
				return Direction.down;
			}
			case Direction.down:
			{
				return Direction.up;
			}
			case Direction.right:
			{
				return Direction.left;
			}
			case Direction.left:
			{
				return Direction.right;
			}
			default:
			{
				break;
			}
		}
	},
	resetRoleDirection:function()
	{
		var direction = this.roleDirection;
		if ( this.nextChunk )
		{
			switch (this.roleDirection) 
			{
				case Direction.up:
				{
					if ( !this.nextChunk.downChannel )
					{
						direction = this.getRoleReverseDirection();
					}
					break;
				}
				case Direction.down:
				{
					if ( !this.nextChunk.upChannel )
					{
						direction = this.getRoleReverseDirection();
					}
					break;
				}
				case Direction.right:
				{
					if ( !this.nextChunk.leftChannel )
					{
						direction = this.getRoleReverseDirection();
					}
					break;
				}
				case Direction.left:
				{
					if ( !this.nextChunk.rightChannel )
					{
						direction = this.getRoleReverseDirection();
					}
					break;
				}
				default:
				{
					break;
				}
			}
		}
		else
		{
			direction = this.getRoleReverseDirection();
		}
		this.roleDirection = direction;
	},
	resetRoleDirectionOnCurrentChunk:function()
	{
		var chunk = this.currentChunk, direction = this.roleDirection;
		switch (this.roleDirection) 
		{
			case Direction.up:
			{
				if ( !chunk.upChannel )
				{
					if ( chunk.leftChannel )
					{
						if ( this.role.y >= chunk.y+chunk.height/2 )
						{
							direction = Direction.left;
						}
					}
					else if ( chunk.rightChannel )
					{
						if ( this.role.y >= chunk.y+chunk.height/2 )
						{
							direction = Direction.right;
						}
					}
				}
				break;
			}
			case Direction.down:
			{
				if ( !chunk.downChannel )
				{
					if ( chunk.leftChannel )
					{
						if ( this.role.y <= chunk.y+chunk.height/2 )
						{
							direction = Direction.left;
						}
					}
					else if ( chunk.rightChannel )
					{
						if ( this.role.y <= chunk.y+chunk.height/2 )
						{
							direction = Direction.right;
						}
					}
				}
				break;
			}
			case Direction.right:
			{
				if ( !chunk.rightChannel )
				{
					if ( chunk.upChannel )
					{
						if ( this.role.x >= chunk.x+chunk.width/2 )
						{
							direction = Direction.up;
						}
					}
					else if ( chunk.downChannel )
					{
						if ( this.role.x >= chunk.x+chunk.width/2 )
						{
							direction = Direction.down;
						}
					}
				}
				break;
			}
			case Direction.left:
			{
				if ( !chunk.leftChannel )
				{
					if ( chunk.upChannel )
					{
						if ( this.role.x <= chunk.x+chunk.width/2 )
						{
							direction = Direction.up;
						}
					}
					else if ( chunk.downChannel )
					{
						if ( this.role.x <= chunk.x+chunk.width/2 )
						{
							direction = Direction.down;
						}
					}
				}
				break;
			}
			default:
			{
				break;
			}
		}
		this.roleDirection = direction;
	},
	//过关
	passedLevel:function()
	{
		var self = this;
		this.scheduleOnce(function()
		{
			self.unscheduleUpdate();
			this.setOriginChunkType();
		},1);
	},
	setOriginChunkType:function()
	{
//		cc.director.pause();
//		cc.director.resume();
		var hor = this.ver;
		var ver = this.hor;
		for ( var i = 0; i < hor; i++ )
		{
			for ( var j = 0; j < ver; j++ )
			{
				if ( this.chunkArr[i] && this.chunkArr[i][j] )
				{
					this.chunkArr[i][j].setOriginType();
					this.chunkArr[i][j].setVerAndHor(i,j);
					this.chunkArr[i][j].setTouchCallBack(this.handleTouchEvent,this);
				}
				else
				{
					var chunk = new Chunk();
					chunk.setVerAndHor(i,j);
					chunk.x = i*(chunk.width)  + this.offsetX;
					chunk.y = j*(chunk.height) + this.offsetY;
					this.addChild(chunk);
					this.chunkArr[i][j] = chunk;
				}
			}
		}
	},
	reSetChunckType:function()
	{
		var hor = this.ver;
		var ver = this.hor;
		for ( var i = 0; i < hor; i++ )
		{
			for ( var j = 0; j < ver; j++ )
			{
				this.chunkArr[i][j].setType();
				this.chunkArr[i][j].setVerAndHor(i,j);
				this.chunkArr[i][j].setTouchCallBack(this.handleTouchEvent,this);
			}
		}
		this.randomRemoveItem();
	},
	handleAnimation:function()
	{
		this.handleRoleAnimate();
		this.handleHeadAnimate();
		this.handleTimeAnimate();
	},
	handleRoleAnimate:function()
	{
		var plistName = "res/role/bibirole.plist";
		var imgName   = "res/role/bibirole.png";
		var self = this;
		//加载人物动画资源 
		cc.loader.loadTxt(plistName,function(error, txt)
		{
			var dict = cc.plistParser.parse(txt);
			cc.spriteFrameCache.addSpriteFrames( plistName,  imgName );
			var frameDict = dict["frames"];
			var animDict = dict["metadata"];
			var framesArr = [[],[],[]];
			for (var key in frameDict) 
			{
				var mm = cc.spriteFrameCache.getSpriteFrame(key);
				var index = Number(key.substring(0,1));
				if ( mm.getTexture() instanceof Object )
				{
					framesArr[index].push(mm);
				}
			}
			self.roleAnimateArr = framesArr;
		});
	},
	handleHeadAnimate:function()
	{
		cc.spriteFrameCache.addSpriteFrames("res/cocosOut/animation/head.plist");
		var frameArr = [];
		for ( var i = 1; i < 16; i++ )
		{
			var str = "Sprite 255000"+i+".png";
			if ( i > 9 )
			{
				str = "Sprite 25500"+i+".png";
			}
			var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
			frameArr.push(spriteFrame);
		}
		var animation = cc.Animation.create(frameArr,0.1);
		var animate	  = cc.Animate.create(animation);
		this.spriteSheep.runAction(animate.repeatForever());
	},
	handleTimeAnimate:function()
	{
		var self = this;
		cc.spriteFrameCache.addSpriteFrames("res/cocosOut/animation/time.plist");
		var frameArr = [];
		for ( var i = 1; i < 61; i++ )
		{
			var str = "Sprite 239000"+i+".png";
			if ( i > 9 )
			{
				str = "Sprite 23900"+i+".png";
			}
			var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
			frameArr.push(spriteFrame);
		}
		var animation = cc.Animation.create(frameArr,1);
		var animate	  = cc.Animate.create(animation);
		var callFunc  = cc.callFunc(function(){self.passedLevel();cc.log("time is over");});
		var sequence  = cc.sequence(animate,callFunc);
		this.timeSprite.runAction(sequence);
	},
	changeAndPlayAnimation:function(direction)
	{
		if ( this.dirHistory == direction )
		{
			return;
		}
		this.role.stopAllActions();
		this.dirHistory = direction;
		var animation = cc.Animation.create(this.roleAnimateArr[Math.abs(direction)], 0.2);
		var animate   = cc.Animate.create(animation);
		this.role.runAction(animate.repeatForever());
		this.role.scaleX = 1;
		if ( direction < 0 )//左边
		{
			this.role.scaleX = -1;
		}
		this.role.runAction(animate.repeatForever());
	}
});




var GameSceness = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var ly = cc.LayerColor.create(cc.color.RED);
		this.addChild(ly);
		var chunk = new Game();
		this.addChild(chunk );
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






