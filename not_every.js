svn:zhoufangsheng_qianduan   nFITDu56CpPVB0GPz5un
美术SVN
git:client_res   didjkfne52#sdv   git clone http://cdml.iyx.ren:98/rapg_res.git
禅道:zhoufangsheng   OJyWOM5eZKkqePXLYqqO
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
// 角色，邮件，聊天，好友，摇杆，改名，头衔，称号，战甲，====>跨服多人副本，连服多人副本

1：摇杆初始点击范围控制（在控制范围内，点在哪就让摇杆初始位置移动到哪）
(w:550,h:400)感觉合适
2：请求队伍列表接口（连服）

/********************************************************************/
1：修改聊天选择多个物品时主界面出现的Bug
2：聊天屏蔽事件修改（暂时还是用标志变量来做吧）
3：解决跨服多人副本中的问题
4：玩家简要信息展示接口
5：优化装备穿戴
6：连服多人副本（副本列表，创建队伍消息，队伍列表消息，离开队伍消息）
7：连服多人副本UI内部代码的一些处理
8：摇杆初始点击范围控制（在控制范围内，点在哪就让摇杆初始位置移动到哪）

20170320
1：摇杆优化（一定范围内让底盘出现在点击起点）
2：连服continue

20170321
连服continue
// 1：离开队伍
// 2：加入队伍
// 3：邀请玩家

20170322
连服continue
// 1：换肤
// 2：好友申请列表处理
// 3：进入副本，退出副本
20170323
连服continue
// 1：副本中的操作处理
// 2：调一下跨服的流程
// 3：进入副本倒计时

20170324
1：优化多人副本
// 2：连服活动奖励
// 3：加入限制条件
4：处理离线聊天消息ResOfflineChatCountMessage
// 5：附近玩家处理（当前地图在线玩家）
// 6：帮会答题UI优化

本周：
// 0：摇杆优化（一定范围内让底盘出现在点击起点）
// 连服
// 1：离开队伍
// 2：加入队伍
// 3：邀请玩家
// 4：换肤
// 5：好友申请列表处理
// 6：进入副本，退出副本
// 7：副本中的操作处理
// 8：调一下跨服的流程
// 9：进入副本倒计时
// 10：优化多人副本
// 11：连服活动奖励
// 12：加入限制条件
// 13：附近玩家处理（当前地图在线玩家）
// 14：帮会答题UI优化
////////////////////
20170327
// 1：处理离线聊天消息ResOfflineChatCountMessage

20170328
优化
// 1：优化判断玩家是否在副本中的方法
// 2：修改副本中玩家组队面板（统一做到任务面板上）
// 3：聊天mgr中的shortcut使用player_mgr中的

20170329
// 1：副本组队公告

20170330
// 1：副本组队公告
// 2：优化


20170331
// 1：多人副本细节优化
// 2：聊天中的穿透和层次处理

20170401
本周：
// 1：处理离线聊天消息ResOfflineChatCountMessage
// 2：优化判断玩家是否在副本中的方法
// 3：修改副本中玩家组队面板（统一做到任务面板上）
// 4：聊天mgr中的shortcut使用player_mgr中的
// 5：跨服多人副本组队公告
// 6：连服多人副本组队公告
// 7：多人副本细节优化
// 8：聊天中的穿透和层次处理
// 9：优化跨服多人副本，从聊天中组队接口加入队伍后多人副本面板中的信息初始化优化


20170405
// 1；取消表情聊天面板中查看装备详细信息
// 2：优化摇杆的出现时机
// 3：优化以前的代码
//    1：邮件
//    2：好友
//    3：添加好友
// 4：聊天输入框位置调整

20170406
1：优化代码
	// 1：多人副本
	2：战甲
	// 3：称号，头衔，改名
// 2：聊天主界面连发多个相同装备优化（截取有误）
	
20170407
1：UI替换
	1：多人副本
	2：角色界面相关
2：优化代码


角色面板问题修改：
// 1）点击获取装备弹出来的面板 不对.
// 2）点击【改名】进入输入新名字的时候输入框大小不对
// 3）进图人物改名面板时输入框有时候会出现2个重叠的【请输入新名称】
// 4）人物改名所需消耗的道具没有TIPS  道具ID：102
// 5）打开头衔面板的时候无需提示： 你没有头衔
// 6）头衔面板晋升条件 上面的战斗力 与玩家战斗力不对应
// 7）默认是没有头衔的
// 8）头衔晋升令牌里的道具点击没有TIPS
// 9）头衔属性显示错误（与配置表不对应）！
// 10）玩家角色面板 上的战斗力不对

/**********************************************************************/
// 1；取消表情聊天面板中查看装备详细信息
// 2：优化摇杆的出现时机
// 3：优化以前的代码
//    1：邮件
//    2：好友
//    3：添加好友
// 4：聊天输入框位置调整
// 5：优化代码
// 	1：多人副本
// 	2：称号，头衔，改名
// 6：聊天主界面连发多个相同装备优化（截取有误）
// 7：UI替换
// 	1：多人副本
// 	2：角色界面相关
// 8：优化代码
// 角色面板BUG修改（彭东湖提供）：
// 1）点击获取装备弹出来的面板 不对.
// 2）点击【改名】进入输入新名字的时候输入框大小不对
// 3）进图人物改名面板时输入框有时候会出现2个重叠的【请输入新名称】
// 4）人物改名所需消耗的道具没有TIPS  道具ID：102
// 5）打开头衔面板的时候无需提示： 你没有头衔
// 6）头衔面板晋升条件 上面的战斗力 与玩家战斗力不对应
// 7）默认是没有头衔的
// 8）头衔晋升令牌里的道具点击没有TIPS
// 9）头衔属性显示错误（与配置表不对应）！
// 10）玩家角色面板 上的战斗力不对


