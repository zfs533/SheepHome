

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













Lua 之C2d为单个Sprite添加触摸事件
本篇内容将实现一个仅仅在Sprite范围内触发触摸事件的效果，当触摸Sprite以外的区域时将不做任何操作，
而当触摸Sprite尺寸范围以内的区域时将Sprite的缩放比调整为1:1.2，当触发触摸事件结束时（TouchEnd），将Sprite的比例调整为1:1。
1：实例化一个Sprite.
local sp = cc.Sprite:create()
2：实例化触摸事件监听器，这里以单点触摸为例.
local listener = cc.EventListenerTouchOneByOne:create()
将吞噬属性设为true，这样设置后该Sprite下面覆盖的事件将不会生效
listener:setSwallowTouches(true)
3：注册操作事件的回调函数，根据触摸状态的不同这里有四种注册函数，分别是：
cc.Handler.EVENT_TOUCH_BEGAN      = 40//开始触摸
cc.Handler.EVENT_TOUCH_MOVED      = 41//滑动
cc.Handler.EVENT_TOUCH_ENDED      = 42//结束触摸
cc.Handler.EVENT_TOUCH_CANCELLED  = 43//取消（如滑出屏幕）
注册回调函数必须使用registerScriptHandler(callback,event)，其中第一个参数为响应事件的回调函数，第二个参数为上面列举的四个注册函数类型。
为Sprite注册回调函数
listener:registerScriptHandler(onTouchBegan,cc.Handler.EVENT_TOUCH_BEGAN)
listener:registerScriptHandler(onTouchMove,cc.Handler.EVENT_TOUCH_MOVED)	
listener:registerScriptHandler(onTouchEnded,cc.Handler.EVENT_TOUCH_ENDED)
listener:registerScriptHandler(onTouchCancelled,cc.Handler.EVENT_TOUCH_CANCELLED)
4：操作相关回调函数
function onTouchBegan(touch,event)
	//touch/event 都是userdata类型
	//touch是当前触摸点，可以通过其方法GetLocation()获取
	//touch还有一个方法GetDelta()，在滑动事件中可以获取到滑动前后两个点之间的距离
	//event可以通过方法getCurrentTarget()获取到当前用户点击的哪个对象
	//event可以通过方法getEventCode()判断当前事件处于哪个状态,其值为
	//cc.EventCode ={BEGAN = 0,MOVED = 1,ENDED = 2,CANCELLED = 3,}
	print("touch begain")
	local p = touch:getLocation()
	p = sp:convertToNodeSpace(p)//这里将坐标系转换到Sprite坐标系
	local target = event:getCurrentTarget()
	local size = target:getContentSize()
	local rect = cc.rect(0,0,size.width,size.height)//当前Sprite的有效范围
	//当触摸Sprite以外的区域时将不做任何操作
	if p.x > targetRect.width or p.x < 0 or p.y > targetRect.height or p.y < 0 then
            return false
    end
    //设置Sprite缩放比例为1:1.2
    target:setScale(1.2);
    return true
   	//注意：函数的最好必须有返回值true或者false,true表示有效，false表示无效，否则程序会异常
end

function onTouchMove(touch,event)
	//Todo
end

function onTouchEnded(touch,event)
	print("touch ended")
	//恢复Sprite缩放比例为1:1
	local target = event:getCurrentTarget()
    target:setScale(1);
end

function onTouchCancelled(touch,event)
	//Todo
end

5：最后为Sprite绑定listener事件
这里有两种方法：
其一、从Sprite自身获取事件发生器EventDispatcher
local eventDispatcher = sp:getEventDispatcher()
其二、从Director获取事件发生器EventDispatcher
local eventDispatcher = cc.Director:getInstance():getEventDispatcher()
然后实现绑定操作
eventDispatcher:addEventListenerWithSceneGraphPriority(listener,layer)


Lua 之C2d序列帧动画的两种实现方法
本篇内容主要介绍两种序列帧动画的实现方法，两者的区别仅仅在使用的帧动画资源形式上有所不同，
一个是直接使用本地的散图来实现，一个是使用打包后的整图通过spriteframecache精灵帧缓存资源实现
一：首先介绍项目中最常用的一种实现方式，使用打包后的整图实现，及上述后一种。
1：通过精灵帧缓存类SpriteFrameCache加载整图资源
cc.SpriteFrameCache:getInstance():addSpriteFrames("star/blink.plist")
2：实例化一个运行动画的精灵
local sprite = cc.Sprite:create()
3：将需要实现帧动画的精灵帧组装起来，这里要将其封装在一个table中，原因必须满足Animation类实例化的参数类型条件
local frameArr = {}
for i = 1, 3 do
	local spriteFrame = cc.SpriteFrameCache:getInstance():getSpriteFrame("blink" .. i .. ".png")//这里返回的类型为SpriteFrame
	frameArr[i] = spriteFrame
	//table.insert(frameArr,1,spriteFrame) 同frame[i] = spriteFrame效果一样
end
4：实例化Animation和Animate类对象
local animation = cc.Animation:createWithSpriteFrames(frameArr,0.2)//参数分别表示精灵帧集和播放动画的频率
local animate = cc.Animate:create(animation)
//animation与animate的区别就在于前者直接继承cc.Class而后者继承了cc.Action,Sprite使用方法runAction(action)运行动画，action必须继承自cc.Action
5：运行动画,这里为了测试方便使用了cc.RepeatForever.create(action)永久执行
sprite:runAction(cc.RepeatForever.create(animate))

二：直接使用本地零散图片来实现
1：实例化一个运行动画的精灵
local sprite = cc.Sprite:create()
2：实例化Animation类对象，并调用其方法addSpriteFrameWithFile(filepath)加载需要实现序列帧动画的本地小图
local animation = cc.Animation:create()
animation:addSpriteFrameWithFile("star/sp1.png")
animation:addSpriteFrameWithFile("star/sp2.png")
animation:addSpriteFrameWithFile("star/sp3.png")
animation:addSpriteFrameWithFile("star/sp4.png")
animation:addSpriteFrameWithFile("star/sp5.png")
//设置播放动画的频率
animation:setDelayPerUnit(0.2)
3：实例化Animate类
local animate = cc.Animate:create(animation)
4：运行动画
sprite:runAction(cc.RepeatForever.create(animate))





Lua 之C2d类创建的方法

/***************************************************/

local FruitItem = class("FruitItem")

function FruitItem:ctor(x,y,index,parent)
    print(x,y,index)
    local sprite = cc.Sprite:create("HelloWorld.png")
    sprite:setPosition(x,y)
--    cc.Director:getInstance():getRunningScene():addChild(sprite) 
    parent:addChild(sprite,1)  
end

return FruitItem

/***************************************************/

local FruitItem = class("FruitItem",function(x,y,index)
    index = fruitIndex or math.round(math.random()*1000)%8 + 1
    local sprite = cc.Sprite:create("res/HelloWorld.png")
    sprite:setPosition(x,y)
    return sprite;
end)

function FruitItem:ctor()
end
return FruitItem

























乱花渐欲迷人眼 浅草才能没马蹄

总分总













