var GameLogic = cc.Class.extend(
{
	ctor:function(parentt)
	{
		this.parentt = parentt;
		this.hw = this.parentt.hw;
		this.startX = this.parentt.startX;
		this.startY = this.parentt.startY;
		this.chessRect = this.parentt.chessRect;
		this.gridPos = this.parentt.gridPos;
		this.gridChess = this.parentt.gridChess;
		this.gameIsOver = this.parentt.gameIsOver;
	},
	//查找同一条线上连续的棋子数量
	checkLineChess:function(type)
	{
		var hw = this.hw;
		if ( type == CHESS_TYPE_BAI )
		{
			for ( var i = 0; i < hw; i++ )
			{
				for ( var j = 0; j < hw; j++ )
				{
					if ( this.gridChess[i][j] && this.gridChess[i][j].type == CHESS_TYPE_BAI )
					{
						var nextPos = (this.checkLineChessBai(this.gridChess[i][j]));
						if ( nextPos )
						{
							return nextPos;
						}
					}
				}
			}
		}
		else if ( type == CHESS_TYPE_HEI )
		{
			
		}
		return false;
	},
	
	checkLineChessBai:function(chess)
	{
		var vTypeChess = this.checkVTypeChess(chess);
		if ( vTypeChess ){return vTypeChess;}
		
		var lTypeChess = this.checkLTypeChess(chess);
		if ( lTypeChess ){return lTypeChess;}
		
		var lineTypeChess = this.checkLineTypeChess(chess);
		if ( lineTypeChess ){return lineTypeChess;}
		
		var tTypeChess = this.checkTTypeChess(chess);
		if ( tTypeChess ){return tTypeChess;}
		
		var four = this.checkLineChessBaiThree01(chess,3);
		if ( four ){return four;}
		
		return this.checkLineChessBaiThree(chess);
		
	},
	/**
	 * 		7    0    1
	 *      6 target  2
	 *      5    4    3
	 *      同时判断 __1 1 1_2的类型，优先将这种类型堵上 形如 _1 1 1 1 2
	 *      同时判断  1_1 1 1_的类型，优先将这种类型堵上 形如 1 2 1 1 1 
	 */
	//三线连任意一端落子，优先查找两端都是空缺的组合
	checkLineChessBaiThree:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		var lineLength = 2;//三线连
		for ( var i = 0; i < 8; i++ )
		{
			switch ( i )
			{
				case 0:
				{
					if ( hw - ver < lineLength ){break;}
					for ( var j = 1; j < lineLength+1; j++ )
					{
						if (ver+j==hw || !this.gridChess[hor][ver+j] )
						{
							break;
						}
						else if (this.gridChess[hor][ver+j].type != type )
						{
							break;
						}
						else if ( j == lineLength )
						{
							var obj = {hor:hor,ver:ver+lineLength+1};
							if (obj.ver<hw && !this.gridChess[obj.hor][obj.ver] && ver > 0&& !this.gridChess[hor][ver-1] )
							{
								return obj;
							}
						}
					}
					break;
				}
				case 1:
				{
					if ( (hw - ver < lineLength) || (hw - hor < lineLength) ){break;}
					for ( var j = 1; j < lineLength+1; j++ )
					{
						if (ver+j==hw ||hor+j==hw|| !this.gridChess[hor+j][ver+j] )
						{
							break;
						}
						else if (this.gridChess[hor+j][ver+j].type != type )
						{
							break;
						}
						else if ( j == lineLength )
						{
							var obj = {hor:hor+lineLength+1,ver:ver+lineLength+1};
							if (obj.ver<hw && obj.hor<hw && hor>0 && ver >0&& !this.gridChess[obj.hor][obj.ver] && !this.gridChess[hor-1][ver-1])
							{
								return obj;
							}
						}
					}
					break;
				}
				case 2:
				{
					if ( hw - hor < lineLength ){break;}
					for ( var j = 1; j < lineLength+1; j++ )
					{
						if (hor+j==hw|| !this.gridChess[hor+j][ver] )
						{
							break;
						}
						else if (this.gridChess[hor+j][ver].type != type )
						{
							break;
						}
						else if ( j == lineLength )
						{
							var obj = {hor:hor+lineLength+1,ver:ver};
							if (obj.hor<hw && hor>0&& !this.gridChess[obj.hor][obj.ver] && !this.gridChess[hor-1][ver])
							{
								return obj;
							}
						}
					}
					break;
				}
				case 3:
				{
					if ( (hw - ver < lineLength) || (hor < lineLength) ){break;}
					for ( var j = 1; j < lineLength+1; j++ )
					{
						if (ver-j<0 ||hor+j==hw|| !this.gridChess[hor+j][ver-j] )
						{
							break;
						}
						else if (this.gridChess[hor+j][ver-j].type != type )
						{
							break;
						}
						else if ( j == lineLength )
						{
							var obj = {hor:hor+lineLength+1,ver:ver-lineLength-1};
							if (hor>0&&ver<hw&&obj.hor<hw&& !this.gridChess[obj.hor][obj.ver] && !this.gridChess[hor-1][ver+1])
							{
								return obj;
							}
						}
					}
					break;
				}
				case 4:
				{
					if ( ver < lineLength ){break;}
					for ( var j = 1; j < lineLength+1; j++ )
					{
						if (ver-j<0|| !this.gridChess[hor][ver-j] )
						{
							break;
						}
						else if (this.gridChess[hor][ver-j].type != type )
						{
							break;
						}
						else if ( j == lineLength )
						{
							var obj = {hor:hor,ver:ver-lineLength-1};
							if (ver+1<hw&& !this.gridChess[obj.hor][obj.ver] && !this.gridChess[hor][ver+1])
							{
								return obj;
							}
						}
					}
					break;
				}
				case 5:
				{
					if ( (ver < lineLength) || (hor < lineLength) ){break;}
					for ( var j = 1; j < lineLength+1; j++ )
					{
						if (ver-j<0 || hor-j< 0 || !this.gridChess[hor-j][ver-j] )
						{
							break;
						}
						else if (this.gridChess[hor-j][ver-j].type != type )
						{
							break;
						}
						else if ( j == lineLength )
						{
							var obj = {hor:hor-lineLength-1,ver:ver-lineLength-1};
							if (hor+1<hw&&obj.ver>-1&&obj.hor>-1&& !this.gridChess[obj.hor][obj.ver] && !this.gridChess[hor+1][ver-1])
							{
								return obj;
							}
						}
					}
					break;
				}
				case 6:
				{
					if ( hor < lineLength ){break;}
					for ( var j = 1; j < lineLength+1; j++ )
					{
						if (hor-j<0|| !this.gridChess[hor-j][ver] )
						{
							break;
						}
						else if (this.gridChess[hor-j][ver].type != type )
						{
							break;
						}
						else if ( j == lineLength )
						{
							var obj = {hor:hor-lineLength-1,ver:ver};
							if (obj.hor>-1&&hor+1<hw&& !this.gridChess[obj.hor][obj.ver] && !this.gridChess[hor+1][ver])
							{
								return obj;
							}
						}
					}
					break;
				}
				case 7:
				{
					if ( (hor < lineLength) || (hw -ver  < lineLength) ){break;}
					for ( var j = 1; j < lineLength+1; j++ )
					{
						if (ver+j==hw ||hor-j<0|| !this.gridChess[hor-j][ver+j] )
						{
							break;
						}
						else if (this.gridChess[hor-j][ver+j].type != type )
						{
							break;
						}
						else if ( j == lineLength )
						{
							var obj = {hor:hor-lineLength-1,ver:ver+lineLength+1};
							if (hor+1<hw&&obj.ver<hw&& !this.gridChess[obj.hor][obj.ver] && !this.gridChess[hor+1][ver-1])
							{
								return obj;
							}
						}
					}
					break;
				}
			}
		}
		return this.checkLineChessBaiThree01(chess,2)
	},
	/**
	 * 		7    0    1
	 *      6 target  2
	 *      5    4    3
	 */
	//三线连任意一端落子
	checkLineChessBaiThree01:function(chess,lineLength)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		var lineLength = lineLength;//2：三线连,3：四连线
		for ( var i = 0; i < 8; i++ )
		{
			switch ( i )
			{
			case 0:
			{
				if ( hw - ver < lineLength ){break;}
				for ( var j = 1; j < lineLength+1; j++ )
				{
					if (ver+j==hw || !this.gridChess[hor][ver+j] )
					{
						break;
					}
					else if (this.gridChess[hor][ver+j].type != type )
					{
						break;
					}
					else if ( j == lineLength )
					{
						var obj = {hor:hor,ver:ver+lineLength+1};
						if (obj.ver<hw&& !this.gridChess[obj.hor][obj.ver] )
						{
							return obj;
						}
					}
				}
				break;
			}
			case 1:
			{
				if ( (hw - ver < lineLength) || (hw - hor < lineLength) ){break;}
				for ( var j = 1; j < lineLength+1; j++ )
				{
					if (ver+j==hw ||hor+j==hw|| !this.gridChess[hor+j][ver+j] )
					{
						break;
					}
					else if (this.gridChess[hor+j][ver+j].type != type )
					{
						break;
					}
					else if ( j == lineLength )
					{
						var obj = {hor:hor+lineLength+1,ver:ver+lineLength+1};
						if (obj.ver<hw&&obj.hor<hw&& !this.gridChess[obj.hor][obj.ver] )
						{
							return obj;
						}
					}
				}
				break;
			}
			case 2:
			{
				if ( hw - hor < lineLength ){break;}
				for ( var j = 1; j < lineLength+1; j++ )
				{
					if (hor+j==hw|| !this.gridChess[hor+j][ver] )
					{
						break;
					}
					else if (this.gridChess[hor+j][ver].type != type )
					{
						break;
					}
					else if ( j == lineLength )
					{
						var obj = {hor:hor+lineLength+1,ver:ver};
						if (obj.hor<hw&& !this.gridChess[obj.hor][obj.ver] )
						{
							return obj;
						}
					}
				}
				break;
			}
			case 3:
			{
				if ( (hw - ver < lineLength) || (hor < lineLength) ){break;}
				for ( var j = 1; j < lineLength+1; j++ )
				{
					if (ver-j<0 ||hor+j==hw|| !this.gridChess[hor+j][ver-j] )
					{
						break;
					}
					else if (this.gridChess[hor+j][ver-j].type != type )
					{
						break;
					}
					else if ( j == lineLength )
					{
						var obj = {hor:hor+lineLength+1,ver:ver-lineLength-1};
						if (obj.hor<hw&&obj.ver>-1&& !this.gridChess[obj.hor][obj.ver] )
							{
								return obj;
							}
						}
					}
					break;
				}
				case 4:
				{
					if ( ver < lineLength ){break;}
					for ( var j = 1; j < lineLength+1; j++ )
					{
						if (ver-j<0|| !this.gridChess[hor][ver-j] )
						{
							break;
						}
						else if (this.gridChess[hor][ver-j].type != type )
						{
							break;
						}
						else if ( j == lineLength )
						{
							var obj = {hor:hor,ver:ver-lineLength-1};
							if (obj.ver>-1&& !this.gridChess[obj.hor][obj.ver] )
							{
								return obj;
							}
						}
					}
					break;
				}
				case 5:
				{
					if ( (ver < lineLength) || (hor < lineLength) ){break;}
					for ( var j = 1; j < lineLength+1; j++ )
					{
						if (ver-j<0 || hor-j< 0 || !this.gridChess[hor-j][ver-j] )
						{
							break;
						}
						else if (this.gridChess[hor-j][ver-j].type != type )
						{
							break;
						}
						else if ( j == lineLength )
						{
							var obj = {hor:hor-lineLength-1,ver:ver-lineLength-1};
							if (obj.hor>-1&&obj.ver>-1&& !this.gridChess[obj.hor][obj.ver] )
							{
								return obj;
							}
						}
					}
					break;
				}
				case 6:
				{
					if ( hor < lineLength ){break;}
					for ( var j = 1; j < lineLength+1; j++ )
					{
						if (hor-j<0|| !this.gridChess[hor-j][ver] )
						{
							break;
						}
						else if (this.gridChess[hor-j][ver].type != type )
						{
							break;
						}
						else if ( j == lineLength )
						{
							var obj = {hor:hor-lineLength-1,ver:ver};
							if (obj.hor>-1 && !this.gridChess[obj.hor][obj.ver] )
							{
								return obj;
							}
						}
					}
					break;
				}
				case 7:
				{
					if ( (hor < lineLength) || (hw -ver  < lineLength) ){break;}
					for ( var j = 1; j < lineLength+1; j++ )
					{
						if (ver+j==hw ||hor-j<0|| !this.gridChess[hor-j][ver+j] )
						{
							break;
						}
						else if (this.gridChess[hor-j][ver+j].type != type )
						{
							break;
						}
						else if ( j == lineLength )
						{
							var obj = {hor:hor-lineLength-1,ver:ver+lineLength+1};
							if (obj.hor>-1&&obj.ver<hw&& !this.gridChess[obj.hor][obj.ver] )
							{
								return obj;
							}
						}
					}
					break;
				}
			}
		}
		return false;
	},
	checkTTypeChess:function(chess)
	{
		var a = this.checkTTypeChess00(chess);
		if ( a ){return a;}
		var b = this.checkTTypeChess01(chess);
		if ( b ){return b;}
		var c = this.checkTTypeChess02(chess);
		if ( c ){return c;}
		var d = this.checkTTypeChess03(chess);
		if ( d ){return d;}
		var e = this.checkTTypeChess04(chess);
		if ( e ){return e;}
		var f = this.checkTTypeChess05(chess);
		if ( f ){return f;}
		return false;
	},
	/**
	 * 		a	  b		c	  d
	 * 		-	|   - | _ _ |  _
	 * 		 -- | --  |	 _	|  _
	 * 		-   |   - |	 _	| _	_
	 */
	checkTTypeChess00:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//d
		if ((hw-ver>2)&&(hw-hor>2))
		{
			if ( !this.gridChess[hor+1][ver] )
			{
				var arr = [
				           this.gridChess[hor+2][ver],
				           this.gridChess[hor+1][ver+1],
				           this.gridChess[hor+1][ver+2]
				           ];
				for ( var i = 0; i < arr.length; i++ )
				{
					if ( !arr[i] || arr[i].type != type )
					{
						break;
					}
					else if ( i == arr.length-1 )
					{
						var obj = {hor:hor+1,ver:ver};
						return obj;
					}
				}
				
			}
		}
		//c
		if (ver>1&&(hw-hor>2))
		{
			if ( !this.gridChess[hor+1][ver] )
			{
				var arr = [
				           this.gridChess[hor+2][ver],
				           this.gridChess[hor+1][ver-1],
				           this.gridChess[hor+1][ver-2]
				           ];
				for ( var i = 0; i < arr.length; i++ )
				{
					if ( !arr[i] || arr[i].type != type )
					{
						break;
					}
					else if ( i == arr.length-1 )
					{
						var obj = {hor:hor+1,ver:ver};
						return obj;
					}
				}
				
			}
		}
		//b
		if ( ver>1&&hor>1 )
		{
			if ( !this.gridChess[hor][ver-1] )
			{
				var arr = [
				           this.gridChess[hor][ver-2],
				           this.gridChess[hor-1][ver-1],
				           this.gridChess[hor-2][ver-1]
				           ];
				for ( var i = 0; i < arr.length; i++ )
				{
					if ( !arr[i] || arr[i].type != type )
					{
						break;
					}
					else if ( i == arr.length-1 )
					{
						var obj = {hor:hor,ver:ver-1};
						return obj;
					}
				}
			}
		}
		//a
		if (ver>1&&(hw-hor>2))
		{
			if ( !this.gridChess[hor][ver-1] )
			{
				var arr = [
				           this.gridChess[hor][ver-2],
				           this.gridChess[hor+1][ver-1],
				           this.gridChess[hor+2][ver-1]
				           ];
				for ( var i = 0; i < arr.length; i++ )
				{
					if ( !arr[i] || arr[i].type != type )
					{
						break;
					}
					else if ( i == arr.length-1 )
					{
						var obj = {hor:hor,ver:ver-1};
						return obj;
					}
				}
			}
		}
		return false;
	},
	/**
	 * 		a	  b		c	  		d
	 * 		-	 |    - |   _ _ |  _
	 * 		 - - | - -  |	 _	|  
	 * 		-    |    - |	 	|  _
	 * 			 |		|	 _	| _	_
	 * 		e	  f		g	  		h
	 * 			 |		|		|  _
	 * 		-	 |    - |   _ _ |  _
	 * 		  -- | --   |	 	|  
	 * 		-    |    - |	 _	| _	_
	 * 			 |		|	 _	|
	 */
	checkTTypeChess03:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//d,h
		if (hor+2<hw && ver+3<hw)
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+1][ver+1];
			var chess04 = this.gridChess[hor+1][ver+2];
			var chess05 = this.gridChess[hor+1][ver+3];
			if ( !chess01 && !chess04 && chess02 && chess03 && chess05 )
			{
				if ( chess02.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor+1,ver:ver};
				}
			}
			if ( !chess01 && !chess03 && chess02 && chess04 && chess05 )
			{
				if ( chess02.type == type && chess04.type == type && chess05.type == type )
				{
					return {hor:hor+1,ver:ver};
				}
			}
		}
		//c,g
		if (ver-3>-1&&(hor+2<hw))
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+1][ver-1];
			var chess04 = this.gridChess[hor+1][ver-2];
			var chess05 = this.gridChess[hor+1][ver-3];
			if ( !chess01 && !chess04 && chess02 && chess03 && chess05 )
			{
				if ( chess02.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor+1,ver:ver};
				}
			}
			if ( !chess01 && !chess03 && chess02 && chess04 && chess05 )
			{
				if ( chess02.type == type && chess04.type == type && chess05.type == type )
				{
					return {hor:hor+1,ver:ver};
				}
			}
		}
		//b,f
		if ( ver-1>-1&&hor+3<hw )
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+3][ver+1];
			var chess04 = this.gridChess[hor+3][ver];
			var chess05 = this.gridChess[hor+3][ver-1];
			if ( !chess01 && !chess04 && chess02 && chess03 && chess05 )
			{
				if ( chess02.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
			if ( !chess01 && !chess03 && chess02 && chess04 && chess05 )
			{
				if ( chess02.type == type && chess04.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
		}
		//a,e
		if (ver>1&&(hw-hor>3))
		{
			var chess01 = this.gridChess[hor][ver-1];
			var chess02 = this.gridChess[hor][ver-2];
			var chess03 = this.gridChess[hor+1][ver-1];
			var chess04 = this.gridChess[hor+2][ver-1];
			var chess05 = this.gridChess[hor+3][ver-1];
			if ( !chess01 && !chess04 && chess02 && chess03 && chess05 )
			{
				if ( chess02.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor,ver:ver-1};
				}
			}
			if ( !chess01 && !chess03 && chess02 && chess04 && chess05 )
			{
				if ( chess02.type == type && chess04.type == type && chess05.type == type )
				{
					return {hor:hor,ver:ver-1};
				}
			}
		}
		return false;
	},
	/**
	 * 		a	   b       c	  d
	 * 			/|		  |		  |
	 *           |		  |		  |
	 * 		- /	 |   -    | \     |     -
	 * 		     |        |  	  |  
	 * 		-    |   - \  |   \ - |	  / -	
	 * 			 |	      |       |
	 * 			 |		 \|     - | /
	 * 		e	   f       g	  h
	 * 			/|		  |		  |
	 *         / |		  |		  |
	 * 		- 	 |   -    | \     |     -
	 * 		     |        |  \	  |  
	 * 		-    |   -    |     - |	    -	
	 * 			 |	    \ |       |	 /
	 * 			 |		 \|     - | /
	 */
	checkTTypeChess04:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//d,h
		if (hor+3<hw&&ver+4<hw)
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+3][ver+2];
			var chess04 = this.gridChess[hor+3][ver+3];
			var chess05 = this.gridChess[hor+3][ver+4];
			if ( !chess01 && !chess04 && chess02 && chess03 && chess05 )
			{
				if ( chess02.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
			if ( !chess02 && !chess04 && chess01 && chess03 && chess05 )
			{
				if ( chess01.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
		}
		//c,g
		if (hor+3<hw&&ver-4>-1)
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-2];
			var chess04 = this.gridChess[hor+3][ver-3];
			var chess05 = this.gridChess[hor+3][ver-4];
			if ( !chess01 && !chess04 && chess02 && chess03 && chess05 )
			{
				if ( chess02.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
			if ( !chess02 && !chess04 && chess01 && chess03 && chess05 )
			{
				if ( chess01.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
		}
		//b,f
		if ( ver-4>-1&&hor+3<hw )
		{
			var chess01 = this.gridChess[hor][ver-1];
			var chess02 = this.gridChess[hor][ver-2];
			var chess03 = this.gridChess[hor+1][ver-2];
			var chess04 = this.gridChess[hor+2][ver-3];
			var chess05 = this.gridChess[hor+3][ver-4];
			if ( !chess01 && !chess04 && chess02 && chess03 && chess05 )
			{
				if ( chess02.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor,ver:ver-1};
				}
			}
			if ( !chess01 && !chess03 && chess02 && chess04 && chess05 )
			{
				if ( chess02.type == type && chess04.type == type && chess05.type == type )
				{
					return {hor:hor,ver:ver-1};
				}
			}
		}
		//a,e
		if (ver-2>-1&&(hor+3<hw)&&ver+2<hw)
		{
			var chess01 = this.gridChess[hor][ver-1];
			var chess02 = this.gridChess[hor][ver-2];
			var chess03 = this.gridChess[hor+1][ver];
			var chess04 = this.gridChess[hor+2][ver+1];
			var chess05 = this.gridChess[hor+3][ver+2];
			if ( !chess01 && !chess04 && chess02 && chess03 && chess05 )
			{
				if ( chess02.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor,ver:ver-1};
				}
			}
			if ( !chess01 && !chess03 && chess02 && chess04 && chess05 )
			{
				if ( chess02.type == type && chess04.type == type && chess05.type == type )
				{
					return {hor:hor,ver:ver-1};
				}
			}
		}
		return false;
	},
	/**
	 * 		a	   b       c	  d
	 * 		- /	|   -   | \ -   |   -
	 * 		 /  |     \ |  \	|  /
	 * 		-   |   -  \| 	- 	| / -
	 */
	checkTTypeChess01:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//d
		if ((hw-ver>0)&&ver>2&&hor>1)
		{
			if ( !this.gridChess[hor][ver-1] )
			{
				var arr = [
				           this.gridChess[hor][ver-2],
				           this.gridChess[hor-1][ver-2],
				           this.gridChess[hor-2][ver-3]
				           ];
				for ( var i = 0; i < arr.length; i++ )
				{
					if ( !arr[i] || arr[i].type != type )
					{
						break;
					}
					else if ( i == arr.length-1 )
					{
						var obj = {hor:hor,ver:ver-1};
						return obj;
					}
				}

			}
		}
		//c
		if (ver>1&&(hw-ver>0)&&hor>1)
		{
			if ( !this.gridChess[hor][ver-1] )
			{
				var arr = [
				           this.gridChess[hor][ver-2],
				           this.gridChess[hor-1][ver],
				           this.gridChess[hor-2][ver+1]
				           ];
				for ( var i = 0; i < arr.length; i++ )
				{
					if ( !arr[i] || arr[i].type != type )
					{
						break;
					}
					else if ( i == arr.length-1 )
					{
						var obj = {hor:hor,ver:ver-1};
						return obj;
					}
				}

			}
		}
		//b
		if ( ver>2&&(hw-hor>3) )
		{
			if ( !this.gridChess[hor][ver-1] )
			{
				var arr = [
				           this.gridChess[hor][ver-2],
				           this.gridChess[hor+1][ver-2],
				           this.gridChess[hor+2][ver-3]
				           ];
				for ( var i = 0; i < arr.length; i++ )
				{
					if ( !arr[i] || arr[i].type != type )
					{
						break;
					}
					else if ( i == arr.length-1 )
					{
						var obj = {hor:hor,ver:ver-1};
						return obj;
					}
				}
			}
		}
		//a
		if (ver>1&&(hw-ver>0)&&(hw-hor>3))
		{
			if ( !this.gridChess[hor][ver-1] )
			{
				var arr = [
				           this.gridChess[hor][ver-2],
				           this.gridChess[hor+1][ver],
				           this.gridChess[hor+2][ver+1]
				           ];
				for ( var i = 0; i < arr.length; i++ )
				{
					if ( !arr[i] || arr[i].type != type )
					{
						break;
					}
					else if ( i == arr.length-1 )
					{
						var obj = {hor:hor,ver:ver-1};
						return obj;
					}
				}
			}
		}
		return false;
	},
	/**
	 * 		a	   b       c	   d
	 * 		  / |		  |\	  |
	 * 		 	|   - -   |       |  - -
	 * 		/   |     \   |  \	  |  /
	 * 	  - -   |         |  - -  | 
	 * 			|		\ | 	  |/
	 * 		e	   f       g	   h
	 * 		  / |		  |\	  |
	 * 		 /	|   - -   | \     |  - -
	 * 		    |         |  	  |  
	 * 	  - -   |      \  |  - -  | /
	 * 			|		\ | 	  |/
	 */
	checkTTypeChess05:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//d,h
		if (hor+4<hw&&ver+3<hw)
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+2][ver+3];
			var chess04 = this.gridChess[hor+3][ver+3];
			var chess05 = this.gridChess[hor+4][ver+3];
			if ( !chess01 && !chess04 && chess02 && chess03 && chess05 )
			{
				if ( chess02.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
			if ( !chess02 && !chess04 && chess01 && chess03 && chess05 )
			{
				if ( chess01.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
		}
		//c,g
		if (hor+4<hw&&ver-3>-1)
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+2][ver-3];
			var chess04 = this.gridChess[hor+3][ver-3];
			var chess05 = this.gridChess[hor+4][ver-3];
			if ( !chess01 && !chess04 && chess02 && chess03 && chess05 )
			{
				if ( chess02.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
			if ( !chess02 && !chess04 && chess01 && chess03 && chess05 )
			{
				if ( chess01.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
		}
		//b,f
		if (hor+4<hw&&ver-3>-1)
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+2][ver-1];
			var chess04 = this.gridChess[hor+3][ver-2];
			var chess05 = this.gridChess[hor+4][ver-3];
			if ( !chess01 && !chess04 && chess02 && chess03 && chess05 )
			{
				if ( chess02.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor+1,ver:ver};
				}
			}
			if ( !chess01 && !chess03 && chess02 && chess04 && chess05 )
			{
				if ( chess02.type == type && chess04.type == type && chess05.type == type )
				{
					return {hor:hor+1,ver:ver};
				}
			}
		}
		//a
		if (ver+3<hw&&hor+4<hw)
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+2][ver+1];
			var chess04 = this.gridChess[hor+3][ver+2];
			var chess05 = this.gridChess[hor+4][ver+3];
			if ( !chess01 && !chess04 && chess02 && chess03 && chess05 )
			{
				if ( chess02.type == type && chess03.type == type && chess05.type == type )
				{
					return {hor:hor+1,ver:ver};
				}
			}
			if ( !chess01 && !chess03 && chess02 && chess04 && chess05 )
			{
				if ( chess02.type == type && chess04.type == type && chess05.type == type )
				{
					return {hor:hor+1,ver:ver};
				}
			}
		}
		return false;
	},
	/**
	 * 		a	   b       c	  d
	 * 		 /	|   - -   | \     |  - -
	 * 		/   |     \   |  \	  |  /
	 * 	  - -   |      \  |  - -  | / 
	 */
	checkTTypeChess02:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//d
		if (ver>2&&hor>0&&(hw-hor>3))
		{
			if ( !this.gridChess[hor+1][ver] )
			{
				var arr = [
				           this.gridChess[hor+2][ver],
				           this.gridChess[hor][ver-1],
				           this.gridChess[hor-1][ver-2]
				           ];
				for ( var i = 0; i < arr.length; i++ )
				{
					if ( !arr[i] || arr[i].type != type )
					{
						break;
					}
					else if ( i == arr.length-1 )
					{
						var obj = {hor:hor+1,ver:ver};
						return obj;
					}
				}

			}
		}
		//c
		if ((hw-ver>2)&&hor>0&&(hw-hor>3))
		{
			if ( !this.gridChess[hor+1][ver] )
			{
				var arr = [
				           this.gridChess[hor+2][ver],
				           this.gridChess[hor][ver+1],
				           this.gridChess[hor-1][ver+2]
				           ];
				for ( var i = 0; i < arr.length; i++ )
				{
					if ( !arr[i] || arr[i].type != type )
					{
						break;
					}
					else if ( i == arr.length-1 )
					{
						var obj = {hor:hor+1,ver:ver};
						return obj;
					}
				}

			}
		}
		//b
		if ( ver>2&&(hw-hor>3) )
		{
			if ( !this.gridChess[hor+1][ver] )
			{
				var arr = [
				           this.gridChess[hor+2][ver],
				           this.gridChess[hor+2][ver-1],
				           this.gridChess[hor+3][ver-2]
				           ];
				for ( var i = 0; i < arr.length; i++ )
				{
					if ( !arr[i] || arr[i].type != type )
					{
						break;
					}
					else if ( i == arr.length-1 )
					{
						var obj = {hor:hor+1,ver:ver};
						return obj;
					}
				}
			}
		}
		//a
		if ((hw-ver>2)&&(hw-hor>3))
		{
			if ( !this.gridChess[hor+1][ver] )
			{
				var arr = [
				           this.gridChess[hor+2][ver],
				           this.gridChess[hor+2][ver+1],
				           this.gridChess[hor+3][ver+2]
				           ];
				for ( var i = 0; i < arr.length; i++ )
				{
					if ( !arr[i] || arr[i].type != type )
					{
						break;
					}
					else if ( i == arr.length-1 )
					{
						var obj = {hor:hor+1,ver:ver};
						return obj;
					}
				}
			}
		}
		return false;
	},
	/**
	 * 		a		b	   c    d   e      f      		g			h		
	 * 
	 *   1 1 0 1, 1 0 1 1, 1,   1,	1	,	1	,			  1,		  1
	 *   				   0	1	  1		  0				0			1
	 *   				   1	0		0		1		  1			  0
	 *   				   1	1		  1		  1		1			1
	 */
	checkLineTypeChess:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//a,b
		if ( hor+3<hw )
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+3][ver];
			if ( !chess02 && chess01 && chess03)
			{
				//a
				if( chess01.type == type && chess03.type == type )
				{
					return {hor:hor+2,ver:ver};
					
				}
			}
			if ( !chess01 && chess02 && chess03)
			{
				//b
				if( chess02.type == type && chess03.type == type )
				{
					return {hor:hor+1,ver:ver};
				}
			}
		}
		//c,d
		if ( ver+3 < hw )
		{
			var chess01 = this.gridChess[hor][ver+1];
			var chess02 = this.gridChess[hor][ver+2];
			var chess03 = this.gridChess[hor][ver+3];
			if ( !chess02 && chess01 && chess03)
			{
				//c
				if( chess01.type == type && chess03.type == type )
				{
					return {hor:hor,ver:ver+2};

				}
			}
			if ( !chess01 && chess02 && chess03)
			{
				//b
				if( chess02.type == type && chess03.type == type )
				{
					return {hor:hor,ver:ver+1};
				}
			}
		}
		//e,f
		if ( hor+3<hw && ver -3>-1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-3];
			if ( !chess02 && chess01 && chess03)
			{
				//e
				if( chess01.type == type && chess03.type == type )
				{
					return {hor:hor+2,ver:ver-2};

				}
			}
			if ( !chess01 && chess02 && chess03)
			{
				//f
				if( chess02.type == type && chess03.type == type )
				{
					return {hor:hor+1,ver:ver-1};
				}
			}
		}
		//g,h
		if ( hor+3<hw && ver+3<hw )
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+3][ver+3];
			if ( !chess02 && chess01 && chess03)
			{
				//g
				if( chess01.type == type && chess03.type == type )
				{
					return {hor:hor+2,ver:ver+2};

				}
			}
			if ( !chess01 && chess02 && chess03)
			{
				//h
				if( chess02.type == type && chess03.type == type )
				{
					return {hor:hor+1,ver:ver+1};
				}
			}
		}
		return false;
	},
	checkLTypeChess:function(chess)
	{
		var L01 = this.checkLTypeChess01(chess);
		if (L01){return L01;}
		var L02 = this.checkLTypeChess02(chess);
		if (L02){return L02;}
		var L03 = this.checkLTypeChess03(chess);
		if (L03){return L03;}
		var L04 = this.checkLTypeChess04(chess);
		if (L04){return L04;}
		var L05 = this.checkLTypeChess05(chess);
		if (L05){return L05;}
		var L06 = this.checkLTypeChess06(chess);
		if (L06){return L06;}
		var L07 = this.checkLTypeChess07(chess);
		if (L07){return L07;}
		var L08 = this.checkLTypeChess08(chess);
		if (L08){return L08;}
		return false;
	},
	/**
	 * 		a	   b       c	  d
	 * 		|	|  --     |  |    |  --
	 * 		|   |     |   |  | 	  | |
	 * 	 --     |     |   |   --  | | 
	 */
	checkLTypeChess01:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//a
		if ( hor+2 < hw && ver+2<hw )
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+2][ver+1];
			var chess04 = this.gridChess[hor+2][ver+2];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor+2,ver:ver};
				}
			}
		}
		//b
		if ( hor+2 < hw && ver-2 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+2][ver-1];
			var chess04 = this.gridChess[hor+2][ver-2];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor+2,ver:ver};
				}
			}
		}
		//c
		if ( hor+2 < hw && ver-2 > -1 )
		{
			var chess01 = this.gridChess[hor][ver-1];
			var chess02 = this.gridChess[hor][ver-2];
			var chess03 = this.gridChess[hor+1][ver-2];
			var chess04 = this.gridChess[hor+2][ver-2];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor,ver:ver-2};
				}
			}
		}
		//d
		if ( hor+2 < hw && ver+2 < hw )
		{
			var chess01 = this.gridChess[hor][ver+1];
			var chess02 = this.gridChess[hor][ver+2];
			var chess03 = this.gridChess[hor+1][ver+2];
			var chess04 = this.gridChess[hor+2][ver+2];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor,ver:ver+2};
				}
			}
		}
		return false;
	},
	/**
	 * 		a	   b       	 c	  	 d
	 * 		 |	 |			|  |	|
	 * 			 |  - -     |       |  - -
	 * 		 |   |      |   |  | 	| |
	 * 	 - -     |          |   - - | 
	 * 			 |		|	| 		| |
	 * 		e	   f         g	   	 h
	 * 		 |	 |			|  |	|
	 * 		 |	 |  --      |  |    |   --
	 * 		     |          |   	| 
	 * 	 --      |      |   |    -- | |
	 * 			 |		|	| 		| |
	 */
	checkLTypeChess05:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//a,e
		if ( hor+3 < hw && ver+3<hw )
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+3][ver];
			var chess04 = this.gridChess[hor+3][ver+1];
			var chess05 = this.gridChess[hor+3][ver+2];
			var chess06 = this.gridChess[hor+3][ver+3];
			if ( !chess03 && !chess01&& !chess05 && chess02 && chess04 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
			if ( !chess03 && !chess02&& !chess04 && chess01 && chess05 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
		}
		//b,f
		if ( hor+3 < hw && ver-3 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+3][ver];
			var chess04 = this.gridChess[hor+3][ver-1];
			var chess05 = this.gridChess[hor+3][ver-2];
			var chess06 = this.gridChess[hor+3][ver-3];
			if ( !chess03 && !chess01&& !chess05 && chess02 && chess04 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
			if ( !chess03 && !chess02&& !chess04 && chess01 && chess05 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
		}
		//c,g
		if ( hor+3 < hw && ver-3 > -1 )
		{
			var chess01 = this.gridChess[hor][ver-1];
			var chess02 = this.gridChess[hor][ver-2];
			var chess03 = this.gridChess[hor][ver-3];
			var chess04 = this.gridChess[hor+1][ver-3];
			var chess05 = this.gridChess[hor+2][ver-3];
			var chess06 = this.gridChess[hor+3][ver-3];
			if ( !chess03 && !chess01&& !chess05 && chess02 && chess04 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor,ver:ver-3};
				}
			}
			if ( !chess03 && !chess02&& !chess04 && chess01 && chess05 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor,ver:ver-3};
				}
			}
		}
		//d,h
		if ( hor+3 < hw && ver+3 < hw )
		{
			var chess01 = this.gridChess[hor][ver+1];
			var chess02 = this.gridChess[hor][ver+2];
			var chess03 = this.gridChess[hor][ver+3];
			var chess04 = this.gridChess[hor+1][ver+3];
			var chess05 = this.gridChess[hor+2][ver+3];
			var chess06 = this.gridChess[hor+3][ver+3];
			if ( !chess03 && !chess01&& !chess05 && chess02 && chess04 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor,ver:ver+3};
				}
			}
			if ( !chess03 && !chess02&& !chess04 && chess01 && chess05 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor,ver:ver+3};
				}
			}
		}
		return false;
	},
	/**
	 * 		a	   b       	 c	  	 d
	 * 		 |	 |			|  |	|
	 * 			 |  --      |  |    |  - -
	 * 		 |   |      |   |   	| 
	 * 	 --      |          |   - - | |
	 * 			 |		|	| 		| |
	 * 		e	   f         g	   	 h
	 * 		 |	 |			|  |	|
	 * 		 |	 |  - -     |       |   --
	 * 		     |          |  | 	| |
	 * 	 - -     |      |   |    -- | 
	 * 			 |		|	| 		| |
	 */
	checkLTypeChess06:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//a,e
		if ( hor+3 < hw && ver+3<hw )
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+3][ver];
			var chess04 = this.gridChess[hor+3][ver+1];
			var chess05 = this.gridChess[hor+3][ver+2];
			var chess06 = this.gridChess[hor+3][ver+3];
			if ( !chess03 && !chess02&& !chess05 && chess01 && chess04 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
			if ( !chess03 && !chess01&& !chess04 && chess02 && chess05 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
		}
		//b,f
		if ( hor+3 < hw && ver-3 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+3][ver];
			var chess04 = this.gridChess[hor+3][ver-1];
			var chess05 = this.gridChess[hor+3][ver-2];
			var chess06 = this.gridChess[hor+3][ver-3];
			if ( !chess03 && !chess02&& !chess05 && chess01 && chess04 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
			if ( !chess03 && !chess01&& !chess04 && chess02 && chess05 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
		}
		//c,g
		if ( hor+3 < hw && ver-3 > -1 )
		{
			var chess01 = this.gridChess[hor][ver-1];
			var chess02 = this.gridChess[hor][ver-2];
			var chess03 = this.gridChess[hor][ver-3];
			var chess04 = this.gridChess[hor+1][ver-3];
			var chess05 = this.gridChess[hor+2][ver-3];
			var chess06 = this.gridChess[hor+3][ver-3];
			if ( !chess03 && !chess02&& !chess05 && chess01 && chess04 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor,ver:ver-3};
				}
			}
			if ( !chess03 && !chess01&& !chess04 && chess02 && chess05 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor,ver:ver-3};
				}
			}
		}
		//d,h
		if ( hor+3 < hw && ver+3 < hw )
		{
			var chess01 = this.gridChess[hor][ver+1];
			var chess02 = this.gridChess[hor][ver+2];
			var chess03 = this.gridChess[hor][ver+3];
			var chess04 = this.gridChess[hor+1][ver+3];
			var chess05 = this.gridChess[hor+2][ver+3];
			var chess06 = this.gridChess[hor+3][ver+3];
			if ( !chess03 && !chess02&& !chess05 && chess01 && chess04 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor,ver:ver+3};
				}
			}
			if ( !chess03 && !chess01&& !chess04 && chess02 && chess05 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor,ver:ver+3};
				}
			}
		}
		return false;
	},
	/**
	 * 		a	   b          c	         d
	 * 		  /	 |  --       |  \      |    --
	 * 		 /   |      \    |   \ 	   |  /
	 * 	 --      |       \   |     --  | / 
	 */
	checkLTypeChess02:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//a
		if ( hor + 4 < hw && ver + 2 < hw )
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+3][ver+1];
			var chess04 = this.gridChess[hor+4][ver+2];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor+2,ver:ver};
				}
			}
		}
		//b
		if ( hor + 4 < hw && ver - 2 >-1 )
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+3][ver-1];
			var chess04 = this.gridChess[hor+4][ver-2];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor+2,ver:ver};
				}
			}
		}
		//c
		if ( hor+4 < hw && ver-2 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-2];
			var chess04 = this.gridChess[hor+4][ver-2];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor+2,ver:ver-2};
				}
			}
		}
		//d
		if ( hor+4 < hw && ver+2 < hw )
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+3][ver+2];
			var chess04 = this.gridChess[hor+4][ver+2];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor+2,ver:ver+2};
				}
			}
		}
		
		return false;
	},
	/**
	 * 		a	   b          c	         d
	 * 		   / |			 | \	   |
	 * 		   	 | - -       |         |    - -
	 * 		 /   |      \    |   \ 	   |  /
	 * 	- -      |           |     - - | 
	 * 			 |		  \  |		   |/
	 * 		e	   f          g          h
	 * 		   / |			 | \	   |
	 * 		  /  | --        |  \      |     --
	 * 		     |           |    	   |  
	 * 	--       |       \   |      -- | /
	 * 			 |		  \  |		   |/
	 */
	checkLTypeChess07:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//a,e
		if ( hor + 6 < hw && ver + 3 < hw )
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+3][ver];
			var chess04 = this.gridChess[hor+4][ver+1];
			var chess05 = this.gridChess[hor+5][ver+2];
			var chess06 = this.gridChess[hor+6][ver+3];
			if ( !chess03 && !chess01&& !chess05 && chess02 && chess04 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
			if ( !chess03 && !chess02&& !chess04 && chess01 && chess05 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
		}
		//b,f
		if ( hor + 6 < hw && ver - 3 >-1 )
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+3][ver];
			var chess04 = this.gridChess[hor+4][ver-1];
			var chess05 = this.gridChess[hor+5][ver-2];
			var chess06 = this.gridChess[hor+6][ver-3];
			if ( !chess03 && !chess01&& !chess05 && chess02 && chess04 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
			if ( !chess03 && !chess02&& !chess04 && chess01 && chess05 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
		}
		//c,g
		if ( hor+6 < hw && ver-3 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-3];
			var chess04 = this.gridChess[hor+4][ver-3];
			var chess05 = this.gridChess[hor+5][ver-3];
			var chess06 = this.gridChess[hor+6][ver-3];
			if ( !chess03 && !chess01&& !chess05 && chess02 && chess04 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
			if ( !chess03 && !chess02&& !chess04 && chess01 && chess05 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
		}
		//d,h
		if ( hor+6 < hw && ver+3 < hw )
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+3][ver+3];
			var chess04 = this.gridChess[hor+4][ver+3];
			var chess05 = this.gridChess[hor+5][ver+3];
			var chess06 = this.gridChess[hor+6][ver+3];
			if ( !chess03 && !chess01&& !chess05 && chess02 && chess04 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
			if ( !chess03 && !chess02&& !chess04 && chess01 && chess05 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
		}
		
		return false;
	},
	/**
	 * 		a	   b          c	         d
	 * 		   / |			 | \	   |
	 * 		   	 | --        |  \      |    - -
	 * 		 /   |      \    |    	   |  
	 * 	--       |           |     - - | /
	 * 			 |		  \  |		   |/
	 * 		e	   f          g          h
	 * 		   / |			 | \	   |
	 * 		  /  | - -       |         |     --
	 * 		     |           |   \ 	   |  /
	 * 	- -      |       \   |      -- | 
	 * 			 |		  \  |		   |/
	 */
	checkLTypeChess08:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//a,e
		if ( hor + 6 < hw && ver + 3 < hw )
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+3][ver];
			var chess04 = this.gridChess[hor+4][ver+1];
			var chess05 = this.gridChess[hor+5][ver+2];
			var chess06 = this.gridChess[hor+6][ver+3];
			if ( !chess03 && !chess02&& !chess05 && chess01 && chess04 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
			if ( !chess03 && !chess01&& !chess04 && chess02 && chess05 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
		}
		//b,f
		if ( hor + 6 < hw && ver - 3 >-1 )
		{
			var chess01 = this.gridChess[hor+1][ver];
			var chess02 = this.gridChess[hor+2][ver];
			var chess03 = this.gridChess[hor+3][ver];
			var chess04 = this.gridChess[hor+4][ver-1];
			var chess05 = this.gridChess[hor+5][ver-2];
			var chess06 = this.gridChess[hor+6][ver-3];
			if ( !chess03 && !chess02&& !chess05 && chess01 && chess04 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
			if ( !chess03 && !chess01&& !chess04 && chess02 && chess05 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver};
				}
			}
		}
		//c,g
		if ( hor+6 < hw && ver-3 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-3];
			var chess04 = this.gridChess[hor+4][ver-3];
			var chess05 = this.gridChess[hor+5][ver-3];
			var chess06 = this.gridChess[hor+6][ver-3];
			if ( !chess03 && !chess02&& !chess05 && chess01 && chess04 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
			if ( !chess03 && !chess01&& !chess04 && chess02 && chess05 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
		}
		//d,h
		if ( hor+6 < hw && ver+3 < hw )
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+3][ver+3];
			var chess04 = this.gridChess[hor+4][ver+3];
			var chess05 = this.gridChess[hor+5][ver+3];
			var chess06 = this.gridChess[hor+6][ver+3];
			if ( !chess03 && !chess02&& !chess05 && chess01 && chess04 && chess06 )
			{
				if ( chess01.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
			if ( !chess03 && !chess01&& !chess04 && chess02 && chess05 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess05.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
		}
		return false;
	},
	/**
	 * 		a	     b          c	         d
	 * 		|  /  |           |  \  |    |    
	 * 		| /   |    | \    |   \ |	 |  / |
	 * 	          |    |  \   |          | /  |
	 */
	checkLTypeChess03:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//a
		if ( hor + 2 < hw && ver - 2 > -1 )
		{
			var chess01 = this.gridChess[hor][ver-1];
			var chess02 = this.gridChess[hor][ver-2];
			var chess03 = this.gridChess[hor+1][ver-1];
			var chess04 = this.gridChess[hor+2][ver];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor,ver:ver-2};
				}
			}
		}
		//b
		if ( hor + 2 < hw && ver + 2 <hw )
		{
			var chess01 = this.gridChess[hor][ver+1];
			var chess02 = this.gridChess[hor][ver+2];
			var chess03 = this.gridChess[hor+1][ver+1];
			var chess04 = this.gridChess[hor+2][ver];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor,ver:ver+2};
				}
			}
		}
		//c
		if ( hor+2 < hw && ver-2 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+2][ver-1];
			var chess04 = this.gridChess[hor+2][ver];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor+2,ver:ver-2};
				}
			}
		}
		//d
		if ( hor+2 < hw && ver+2 < hw )
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+2][ver+1];
			var chess04 = this.gridChess[hor+2][ver];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor+2,ver:ver+2};
				}
			}
		}
		
		return false;
	},
	/**
	 * 		a	     b          c	         d
	 * 		  /	 |      |    |  \     |   |
	 * 		 /   |      |    |   \ 	  |   |
	 * 	    	 |			 |		  |
	 *      |    |       \   |    |   |  /
	 *  	|	 |		  \	 |	  |	  | /
	 */
	checkLTypeChess04:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//a
		if ( ver + 4 < hw && hor + 2 < hw )
		{
			var chess01 = this.gridChess[hor][ver+1];
			var chess02 = this.gridChess[hor][ver+2];
			var chess03 = this.gridChess[hor+1][ver+3];
			var chess04 = this.gridChess[hor+2][ver+4];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor,ver:ver+2};
				}
			}
		}
		//b
		if ( ver - 4 > -1 && hor + 2 < hw )
		{
			var chess01 = this.gridChess[hor][ver-1];
			var chess02 = this.gridChess[hor][ver-2];
			var chess03 = this.gridChess[hor+1][ver-3];
			var chess04 = this.gridChess[hor+2][ver-4];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor,ver:ver-2};
				}
			}
		}
		//c
		if ( hor+2 < hw && ver-4 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+2][ver-3];
			var chess04 = this.gridChess[hor+2][ver-4];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor+2,ver:ver-2};
				}
			}
		}
		//d
		if ( hor+2 < hw && ver+4 < hw )
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+2][ver+3];
			var chess04 = this.gridChess[hor+2][ver+4];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor+2,ver:ver+2};
				}
			}
		}
		
		return false;
	},
	checkVTypeChess:function(chess)
	{
		var v01 = this.checkVTypeChess01(chess);
		if (v01){return v01;}
		var v02 = this.checkVTypeChess02(chess);
		if (v02){return v02;}
		var v03 = this.checkVTypeChess03(chess);
		if (v03){return v03;}
		var v04 = this.checkVTypeChess04(chess);
		if (v04){return v04;}
		var v05 = this.checkVTypeChess05(chess);
		if (v05){return v05;}
		var v06 = this.checkVTypeChess06(chess);
		if (v06){return v06;}
		return false;
	},
	/**
	 * 		a	     b          c	         d
	 * 	   \   /  |           |  \      |    /
	 * 		\ /   |    / \    |   \ 	|   /
	 * 	          |   /   \   |   /     | 	\
	 * 			  |			  |	 /		|    \
	 */
	checkVTypeChess01:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//a
		if ( hor + 4 < hw && ver - 2 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-1];
			var chess04 = this.gridChess[hor+4][ver];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor+2,ver:ver-2};
				}
			}
		}
		//b
		if ( ver + 2 < hw && hor + 4 < hw )
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+3][ver+1];
			var chess04 = this.gridChess[hor+4][ver];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor+2,ver:ver+2};
				}
			}
		}
		//c
		if ( hor+2 < hw && ver-4 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+1][ver-3];
			var chess04 = this.gridChess[hor][ver-4];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor+2,ver:ver-2};
				}
			}
		}
		//d
		if ( hor-2 >-1 && ver+4 < hw )
		{
			var chess01 = this.gridChess[hor-1][ver+1];
			var chess02 = this.gridChess[hor-2][ver+2];
			var chess03 = this.gridChess[hor-1][ver+3];
			var chess04 = this.gridChess[hor][ver+4];
			if ( !chess02 && chess01 && chess03 && chess04 )
			{
				if ( chess01.type == type &&chess03.type == type && chess04.type == type )
				{
					return {hor:hor-2,ver:ver+2};
				}
			}
		}
		return false;
	},
	/**
	 * 		a	     b          c	         d
	 *	  \ 	  |			  | \		|     /
	 * 	       /  |           |         |    
	 * 		\ /   |    / \    |   \ 	|   /
	 * 	          |       \   |   /     | 	\
	 * 			  |	 /		  |	 /		|    \
	 * 		e	     f          g	         h
	 *	    	/ |			  | 		|     
	 * 	   \      |           |  \      |    /
	 * 		\ /   |    / \    |   \ 	|   /
	 * 	          |   /       |   /     | 	\
	 * 			  |	 	   \  |	 		|    
	 * 			  |			  |	/		|	  \
	 */
	checkVTypeChess05:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//a
		if ( hor + 5 < hw && ver - 3 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-3];
			var chess04 = this.gridChess[hor+4][ver-2];
			var chess05 = this.gridChess[hor+5][ver-1];
			if ( !chess01 && !chess03 && chess02 && chess05 && chess04 )
			{
				if ( chess02.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
		}
		//e
		if ( hor - 5 >-1 && ver - 3 > -1 )
		{
			var chess01 = this.gridChess[hor-1][ver-1];
			var chess02 = this.gridChess[hor-2][ver-2];
			var chess03 = this.gridChess[hor-3][ver-3];
			var chess04 = this.gridChess[hor-4][ver-2];
			var chess05 = this.gridChess[hor-5][ver-1];
			if ( !chess01 && !chess03 && chess02 && chess05 && chess04 )
			{
				if ( chess02.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor-3,ver:ver-3};
				}
			}
		}
		//b
		if ( ver + 3 < hw && hor + 5 < hw )
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+3][ver+3];
			var chess04 = this.gridChess[hor+4][ver+2];
			var chess05 = this.gridChess[hor+5][ver+1];
			if ( !chess01 && !chess03 && chess02 && chess05 && chess04 )
			{
				if ( chess02.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
		}
		//f
		if ( ver + 3 < hw && hor - 5 >-1 )
		{
			var chess01 = this.gridChess[hor-1][ver+1];
			var chess02 = this.gridChess[hor-2][ver+2];
			var chess03 = this.gridChess[hor-3][ver+3];
			var chess04 = this.gridChess[hor-4][ver+2];
			var chess05 = this.gridChess[hor-5][ver+1];
			if ( !chess01 && !chess03 && chess02 && chess05 && chess04 )
			{
				if ( chess02.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor-3,ver:ver+3};
				}
			}
		}
		//c
		if ( hor+3 < hw && ver-5 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-3];
			var chess04 = this.gridChess[hor+2][ver-4];
			var chess05 = this.gridChess[hor+1][ver-5];
			if ( !chess01 && !chess03 && chess02 && chess05 && chess04 )
			{
				if ( chess02.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
		}
		//g
		if ( hor+3 < hw && ver+5 <hw )
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+3][ver+3];
			var chess04 = this.gridChess[hor+2][ver+4];
			var chess05 = this.gridChess[hor+1][ver+5];
			if ( !chess01 && !chess03 && chess02 && chess05 && chess04 )
			{
				if ( chess02.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
		}
		//d
		if ( hor-3>-1 && ver-5 >-1 )
		{
			var chess01 = this.gridChess[hor-1][ver-1];
			var chess02 = this.gridChess[hor-2][ver-2];
			var chess03 = this.gridChess[hor-3][ver-3];
			var chess04 = this.gridChess[hor-2][ver-4];
			var chess05 = this.gridChess[hor-1][ver-5];
			if ( !chess01 && !chess03 && chess02 && chess05 && chess04 )
			{
				if ( chess02.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor-3,ver:ver-3};
				}
			}
		}
		//h
		if ( hor-3>-1 && ver+5 < hw )
		{
			var chess01 = this.gridChess[hor-1][ver+1];
			var chess02 = this.gridChess[hor-2][ver+2];
			var chess03 = this.gridChess[hor-3][ver+3];
			var chess04 = this.gridChess[hor-2][ver+4];
			var chess05 = this.gridChess[hor-1][ver+5];
			if ( !chess01 && !chess03 && chess02 && chess05 && chess04 )
			{
				if ( chess02.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor-3,ver:ver+3};
				}
			}
		}
		return false;
	},
	/**
	 * 		a	     b          c	         d
	 *	  \ 	  |			  | \		|     /
	 * 	   \   /  |           |  \      |    
	 * 		  /   |      \    |     	|   /
	 * 	          |   /   \   |   /     | 	\
	 * 			  |	 /		  |	 /		|    \
	 * 		e	     f          g	         h
	 *	    	/ |			  | 		|     
	 * 	   \   /  |           |  \      |    /
	 * 		\     |    /      |   \ 	|   /
	 * 	          |   /   \   |         | 	
	 * 			  |	 	   \  |	 /		|    \
	 * 			  |			  |	/		|	  \
	 */
	checkVTypeChess06:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//a
		if ( hor + 5 < hw && ver - 3 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-3];
			var chess04 = this.gridChess[hor+4][ver-2];
			var chess05 = this.gridChess[hor+5][ver-1];
			if ( !chess02 && !chess03 && chess01 && chess05 && chess04 )
			{
				if ( chess01.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
		}
		//e
		if ( hor - 5 >-1 && ver - 3 > -1 )
		{
			var chess01 = this.gridChess[hor-1][ver-1];
			var chess02 = this.gridChess[hor-2][ver-2];
			var chess03 = this.gridChess[hor-3][ver-3];
			var chess04 = this.gridChess[hor-4][ver-2];
			var chess05 = this.gridChess[hor-5][ver-1];
			if ( !chess02 && !chess03 && chess01 && chess05 && chess04 )
			{
				if ( chess01.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor-3,ver:ver-3};
				}
			}
		}
		//b
		if ( ver + 3 < hw && hor + 5 < hw )
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+3][ver+3];
			var chess04 = this.gridChess[hor+4][ver+2];
			var chess05 = this.gridChess[hor+5][ver+1];
			if ( !chess02 && !chess03 && chess01 && chess05 && chess04 )
			{
				if ( chess01.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
		}
		//f
		if ( ver + 3 < hw && hor - 5 >-1 )
		{
			var chess01 = this.gridChess[hor-1][ver+1];
			var chess02 = this.gridChess[hor-2][ver+2];
			var chess03 = this.gridChess[hor-3][ver+3];
			var chess04 = this.gridChess[hor-4][ver+2];
			var chess05 = this.gridChess[hor-5][ver+1];
			if ( !chess02 && !chess03 && chess01 && chess05 && chess04 )
			{
				if ( chess01.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor-3,ver:ver+3};
				}
			}
		}
		//c
		if ( hor+3 < hw && ver-5 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-3];
			var chess04 = this.gridChess[hor+2][ver-4];
			var chess05 = this.gridChess[hor+1][ver-5];
			if ( !chess02 && !chess03 && chess01 && chess05 && chess04 )
			{
				if ( chess01.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
		}
		//g
		if ( hor+3 < hw && ver+5 <hw )
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+3][ver+3];
			var chess04 = this.gridChess[hor+2][ver+4];
			var chess05 = this.gridChess[hor+1][ver+5];
			if ( !chess02 && !chess03 && chess01 && chess05 && chess04 )
			{
				if ( chess01.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
		}
		//d
		if ( hor-3>-1 && ver-5 >-1 )
		{
			var chess01 = this.gridChess[hor-1][ver-1];
			var chess02 = this.gridChess[hor-2][ver-2];
			var chess03 = this.gridChess[hor-3][ver-3];
			var chess04 = this.gridChess[hor-2][ver-4];
			var chess05 = this.gridChess[hor-1][ver-5];
			if ( !chess02 && !chess03 && chess01 && chess05 && chess04 )
			{
				if ( chess01.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor-3,ver:ver-3};
				}
			}
		}
		//h
		if ( hor-3>-1 && ver+5 < hw )
		{
			var chess01 = this.gridChess[hor-1][ver+1];
			var chess02 = this.gridChess[hor-2][ver+2];
			var chess03 = this.gridChess[hor-3][ver+3];
			var chess04 = this.gridChess[hor-2][ver+4];
			var chess05 = this.gridChess[hor-1][ver+5];
			if ( !chess02 && !chess03 && chess01 && chess05 && chess04 )
			{
				if ( chess01.type == type &&chess05.type == type && chess04.type == type )
				{
					return {hor:hor-3,ver:ver+3};
				}
			}
		}
		return false;
	},
	/**
	 * 		a	     b          c	         d
	 * 				|			| \		|	  /
	 * 	  \      /  |           |       |    
	 * 		        |    / \    |   \ 	|   /
	 * 	    \  /    |           |   /   | 	\
	 * 			    |  /     \	|  		|    
	 * 				|			| /     |	  \
	 */
	checkVTypeChess02:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//a
		if ( hor + 6 < hw && ver - 3 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-3];
			var chess04 = this.gridChess[hor+4][ver-2];
			var chess05 = this.gridChess[hor+5][ver-1];
			var chess06 = this.gridChess[hor+6][ver];
			if ( !chess03 && !chess01 && !chess05 && chess02 && chess04 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
		}
		//b
		if ( ver + 3 < hw && hor + 6 < hw )
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+3][ver+3];
			var chess04 = this.gridChess[hor+4][ver+2];
			var chess05 = this.gridChess[hor+5][ver+1];
			var chess06 = this.gridChess[hor+6][ver];
			if ( !chess03 && !chess01 && !chess05 && chess02 && chess04 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
		}
		//c
		if ( hor+3 < hw && ver-6 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-3];
			var chess04 = this.gridChess[hor+2][ver-4];
			var chess05 = this.gridChess[hor+1][ver-5];
			var chess06 = this.gridChess[hor][ver-6];
			if ( !chess03 && !chess01 && !chess05 && chess02 && chess04 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
		}
		//d
		if ( hor-3>-1 && ver+6 < hw )
		{
			var chess01 = this.gridChess[hor-1][ver+1];
			var chess02 = this.gridChess[hor-2][ver+2];
			var chess03 = this.gridChess[hor-3][ver+3];
			var chess04 = this.gridChess[hor-2][ver+4];
			var chess05 = this.gridChess[hor-1][ver+5];
			var chess06 = this.gridChess[hor][ver+6];
			if ( !chess03 && !chess01 && !chess05 && chess02 && chess04 && chess06 )
			{
				if ( chess02.type == type &&chess06.type == type && chess04.type == type )
				{
					return {hor:hor-3,ver:ver+3};
				}
			}
		}
		return false;
	},
	/**
	 * 		a	     b          c	         d
	 * 				|			| \		 |	  /
	 * 	  \      /  |           |  \     |   / 
	 * 	   \    /   |           |    	 |   
	 * 	            |   /   \   |        | 	
	 * 			    |  /     \	|  /	 |   \ 
	 * 				|			| /      |	  \
	 */
	checkVTypeChess03:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//a
		if ( hor + 6 < hw && ver - 3 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-3];
			var chess04 = this.gridChess[hor+4][ver-2];
			var chess05 = this.gridChess[hor+5][ver-1];
			var chess06 = this.gridChess[hor+6][ver];
			if ( !chess02 && !chess03 && !chess04 && chess01 && chess05 && chess06 )
			{
				if ( chess01.type == type &&chess05.type == type && chess06.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
		}
		//b
		if ( ver + 3 < hw && hor + 6 < hw )
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+3][ver+3];
			var chess04 = this.gridChess[hor+4][ver+2];
			var chess05 = this.gridChess[hor+5][ver+1];
			var chess06 = this.gridChess[hor+6][ver];
			if ( !chess02 && !chess03 && !chess04 && chess01 && chess05 && chess06 )
			{
				if ( chess01.type == type &&chess05.type == type && chess06.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
		}
		//c
		if ( hor+3 < hw && ver-6 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-3];
			var chess04 = this.gridChess[hor+2][ver-4];
			var chess05 = this.gridChess[hor+1][ver-5];
			var chess06 = this.gridChess[hor][ver-6];
			if ( !chess02 && !chess03 && !chess04 && chess01 && chess05 && chess06 )
			{
				if ( chess01.type == type &&chess05.type == type && chess06.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
		}
		//d
		if ( hor-3>-1 && ver+6 < hw )
		{
			var chess01 = this.gridChess[hor-1][ver+1];
			var chess02 = this.gridChess[hor-2][ver+2];
			var chess03 = this.gridChess[hor-3][ver+3];
			var chess04 = this.gridChess[hor-2][ver+4];
			var chess05 = this.gridChess[hor-1][ver+5];
			var chess06 = this.gridChess[hor][ver+6];
			if ( !chess02 && !chess03 && !chess04 && chess01 && chess05 && chess06 )
			{
				if ( chess01.type == type &&chess05.type == type && chess06.type == type )
				{
					return {hor:hor-3,ver:ver+3};
				}
			}
		}
		return false;
	},
	/**
	 * 		a	     b          c	         d
	 * 				|			| \		 |	  /
	 * 	  \      /  |           |        |    
	 * 	        /   |    /      |   \ 	 |  / 
	 * 	    \       |       \   |        | 	
	 * 			    |  /     \	|  /	 |   \ 
	 * 				|			| /      |	  \
	 *
	 * 		e	     f          g	         h
	 * 				|			| \		 |	  /
	 * 	  \      /  |           |  \     |   / 
	 * 	   \        |      \    |    	 |   
	 * 	       /    |   /       |   /    | 	\
	 * 			    |  /     \	|   	 |    
	 * 				|			| /      |	  \
	 *
	 */
	checkVTypeChess04:function(chess)
	{
		var hw = this.hw, hor = chess.hor, ver = chess.ver, type = chess.type;
		//a,e
		if ( hor + 6 < hw && ver - 3 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-3];
			var chess04 = this.gridChess[hor+4][ver-2];
			var chess05 = this.gridChess[hor+5][ver-1];
			var chess06 = this.gridChess[hor+6][ver];
			if ( !chess01 && !chess03 && !chess04 && chess02 && chess05 && chess06 )
			{
				if ( chess02.type == type &&chess05.type == type && chess06.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
			if ( !chess02 && !chess03 && !chess05 && chess01 && chess04 && chess06 )
			{
				if ( chess01.type == type &&chess04.type == type && chess06.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
		}
		//b,f
		if ( ver + 3 < hw && hor + 6 < hw )
		{
			var chess01 = this.gridChess[hor+1][ver+1];
			var chess02 = this.gridChess[hor+2][ver+2];
			var chess03 = this.gridChess[hor+3][ver+3];
			var chess04 = this.gridChess[hor+4][ver+2];
			var chess05 = this.gridChess[hor+5][ver+1];
			var chess06 = this.gridChess[hor+6][ver];
			if ( !chess01 && !chess03 && !chess04 && chess02 && chess05 && chess06 )
			{
				if ( chess02.type == type &&chess05.type == type && chess06.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
			if ( !chess02 && !chess03 && !chess05 && chess01 && chess04 && chess06 )
			{
				if ( chess01.type == type &&chess04.type == type && chess06.type == type )
				{
					return {hor:hor+3,ver:ver+3};
				}
			}
		}
		//c,g
		if ( hor+3 < hw && ver-6 > -1 )
		{
			var chess01 = this.gridChess[hor+1][ver-1];
			var chess02 = this.gridChess[hor+2][ver-2];
			var chess03 = this.gridChess[hor+3][ver-3];
			var chess04 = this.gridChess[hor+2][ver-4];
			var chess05 = this.gridChess[hor+1][ver-5];
			var chess06 = this.gridChess[hor][ver-6];
			if ( !chess01 && !chess03 && !chess04 && chess02 && chess05 && chess06 )
			{
				if ( chess02.type == type &&chess05.type == type && chess06.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
			if ( !chess02 && !chess03 && !chess05 && chess01 && chess04 && chess06 )
			{
				if ( chess01.type == type &&chess04.type == type && chess06.type == type )
				{
					return {hor:hor+3,ver:ver-3};
				}
			}
		}
		//d,h
		if ( hor-3>-1 && ver+6 < hw )
		{
			var chess01 = this.gridChess[hor-1][ver+1];
			var chess02 = this.gridChess[hor-2][ver+2];
			var chess03 = this.gridChess[hor-3][ver+3];
			var chess04 = this.gridChess[hor-2][ver+4];
			var chess05 = this.gridChess[hor-1][ver+5];
			var chess06 = this.gridChess[hor][ver+6];
			if ( !chess01 && !chess03 && !chess04 && chess02 && chess05 && chess06 )
			{
				if ( chess02.type == type &&chess05.type == type && chess06.type == type )
				{
					return {hor:hor-3,ver:ver+3};
				}
			}
			if ( !chess02 && !chess03 && !chess05 && chess01 && chess04 && chess06 )
			{
				if ( chess01.type == type &&chess04.type == type && chess06.type == type )
				{
					return {hor:hor-3,ver:ver+3};
				}
			}
		}
		return false;
	}
	
});