20170410
邮件问题（彭东湖提供）：
// 1）邮件上显示的时间不正确 
// 2）点击邮件上的道具ICON 需要弹出道具对应的TIPS
// 3）邮件上的道具没有显示对应的道具数量
// 4）邮件上的道具没有显示是否是绑定道具(背包里改grid类)
// 5）没有道具奖励的邮件会  会显示 道具icon   
// 经过领取其他邮件或者选择其他有道具奖励的邮件的操作后？
// 6）全选删除邮件的时候总会剩余一封邮件


背包问题（彭东湖提供）：
1）背包格子下面溢出界面
2）主按钮 里面的字体没居中 
3）元宝 与 绑定元宝 框的 美术资源不对 
4）选中格子的效果美术资源不对，内部会多 好几个框？
5）背包格子 道具叠加数量的位置不对（与美术沟通调整）
6）绑定道具的锁的位置及大小不对（与美术沟通调整）
7）材料分类不对
    进阶材料为：道具主类型为2的
    图鉴为：道具主类型为23的
    宝石位：道具主类型为16的
    礼包为：道具主类型为4的
    装备为：道具主类型为1、31、32、33、34、35的
    技能书为：道具主类型为 13、22的
8）缺失 装备 、技能书2个标签页 
9）背包没正确显示元宝数及绑定元宝数 

20170411
战甲问题(彭东湖提供)：
// 1）点击战甲面板 没有激活的时候无需弹出提示【没有首冲没有激活战甲】这句提示
// 2）面板层级有问题，左边的背景图 盖住了 下边的面板 
// 3）淬炼材料的3个位置摆放不规范（左边格子间隔大于右边间隔）
// 4）点击淬炼材料需弹出TIPS
// 5）淬炼材料右下角需显示拥有的数量位置不对（显示红色字体数量0）
// 6）没有淬炼材料时也需显示道具的ICON

// 7）没有淬炼材料时 点击淬炼 返回提示 ：【淬炼材料不足】
// 8）当有淬炼材料，但是淬炼材料对应的使用个数已满时，返回提示：【淬炼次数已满】，
// 当成功淬炼时，返回提示：【淬炼成功】
// 9）淬炼获得的属性及战斗力也需显示在战甲属性里
// 10）当玩家没有获得战甲时，下面的文字显示为【首冲即可获得战甲，激活炫酷外显及属性】
// 11）当玩家获得战甲，但战甲不是永久的或者已经过时时，下面的文字显示为
// 【VIP3即可永久获得战甲，激活炫酷外显及属性】
// 12）当玩家永久获得战甲时，下面的文字显示为：
// 【淬炼战甲可大量提高角色属性】
// 13）当玩家战甲激活了战甲，但战甲还不是永久活着战甲已经过时的时候 才显示
// 【查看VIP】的按钮，且点击【查看VIP】按钮的时候自动打开VIP 面板


20170412
帮会答题(彭东湖提供)：
// １）活动开启时　主界面　没有活动开启的入口提示
// ２）进会帮会活动副本没有领取奖励的按钮，领取过程需要５秒的进度条
// ３）参加活动后，默认打开帮会频道
４）活动开启前３０秒，每１０秒提示一次　帮派答题竞赛活动将在ＸＸ秒后开启
５）活动开启前１０分钟，世界公告滚动栏播放公告“帮派答题竞赛活动将在１０分钟后开启”
// ６）活动结束后，领取邮件直接游戏奔溃
７）活动结束后　自动退出活动副本，并且在聊天频道提示　今日帮派答题竞赛活动已经结束

优化：
// 1：聊天滚动
// 2：帮会答题布局

20170413
邮件问题(彭东湖提供)
// 1）若邮件内容有元宝（道具ID：-1）时，显示在元宝专用栏
2）邮件附件里道具的数量的字体颜色不对（背包统一处理）
// 3）若邮件没有附件或者附件已领取的情况，【删除】按钮右移到 【领取】按钮的位置
// 4）若选中的邮件有部分满足删除条件，但有部分不满足删除条件（没阅读，含有道具）时，点击【删除】，删除满足删除条件的邮件即可（目前游戏是这样子，不是BUG）
// 5）若选中的邮件都不符合删除条件时，若有未读邮件，点击【删除】，则返回信息【邮件尚未阅读，无法删除】
// 6）若选中的邮件都不符合删除条件时，若邮件都已读，但邮件都有附件，点击【删除】，则返回信息【邮件内有未领取道具，无法删除】 ，条件5的优先级大于条件6
// 7）若没有选中邮件点击【删除】，则返回信息提示【您没选中邮件】

