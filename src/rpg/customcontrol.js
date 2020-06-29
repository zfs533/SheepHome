var customcontrol = cc.LayerColor.extend(
	{
		_handBgImg: null,//摇杆背景图
		_handImg: null,//摇杆
		_role: null,//控制角色
		_offSetX: 50,//X方向偏移
		_offSetY: 50,
		_speed: 13,//移动速度
		_startPos: cc.p(0, 0),//触摸起点
		_originPos: cc.p(0, 0),//触摸原始起点（不变）
		_targetPos: cc.p(0, 0),//目标位置，摇杆当前位置
		_rangeRect: null,//摇杆移动范围
		_isMoving: false,//是否正在移动
		_angle: 0,//角度
		_radius: 0,//弧度
		_animList: [],//角色动画数组
		_dirHistory: 0,//历史移动方向
		ctor: function () {
			this._super(cc.color.GREEN);
			this.opacity = 0;
			//初始化
			this._Zinit();
			this.scheduleUpdate();
			//技能图标
			this.addSkillControlIco();
		},
		//初始化摇杆，角色
		_Zinit: function () {
			this._handBgImg = ccui.ImageView.create("res/rpg/yaokong_bg.png");
			this._handBgImg.x = this._handBgImg.width / 2;
			this._handBgImg.y = this._handBgImg.height / 2;
			this.addChild(this._handBgImg);
			this._rangeRect = cc.rect(0, 0, this._handBgImg.width, this._handBgImg.height);

			this._handImg = ccui.ImageView.create("res/rpg/yaokong_1.png");
			this._handImg.x = this._handBgImg.width / 2;
			this._handImg.y = this._handBgImg.height / 2;
			this._originPos = cc.p(this._handImg.getPosition());
			this._handBgImg.addChild(this._handImg);
			this._handBgImg.setTouchEnabled(true);
			this._handBgImg.addTouchEventListener(this._HandleTouchEvent, this);
			this._hightLightHandImg = cc.Sprite.create("res/rpg/yaokong_2.png");
			this._hightLightHandImg.visible = false;
			this._hightLightHandImg.setPosition(this._handImg.width / 2, this._handImg.height / 2);
			this._handImg.addChild(this._hightLightHandImg);

			this._role = new cc.Sprite();
			this._role.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
			this.addChild(this._role);
			//				this._handBgImg.visible = false;
		},





		//触摸事件处理
		_HandleTouchEvent: function (target, state) {
			if (state == ccui.Widget.TOUCH_BEGAN) {
				this.that.animMgr.getCurrentAnimation(this.that.animMgr.WALK);
				this._startPos = target.getTouchBeganPosition();
				var pos = this._handImg.parent.convertToNodeSpace(this._startPos);
				var moveTo = cc.moveTo(0.1, pos);
				//让摇杆移动到触摸起点
				this._handImg.runAction(moveTo);
				this._hightLightHandImg.visible = true;
			}
			else if (state == ccui.Widget.TOUCH_MOVED) {
				this._isMoving = true;
				var posMove = target.getTouchMovePosition();
				var target = this._handImg;
				var posMove01 = this._handImg.parent.convertToNodeSpace(posMove);
				var distance = this._GetRangePosition(posMove01.x, posMove01.y);
				var radius = Math.atan2(posMove01.y - this._originPos.y, posMove01.x - this._originPos.x);
				var p = cc.p(Math.cos(radius), Math.sin(radius));
				cc.pMultIn(p, distance);//70
				var angle = radius / Math.PI * 180;//(-180, 180)
				this._angle = angle;
				this._radius = radius;
				target.setPosition(p.x + this._originPos.x, p.y + this._originPos.y);
			}
			else if (state == ccui.Widget.TOUCH_ENDED || state == ccui.Widget.TOUCH_CANCELED) {
				this.that.animMgr.getCurrentAnimation(this.that.animMgr.STAND);
				this._isMoving = false
				var target = this._handImg;
				var moveTo = cc.moveTo(0.2, this._originPos);
				target.runAction(moveTo);
				this._hightLightHandImg.visible = false;
				this.that.isTouchEnd = false;
			}
		},
		//处理摇杆移动范围
		_GetRangePosition: function (xx, yy) {
			var distance = cc.pDistance(cc.p(this._handBgImg.width / 2, this._handBgImg.height / 2), cc.p(xx, yy));
			if (distance <= this._rangeRect.width / 2 + 25) {
				return distance;
			}
			return this._rangeRect.width / 2 + 25;
		},
		update: function () {
			//控制角色移动
			if (this._isMoving) {
				this._HandleDirection(this._angle, this._radius);
			}
			else if (this.that.isTouchEnd) {
				this._HandleDirection(this._angle, this._radius);
				var p = this.that.touchedPoint;
				if (cc.pDistance(p, this._role.getPosition()) < 20) {
					this.that.isTouchEnd = false;
					this.that.animMgr.getCurrentAnimation(this.that.animMgr.STAND);
				}
			}
		},
		//移动方向处理
		_HandleDirection: function (angle, radius, aStar) {
			this._angle = angle;
			this._radius = radius;
			var gap = 22.5;
			if (angle >= -gap && angle <= gap)//右方
			{
				this.that._ChangeAndPlayAnimation(2);
			}
			else if (angle > gap && angle < gap * 3)//右上方
			{
				this.that._ChangeAndPlayAnimation(1);
			}
			else if (angle >= gap * 3 && angle < gap * 5)//上方
			{
				this.that._ChangeAndPlayAnimation(0);
			}
			else if (angle >= gap * 5 && angle < gap * 7)//左上方
			{
				this.that._ChangeAndPlayAnimation(-1);
			}
			else if (angle >= gap * 7 || angle < -gap * 7)//左方
			{
				this.that._ChangeAndPlayAnimation(-2);
			}
			else if (angle > -gap * 7 && angle < -gap * 5)//左下方
			{
				this.that._ChangeAndPlayAnimation(-3);
			}
			else if (angle >= -gap * 5 && angle < -gap * 3)//下方
			{
				this.that._ChangeAndPlayAnimation(4);
			}
			else if (angle >= -gap * 3 && angle < -gap)//右下方
			{
				this.that._ChangeAndPlayAnimation(3);
			}
			if (aStar) { return; }
			var speedX = Math.cos(radius) * this._speed;
			var speedY = Math.sin(radius) * this._speed;
			this._role.x += speedX;
			this._role.y += speedY;
			//				if ( this._role.x >= WinSize.width/2 && this.map.width-this._role.x>=WinSize.width/2)
			//				{
			//					this.map.x += -speedX;
			//				}
			//				if ( this._role.y >= WinSize.height/2 && this.map.height-this._role.y>=WinSize.height/2)
			//				{
			//					this.map.y += -speedY;
			//				}
			this.map.x = -(this._role.x - WinSize.width / 2);
			this.map.y = -(this._role.y - WinSize.height / 2);

			this.checkBorder();
			this.that.map.updateMapChunk();
		},
		//检查边界
		checkBorder: function () {
			if (this._role.x < 20) {
				this._role.x = 20;
			}
			if (this._role.y < 20) {
				this._role.y = 20;
			}
			if (this._role.x > this.map.width) {
				this._role.x = this.map.width;
			}
			if (this._role.y > this.map.height) {
				this._role.y = this.map.height;
			}
			if (this.map.x > 0) {
				this.map.x = 0;
			}
			if (this.map.y > 0) {
				this.map.y = 0;
			}
			if (this.map.x <= WinSize.width - this.map.width) {
				this.map.x = WinSize.width - this.map.width;
			}
			if (this.map.y <= WinSize.height - this.map.height) {
				this.map.y = WinSize.height - this.map.height;
			}
		},
		addSkillControlIco: function () {
			var skillBtn01 = ccui.Button.create("res/rpg/yaokong_2.png", "", "");
			skillBtn01.index = 0;
			skillBtn01.x = cc.winSize.width - skillBtn01.width / 2 - 20;
			skillBtn01.y = skillBtn01.height / 2 + 20;
			skillBtn01.scale = 1.1;
			this.addChild(skillBtn01);

			var skillBtn02 = ccui.Button.create("res/rpg/yaokong_2.png", "", "");
			skillBtn02.index = 1;
			skillBtn02.x = cc.winSize.width - skillBtn02.width * 2.2;
			skillBtn02.y = skillBtn02.height / 2;
			this.addChild(skillBtn02);

			var skillBtn03 = ccui.Button.create("res/rpg/yaokong_2.png", "", "");
			skillBtn03.index = 2;
			skillBtn03.x = cc.winSize.width - skillBtn03.width * 1.8;
			skillBtn03.y = skillBtn03.height * 1.8;
			this.addChild(skillBtn03);

			var skillBtn04 = ccui.Button.create("res/rpg/yaokong_2.png", "", "");
			skillBtn04.index = 3;
			skillBtn04.x = cc.winSize.width - skillBtn04.width / 2;
			skillBtn04.y = skillBtn04.height * 2.3;
			this.addChild(skillBtn04);

			skillBtn01.addTouchEventListener(this.skillBtnEvent, this);
			skillBtn02.addTouchEventListener(this.skillBtnEvent, this);
			skillBtn03.addTouchEventListener(this.skillBtnEvent, this);
			skillBtn04.addTouchEventListener(this.skillBtnEvent, this);
		},
		skillBtnEvent: function (target, state) {
			if (state == ccui.Widget.TOUCH_ENDED) {
				cc.log("------------------mm-----------------------");
				var packageName = "org/cocos2dx/javascript/AppActivity";
				var mm = jsb.reflection.callStaticMethod(packageName, "getLocalIpAddress", "()Ljava/lang/String;");
				cc.log("------------------mm-----------------------");
				cc.log(mm);
				switch (target.index) {
					case 0:
						{
							var time = 0.5;
							var blink = cc.jumpBy(time, 0, 0, 15, 6);
							this.that.map.runAction(blink);
							this.that.skillMgr.playAttackAction(this.that.animMgr.ATTACK01);
							break;
						}
					case 1:
						{
							this.that.skillMgr.playAttackAction(this.that.animMgr.ATTACK02);
							break;
						}
					case 2:
						{
							this.that.skillMgr.playAttackAction(this.that.animMgr.ATTACK03);
							break;
						}
					case 3:
						{
							this.that.skillMgr.playAttackAction(this.that.animMgr.ATTACK04);
							break;
						}

					default:
						break;
				}
			}
			this.that.isTouchEnd = false;
		}
	});

var RpgScene = cc.Scene.extend(
	{
		ctor: function () {
			this._super();
			var rpgLayer = new RoleMoving();
			this.addChild(rpgLayer);
		}
	});











