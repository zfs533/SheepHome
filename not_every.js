

svn:zhoufangsheng_qianduan   nFITDu56CpPVB0GPz5un
美术SVN
git:client_res   didjkfne52#sdv   git clone http://cdml.iyx.ren:98/rapg_res.git
20161101
1:装备穿戴
如果该部位没有装备则直接穿戴装备，如果该部位已经穿戴装备，则穿戴装备图纸；
因此，穿戴装备时需要预先判断该部位是否已经穿有装备。

20161102
1:导出配置表表格方法，用工具，选AS版本的Data目录，路径选择E:\MoDragon\rapg_res\Res\src\datasets

20161108
图标加载方式——itemutil.js
格子通用方法——gridutil.js
资源管理相关——resurl.js

20161109
// 1:修改图标加载方法
2:js绑定c++类的实现方法
3:参数传递细节分析

20161110
语音SDK接入，语音录入和播放;

20161114
高斯模糊（及恢复）
var searchPaths = jsb.fileUtils.getSearchPaths();
searchPaths.push("res");
jsb.fileUtils.setSearchPaths(searchPaths);

var properties = cc.Properties.createNonRefCounted("res/Shaders/2d_effects.material#sample");
var mat1 = cc.Material.createWithProperties(properties);
var spriteBlur = new cc.Sprite("res/HelloWorld.png");
spriteBlur.setNormalizedPosition(cc.p(0.2, 0.5));
spriteBlur.setAnchorPoint(0,0);
this.addChild(spriteBlur);
spriteBlur.setGLProgramState(mat1.getTechniqueByName("blur").getPassByIndex(0).getGLProgramState());

var btn = ccui.Button.create("res/Hello.png","","");	
btn.scale = 0.3; 
btn.setAnchorPoint(0,0); 
scene.addChild(btn,1000);
btn.addTouchEventListener(function(target,state)
{
	if ( state == 2 )   
	{
		var mat1 = cc.Material.createWithProperties(properties);
		spriteBlur.setGLProgramState(mat1.getTechniqueByName("outline").getPassByIndex(0).getGLProgramState()); 
	}
});


20161115
聊天5，好友5，帮会7
聊天系统：
ui：1、聊天主界面；2、不含头像显示的item；3、包含头像显示的item
功能：1：不含头像聊天的富文本实现，待完善
	  2：含头像的聊天聊天气泡的实现
	  3：ui已经加入到程序当中
20161116工作内容：
// 1：修改含有头像聊天的ui，相应资源重新打包
// 2：实现包含头像聊天的富文本
// 3：调整玩家发言和非玩家发言时的UI布局
// 4：与服务器对各个聊天频道接口；普通文本，地理位置，道具展示，表情
// 5：进一步完善富文本功能

20161117工作内容：
// 1：按照频道一一调试服务器端接口
// 2：调通聊天记录接口（世界，喇叭喊话，其他频道通过GM命令测试通过）
// 3：聊天缓存数据处理
4：发言人名字及头像信息绑定及点击事件（延后，使用统一接口）
// 5：链接类信息绑定及点击事件
// 6：进一步完善富文本功能
// 7：单独处理系统频道消息
系统消息测试GM命令：&TEST_NOTIFY type 内容
链接消息GM命令：&hyper 内容

20161118工作内容：
1：测试各种连接类信息（道具，地理位置，其他超链接）
// 2：优化信息筛选算法
// 3：细节调整，文字，颜色，按钮状态
// 4：时间Item处理
5：调试聊天记录接口（私聊才有）

20161119工作内容：
// 1：主界面下方两行聊天信息显示，点击可以弹出聊天界面
// 2：调试android工程

预计下周工作内容：
1：主界面下方两行聊天信息显示，点击可以弹出聊天界面
2：语音SDK
3：好友系统（优先）
4：帮会系统（优先）
5：VIP系统
哪个UI先出来就先做哪个



20161121工作内容：
1：语音SDK接入

20161122工作内容：
// 1：js-c++-java参数传递
// 2：java-c++-js参数传递
// 3：语音聊天可能的信息处理接口
4：客户端显示：1：录音时间，2：语音文本
5：服务器端大概需要记录：1：录音时间，2：语音文本，3：玩家相关信息，4：频道信息

20161123
1：语音登录接口参数数据结构LoginYaya
{uid:"",nickname:"",isLocalTest:false,countTime:15}
2：开始录音接口参数数据结构StartRecord
{channelType:0}
3：播放语音接口参数数据结构PlayAudioRecord
{url:""}
3：发送服务器接口ReqService(info);
4：呀呀语音SDK接入完成，待申请appid等测试工作
5：与服务器端的协议定制完成，用超链接类型发送语音信息
6：客户端SDK登录，开始录音，录音超时回调，取消录音，停止录音，给服务器发消息已经完成；待测试
7：语音信息item的UI，暂时没有；