战甲问题(彭东湖提供)
// 1）当战甲尚未激活护着战甲已过时时，点击【淬炼】和【穿戴】返回信息提示：【请先激活战甲】
// 2）当玩家没有首充激活过战甲时，加一个按钮，按钮文字为【前往首充】，点击打开充值界面
// 3）调整下文字位置，与坐骑面板的信息位置一致，起始位置为那个框
4）道具左下角的道具数量位置不对，太偏角落了（背包统一处理）
// 5）当临时拥有战甲时，在红色框内显示 红色字体的 文字    【过期倒计时：  xx:xx:xx  】，里面显示过期倒计时间，精确到秒倒计时，若过期，则显示文字：【已过期】
// 6）点击【查看VIP】，弹出的面板不对，弹出的应该是VIP面板，而不是神机宝箱面板
7）当所有淬炼已满时，返回的信息内容修改下，为【淬炼次数均已满】（后端王斌处理）
// 8）淬炼材料增加属性，也需显示在战甲属性 和战甲战斗力上

改名问题(彭东湖提供)
// 1）点击输入前与输入后的输入框默认文字字体不一致，统一用后面的
// 2）需要道具的ICON 上显示道具数量  0/1  当数量不足时 用红色字体 0 数量足够是 绿色字体 1/1
3）点击ICON时显示的物品Tips层级不对（目前tips被改名面板遮挡了），TIPS层级应该为最上级（由前端邓思昆解决）
// 4）玩家改名后名字不会及时改变
// 5）改名成功后，自动关闭改名面板
// 6）当改名冷却的时候，点击角色面板的【改名】功能按钮， 不打开改名面板，直接返回信息提示【冷却中，XX天XX小时XX分XX秒后可再次改名】

20170414
装备升级合成成功后，提示面板错误(胥艳军提供)
// 1.显示了装备数量文本
// 2.装备部位顺序不对
// [结果][期望]
// 1.不显示数量文本
// 2.排序同初次穿戴的排序，未获得的地方留空即可

使用除武器外的合成图纸无任何反应(胥艳军提供)
// 1.使用除武器外的合成图纸升级装备时，点击使用无任何效果，图纸仍在背包中，也无反馈信息（使用武器图纸直接成功）
// [结果][期望]
// 1.只要玩家身上穿戴了装备，使用该装备下一级别的合成图纸时，应该升级成功，并给予反馈动画


20170418
优化
//[BUG]跨服多人副本组队邀请界面，点击刷新列表会切换到好友标签并提示‘你没有帮会‘
// [BUG]帮会答题（补的禅道）
// 1）进入活动场景的 这个领取奖励的 还是没有看到  ，奖励内容为 q_global 里的  1038 
// 2个问题：
// 1）只有当玩家没有首充激活过战甲时，才加【前往首充】的按钮，现在玩家已经永久激活战甲了也会显示该按钮，请隐藏
// 2）道具淬炼满后的  【MAX】 用绿色且描边字体 ，白色看不清楚
// [BUG]多人副本提示__跨服多人副本不用弹这个提示 
// [BUG]初始装备穿戴问题
// 1.目前游戏中，玩家获得初始装备时，弹出了使用装备提示面板（实际上已经穿戴了，并弹出了穿戴动画）
// [结果][期望]
// 去掉初始装备的使用提示面板

20170419

20170420
// 1：帮会答题解析文本优化
// 2：聊天主界面对齐优化
// 3：聊天修改无效聊天渠道标签资源
// 4：好友优化

20170425
// 1：好友优化
// 2：头衔消耗道具数量文本对齐方式调整
// 3：邮件列表数量调试
// 4：摇杆优化

20170427
// 1：聊天优化
// 2：多人副本邀请面板优化

20170428
// 1：多人组队副本邀请列表筛选，遍历所有队伍
// 2：主面板偏移调整
// 3：战斗模式面板


聊天富文本还有待优化





20170502
上午
优化rich_ui.js
// 1：记录所有字节数，依次排列计算富文本行数
下午
(BUG)称号相关(贾宜杰提供)
// 1.没有激活的称号时，界面需要显示“你还没有获得任何称号”
// 2.称号未获得时显示未获得标签不要显示按钮
// 3.当有称号可以激活时，需要在【称号】按钮和对应分页按钮处显示红点
// 4.满足激活条件但还未激活的称号不要显示在【已获得】分页里
// 5.称号满足激活条件，但是在原位置没有显示【激活】按钮
// 6.在背包中使用称号激活道具时，应链接至称号界面，并且选中对应分页且把该称号显示在界面中间
// 7.点击称号，需要弹出称号TIPS
8.聊天
被忽略的需求：陌生人聊天
20170503
// 9.更新所有二级界面的xml
// 10.邮件列表控件改用TableView
20170504
// 11.周松说的BUG(头衔相关)
20170505/06
1：任务
	a:任务列表
	b:主线任务
	c:日常任务
	d:帮会任务

2：禅道称号BUG
	a:称号列表排序
	b:称号滚动列表时不弹出二级界面

3：任务选中效果实现

// 20170508
// 1：获取新装备动画修改
// 2：聊天优化（间距，宽度）
// 3：帮会答题优化
// 4：头衔BUG修改
// 20170509
// 1：表情面板（背包）
// 2：表情优化（表情）
// 20170510
// 1：表情聊天
// 2：禅道处理
// 20170511
// 1：改禅道BUG（任务面板相关），新需求
// 20170512
// 1：完成新需求(获取传递玩家信息)

20170515
// 1:[BUG]已经是好友的玩家还可以继续发送好友申请
// 2:[需求]称号优化


