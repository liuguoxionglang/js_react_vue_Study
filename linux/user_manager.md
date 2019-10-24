# 用户权限管理
> 多用户多任务的操作系统，针对文件，对不同用户分配不同的操作权限
## 用户类型
    管理员用户：root 只有一个
    普通用户：系统用户/程序用户   为了让某一应用正常运行，如mysql用户，但是这种用户通常不让登陆使用


## 用户相关的文件：
1. /etc/passwd 用户信息  
    文件内容    root:x:0:0:root:/root:/bin/bash
    内容格式    用户名：密码占位符：userId:用户基本组id:用户的描述说明:用户的家目录：shell
    用户组：基本组和附加组，基本组只能有一个，附加组可以有多个

    linux内容执行用户输入的指令，中间需要shell脚本的翻译
    kernel<-------shell----->ls/vim/cd
    bash,sbin\nologin 为shell中的两种
2. /etc/shadow 用户密码信息
    文件内容  root:$1$paS2FSQa$rMa4VVYX.7sAm90oel6ig/:18169:0:99999:7:::
    内容格式  用户名：密码：密码最长使用时间（99999）: 密码过期警告信息(7)
                    $1...md5加密算法
                    $6...sha加密算法
## 创建用户
1. useradd [option] 用户名
2. 选项
    -u  指定用户id 如：useradd -u 1999 user2
    -g  指定用户的基本组id
    -G  指定用户的附加组id
    -s 指定用户shell名称
    -M 不创建加目录
    -r 创建一个系统用户 用户id在1000之类，没有加目录
    -d 指定用户的家目录
    ```javascript
     如：
            [root@localhost ~]# groupadd caiwu
            [root@localhost ~]# useradd -g user1 -G caiwu user3
            [root@localhost ~]# id user3
            uid=502(user3) gid=501(user1) groups=501(user1),502(caiwu)
    如： useradd -d /temp/hadoop hadoop 
        getenforce  setenforce 0  在系统文件中修改/etc/sysconfig/selinux
    ```
       
## 切换用户
1. su 用户名  此时用户切换了，但部分权限还未变，
2. su - 用户名  建议使用此方法切换

## 查看用户id
1. id [option] 用户名 
     如：id user1  返回 uid=501(user1) gid=501(user1) groups=501(user1)
2. 选项：
    -u 只显示用户id
    -g 显示用户基本组id
    -G 显示用户附加组id
    -u -n 显示用户名
    -g -n 显示用户基本组名
    -G -n 显示用户附加组名
## 设置用户密码
1. passwd [option] 用户名
    如：
     passwd   修改当前用户
     passwd 用户名  给指定用户修改密码   系统管理员给任何用户可以修改密码

2. 选项：
    -S   显示用户密码状态
    -l   密码被锁定  
    -u   解锁用户密码 
    -e   强制密码过期
    ```javascript
        [root@localhost bin]# passwd -S user1
        user1 PS 2019-10-09 0 99999 7 -1 (密码已设置，使用 SHA512 算法。)
        [root@localhost bin]# passwd -l user1
        锁定用户 user1 的密码 。
        passwd: 操作成功
        [root@localhost bin]# passwd -S user1
        user1 LK 2019-10-09 0 99999 7 -1 (密码已被锁定。)
        [root@localhost bin]# passwd -u user1
        解锁用户 user1 的密码。
        passwd: 操作成功
        [root@localhost bin]# passwd -e user1
        正在终止用户 user1 的密码。
        passwd: 操作成功
    ```
   

## 修改用户信息
1. usermod [option] 用户名
2. 选项：
    -u  修改用户的id
    -g  修改用户的基本组id
    -G  修改用户的附加组id  usermod -G shichang user3
    -S  修改用户的shell名称
    同一个用户加入多个用户组 usermod -aG caicu user3
## 删除用户
1. userdel [option] 用户名 
2. 选项：
    -r   同时删除用户的主目录   
## 创建用户组
1. groupadd  用户组名称
## 删除用户组
1. groupdel 用户组名称
## 从一个用户组中剔除用户
1. gpasswd [option]  用户组   
    如： gpasswd -d user shichang 从用户组shichang中剔除用户user




 
 