20161128
this.CheckCurrentLineTempWidth(this.GetCharactersByString(sendName)*this.zijieWidthNum);
修改富文本文本子容器为通用UILabel

20161129
// 1:修改主界面聊天，只显示两行，一个频道只显示一行，多余的字符串就剪切掉
// 2:聊天各频道颜色，描边，字体大小处理
	// a:主界面
	// b:聊天面板
	// c:世界聊天聊天内容去掉描边(uilabel.DisableEffect())

20161130
1:暴击动画(EaseExponentialOut越来越快)
var sp = cc.Sprite.create("res/fps_images.png");
sp.setPosition(300,200);
scene.addChild(sp);
var p = cc.p(50,30);
var spawn = new cc.Spawn( new cc.MoveBy( 0.6, 0, 120 ), new cc.FadeTo( 0.6, 100 ) );
seq = new cc.Sequence( new cc.EaseExponentialOut( new cc.MoveBy( .5, p.x, p.y ) ), spawn, new cc.CallFunc( function(target){target.removeFromParent();}, sp ));
sp.runAction(seq);




20161201
参看页游好友系统代码

1：角色界面删除测试代码
	a：修改获得新装备提示实例化方式及UI
	b：修改装备图标加载方式为正式加载方式
2：聊天系统
	a：删除所有测试代码
	b：增加删除聊天item方法
	c：聊天item复用缓存
	d：聊天图标加载修改，进入游戏时将聊天系统资源加载进游戏
	e：聊天item节点继承类型替换

20161202
// 1：角色界面删除测试代码
// 	a：修改获得新装备提示实例化方式及UI
// 	b：修改装备图标加载方式为正式加载方式
2：聊天系统
	// a：删除所有测试代码
	// b：增加删除聊天item方法
	c：聊天item复用缓存
	// d：聊天图标加载修改，进入游戏时将聊天系统资源加载进游戏
	// e：聊天item节点继承类型替换
	// f：聊天item继承节点改为ccui.Widget
	// g：聊天气泡项优化

预计下周工作内容
1：邮件系统
2：好友系统

20161205
// 1：邮件系统UI
// 2：邮件系统UI上的交互接口
// 3：邮件系统网络通信——与服务器对接

已完成：
// 1：邮件列表
// 2：获得新邮件的处理
// 3：读取邮件
// 4：调通领取邮件
// 5：删除邮件完成一半
// 6：全选功能

20161206
// 1：删除邮件的处理，根据邮件类型来处理
// 2：邮件列表上限的处理
// 3：主界面邮件提示处理
4：领取邮件，附件客户端表现处理(需求不清楚，暂时将领取改成已领取)
// 5：细节处理
// 6：邮件列表项的选中状态处理

20161207
// 1：添加好友
// 2：好友列表
3：对好友的相关操作处理
// 4：好友申请列表
5：添加或者删除好友
// 6：主界面好友申请提示

20161208
// 1：推荐好友已添加处理
2：好友的操作
	a：加入黑名单（于聊天部分做）
	b：删除好友
// 3：添加好友中的搜索功能处
/////////////////////////////
4：好友聊天部分（有点多，包括好友菜单和头像面板及语音聊天）
// 5：优化好友列表
// 6：优化好友添加
20161209
1：好友聊天信息；
	a:聊天列表
	b:聊天信息缓存
	c:聊天记录

2：点击好友头像弹出好友菜单处理（及功能）
3：表情聊天

20161210
// 1：菜单交互功能处理
// 2：表情聊天面板处理


20161212
// 1：表情聊天面板处理
	// a:表情
	// b:物品道具

20161213
// 1：语音聊天item处理
// 2：细节调整，文字，颜色，按钮状态
// 3：界面特定跳转

20161214
// 1：文字，描边
// 2：好友上下线刷新好友列表中玩家状态（打开界面时刷新一次）
// 3：收到新消息红点提示
// 4：好友列表上限
// 5：聊天记录时间item（如果不是今天的）

20161215
// 1：聊天记录根据时间分组
// 2：语音聊天item在私聊中的尺寸调整
// 3：解决界面打开时的卡顿问题

20161216
// 1：修改聊天面板布局
// 2：修改聊天面板出现隐藏方式


20161219
// 1：摇杆全屏拖动控制
// 2：角色界面调整