20170516
// 1：聊天表情实现过程
// 2：聊天优化；
// 3：帮会答题优化
// 帮派答题 活动结束后需要在帮会面板内弹出以下提示
// 第一个提示：    本次答题结束，今日我帮双开辞海模式和歌神模式，共答对2题，打架明天再一起相聚吧！                       
//        PS：答对的题目数量用绿色字体，如上面的 2 使用绿色字体   #01ab25
// 第二个提示：    本次答题前三名已出现，大家快来围观这些才华突破天际的帮派吧！第一名：帮派名字；第二名：帮派名字；第三名：帮派名字     
//         PS:第一名帮派名字 使用红色字体 （#fe2323）,第二名帮会字体颜色使用橙色字体（#ffed88），第三名帮会名字使用蓝色字体（#00eefd）
// 前三名是 联服的  答题数最高的3个帮会，答题数相同则按时间先后、
// 调整下以下框住的字体颜色，颜色色值按照上面标注的
// 字体颜色不对（玩家名字及其他默认字体颜色都是不对的），且底框仅框住内容即可，不用整条框 
// 4： [BUG]移动操作弹出聊天框
// 5：聊天表情气泡优化

// 1）未选中的字体颜色不对
2)点击道具名字 不能弹出TIPS
// 3）聊天里面的道具颜色 应该是与道具的品质颜色对应的，而不是固定的紫色 
4）当玩家输入的内容过多时，点击【发送】，保留玩家输入的内容，且返回信息提示【输入的字数过多】（服务器给提示）
// 5）表情需要换行的时候，青色底框也是需要框住的
// 6）聊天框里的内容，需要完整显示，不能仅显示一半，
// 7）这两处的字体颜色应该是一致的   ，请将主界面的 调整与 聊天面板的字体颜色一致 

20170517
// 1:聊天禅道处理
// 2:[需求]主界面聊天
// 	a:聊天框显示增加底框
// 	b:聊天行距调整，可以放下3句话，效果图如下 
活动文本位置过低

20170519
// uipanel.js 修改isModelPanel类型为 0：无，1：模糊，2：黑色背景半透明

20170520
BUG修改
[BUG]聊天
// 1）发送表情的时候，底框需要根据表情的实际显示底框高度（而不是根据表情的代号如（#10005）显示高度）
// 2）主界面这里的也需要完整的显示表情的一句话而不是一段  
// 3）主界面这句话应该是要全部显示出来的   而聊天 只截取了部分显示，


20170522
1：优化
2： [需求]变强
20170524
优化
// 屏蔽回车键

20170525
// 1：好友优化
// 1）面板更新XML（应康坚调整过）
// 2）点击叹号弹出提示框
// 3) 点击叹号，或者聊天栏里的玩家头像弹出的信息提示框，界面高度需要根据内容弹性调整
//     当不是好友也不再黑名单时，列表为【查看信息】【私聊】【加为好友】【加入黑名单】
//     当是好友时，列表为【查看信息】【私聊】【加入黑名单】
//     当是黑名单时，列表为【查看信息】【加为好友】【移除黑名单】
//    操作：
//      当为好友时，点击【加入黑名单】，将玩家从好友列表删除，并且添加到黑名单
//      当在黑名单时，点击【加为好友】，将玩家从黑名单移除，并且加为好友
//      当在黑名单时，点击【移除黑名单】，且点击后，将玩家从黑名单列表移除
// 4）聊天内容过于贴近底框边沿 ，改为有个20像素的距离
// 5）消息提示的红点被遮盖了，调整下UI层级
// 6）无论是 【最近联系人 】 还是 【好友】  还是【黑名单】，里面的列表，都是优先把在线玩家显示在最上面，然后才显示离线玩家
// 7）加为好友后，先在此处加入一行文字   【你已添加XXX为好友，现在可以聊天】字体颜色为 #3a2707 
// 8)添加好友里 的搜索功能无法正常搜索到玩家
// 9）若玩家 2分钟内没有继续产生任何私聊信息，则显示上次聊天的时间
// 10）滑动聊天信息的时候，拖拉到最底部 或者 最顶部的时候，会出现短暂的白屏 ，优化下滑动
// 11）点击聊天里面的物品链接 需要弹出对应的物品TIPS
// 12）黑名单里面的玩家 不能进行私聊
// 13）添加好友里面的  换一批按钮，点击后灰暗显示即可，不用隐藏掉~~~
// 14）当点击搜索列表里面的玩家的【添加】时，或者推荐好友里面的 【+】时，两边都需要同时显示  【（已申请）】的标记（删除添加按钮）
// 若搜索的结果已经是你的好友时，隐藏【添加】按钮，显示文字【（已添加）】

20170526
// 1：好友优化
// 2：任务面板优化(多人副本)

