
var AStar = cc.Class.extend(
{
	ctor:function (that) 
	{
		this.that = that;
		this.zinit();
		this.drawPic();
		this.drawSprite();//绘制精灵
	},
	drawPic:function()
	{
//		this.wall = cc.rect(300,30,50,cc.winSize.height-80);
		this.wall = cc.rect(0,0,0,0);
	},
	drawSprite:function()
	{
		this.sp = this.that.snake;
//		this.startFindWay();
	},
	startFindWay:function(spt,ept)
	{
		if ( spt.x == ept.x && spt.y == ept.y || this.checkSnake(ept) )
		{
			cc.log("起点==终点");
			return [];
		}
		var start = {
				xx:spt.x,
				yy:spt.y
		}
		var end = {
				xx:ept.x,
				yy:ept.y
		}
		return this.findWay(start, end);
	},
	findWay:function(start, end)
	{
		var findWay = false;
		var g1 = 10;
		var g2 = 14;
		var rect = this.that.gap;
		start.gg = 0;
		start.hh = 0;
		start.ff = 0;
		var openlist = [];
		var closelist = [];
		openlist.push(start);
		do {
			//从开启列表中找到f值最小的节点
			var centerNode = this.getSmallFFValueFromOpenlist(openlist);
			//将当前节点从开启列表中删除
			this.removeNodeFromOpenList(centerNode, openlist);
			//将当前节点加入到关闭列表，从此不再过问
			closelist.push(centerNode);
			//寻找当前节点周边的节点
			for ( var i = 0; i < 4; i++ )
			{
				var aroundNode = {xx:0,yy:0};
				switch (i)
				{
				case 0:
					aroundNode.xx = centerNode.xx + rect;
					aroundNode.yy = centerNode.yy;
					break;
					
				case 1:
					aroundNode.xx = centerNode.xx;
					aroundNode.yy = centerNode.yy - rect;
					break;

				case 2:
					aroundNode.xx = centerNode.xx - rect;
					aroundNode.yy = centerNode.yy;
					break;
					
				case 3:
					aroundNode.xx = centerNode.xx;
					aroundNode.yy = centerNode.yy + rect;
					break;
					
				case 4:
					aroundNode.xx = centerNode.xx + rect;
					aroundNode.yy = centerNode.yy + rect;
					break;
					
				case 5:
					aroundNode.xx = centerNode.xx + rect;
					aroundNode.yy = centerNode.yy - rect;
					break;
					
				case 6:
					aroundNode.xx = centerNode.xx - rect;
					aroundNode.yy = centerNode.yy - rect;
					break;
					
				case 7:
					aroundNode.xx = centerNode.xx - rect;
					aroundNode.yy = centerNode.yy + rect;
					break;
				}
				//将小恐龙设置为障碍物
				if ( this.that.snakeArr.length > 0 && this.checkSnake(cc.p(aroundNode.xx, aroundNode.yy)))
				{
					
				}
				//如果当前点在障碍物上，则图略
				else if ( cc.rectContainsPoint(this.wall, cc.p(aroundNode.xx, aroundNode.yy)) )
				{
				}
				//如果当前节点在关闭列表中，则图略
				else if ( this.nodeListContainNode(aroundNode, closelist) )
				{

				}
				//如果当前节点在开启列表当中,判断是否有跟优路径
				else if ( this.nodeListContainNode(aroundNode, openlist) )
				{
					var newGG = centerNode.gg + g1*rect;
					//斜角，消耗g2-14
					if ( aroundNode.xx != centerNode.xx && aroundNode.yy != centerNode.yy )
					{
						newGG = centerNode.gg + g2*rect; 
					}
					if ( aroundNode.gg > newGG )
					{
						aroundNode.gg = newGG;
						aroundNode.parentNode = centerNode;
						aroundNode.ff = this.getFF(aroundNode, end);
					}
				}
				//如果当前节点不在开启列表中，则将其加入到开启列表中
				else if ( !this.nodeListContainNode(aroundNode, openlist) )
				{
					aroundNode.parentNode = centerNode;
					//斜角，消耗g2-14
					if ( aroundNode.xx != centerNode.xx && aroundNode.yy != centerNode.yy )
					{
						aroundNode.gg = centerNode.gg + g2*rect;
					}
					//非斜角，消耗g1-10
					else
					{
						aroundNode.gg = centerNode.gg + g1*rect;
					}
					aroundNode.ff = this.getFF(aroundNode, end);
					openlist.push(aroundNode);
					//判断寻路是否结束
					if ( Math.abs(aroundNode.xx - end.xx) <= rect/2 && Math.abs(aroundNode.yy - end.yy) <=rect/2 )
					{
						findWay = true;
						var pathArr = [];
						this.getPath(aroundNode, pathArr);
						pathArr.reverse();
						cc.log(JSON.stringify(pathArr));
						cc.log("寻路结束");
//						this.startMoving(pathArr,0);
						return pathArr;
					}
					else 
					{
						//cc.log("aroundNode= "+JSON.stringify(aroundNode)+"\n---------- end= "+JSON.stringify(end));
					}
				}
			}
		} 
		while (!findWay);
	},
	checkSnake:function(aroundPos)
	{
		for (var i = 0; i < this.that.snakeArr.length; i++ )
		{
			var rect = this.that.snakeArr[i].getBoundingBox();
			if ( cc.rectContainsPoint(rect, aroundPos) )
			{
				return true;
			}
		}
		return false;
	},
	startMoving:function(patchArr, m, snake)
	{
		if ( this.that.snake.x < patchArr[m].xx )
		{
			this.that.changeAndPlayAnimation(2,snake);
		}
		else if ( this.that.snake.x > patchArr[m].xx )
		{
			this.that.changeAndPlayAnimation(-2,snake);
		}
		
		if ( this.that.snake.y < patchArr[m].yy )
		{
			this.that.changeAndPlayAnimation(1,snake);
		}
		else if ( this.that.snake.y > patchArr[m].yy )
		{
			this.that.changeAndPlayAnimation(0,snake);
		}
		var moveTo = cc.moveTo(0.5, cc.p(patchArr[m].xx, patchArr[m].yy));
		var callFunc = cc.callFunc(function()
		{
			if ( m >= patchArr.length - 1 )
			{
				cc.log("到啦，嘻嘻");
				return;
			}
			m++;
			this.startMoving(patchArr, m,snake);
		}, this);
		var sequence = cc.sequence(moveTo, callFunc);
		snake.runAction(sequence);
	},
	getPath:function(aroundNode, pathArr)
	{
		pathArr.push(aroundNode);
		if ( aroundNode.parentNode )
		{
			this.getPath(aroundNode.parentNode, pathArr);
		}
	},
	getFF:function(aroundNode, end)
	{
		var xDis = Math.abs(aroundNode.xx - end.xx)*10;
		var yDis = Math.abs(aroundNode.yy - end.yy)*10;
		aroundNode.hh = xDis + yDis;
		var ff = aroundNode.gg + aroundNode.hh;
		return ff;
	},
	nodeListContainNode:function(aroundNode, list)
	{
		for ( var i = 0; i < list.length; i++ )
		{
			if ( aroundNode.xx == list[i].xx && aroundNode.yy == list[i].yy )
			{
				return true;
			}
		}
		return false;
	},
	removeNodeFromOpenList:function(centerNode, openlist)
	{
		for ( var i = 0; i < openlist.length; i++ )
		{
			if ( centerNode.xx == openlist[i].xx && centerNode.yy == openlist[i].yy )
			{
				openlist.splice(i, 1);
				break;
			}
		}
	},
	getSmallFFValueFromOpenlist:function(openlist)
	{
		var smallFFNode = openlist[0];
		for ( var i = 0; i < openlist.length; i++ )
		{
			if ( openlist[i].ff < smallFFNode.ff )
			{
				smallFFNode = openlist[i];
			}
		}
		return smallFFNode;
	},
	zinit:function()
	{
	}
});















