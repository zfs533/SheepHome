var RoleMoving = cc.Layer.extend(
{
	ctor:function()
	{
		this._super();
		this.initVariable();
		this._HandleRoleAnimate();
		this.setTouchEventListener();
		this.handleSkill();
		this.drayWall();
		this.setRolePosToScreenCenter();
		this.scheduleUpdate();
	},
	//初始化让角色始终在屏幕中可见（中央)
	setRolePosToScreenCenter:function()
	{
		this._role.setPosition(2000,2000);
//		var pos = this._role.getParent().convertToWorldSpace(this._role.getPosition());
		this.map.x = -(this._role.x - WinSize.width/2);
		this.map.y = -(this._role.y - WinSize.height/2);
	},
	initVariable:function()
	{
		this.isTouchEnd = false;
		this.touchedPoint = cc.p(0,0);
		this._dirHistory = 0;
		this.speed = 5;
		this._animList = [];
		this._role = cc.Sprite.create();
		this._role.setPosition(200,200);
		
		this.map = new Map(this);//cc.Sprite.create("res/rpg/map.jpg");
		this.addChild(this.map);
		
		this.map.addChild(this._role,10);
		
		var control = new customcontrol();
		control._role = this._role;
		control.that = this;
		control.map = this.map;
		this.addChild(control,10);
		
		this.control = control;
		this.animMgr = new AnimationMgr(this);
		
		this.gap = 50;
		this.aStar = new AStar(this);
		this.pathArr = [];
	},
	//处理角色动画
	_HandleRoleAnimate:function()
	{
		this._PushAnimation();
	},
	//根据动作封装不同方向角色动画
	_PushAnimation:function(frames, metadata,self)
	{
		//初始化角色动画
		this.animMgr.getCurrentAnimation(this.animMgr.STAND);
		this._ChangeAndPlayAnimation(3);
	},
	//移动方向改变，更新角色动画
	_ChangeAndPlayAnimation:function(direction, isChange)
	{
		if ( this._dirHistory == direction && !isChange)
		{
			return;
		}
		this._role.stopAllActions();
		this._dirHistory = direction;
		var animation = cc.Animation.create(this._animList[Math.abs(direction)], 0.2);
		var animate   = cc.Animate.create(animation);
		this._role.runAction(animate.repeatForever());
		this._role.scaleX = 1;
		if ( direction == -1 )//左下
		{
			this._role.scaleX = -1;
		}
		else if ( direction == -2 )//左方
		{
			this._role.scaleX *= -1;
		}
		else if ( direction == -3 )//左上
		{
			this._role.scaleX *= -1;
		}
		this._role.runAction(animate.repeatForever());
	},
	changeAndPlayAnimation:function(direction)
	{
		var self = this;
		this._role.stopAllActions();
		this._dirHistory = direction;
		var animation = cc.Animation.create(this._animList[Math.abs(direction)], 0.2);
		var animate   = cc.Animate.create(animation);
		var callFunc = cc.callFunc(function()
		{
			self.animMgr.getCurrentAnimation(self.animMgr.STAND);
		}, this);
		var sequence = cc.sequence(animate, callFunc);
		this._role.runAction(sequence);
		this._role.scaleX = 1;
		if ( direction == -1 )//左下
		{
			this._role.scaleX = -1;
		}
		else if ( direction == -2 )//左方
		{
			this._role.scaleX *= -1;
		}
		else if ( direction == -3 )//左上
		{
			this._role.scaleX *= -1;
		}
	},
	setTouchEventListener:function()
	{
		var listener = cc.EventListener.create(
		{
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan:this.touchBegan,
			onTouchMoved:this.touchMoved,
			onTouchEnded:this.touchEnded
		});
		cc.eventManager.addListener(listener, this);
	},
	touchBegan:function(touch, event)
	{
		var tp = touch.getLocation();
		var target = event.getCurrentTarget();
		target.animMgr.getCurrentAnimation(target.animMgr.WALK);
		var parent = target.map;
		var targetPoint = parent.convertToNodeSpace(tp);
		var radius = Math.atan2(-target._role.y + targetPoint.y, -target._role.x + targetPoint.x);
		var angle = radius/Math.PI*180;//(-180, 180)
		target.control._HandleDirection(angle, radius);
		target.isTouchEnd = true;
		target.touchedPoint = targetPoint;
//		target.pathArr = target.aStar.startFindWay(target._role.getPosition(),targetPoint);
		return true;
	},
	touchMoved:function(touch, target)
	{
		
	},
	touchEnded:function(touch, target)
	{
		
	},
	handleSkill:function()
	{
		this.skillMgr = new SkillMgr(this);
	},
	drayWall:function()
	{
		var origin = cc.p(0,0);
		var destination = cc.p(300,300);
		var fillColor = "";
		var lineWidth = 1;
		var lineColor = cc.color.RED;
		this.startDrayShape(origin, destination, fillColor, lineWidth, lineColor);
	},
	//drawRect(origin, destination, fillColor, lineWidth, lineColor)
	startDrayShape:function(origin, destination, fillColor, lineWidth, lineColor)
	{
		var drawNode = cc.DrawNode.create();
		drawNode.drawRect(origin, destination, fillColor, lineWidth, lineColor);
		this.map.addChild(drawNode, 0);
	},
	update:function()
	{
		if(this.pathArr.length == 0){return;}
		var oldPos = this._role.getPosition();
		var nextPos = cc.p(this.pathArr[0].xx,this.pathArr[0].yy);
		var radius = Math.atan2(-oldPos.y + nextPos.y, -oldPos.x + nextPos.x);
		var angle = radius/Math.PI*180;//(-180, 180)
		this.control._HandleDirection(angle, radius,true);
		var speedX = Math.cos(radius)*this.speed;
		var speedY = Math.sin(radius)*this.speed;
		this._role.x += speedX;
		this._role.y += speedY;
		this.map.x = -(this._role.x - WinSize.width/2);
		this.map.y = -(this._role.y - WinSize.height/2);
		var dis = cc.pDistance(oldPos, nextPos);
		if ( dis <= this.speed )
		{
			this.pathArr.shift();
		}
		if(this.pathArr.length == 0){
			this.animMgr.getCurrentAnimation(this.animMgr.STAND);
		}
		this.map.updateMapChunk();
	}
});