20161220-21
优化：
// 1：好友列表刷新逻辑
// 2：邮件中的消息请求(清空背包的请求)
// 3：好友申请批处理一次性向服务器请求次数逻辑修改
// 4：部分for循环获取leng的方法修改
// 5：删除好友面板切换过程中清除背包的操作
// 6：优化部分if语句为 ..:..?..
// 7：将进入游戏需要请求的消息放在角色Mgr请求结束之后
// 8：修改装备panelext，写个获取装备信息的通用接口在装备Mgr里面
// 9：尽量将复杂一点的逻辑写着Mgr以内
// 10：私有变量放在代码最前端（今后这么做，前边的暂时不改了）
// 11：for..in..改为for循环
// 12：比较用id不用name
// 角色，邮件，聊天，好友，摇杆，新功能开放，音效


20161222
// 1：优化格子类
// 2：修改好友系统UI（换皮）
// 3：将合并聊天气泡和语音item的UI
Cocos质料大全：https://fusijie.github.io/Cocos-Resource/index.html

20161226
1：换肤



lua的特点
1：语句结尾不需要用分号
2：循环语句，条件语句不需要括号
3：循环语句，条件语句，函数等需要用end作为结束标示
4：只有两种数据类型，表(tabel)和nil(空对象)
5：局部变量用local声明

20170106
1：优化主界面聊天显示
2：进一步优化聊天item


20170109
1：邮件UI更新
2：邮件好友优化
3：删除沉余代码


20170110
1：进一步优化聊天相关，感觉问题还大
2：删除相关的沉余代码


///////////////
聊天项item解决方案
1：按行取间隙
2：将间隙简单排序



20170111
1：优化富文本图文混排
2：优化物品展示混排
3：多人副本UI大纲

一、多人副本主页
1：副本列表
2：当前选择副本信息展示
3：已有队伍列表
4：智能化操作项
5：创建房间，快速加入入口（按钮）

二、队伍详情及相关操作

三、邀请组队好友列表处理

四、主界面副本同步信息处理

五、战斗前后倒计时，及战斗失败或成功的处理


20170112
1：多人副本
	a：列表信息及详细信息设置
	b：队伍列表及创建队伍


20170113-14
// 1：加入队伍
// 2：快速加入
// 3：刷新队伍信息
// 4：刷新我的队伍信息
// 5：离开房间，退出队伍
// 6：CheckBox选项操作处理（倒计时，可加入队伍（这里涉及到排序））
7：队伍存在时间段处理（倒计时完毕玩家自动退出或者解散队伍）
8：邀请（这里貌似东西有点多）
9：主界面显示收到邀请的提示面板




20170116
1：邀请，(UI，Logic)
2：逻辑稍微复杂一点的尽可能写在,...mgr.js里面
// 3：打开UI时刷新一次多人副本列表


20170117
// 1：完成邀请中的帮会成员
2：附近成员列表
// 2：玩家收到邀请，客户端提示面板
// 3：接受邀请逻辑实现
// 4：拒绝邀请逻辑实现
// 5：开战
6：副本战斗结束判断




20170118
// 1：只允许邀请的玩家加入队伍
2：多人副本战斗相关问题
3：副本同步UI
4：副本同步倒计时
5：离开副本
6：战斗结束，结算界面处理


// 退出跨服的接口、、
20170119
多人副本中的问题：
0：倒计时（服务器端正在解决，暂且用个人副本通用接口的副本倒计时）
1：战斗是否正常执行
2：队伍中所有玩家是否正常显示
3：如何获取实时队伍成员信息(scene_object_mgr.js===>FindObject(gid))
4：如何获取boss实时信息

201701
玩家面板，boss信息
TimerUtil.TimeUpdate(self.OnBeginTimer, self, 1);//Timer
this.btnArr = [
			this.btnChuangjian1,//创建房间
			this.btnJiaru1,//快速加入
			this.btnGo,//开始
			this.btnJiaru,//离开房间
			this.btnChuangjian,//取消准备
			this.sbtnGouxuan,//自动准备
			this.sbtnGouxuan1,//12s倒计时
			this.sbtnGouxuan21,//只显示可加入房间
			this.sbtnGouxuan2,//只允许邀请的玩家加入
		];
好友，邮件，聊天，多人副本，角色系统，摇杆，（新功能开启）
花样年大道1号
20170206
lua setpeer getpeer
相关博客：http://www.07net01.com/program/2016/03/1362608.html

lua restory star
selected all star -- follow the hor and ver for star -- 循环遍历

20170208
细节调整，UI，字体，颜色
// 1：角色界面
2：好友界面
3：聊天界面


local    scheduler = cc.Director:getInstance():getScheduler()
scheduler:scheduleScriptFunc(function() self:startHorizontalMove(hor) end, 0.4, false)
performWithDelay(self,function()  
        print("Hello")  
    end,3) 

