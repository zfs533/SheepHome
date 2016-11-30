var CHESS_TYPE_BAI = 0;
var CHESS_TYPE_HEI = 1;
var FiveChessGame = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.initVariable();
		this.handleSelectedChess();
		this.zinit();
		this.getGridPos();
	},
	initVariable:function()
	{
		this.hw = 15;
		this.startX = 197;
		this.startY = 25;
		this.chessRect = 29;
		this.gridPos = [];
		this.gridChess = [];
		this.gameIsOver = false;
		this.gameLogic = new GameLogic(this);
	},
	clearAndRestartGame:function()
	{
		for ( var i = 0; i < this.hw;i++ )
		{
			for ( var j = 0; j < this.hw; j++ )
			{
				if ( this.gridChess[i][j])
				{
					this.gridChess[i][j].removeFromParent();
				}
			}
		}
		this.gridChess.splice(0);
		this.gridChess = [];
		this.gridPos.splice(0);
		this.gridPos = [];
		this.getGridPos();
		this.gameLogic = new GameLogic(this);
	},
	handleSelectedChess:function()
	{
		this.selectedBai = cc.Sprite.createWithSpriteFrameName("selectchessbai.png");
		this.addChild(this.selectedBai,10);
		this.selectedHei = cc.Sprite.createWithSpriteFrameName("selectchesshei.png");
		this.addChild(this.selectedHei,10);
		this.selectedBai.visible = this.selectedHei.visible = false;
	},
	zinit:function()
	{
		var background = ccui.ImageView.create("bg.png",1);
		background.setPosition(WinSize.width/2,WinSize.height/2);
		this.addChild(background);
		background.setTouchEnabled(true);
		background.addTouchEventListener(this.touchEvent, this);
		this.chessLayer = cc.Layer.create();
		this.addChild(this.chessLayer,10);
	},
	touchEvent:function(target,state)
	{
		var gap = 0;
		if ( state == ccui.Widget.TOUCH_BEGAN )
		{
			this.selectedBai.visible = true;
			this.originPos = target.getTouchBeganPosition();
			this.selectedBai.setPosition(this.originPos.x-gap,this.originPos.y);
		}
		else if ( state == ccui.Widget.TOUCH_MOVED )
		{
			var posMove = target.getTouchMovePosition();
			this.selectedBai.setPosition(posMove.x-gap,posMove.y);
		}
		else
		{
			var endPos = target.getTouchEndPosition();
			this.selectedBai.visible = this.selectedHei.visible = false;
			var xx = this.startX + Math.ceil((endPos.x-gap-this.startX)/this.chessRect)*this.chessRect;
			var yy = this.startY + Math.ceil((endPos.y-this.startY)/this.chessRect)*this.chessRect;
			this.setGridChess(xx,yy);
		}
	},
	setGridChess:function(xx,yy)
	{
		var hw = this.hw;
		for ( var i = 0; i < hw; i++ )
		{
			for ( var j = 0; j < hw; j++ )
			{
				if ( xx == this.gridPos[i][j].x && yy == this.gridPos[i][j].y && !this.gridChess[i][j])
				{
					var chess = new Chess();
					chess.createChess(CHESS_TYPE_BAI, i, j);
					chess.setPosition(xx,yy);
//					this.addChild(chess);
					this.chessLayer.addChild(chess);
					this.gridChess[i][j] = chess;
					this.checkGameIsOver(chess);
					this.startRobootPlay(chess);
					return;
				}
			}
		}
		Alert.Show();
	},
	startRobootPlay:function(chess)
	{
		if ( this.gameIsOver ){return;}
		var self = this;
		this.scheduleOnce(function()
		{
			var obj = self.gameLogic.checkLineChess(CHESS_TYPE_BAI);
			if ( obj )
			{
				cc.log("--------------------------obj= "+JSON.stringify(obj));
				self.layoutRobootChess(obj.hor, obj.ver);
			}
			else
			{
				self.robootPlay(chess);
			}
		},1);
	},
	checkGameIsOver:function(chess)
	{
//		return;//TODO
		var hw = this.hw;
		if ( this.gameIsOver ){return;}
		for ( var i = 0; i < hw; i++ )
		{
			for ( var j = 0; j < hw; j++ )
			{
				if (this.gridChess[i][j] && this.gridChess[i][j].type == chess.type )
				{
					this.gameIsOver = this.checkChessDirectionGameOver(this.gridChess[i][j]);
					if ( this.gameIsOver )
					{
						this.gameOver();
						return;
					}
				}
			}
		}
	},
	checkChessDirectionGameOver:function(chess)
	{
		/**
		 * 		7    0    1
		 *      6 target  2
		 *      5    4    3  
		 */
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		for ( var i = 0; i < 8; i++ )
		{
			switch ( i )
			{
			case 0:
			{
				if ( hw - ver < 4 ){break;}
				for ( var j = 1; j < 5; j++ )
					{
						if ( !this.gridChess[hor][ver+j] )
						{
							break;
						}
						else if (this.gridChess[hor][ver+j].type != type )
						{
							break;
						}
						else if ( j == 4 )
						{
							return true;
						}
					}
					break;
				}
				case 1:
				{
					if ( (hw - ver < 4) || (hw - hor < 4) ){break;}
					for ( var j = 1; j < 5; j++ )
					{
						if ( !this.gridChess[hor+j][ver+j] )
						{
							break;
						}
						else if (this.gridChess[hor+j][ver+j].type != type )
						{
							break;
						}
						else if ( j == 4 )
						{
							return true;
						}
					}
					break;
				}
				case 2:
				{
					if ( hw - hor < 4 ){break;}
					for ( var j = 1; j < 5; j++ )
					{
						if ( !this.gridChess[hor+j][ver] )
						{
							break;
						}
						else if (this.gridChess[hor+j][ver].type != type )
						{
							break;
						}
						else if ( j == 4 )
						{
							return true;
						}
					}
					break;
				}
				case 3:
				{
					if ( (hw - ver < 4) || (hor < 4) ){break;}
					for ( var j = 1; j < 5; j++ )
					{
						if ( !this.gridChess[hor+j][ver-j] )
						{
							break;
						}
						else if (this.gridChess[hor+j][ver-j].type != type )
						{
							break;
						}
						else if ( j == 4 )
						{
							return true;
						}
					}
					break;
				}
				case 4:
				{
					if ( ver < 4 ){break;}
					for ( var j = 1; j < 5; j++ )
					{
						if ( !this.gridChess[hor][ver-j] )
						{
							break;
						}
						else if (this.gridChess[hor][ver-j].type != type )
						{
							break;
						}
						else if ( j == 4 )
						{
							return true;
						}
					}
					break;
				}
				case 5:
				{
					if ( (ver < 4) || (hor < 4) ){break;}
					for ( var j = 1; j < 5; j++ )
					{
						if ( !this.gridChess[hor-j][ver-j] )
						{
							break;
						}
						else if (this.gridChess[hor-j][ver-j].type != type )
						{
							break;
						}
						else if ( j == 4 )
						{
							return true;
						}
					}
					break;
				}
				case 6:
				{
					if ( hor < 4 ){break;}
					for ( var j = 1; j < 5; j++ )
					{
						if ( !this.gridChess[hor-j][ver] )
						{
							break;
						}
						else if (this.gridChess[hor-j][ver].type != type )
						{
							break;
						}
						else if ( j == 4 )
						{
							return true;
						}
					}
					break;
				}
				case 7:
				{
					if ( (hw - ver < 4) || (hor < 4) ){break;}
					for ( var j = 1; j < 5; j++ )
					{
						if ( !this.gridChess[hor-j][ver+j] )
						{
							break;
						}
						else if (this.gridChess[hor-j][ver+j].type != type )
						{
							break;
						}
						else if ( j == 4 )
						{
							return true;
						}
					}
					break;
				}
			}
		}
		return false;
	},

	//挨着玩家随机落子
	robootPlay:function(chess,roundCount)
	{
		/**
		 * 		7    0    1
		 *      6 target  2
		 *      5    4    3  
		 */
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		roundCount = roundCount ? roundCount : 1;
		cc.log("roundCount========== "+roundCount);
		for ( var i = 0; i < 8; i++ )
		{
			var m = Math.floor(Math.random()*8);
			switch ( m )
			{
				case 0:
				{
					if ((ver + roundCount < hw ) && !this.gridChess[hor][ver+roundCount] )
					{
						this.layoutRobootChess(hor, ver+roundCount);
						return;
					}
					break;
				}
				case 1:
				{
					if ((ver + roundCount < hw) && (hor + roundCount < hw) && !this.gridChess[hor+roundCount][ver+roundCount] )
					{
						this.layoutRobootChess(hor+roundCount, ver+roundCount);
						return;
					}
					break;
				}
				case 2:
				{
					if ((hor + roundCount < hw ) && !this.gridChess[hor+roundCount][ver] )
					{
						this.layoutRobootChess(hor+roundCount, ver);
						return;
					}
					break;
				}
				case 3:
				{
					if ((ver - roundCount > -1) && (hor + roundCount < hw) && !this.gridChess[hor+roundCount][ver-roundCount] )
					{
						this.layoutRobootChess(hor+roundCount, ver-roundCount);
						return;
					}
					break;
				}
				case 4:
				{
					if ((ver - roundCount > -1 ) && !this.gridChess[hor][ver-roundCount] )
					{
						this.layoutRobootChess(hor, ver-roundCount);
						return;
					}
					break;
				}
				case 5:
				{
					if ((ver - roundCount > -1) && (hor - roundCount > -1) && !this.gridChess[hor-roundCount][ver-roundCount] )
					{
						this.layoutRobootChess(hor-roundCount, ver-roundCount);
						return;
					}
					break;
				}
				case 6:
				{
					if ((hor - roundCount > -1 ) && !this.gridChess[hor-roundCount][ver] )
					{
						this.layoutRobootChess(hor-roundCount, ver);
						return;
					}
					break;
				}
				case 7:
				{
					if ((ver + roundCount < hw) && (hor - roundCount >-1) && !this.gridChess[hor-roundCount][ver+roundCount] )
					{
						this.layoutRobootChess(hor-roundCount, ver+roundCount);
						return;
					}
					break;
				}
			}
		}
		this.robootPlay(chess, roundCount++);
	},
	layoutRobootChess:function(i,j)
	{
		cc.log("i=== "+i+"  j=== "+j);
		var chess = new Chess();
		chess.createChess(CHESS_TYPE_HEI, i, j);
		chess.setPosition(this.gridPos[i][j]);
//		this.addChild(chess);
		this.chessLayer.addChild(chess);
		this.gridChess[i][j] = chess;
		this.checkGameIsOver(chess);
	},
	getGridPos:function()
	{
		var hw = this.hw;
		for ( var i = 0; i < hw; i++ )
		{
			this.gridChess.push([]);
			this.gridPos.push([]);
			for ( var j = 0; j < hw; j++ )
			{
				var xx = this.startX + this.chessRect*i;
				var yy = this.startY + this.chessRect*j;
				this.gridPos[i][j] = cc.p(xx,yy);
				this.gridChess[i][j] = null;
			}
		}
	},
	gameOver:function()
	{
		this.gameIsOver = true;
		var self = this;
		var result = cc.Sprite.createWithSpriteFrameName("result1.png");
		result.setPosition(WinSize.width/2,WinSize.height/2);
		this.addChild(result, 100);
		var okbtn = ccui.Button.create("exitok1.png","exitok2.png","",ccui.Widget.PLIST_TEXTURE);
		okbtn.setPosition(result.width/2, 100)
		result.addChild(okbtn);
		okbtn.addTouchEventListener(function()
		{
			if ( arguments[1] == ccui.Widget.TOUCH_ENDED )
			{
				result.removeFromParent();
				self.gameIsOver = false;
				this.clearAndRestartGame();
			}
		}, this);
	}
});





var FiveChessSceness = cc.Scene.extend({
	onEnter:function ()
	{
		cc.spriteFrameCache.addSpriteFrames("res/fivechess/game.plist");
		cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
		WinSize = cc.winSize;
		cc.log(WinSize.width+"-------------"+WinSize.height);
		this._super();
		var ly = cc.LayerColor.create(cc.color.RED);
		this.addChild(ly);
		var chunk = new FiveChessGame();
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





