20170527
// 1：[BUG]跨服多人FB邀请功能
// 多人副本邀请好友条件
// 2： [BUG]退出多人副本队伍后，界面没有显示已有的队伍信息
// 选中一个多人副本队伍加入，加入后再推出队伍，返回到多人副本组队界面，组队界面已有的队伍信息没有显示
// 退出队伍后，刷新多人副本队伍信息，显示出改副本已有的队伍
// 3：[BUG]多人副本关卡显示
// 未满足条件的副本应屏蔽颜色
// 4： [BUG]多人副本
// 多人副本创建队伍后，【只允许邀请的玩家加入】勾选框的勾选状态没有同步给其他队员
// 5： [BUG]跨服多人副本自动组队失败
// 6： [BUG]房间内有玩家退出房间 面板未同步信息
// 这里需及时刷新
// 7：[BUG]多人副本组队邀请问题
// 自己创建房间勾选了“”只允许邀请的玩家加入“”、
// 其他玩家依然能点击加入进入房间
// 8：[BUG]多人副本勾选自动准备后进入队伍但是没有自动准备
// 勾选【自动准备】选项
// 并没有自动准备
// 9：[BUG]打开多人副本界面显示的队伍不对
// 打开多人副本，默认选中的是90级副本，但是却看到了60副本的队伍

20170531(修改BUG)
// 1：帮会答题宝箱BUG
// EngineMgr.uiMgr.ShowPanelByType(TopicBoxExt.PanelName);
// 2：[代码错误]组队·主界面操作
// 	1）玩家点击操作按钮后，需要关闭该操作面板，并执行对应的操作\TeamTuchInfo.xml
// 	2）若当前不是跟随队长状态，则按钮文字为【跟随队长】，点击后跟随队长
// 	若当前已经是跟随队长状态了，则按钮文字改为【取消跟随】，点击后取消跟随队长
// 	3）现在有个BUG，当队长委任新队长时，原队长和即将任命的队长 会一直 不断的弹出组队面板，
// 	不用弹出组队面板，直接转让队长即可。(无法重现)
// 	4）当在副本里面的时候。队长和队员的   这两个按钮需要隐藏
// 	5）当有入队申请时，需要在此处加入红点 ，（应康坚加了），当有队员申请的时候，
// 	   队长点击队伍时 弹出的 队伍面板，默认选中【申请】标签页(张小飞处理)
// 	6）面板没正确显示，这里UI有新调整（美术资源更新），注意等级是放到小圈圈里面
// 	7)当队长点击【匹配】的时候，打开以下面板，，默认选中多人副本，选择对应的副本后，点击【挑战副本】后以当前队伍成员直接进入副本挑战！，不用再跳转到多人副本面板
// 	若有成员不满足进入条件，则返回信息【进入副本失败，您的队伍有不满足进入条件的成员】(张小飞处理)
// 3：聊天换行功能实现
// 4：[BUG]多人副本结算面板奖励展示错误[BUG]多人副本结算面板奖励展示错误
// 	目前展示的是可以获得的奖励
// 	要求是实际获得的奖励
// 5：主界面技能释放图标数据绑定及显示问题
20170601
// 态度，质量，经验，综合素质，money
// 1：禅道bug修改
// 	1：[BUG]向已经是好友的玩家申请好友的BUG
// 	2： [BUG]不能显示锁定聊天频道期间的消息
// 	3：[BUG]自己在队伍和帮会频道的发言也要靠右
// 	4： [BUG]选中的60级多人副本然后点击创建队伍，但是创建的却是120的队伍
// 	5：[BUG]多人队伍邀请信息有遮挡
// 	6：[BUG]队伍邀请信息显示/n
// 2：细节调整
// 	1：主界面邮件数量文本对齐
// 	2：多人组队副本列表被裁减
// 	3：好友列表默认选中状态调整
// 	4：邮件列表对齐及间隙调整
// 	5：其他模块对着效果图微调一遍
// 3：聊天换行功能实现
// 方法：从换行处切断分成文本小块，然后加空字符填充（优化）
20170602
// 1： [BUG]点击主界面玩家名字
// 2： [BUG]好友提示
// 3：[BUG]好友申请
// 4：邮件选着无领取按钮
// 5：[BUG]好友聊天
// 1）更新好友 XML
// 2）这一句话 不是固定显示的，会随着玩家的聊天而往上移动清除（注意调整后，整个聊天框的区域需要覆盖这句话原来的区域）
// 3）聊天记录的时间 居中显示，还有上下的间距部队，查看下效果图的  ，且背景底框的颜色为 ：#D8C8A5     字体颜色为：#853D07
// 4） 更新 这个面板的XML ，字体颜色不正确，且下图文字为   【请搜索您需要添加的好友！】
// 5) 这里 去掉 私聊 的标记，并且玩家名字颜色为 ：#853D07
// 6）多次点击 聊天里面的装备TIPS，且 有对比的装备 ，TIPS 会一直向右移动~~~~，直到消失不见！
// 7）当只有1位玩家时，显示的 区域空间不够，需要把整个玩家信息显示出来
// 8） 玩家 与标题之间的空隙，还有玩家与玩家之间的空隙 各缩短1个像素  让仇人 标签页 不会超出 以下面板
20170603
// 1：[BUG]聊天（等后端重启测试）
// 2：多人副本组队邀请好友
// 3： [BUG]聊天  2）上限为 85个字符
// 4：[BUG]战甲界面战斗力显示错误
// 5：[需求]获得可以升级的角色装备的图纸后没有自动升级
// 6：[BUG]技能冷却


20170605
// 1： [需求]聊天
// 2：多人副本倒计时时间显示消息提示：ResZoneTrackingToClientMessage
// 3： [BUG]无法取消准备
// 4： [BUG]快速组队问题
// 5：[BUG]任务列表上下滑动时不要给点击效果
// 6：[BUG]邮件列表自动复位
// 7： [BUG]淬炼材料足够时淬炼提示材料不足