20170210
1：系统消息内存消耗过多
2：完善语音聊天接口
\\192.168.7.174\墨龙科技资源共享站

主界面语音，好友系统语音，聊天语音剩余部分逻辑实现


20170213
1：     开始录音-------停止录音--------上传录音文件--------------播放录音
   		调底层接口	  调底层接口	   底层调上传接口			调底层接口
参数    （频道）	  				(time,url,channelType...) 	  (url)

20170216
优化聊天及富文本
(只用一个列表控件)

20170217
战甲系统
《爱乐之城》

洗发水 => 欧莱雅	施华蔻

20170220
消除游戏
1：将满足条件的chunk赛选出来并移除
2：重排消除后剩余chunk，并实现重排动作

战甲系统
1：战甲过期处理
2：优化装备获得展示UI

20170221
1：战甲过期优化
2：穿戴战甲，场景角色换装刷新
3：头衔称号改名

1：展示所有称号
2：已装备表现处理
/********************************/
明天：
称号细节调节；
标签按钮数量及种类处理；

/*******************************/
1：将头衔嵌入到名字当中
2：改名消息处理
3：改名，称号，头衔优化

/*************20170228******************/
改名，称号，头衔优化
今日提交内容：
1：战甲；
2：改名；
3：称号；
4：头衔；

/*************20170301******************/
1：进一步优化上文
2：多人组队副本(放后面)
优先：
1：聊天文字颜色优化——照着效果图整
2：新增帮会答题聊天项
3：优化各个系统代码，避免不必要的性能消耗



02806878



/*************20170306******************/
// -1：角色界面的属性界面优化（十大神器系统入口）
// 0：角色界面UI优化
// 1：聊天中超链接颜色处理
// 2：特殊文字显示，是否需要下划线
// 3：没有超链接的特殊文字颜色处理
// 4：聊天界面弹出按钮调整
// 5：提交代码



博客发布之前先仔细读一遍，以免有遗漏或者表意不明的地方




/*************20170307******************/
// 1：头衔广播接口是否存在（map_message.js中周围玩家信息中没有头衔id，则没有头衔广播，游戏中只能看到自己的头衔）
// 2：优化头衔和玩家名字切换的接口
// 3：如果系统未开放，将战甲显示出来，给个暂未开放的提示信息（首冲开放，让玩家知道有这么个东西）
4：准备跨服多人组队副本，UI应该快要下来了
// 5：对了，还有个答题领取奖励的效果没做（优先整）
// 6：太极界面活动跳转到帮会答题活动的接口实现
/********************/
1：lua类的两种实现方法
2：重写消除核心递归方法
3：第一点博客草稿

/*************20170308******************/
跨服多人组队副本
// 1：玩家离开跨服后将跨服中的玩家头衔显示信息面板移除
2：退出副本命令要执行两次，感觉是个BUG，要调一哈
// 3：副本胜利结算界面退出接口处理，连接直接断开，明显有问题




聊天系统BUG
// 1：玩家自己的发言记录 要靠右显示，底色要和其他人进行区分（世界频道）
// 2：聊天长度超过背景框了
// 3：传音 这里没有对齐
// 4：吞噬点击事件
// 5：点击玩家名字直接弹出下拉菜单，点击装备链接弹出装备信息，不需要打开左侧的聊天界面
// 6：玩家名字链接弹出玩家简要信息面板
// 7：只有在世界频道玩家自己发言需要显示在右边，其它频道一律显示在左边
// 8：世界频道链接类不作处理（暂时屏蔽掉）



20170310
// 1：解决多人副本问题
// 2：改聊天系统策划提出的Bug


20170313
1：修改聊天选择多个物品时主界面出现的Bug
2：重写SheepHome/Rpg中地图块加载方法
回顾(近期)
1：精灵帧缓存；
2：数据持久化，本地存储数据
3：粒子系统
4：titmap地图编辑器
5：音效系统
6：星星消除游戏案列
7：网络通信，https,websocket,socketTCP
8：物理引擎chipmunk,Box2D
LUA基础
1：基本语法
2：运算符
3：修饰符
4：全局变量，局部变量
5：语句(if,for,范围for循环)
6：块，作用域
7：函数
8：表数据结构table
9：基本数据类型,num,string,nil,table
10：matetatable,setMatetatable方法
11：类，继承
LUA-Cocos2d
星星消除，三消游戏





