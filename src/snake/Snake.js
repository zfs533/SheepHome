var Snake = cc.LayerColor.extend(
{
	ctor:function()
	{
		this._super(cc.color.YELLOW);
		this.setOpacity(100);
		this.initVariable();
		this.addRes();
//		this.drawGrids();
		this.initSnake();
		this.initSnakePos();
		this.initMap();
		this.initFond();
		this.setTouchEventListener();
		this.scheduleUpdate();
		var self = this;
	},
	initVariable:function()
	{
		this.normalScale = 0.5;
		this.roleAnimateArr = [];
		this.dirHistory = -20;
		this.gap = 50;
		this.speed = 10;
		this.targetPoint = cc.p(0,0);
		this.snakeArr = [];
		this.snakePosArr = [];
		this.pathArr = [];
		this.star = new AStar(this);
		this.fondMgr = new Fond(this);
		this.map = null;
	},
	initSnake:function()
	{
		var snake = cc.Sprite.create();
		snake.dir = -10;
		snake.index = 0;
		snake.setPosition(this.gap*5,this.gap*4);
		snake.scale = this.normalScale
		snake.setAnchorPoint(0.5,0);
		this.addChild(snake,100);
		this.snake = snake;
		this.changeAndPlayAnimation(2,snake);
		this.snakeArr.push(snake);
		
		for ( var i = 0; i < 3; i++ )
		{
			var item = cc.Sprite.create();
			item.setPosition(this.gap*3*i,this.gap*3);
			item.setAnchorPoint(0.5,0);
			item.dir = -10;
			item.index = (i+1);
			item.scale = this.normalScale;
			this.addChild(item,100);
			this.getAndPlayAnimationByDirection(2,item);
			this.snakeArr.push(item);
		}
		this._role = this.snake;
	},
	initSnakePos:function()
	{
		for(var i = 0; i < this.snakeArr.length; i++ )
		{
			var pos = cc.p(this.gap*(i+1), this.gap*3);
			this.snakeArr[i].setPosition(pos);
			this.snakePosArr.push(pos);
		}
	},
	initMap:function()
	{
		this.map = new cc.Sprite("res/snake/map/map3.png");
		this.map.setAnchorPoint(0,0);
		this.addChild(this.map, 0);
	},
	initFond:function()
	{
		this.fondMgr.addFond();
	},
	setTouchEventListener:function()
	{
		var listener = cc.EventListener.create(
		{
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan:this.touchBegan
		});
		cc.eventManager.addListener(listener, this);
	},
	touchBegan:function(touch, event)
	{
		var tp = touch.getLocation();
		var target = event.getCurrentTarget();
		var xx = Math.ceil(tp.x/target.gap)*target.gap;
		var yy = Math.ceil(tp.y/target.gap)*target.gap;
		target.targetPoint = cc.p(xx,yy);
		var mainPos = target.snake.getPosition();
		var pathArr = target.star.startFindWay(mainPos,cc.p(xx,yy));
		target.pathArr = pathArr;
		target.unschedule(target.startMoving);
		target.schedule(target.startMoving, 0.2, pathArr.length-1);
		return true;
	},
	changeSnakeAnimation:function(nextPos)
	{
		for (var i = 0;i < this.snakeArr.length; i++ )
		{
			var cPos = this.snakeArr[i].getPosition();
			var nPos = null;
			if ( i == 0 )
			{
				nPos = nextPos;
			}
			else
			{
				nPos = this.snakeArr[i-1].getPosition();
			}
			var snake = this.snakeArr[i];
			if ( nPos.x > cPos.x )
			{
				this.changeAndPlayAnimation(2, snake);
			}
			else if ( nPos.x < cPos.x )
			{
				this.changeAndPlayAnimation(-2, snake);
			}
			else if ( nPos.y > cPos.y )
			{
				this.changeAndPlayAnimation(1, snake);
			}
			else if ( nPos.y < cPos.y )
			{
				this.changeAndPlayAnimation(0, snake);
			}
		}
	},
	startMoving:function()
	{
		if ( this.pathArr.length > 0 )
		{
			var nextPos = cc.p(this.pathArr[0].xx,this.pathArr[0].yy);
			this.changeSnakeAnimation(nextPos);
			this.snakePosArr.unshift(nextPos);
			this.pathArr.shift();
			this.snakePosArr.splice(this.snakePosArr.length-1,1);
		}
	},
	updateSnakePos:function()
	{
		if ( this.snakePosArr.length < 1 ){return;}
		for(var i = 0; i < this.snakeArr.length; i++ )
		{
			this.snakeArr[i].setPosition(this.snakePosArr[i]);
		}
	},
	update:function()
	{
		this.updateSnakePos();
		this.fondMgr.checkCollision();
	},
	drawGrids:function()
	{
		var gap = this.gap;
		for (var i = 0; i < 50; i++ )
		{
			var drawNode = cc.DrawNode.create();
			var spt = cc.p(0,i*gap);
			var ept = cc.p(WinSize.width,i*gap);
			var color = cc.color.RED;
			drawNode.drawLine(spt,ept,color);
			this.addChild(drawNode,10);

			var drawNode = cc.DrawNode.create();
			var spt = cc.p(i*gap,0);
			var ept = cc.p(i*gap,WinSize.height);
			var color = cc.color.RED;
			drawNode.drawLine(spt,ept,color);
			this.addChild(drawNode,10);
		}
	},
	addRes:function()
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
	changeAndPlayAnimation:function(direction,snake)
	{
		if ( snake.dir == direction )
		{
			return;
		}
		snake.stopAllActions();
		snake.dir = direction;
		var animation = cc.Animation.create(this.roleAnimateArr[Math.abs(direction)], 0.2);
		var animate   = cc.Animate.create(animation);
		snake.runAction(animate.repeatForever());
		snake.scaleX = this.normalScale;
		if ( direction < 0 )//左边
		{
			snake.scaleX = -this.normalScale;
		}
		snake.runAction(animate.repeatForever());
	},
	getAndPlayAnimationByDirection:function(direction,snake)
	{
		var animation = cc.Animation.create(this.roleAnimateArr[Math.abs(direction)], 0.2);
		var animate   = cc.Animate.create(animation);
		snake.runAction(animate.repeatForever());
		snake.scaleX = this.normalScale;
		if ( direction < 0 )//左边
		{
			snake.scaleX = -this.normalScale;
		}
		snake.runAction(animate.repeatForever());
	},
	eattingFondAndChangeLength:function()
	{
		this.addSnakeLength();
		this.fondMgr.addFond();
	},
	addSnakeLength:function()
	{
		var item = cc.Sprite.create();
		item.setPosition(this.gap*3*i,this.gap*3);
		item.setAnchorPoint(0.5,0);
		item.dir = -10;
		item.index = (this.snakeArr.length+1);
		item.scale = this.normalScale;
		this.addChild(item,100);
		this.getAndPlayAnimationByDirection(this.snakeArr[this.snakeArr.length-1].dir,item);
		this.snakePosArr.push(this.snakePosArr[this.snakePosArr.length-1]);
		item.setPosition(this.snakePosArr[this.snakePosArr.length-1]);
		this.snakeArr.push(item);
	}
});

var SnakeScene = cc.Scene.extend(
{
	ctor:function()
	{
		this._super();
		var snake = new Snake();
		this.addChild(snake);
	}
});