20170606
// 1：[BUG]新邮件数量显示不对
// 2： [BUG]多人副本队伍显示错乱
// 3：[BUG]多人副本结算面板
// 4：[BUG]传音信息需要在屏幕中间系统公告位置播放

20170607
// 1：[BUG]任务
// 1）任务栏里需要显示获取的道具的具体数值，如果超过了1万 则显示 为XXX万~~
// 2)拾取类的任务，需要显示如图下（里面的宝箱需要根据实际情况切换，目前没有资源先统一用宝箱替代）
// 【领奖】 需要根据实际显示为   【锻造中】【占卜中】【偷听中】等等
// 过程需要给予 进度条，具体可参考帮会答题的时候 领奖的过程  
// 2： [BUG]英雄崛起副本
// 1）这个按钮打开的是 活动面板，不是 英雄崛起副本 面板
// 2）活动开启后，点击对应链接 打开英雄崛起面板
// 3）活动奖励 需要显示正确的 奖励数值（q-global 的  1045）    且点击道具 需要弹出道具的TIPS

// 4）这句话改为：    【本次活动剩余挑战次数：1】，且挑战次数只有1次···1次···

// 5）活动未开启，创建有2个提示，保留后面那个就可
// 3： [BUG]跨服多人副本
// 1）XML 调整 更新 
// 2）勾选 【满员后自动开始】  则 队伍满员且都准备的情况下 队伍 自动开始进去挑战副本 
// 3）点击后返回信息提示   【已发送寻求战友公告，请耐心等待】  若喊话冷却，则返回信息提示 【您还要XX秒才能再次发送寻求战友公告】
// 4：5307 [BUG]多人副本（曾俊辉)
// 5：5300 [BUG]跨服多人副本
// 1）更新这里的XML
// 2）更新后的XML如下图    需求等级 读取配置表   q_zone 里的 q_level 
// 3）当副本没首通过的时候 ，这里显示的文字为 【首次通关奖励：】   奖励内容读物  q_raid 里的  q_first_reward     
//    若已首次通关，则显示的文字为 【每次通关奖励：】 奖励内容读取  q_raid 里的 q_daily_reward
20170608
// 1：5307 [BUG]背包内道具上架BUG
// 在背包里对可以堆叠的道具点击上架，上架数量减少一些（不要全部上架），点击上架
// 上架成功，背包里该道具的格子显示为空，
// 实际应该还有剩余的道具，刷新才会显示出来
// 2：5217 [BUG]多人副本倒计时错乱（重复bug）
// 3： [BUG]聊天
// 发送 道具TIPS时，有部分 会重叠，有部分不会重叠，看下什么原因
// 2）资源线装备的 道具颜色不正确  
// 3： [BUG]护送
// 1）倒计时的颜色使用   #01ab25  
// 2）护送过程中 会导致 图鉴 功能按钮 无法点击
// 4：(重)面板打开卡顿问题，如跨服多人副本
// 5：背包物品为负数BUG


20170612
// 1：组队喊话文字覆盖问题
// 2：好友操作子面板闪一下优化
// 3：5365[BUG]世界boss地图是单独的场景，需要有退出按钮
// 4：[BUG]世界BOSS（复活提示）
// 5： [BUG]世界BOSS任务追踪处理

20170613
// 1： [BUG]跨服多人副本
// 2： [BUG]跨服多人副本
// 3： [BUG]充值后后端已经激活战甲且加上了属性，但是界面上点击穿戴和淬炼提示未激活
// 4：5376 [BUG]主线任务
// 主线任务等级不足时候 任务消失
// 等级不足时需提示下个任务多少级接取引导玩家挂机
// 5：5197 [BUG]组队·一键喊话
// 6：5389 [BUG]点击开服活动 弹出了一个领奖按钮
// 7：5388 [BUG]查看玩家信息面板没有显示信息
// 8：5392 [BUG]黑名单功能需求

20170614
// 1：5423 [需求]获得装备提示
// var panel=EngineMgr.uiMgr.ShowPanelByType(GuildBossMarkExt.PanelName,UIMgr.PANEL_LAYER_POP);
// panel.GetNewEquipTips(msg,panel.HideSelf);
//恭喜您获得新装备
//if (!this._newEquipCue )
//{
//	this._newEquipCue = new NewEquipCueExt();
//	this._newEquipCue.LoadPanel();
//	Mgr.uiMgr._tipsLayer.addChild(this._newEquipCue);
//	this._newEquipCue.ShowNewEquipment(msg);
//}
//else
//{
//	this._newEquipCue.ShowNewEquipment(msg);
//}
// 2：5370 [BUG]世界BOSS任务追踪处理
// 3：5438 [BUG]背包内道具右下角没有显示道具数量
// 4： 5410[需求]装备tips
// 装备tips虽然右上角有关闭按钮
// 但是需要处理为点击tips任一位置都关闭tips
// 5：5433 [BUG]任务·选中
// 1）如果选中的任务完成后，选中框会跳转到其他人物上去，如 完成了1个主线任务，选中框会跳转到 日常任务上，再完成一个主线任务，选中框会跳转到 帮会任务上 
// 调整：选中的任务 完成后，不用再给予选中框，等玩家重新选择（注意此处不影响自动任务）