20170314
1：聊天屏蔽事件修改（暂时还是用标志变量来做吧）
// 2：沉余代码删除
// 3：chatqipaoext加载打包纹理
// 4：Alert.js修改
// 4：富文本链接indexof()
// 5：退出跨服要两次问题（启动游戏方式的问题，用IDE启动没有这样的问题出现）
// 6：玩家简要信息面板
// 7：优化装备穿戴
装备穿戴逻辑
1：获得装备
2：检查是否已经穿戴该部位的装备
	1：未穿戴=>直接穿戴
	2：已穿戴=>检测该装备等级是否大于当前穿戴的装备等级
			   1：大于=>直接穿戴
			   2：小于=>不做任何处理，直接return
3：获得装备图纸
4：检测图纸对应的装备是否已经穿戴
	1：已穿戴=>直接使用图纸
	2：未穿戴=>不做任何处理，直接return
5：相关实现代码backpack_mgr,equip_mgr,player_mgr
// 疑问：(明天解决)
// 1：怎么区分连服跟跨服多人副本，type都是6
// 2：连服的消息不太看得懂，创建队伍，开始副本的消息貌似木有


20170315
1：对接连服多人副本zoneteam

20170316
// 角色，邮件，聊天，好友，摇杆，改名，头衔，称号，战甲，跨服多人副本，连服多人副本









































准备进入mapId:20002
准备进入mapId:10601











Lua 之C2d三消游戏（二）原理说明
1：创建一个Chunk类，包括类型，所在行列属性
2：以二维数组的形式排列存储star
3：初始化基本属性，为chunk添加触摸事件
4：查找所有chunk，将相邻且同类型的chunk赛选出来,并存储起来
	1：遍历每一列，循环从每一列的前三个开始循环
	2：遍历每一行，循环从每一行的前三个开始循环
	3：必须至少有三个相邻且类型相同
	具体代码：
--  检测所有chunk，将满足条件的chunk赛选出来
function ChunkMain:checkAllChunk()
    -- 垂直方向检查
    local sameChunkArr = {}
    for i = 1, self.rangeHor do
        local tempArr = {}
        for j = 1, self.rangeVer-2 do
            local chunk01 = self.chunkArr[i][j]
            local chunk02 = self.chunkArr[i][j+1]
            local chunk03 = self.chunkArr[i][j+2]
            if chunk01 and chunk02 and chunk03 then
                if chunk01.type == chunk02.type and chunk01.type == chunk03.type then
                    table.insert(tempArr,1,chunk01)    -- 这里要单独存一个table
                    table.insert(tempArr,1,chunk02)
                    table.insert(tempArr,1,chunk03)
                    table.insert(sameChunkArr,1,tempArr)
                end
            end
        end
    end
    -- 水平方向检查
    for j = 1, self.rangeVer do
        local tempArr = {}
        for i = 1, self.rangeHor-2 do
            local chunk01 = self.chunkArr[i][j]
            local chunk02 = self.chunkArr[i+1][j]
            local chunk03 = self.chunkArr[i+2][j]
            if chunk01 and chunk02 and chunk03 then
                if chunk01.type == chunk02.type and chunk01.type == chunk03.type then
                    table.insert(tempArr,1,chunk01)    -- 这里要单独存一个table
                    table.insert(tempArr,1,chunk02)
                    table.insert(tempArr,1,chunk03)
                    table.insert(sameChunkArr,1,tempArr)
                end
            end
        end
    end
    local chunkArr = {}
    for i = 1, table.getn(sameChunkArr) do
        local tempChunk = sameChunkArr[i]
        for j = 1, table.getn(tempChunk) do
            table.insert(chunkArr,1,tempChunk[j])
        end
    end
    self:distoryChunk(chunkArr)
    if table.getn(sameChunkArr) < 1 then
        self:reSetChunkPos()
    end
end
5：选择chunk逻辑,这里要记录选择的前两个chunk，设为firstChunk,secoundChunk，设当前选中的chunk为target
	1：若firstChunk为空，则赋值target
	2：若firstChunk不为空，且secoundChunk为空
		1：若target == firstChunk,将firstChunk设为空
		2：若target ~= firstChunk,则赋值secoundChunk = target
	3：若两者都不为空，则将target赋值给firstChunk,将secoundChunk设为空
	具体代码：
--  选中chunk逻辑
function ChunkMain:handleSelectedChunk(target)
    if not ChunkMain.firstChunk then -- 1
        ChunkMain.firstChunk = target
        target:setStateSelected()
    elseif ChunkMain.firstChunk and not ChunkMain.secoundChunk then  -- 2
        if ChunkMain.firstChunk.hor == target.hor and ChunkMain.firstChunk.ver == target.ver then --两次选中同一个chunk,则取消选择
            target:clearStarState()
            ChunkMain.firstChunk = nil
        else
            target:setStateSelected()
            ChunkMain.secoundChunk = target
        end
        if ChunkMain.firstChunk and ChunkMain.secoundChunk then
            self:startChangeAction()
        end
    elseif ChunkMain.firstChunk and ChunkMain.secoundChunk then -- 3
        ChunkMain.firstChunk:clearStarState()
        ChunkMain.secoundChunk:clearStarState()
        target:setStateSelected()
        ChunkMain.firstChunk = target
        ChunkMain.secoundChunk = nil
    end
