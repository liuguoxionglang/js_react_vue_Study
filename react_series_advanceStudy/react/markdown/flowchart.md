## 操作块(格式为:变量=>操作块: 备注名)
st=> start: 开始
e=>end: 结束
#普通操作块 opration
op1=>opration: 第一个操作块
op2=>opration: 第二个操作块
#判断块 condition
cond1=>condition: 第一个判断
cond2=>condition: 第二个判断
  
#输入输出块 inputoutput[平行四边形]
io1=>inputoutput: 输入输出块1
io2=>inputoutput: 输入输出块2
#子任务块
sub1=>subroutine: 子任务1
sub2=>subroutine: 子任务2
  
## 判断和位置控制
#判断流程控制
cond1(yes)->op1  #yes 的时候回到 op1
cond1(no)->e   #no 的时候 去结束
  
#位置指定
cond1(no)->op2(right)->op1 #控制 op2 位置置于右边，再由op2 返回 op1 (好像不能向左)
#还可以这样 cond1(no,right)
cond1(yes)->e 
  
## 流程控制
#分着写
st->op1
op1->e
  
#合着写
st->op1->e
  
#判断也是一样：
st->cond
cond(yes)->io
cond(no)->op1

```flow
start=>start: 开始
loginInfo=>inputoutput: 登录数据
verifyLogin=>subroutine: 登录验证
isSuccess=>condition: 验证成功？
respondSuccess=>operation: 响应成功
responseFailure=>operation: 响应失败
end=>end: 结束

start->loginInfo->verifyLogin->isSuccess
isSuccess(yes)->respondSuccess->end
isSuccess(no)->responseFailure->end

start@>loginInfo({"stroke":"Red"})@>verifyLogin({"stroke":"Red"})@>isSuccess({"stroke":"Red"})@>respondSuccess({"stroke":"Red"})@>end({"stroke":"Red","stroke-width":6,"arrow-end":"classic-wide-long"})
```