20170616
1：5323 [BUG]聊天
	1）经检测 还是有几个小问题    
       1、如图所示 第一个红色框 ，右边超出面板
       2、如图所示 第二个红色框，下面超出面板
       3、如图所示 第三个红色框，下面多一行空白的区域
// 2：5482 [BUG]多人副本·组队
	// 1）图示中显示的数值 为 毫秒数值，需要转变为 秒的数值 
	// 2）多人副本发布的寻求战友公告，内容 如果超过3行的话 会出现覆盖现象  
// 3：5487 [BUG]传音资源跑偏
// 4：5488 [BUG]传音频道看不到传音的记录
// 5：5489 [BUG]在聊天频道的发言不会立即显示在对应的频道里
// 6：5491 [BUG]找聊天框发送多个道具，会显示不全
// 7：5506 [需求]自动穿戴优化
	// 1）该界面5秒后自动关闭
	// 2）在知道了后面加入 倒计时时间  如 ：  知道了(5S)   括号 使用英文的   
// 8：5480 [BUG]主界面组队		UI 错误，如下图所示
// 9：5500 [BUG]打开背包默认选中的和右侧展示的不一致
// 10：5516 [BUG]聊天框内下拉列表超屏了
// 11：5514 [BUG]退出副本后弹出提示

20170617
// 1：5528 [BUG]易容术任务激活显示优化
// 	有一个易容改成任务激活，未激活时界面上'激活所需'要显示：激活所需：完成主线任务XXXX（XXX级）
// 	第一个XXX为 任务名字	第二个XXX为 任务接取等级
// 2：5513 [BUG]英雄崛起任务追踪


20170618
// 1：5064 [BUG]怪物血条没有扣完怪物就死了

20170619
// 1：5534 [BUG]英雄崛起通关后没弹出结算面板
// 2：5571 [BUG]英雄崛起结算面板没有显示奖励内容
// 3：5502 []多人面板结算面板显示错误
// 4：5575 [BUG]英雄崛起退出房间
// 5：5576 [BUG]聊天
// 	1）聊天面板发布的  多人副本寻求战友聊天信息  超过3行的话 会溢出面板
// 6：血条相关
// 7：5579 [BUG]寻求队友
//     1）多人副本发送寻求队友公告的时候，所有其他玩家 都会收到以下信息
// 8：5525 [需求]怒气技能（客户端没有在UI上表现，暂时先写在那备用吧）
// 	Mgr.player.UpdateNuqiValue("",true);
// 	1）新增怒气技能
// 	玩家的每次攻击都会获得固定的怒气点，怒气点满时 会是触发技能效果： 使下一次攻击的伤害提高 XX% 
// 9：5631 [BUG]道具获取界面【组队副本】按钮打开的界面不对
// 	道具获取界面【组队副本】按钮打开的界面不对，显示@
// 10：5627 [需求]限时活动开始的提示界面优化
// 	删掉资源下面的文字描述，显示活动的时间段
// 11：5623 [需求]易容界面任务激活的易容隐藏掉激活按钮
// 	易容里的太子长琴是完成任务后自动激活的， 所以太子长琴的激活按钮没有用 隐藏掉，其他的不受影响



20170621
// 1：5611 [BUG]每次进如游戏都会弹出世界BOSS界面（无法重现）
// 2：5619 [需求]战斗力
// 	1）战斗力提升的时候，需要在主界面 显示 战斗力变动（注意这个是在界面最上层，不会被其他面板挡住）
// 3：5664 [建议]限时活动开启提示优化
// 4：5659 [BUG]时装功能未开启时点击按钮返回的消息不对
// 5：5661 [BUG]战甲过期后界面显示为空
// 6：5679 [BUG]角色功能组里没有可以晋升的系统还是会在角色ICON上显示红点
// 7：5624 [需求]限时活动结束时的消息改发在系统频道

20170622
// 1：5621 [需求]心魔副本 引导挂机
// 2：5371 [BUG]世界BOSS 没有做AI
// 	击杀元宝分身错误的弹出了BOSS挑战完成面板
// 3：5613 [BUG]护送时 车进了传送点后角色就停下了
// 	护送时 车进了传送点后角色就停下了，希望车进入传送点后角色也跟着进入传送点
// 4：满员自动开始加消息
// 5：5688 [BUG]太极阵里点击组队副本打开的界面不对


// 20170626
// 网络环境检测：shortcutpanelext.js  UpdateNetAndBattery();
// 1：文本新实现
// 2：战斗力动画效果
// getDisplayedColor
// label->getLetter(0)->setColor(Color3B::RED);
// var elemts = line.split(/<font color='(.*?)'>(.*?)<\/font>/);   // 按正则模板对行进行分割 


// 20170629
// 称号动画引入


// this.gossipLevel = 0; // 穿戴的太极阵等级(-1：不显示外显，完成主线任务(TaskID：10119)激活变为0)


20170703
// 1：4780 [BUG]世界BOSS
// 2：5952 [代码错误]世界BOSS界面错乱
// 3：5686 [BUG]字体颜色
// 4：5947 [BUG]易容界面显示多余的资源

20170704
// 1：		[已确认] [BUG]守卫京城活动中，BOSS怪物被杀后需要系统公告
// 2：5930 [BUG]心魔副本提示挂机