end
6：判断选中的两个chunk是否满足交换条件，若满足则交换
	1：交换位置
	2：交换基础属性（行，列）
	具体代码：
--  开始交换
function ChunkMain:startChangeAction()
    local isCanMove = self:jugementMove()	--判断是否满足交换条件
    if isCanMove then
        local chunk01 = ChunkMain.firstChunk 
        local chunk02 = ChunkMain.secoundChunk 
        local sz = chunk01:getContentSize()
        local time = 0.3
        local pos01 = cc.p(0,0)
        local pos02 = cc.p(0,0)
        local isHor = false
        local isAdd = false
        -- 计算两个交换chunk的交换条件
        if chunk01.hor == chunk02.hor then 
            isHor = false
            if chunk01.ver > chunk02.ver then
                isAdd = false
                pos01 = cc.p(chunk01.hor*sz.width-sz.width/2,(chunk01.ver-1)*sz.height-sz.height/2)
                pos02 = cc.p(chunk02.hor*sz.width-sz.width/2,(chunk02.ver+1)*sz.height-sz.height/2)
            else
                isAdd = true
                pos01 = cc.p(chunk01.hor*sz.width-sz.width/2,(chunk01.ver+1)*sz.height-sz.height/2)
                pos02 = cc.p(chunk02.hor*sz.width-sz.width/2,(chunk02.ver-1)*sz.height-sz.height/2)
            end
        end
        if chunk01.ver == chunk02.ver then 
            isHor = true
            if chunk01.hor > chunk02.hor then
                isAdd = false
                pos01 = cc.p((chunk01.hor-1)*sz.width-sz.width/2,chunk01.ver*sz.height-sz.height/2)
                pos02 = cc.p((chunk02.hor+1)*sz.width-sz.width/2,chunk02.ver*sz.height-sz.height/2)
            else
                isAdd = true
                pos01 = cc.p((chunk01.hor+1)*sz.width-sz.width/2,chunk01.ver*sz.height-sz.height/2)
                pos02 = cc.p((chunk02.hor-1)*sz.width-sz.width/2,chunk02.ver*sz.height-sz.height/2)
            end
        end
        self:playAction(chunk01,chunk02,pos01,pos02,isHor,isAdd)
    end
end
--  播放移动交换动作
function ChunkMain:playAction(chunk01,chunk02,pos01,pos02,isHor,isAdd,isNot)
    self.tempIsAdd = isAdd
    self.tempIsHor = isHor
    self.tempPos01 = pos01
    self.tempPos02 = pos02
    local time = self.actionTime
    local moveTo01 = cc.MoveTo:create(time,pos01)
    local moveTo02 = cc.MoveTo:create(time,pos02)
    local elastic01 = cc.EaseBackOut:create(moveTo01);
    local elastic02 = cc.EaseBackOut:create(moveTo02);
    local callback = cc.CallFunc:create(function() 
        if not isNot then
            self:startCheckChunk() 
        else
            self:clearChunk()
        end
    end)
    local sequence = cc.Sequence:create(elastic01,callback)
    chunk01:runAction(sequence)
    chunk02:runAction(elastic02)
    -- 交换基础属性（行，列）
    local temp = self.chunkArr[chunk01.hor][chunk01.ver]
    self.chunkArr[chunk01.hor][chunk01.ver] = self.chunkArr[chunk02.hor][chunk02.ver]
    self.chunkArr[chunk02.hor][chunk02.ver] = temp
    if isHor then
        if isAdd then
            chunk01.hor = chunk01.hor + 1
            chunk02.hor = chunk02.hor - 1
        else
            chunk01.hor = chunk01.hor - 1
            chunk02.hor = chunk02.hor + 1
        end
    else
        if isAdd then
            chunk01.ver = chunk01.ver + 1
            chunk02.ver = chunk02.ver - 1
        else
            chunk01.ver = chunk01.ver - 1
            chunk02.ver = chunk02.ver + 1
        end
    end
end
7：交换后执行步骤4
	1：交换后没有满足消除条件的chunk列表，则交换回去（回到交换前，同样要交换位置和基础属性）
	2：交换后有满足消除条件的chunk列表，则执行消除操作
--  具体代码：		
function ChunkMain:distoryChunk(chunkArr)
    local resultArr = self:pickStarTable(chunkArr)
    local len = table.getn(resultArr)
    for i = 1,len do
        resultArr[i]:setStateSelected()
        local chunk = resultArr[i];
        self.chunkArr[chunk.hor][chunk.ver] = nil
        chunk:removeFromParent()
    end
--    消除后清空firstChunk,secoundChunk
    if len > 0 then 
        self:clearChunk()
    end
    self:reLayoutChunk()
end

8：移动：消除后重排chunk网格，遍历所有列检测空位上方是否有chunk，若有则将其掉下来
	1：位置移动
	2：基础属性重设（行，列）
	具体代码：
--执行消除后重新排列
function ChunkMain:reLayoutChunk()
    for i = 1,self.rangeHor do
        for j = 1, self.rangeVer do
            local chunkV = self.chunkArr[i][j]
            if not chunkV then
                self:checkVerticalMove(i,j)
                break;
            end
        end
    end
end 
--  交换并向下移动移动
function ChunkMain:checkVerticalMove(hor,ver)
    local count = 0
    local time = self.actionTime
    for i = ver,self.rangeVer do
        local chunk = self.chunkArr[hor][i]
        if not chunk then
            count = count + 1
        else
            local moveTo = cc.MoveTo:create(time,cc.p(chunk:getPositionX(),chunk:getPositionY()-chunk:getContentSize().height*count))
            local elastic01 = cc.EaseBackOut:create(moveTo);
            chunk:runAction(elastic01)
            self.chunkArr[hor][i].ver = self.chunkArr[hor][i].ver - count
            self.chunkArr[hor][i-count] = self.chunkArr[hor][i]
            self.chunkArr[hor][i] = nil
        end
    end
    
    local scheduler = cc.Director:getInstance():getScheduler() 
    local mm = nil
    mm = scheduler:scheduleScriptFunc(function() 
        self:checkEmptyAndAddNewChunk()
        scheduler:unscheduleScriptEntry(mm);
    end, time, false)
end
9：补全：创建新chunk将所有空位填满
	1：排列位置
	2：基础属性（行列）
	具体代码：