20170705
// 1：5931 [BUG]活动大厅
// 2：5937 [BUG]问鼎江湖·副本
// 3：5951 [BUG]双倍期间护送成功后结算面板上显示的奖励多了一倍
// 4：5953 [建议]护送次数完了后再次点击护送返回的消息位置需要调整
// 5：5981 [BUG]传送报错	==>传送：-> 世界BOSS -> 单人副本 -> 世界BOSS（这里就退不出去了）
// 6：5987 []世界BOSS寻路（换地图，不予解决）
// 7：5993 [BUG]目标追踪
[世界BOSS，跨服BOSS]掉落展示 ===> 掉落归属：SetBelongShow(bool)
去掉需要统一的退出接口（服务器端）




20170710
世界BOSS列表数据检测一下下
// 文本文件的高度调整
// 采集改回原来的转圈开宝箱















周方胜
18227674277
510923199010165277

许昌丽
18224496265
510113199103165624
























Profiler.Start("start---------------------------------------xixixii__0");
Profiler.Stop("stoop---------------------------------------xixixii__0");






test0000403
E:\MoDragon\xyjwork\XYJGame\res\ui
E:\MoDragon\xuanyuanjian_meishu\phone\res\ui















7:10
蜂联科技	vs	墨龙科技	D7		time	18:00-19:00    result    win
7:14
陌陌信息	vs	墨龙科技	B5		time	18:00-19:00    result    win
7:24
墨龙科技	vs	诺亚舟		D7		time	18:00-19:00
7:25
墨龙科技	vs	氢行动力	D7		time	19:00-20:00
7:27
墨龙科技	vs	当乐科技	B5		time	18:00-19:00


















{
    1,2,3,4,5,6,7,8,9,10,11,12,13,          --hei
    14,15,16,17,18,19,20,21,22,23,24,25,26, --hong
    27,28,29,30,31,32,33,34,35,36,37,38,39, --mei
    40,41,42,43,44,45,46,47,48,49,50,51,52, --fang
    53,54                                   --gui
}

CT_ERROR = 0--错误类型
CT_SINGLE = 1--单牌类型
CT_DOUBLE = 2--对牌类型
CT_THREE  = 3--三条类型
CT_SINGLE_LINE = 4--单连类型（顺子）
CT_DOUBLE_LINE = 5--对连类型（连对）
CT_THREE_LINE  = 6--三连类型（飞机）
CT_THREE_TAKE_ONE = 7--三带一单
CT_THREE_TAKE_TWO = 8--三带一对
CT_FOUR_TAKE_ONE  = 9--四带两单
CT_FOUR_TAKE_TWO  = 10--四带两对
CT_BOME_CARD      = 11--炸弹类型
CT_MISSILE_CARD   = 12--火箭类型




http://cd.zu.anjuke.com/fangyuan/1065390258?from=Filter_1









































网络爬虫（抓取电影）：http://www.techug.com/post/pornhubbot.html





































棋牌游戏创业
疼惜  11:34:21
81759779
他的QQ























使用Python，可以编写出很多东西，
如：Web应用程序，桌面应用程序，游戏。它可以作为完整的脚本解释器和开发平台。



网络爬虫是一个自动提取网页的程序





























lua之元表(metatable)

















小陶car(License plate):55us9
























一：LUA编程
1：lua继承
	1：概念：lua是一种小巧的脚本语言，作者是巴西人
	2：语法：
		1：命名规则
		2：类型与值，nil,boolean,number,string,function,table,userdata,thread(线程)
		3：表达式，算数运算符，关系运算符，逻辑运算符，字符串连接操作符
		4：语句，赋值语句，局部变量与块，if,for,范围for,repeat,function,闭包function
2：lua进阶
	1：Metatable元表，元表方法:__add,__index,__newindex...
	2：封装——类
	3：继承
	4：多态：Lua不支持函数多态，而指针的多态，由于Lua动态类型的特性，本身就能支持
3：lua教程
	1：基本语法
	2：变量
	3：数据类型
	4：运算符
	5：循环
	6：决策
	7：函数
	8：字符串
	9：数组
	10：迭代器
	11：表格
	12：模块
	13：元表
	14：协同程序
	15：文件I/O
	16：错误处理
	17：调试
	18：垃圾收集
	19：面向对象OOP
	20：Web编程
	21：数据库/MySOL操作
	22：游戏编程
	23：标准库









食谱：
1：豆瓣鲫鱼 http://www.haodou.com/recipe/1153854/
2：黑鱼 http://mt.sohu.com/20151106/n425517963.shtml
3：竹笋炒肉 http://www.xinshipu.com/zuofa/9344












好处：
1：待遇更好；
2：责任更大；
3：成长的更快；

弊端：
1：心理压力巨大；
2：学习压力更大；
3：开发工具不同带来的前期项目进度无法推进；
4：休息时间变短；
5：不能每天见到心爱的人（重）；
6：自己自由分配的时间变少

无法评估：
1：发展空间；
2：工作环境和工作氛围；
3：更高层接触的机会；
4：新朋友质量；


在目前公司的好处：
1：待遇是工作以来最好的；
2：福利是工作以来最好的；
3：压力相对较小；
4：自由分配的时间充足；
5：能够腾出学习时间；
6：公司打球，练舞；
7：可以天天跟心爱的人在一起（重）；

在目前公司的坏处：
1：项目推进迟缓；
2：没有一个骨子里让我钦佩崇拜的人；
3：技术层面上学到的东西少（相对）；