--  补全
function ChunkMain:checkEmptyAndAddNewChunk()
    local time = 0.2
    local count = 0
    for i = 1,self.rangeHor do
        count = 0
        for j = 1,self.rangeVer do
            local chunk = self.chunkArr[i][j]
            if not chunk then
                count = count + 1
                local random = math.floor(math.random(1,#self.imgRes))
                local chunk = Star:createStar(self.imgRes[random])
                local sz = chunk:getContentSize()
                chunk:setPosition(sz.width/2 + sz.width*(i-1),sz.height/2+sz.height*self.rangeVer+(count*sz.height))
                self:runLayoutChunkAction(chunk,time,cc.p(sz.width/2 + sz.width*(i-1),sz.height/2+sz.height*(j-1)))
                chunk:setHorAndVerCoordinate(i,j)
                chunk:addTouchEventListener(function(target,state) self:chunkTouchEvent(target,state) end)
                self.layer:addChild(chunk,5)
                self.chunkArr[i][j] = chunk
            end
        end
    end
    local scheduler = cc.Director:getInstance():getScheduler() 
    local mm = nil
    mm = scheduler:scheduleScriptFunc(function() 
        self:checkAllChunk()
        scheduler:unscheduleScriptEntry(mm);
    end, time, false)
end
10：重复步骤4，若有满足消除条件的chunk列表，则重复步骤8,9,10，这里主要看步骤9后部分的代码：
local scheduler = cc.Director:getInstance():getScheduler() 
local mm = nil
mm = scheduler:scheduleScriptFunc(function() 
    self:checkAllChunk()
    scheduler:unscheduleScriptEntry(mm);
end, time, false)
11：以上步骤就完成了一次消除的完整流程，基本原理就是这样
12：以上步骤中完整源码见以下链接
http://zfsblog.blog.163.com/blog/static/231879079201721624926766/






















































Lua 之C2d星星消除（三）原理说明
1：创建一个Star类，包括类型，所在行列属性
2：以二维数组的形式排列存储star
3：初始化基本属性，为star添加触摸事件
4：查找与选中star相邻且同类型的star,并存储起来
	1：以选中的star作为起点，查找相邻的上下左右四个方向的star，如果类型不相同则跳过，如果类型相同则存储到star列表中
	2：以上下左右四个方向类型相同的star作为起点，重复步骤一；这里要加一个相邻同类型的star是否已经在star列表中的判断，如果已经存在则跳过，否则将其加入star列表
	3：这里用到了递归方法，步骤一和步骤二反复执行下去，直到本次查找结束，及相邻的所有相同类型star全部找到
	具体代码：
--从四个方向查找相同类型的star
function GameScene:checkByDirectionFour(star)//param当前选中的star
    local tempArr = {}
    local tempStar = nil
    local starR = nil
    --    right
    local len = table.getn(tempArr)
    if (star.hor+1) <= self.range then
        local tempStar = self.starArr[star.hor+1][star.ver]
        local starR = self:checkStarType(star,tempStar)
        if starR then
            if not self:jugementIsExist(starR) then --判断star是否已经存在同类型star列表中
                table.insert(self.sameStar,1,starR)
                self:checkByDirectionFour(starR)
            end
        end
    end
    --    left
    len = table.getn(tempArr)
    if (star.hor-1) >=1 then
        tempStar = self.starArr[star.hor-1][star.ver]
        starR = self:checkStarType(star,tempStar)
        if starR then
            if not self:jugementIsExist(starR) then
                table.insert(self.sameStar,1,starR)
                self:checkByDirectionFour(starR)
            end
        end
    end
    --    up
    len = table.getn(tempArr)
    if (star.ver+1) <= self.range then
        tempStar = self.starArr[star.hor][star.ver+1]
        starR = self:checkStarType(star,tempStar)
        if starR then
            if not self:jugementIsExist(starR) then
                table.insert(self.sameStar,1,starR)
                self:checkByDirectionFour(starR)
            end
        end
    end
    --    down
    len = table.getn(tempArr)
    if (star.ver-1) >= 1 then
        tempStar = self.starArr[star.hor][star.ver-1]
        starR = self:checkStarType(star,tempStar)
        if starR then
            if not self:jugementIsExist(starR) then
                table.insert(self.sameStar,1,starR)
                self:checkByDirectionFour(starR)
            end
        end
    end
    
--    return tempArr
end
--判断sameStar(starlist)序列里是否已经存在star
function GameScene:jugementIsExist(star)
    local starArr = self.sameStar
    for i = 1,#starArr do
        if star.hor == starArr[i].hor and star.ver == starArr[i].ver and star.type == starArr[i].type then
            return true
        end
    end
    return false
end
5：将本次查找结果中的所有同类型的star消除，star列表长度需大于1
6：消除后重新排列star
7：竖直方向上：消除后遍历所有方块检查已消除star的上方是否还有方块，如果有则将上面的star往下移动，否则不做处理
	若果有star需要往下移动，则将会做两件事情
	1：位置移动，下方空出几个格子就向下移动多少距离
	2：重设移动后star的行列属性
	具体代码：
--  交换并向下移动移动
function GameScene:checkVerticalMove(hor,ver)
    local count = 0
    local time = 0.2
    for i = ver,self.range do
        local star = self.starArr[hor][i]
        if not star then
            count = count + 1
        else
            local moveTo = cc.MoveTo:create(time,cc.p(star:getPositionX(),star:getPositionY()-star:getContentSize().height*count))
            star:runAction(moveTo) --重设位置
            self.starArr[hor][i].ver = self.starArr[hor][i].ver - count --重设行列属性
            self.starArr[hor][i-count] = self.starArr[hor][i]
            self.starArr[hor][i] = nil
        end
    end
end
8：水平方向上：检查是否有空列，若果有则将空列右边的所有列向左移动
	同样要做两件事情
	1：位置移动
	2：重设移动后star的行列属性
	具体代码：
首先遍历查找空列
local count = 0
for j = 1,self.range do
    count = 0
    for i = 1,self.range do
        local star = self.starArr[j][i]
        if not star then
            count = count + 1
            if count == 10 then -- 整列空缺
                self:startHorizontalMove(j)
            end
        end 
    end
end
--  交换并整列左右移动
function GameScene:startHorizontalMove(hor)
    hor = hor + 1
    local count = 1
    for i = hor,self.range do
        for j = 1,self.range do
            local star = self.starArr[hor][j]
            if star then
                local moveTo = cc.MoveTo:create(0.3,cc.p(star:getPositionX()-star:getContentSize().width*count,star:getPositionY()))
                star:runAction(moveTo) --重设位置
                self.starArr[hor][j].hor = self.starArr[hor][j].hor - count--重设行列属性
                self.starArr[hor-count][j] = self.starArr[hor][j]
                self.starArr[hor][j] = nil
            end
        end
    end
end

9：以上步骤就完成了一次消除的完整流程，基本原理就是这样
10：以上步骤中完整源码见以下链接
http://zfsblog.blog.163.com/blog/static/231879079201711410313701/





























































































乱花渐欲迷人眼 浅草才能没马蹄

总分总













