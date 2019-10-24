# 文件目录权限管理
常规权限：
    r 读取read    用数字表示 4
    w 写入write   用数字表示 2
    x 执行execute 用数字表示 1

文件：
    r 查看文件内容（cat/more/less/head/tail/grep）
    w 编辑文件内容（vim）可以wq
    x shell/python脚本
目录 ：
    r 查看目录下的文件（ls/tmp）
    w 可以修改目录下的文件(新建，删除，移动) 
    x 切换目录（可以使用cd 切换到此目录）


## 查看目录权限    
1. 文件的权限   ls -l xx 
```javascript
    -rw-r--r--. 1 root root 805 Sep 30 09:25 /etc/fstab
    其中 rw-r--r--  每三个字符为一组，共3组 
    属主用户的权限/属组权限/其他用户对文件的权限 
```
        
2. 目录的权限   ls -ld xx
```javascript
    drwxr-xr-x. 102 root root 12288 Oct  9 07:35 /etc/
    其中 rwxr-xr-x 每三个字符为一组，共3组 
    属主用户的权限/属组权限/其他用户对文件的权限 
```
## 设置文件目录权限
### chmod
1. chmod {augo} {+-=} {rwx} 文件名称 
    a   all 所有的权限
    u   只改属主用户的权限
    g   只改属组用户的权限
    0   其他
    + 添加一个权限
    - 去掉一个权限
    = 覆盖原来权限
    r w x权限类型
    ```javascript
        如：chmod a+x /tmp/1.txt   给所有用户针对此文件添加一个x权限
        chmod g-x,o+r /tmp/1.txt  多个权限操作一起执行

        -rw-r--r--. 1 root root 0 Oct  9 08:22 1.txt
        -rw-r--r--. 1 root root 0 Oct  9 08:22 2.txt
        -rw-r--r--. 1 root root 0 Oct  9 08:22 3.txt
        -rw-r--r--. 1 root root 0 Oct  9 08:22 4.txt
        -rw-r--r--. 1 root root 0 Oct  9 08:22 5.txt
        [root@localhost ~]# chmod a+x /test/1.txt
        [root@localhost ~]# ls -l /test/
        total 0
        -rwxr-xr-x. 1 root root 0 Oct  9 08:22 1.txt
        -rw-r--r--. 1 root root 0 Oct  9 08:22 2.txt
        -rw-r--r--. 1 root root 0 Oct  9 08:22 3.txt
        -rw-r--r--. 1 root root 0 Oct  9 08:22 4.txt
        -rw-r--r--. 1 root root 0 Oct  9 08:22 5.txt
        [root@localhost ~]# chmod g-r,o-r /test/2.txt
        [root@localhost ~]# ls -l /test/2.txt
        -rw-------. 1 root root 0 Oct  9 08:22 /test/2.txt

        [root@localhost ~]# chmod g=rw /test/3.txt
        [root@localhost ~]# ls -ls /test/3.txt
        0 -rw-rw-r--. 1 root root 0 Oct  9 08:22 /test/3.txt

    ```
    
2. chmod nnn 文件名称  三个权限用数字表示 
```javascript
    如 chmod 600 /test/1.txt  相当于  chmod u=rw,g=,o= /test/1.txt
``` 

### chown 修改文件目录的属主，属组
> chown 用户名称.用户组名称   文件目录名
    ```javascript
    如：chown user2.caiwu /test/1.txt
        chown user2 /test/2.txt
        仅修改属组
        chgrp 用户组名称  文件目录名
    ```
    

    通常是chmod chown chgrp 结合使用，设置用户对文件的全向问题    
### facl
- facl------文件访问控制列表
    可针对单个用户，单个用户组设置权限，不影响其他设置的全向
    针对单个用户设置权限：setfacl -m u:用户名：权限 文件名称
    针对单个用户组设置权限：setfacl -m g:用户组名：权限  文件名称
    查询权限：getfacl 文件名
    以上方法混合使用设置文件权限：
    ```javascript
        [root@localhost ~]# setfacl -m u:user4:r /test/3.txt
        [root@localhost ~]# getfacl /test/3.txt
        getfacl: Removing leading '/' from absolute path names
        # file: test/3.txt
        # owner: user1
        # group: user3
        user::rw-
        user:user4:r--
        group::rwx
        mask::rwx
        other::r-x
    ```   
    
1. 删除facl权限
    针对单个用户删除权限 setfacl -x u:用户名 文件名     删除所有权限
    针对单个用户组删除权限 setfacl -x g:用户组名 文件名  删除所有权限 

    通过facl设置的权限比通过chmod设置的权限高，不是两种方式设置的权限的交集
### 特殊权限
>  以下三个权限，也可以用数字表示（suid---4,sgid---2,sticky bit---1）如 chmod 6666 文件名，此处第一个6表示了特殊权限
1. suid 
    脚本或命令有此权限时，普通用户在执行此命令时，普通用户临时获得此命令脚本的属主权限
    如:普通用户可以修改自己的密码， 但是普通用户没有对文件/etc/passwd文件的任何操作权
    ```javascript
    [root@localhost /]# which passwd
    /usr/bin/passwd
    [root@localhost /]# ls -l /usr/bin/passwd
    -rwsr-xr-x. 1 root root 25980 Feb 22  2012 /usr/bin/passwd
    ```
    设置suid权限（通常不建议使用）： 
        chmod u+s 文件名称
2. sgid
    设置sgid权限：chmod g+s  文件名称
    针对目录设置权限，目录拥有此权限时，再次在此目录下新建的文件，继承目录的属组权限

    如：在给目录/sgiddir/添加sgid权限前后，创建的文件的数组权限不同
    ```javascript
        [root@localhost /]# mkdir /sgiddir/
        [root@localhost /]# ls -ldh /sgiddir/
        drwxr-xr-x. 2 root root 4.0K Oct 10 03:36 /sgiddir/
        [root@localhost /]# chgrp caiwu /sgiddir/
        [root@localhost /]# ls -ldh /sgiddir/
        drwxr-xr-x. 2 root caiwu 4.0K Oct 10 03:36 /sgiddir/
        [root@localhost /]# touch /sgiddir/1.txt
        [root@localhost /]# ls -l /sgiddir/1.txt
        -rw-r--r--. 1 root root 0 Oct 10 03:38 /sgiddir/1.txt
        [root@localhost /]# chmod g+s /sgiddir/
        [root@localhost /]# ls -ldh /sgiddir/
        drwxr-sr-x. 2 root caiwu 4.0K Oct 10 03:38 /sgiddir/
        [root@localhost /]# touch /sgiddir/2.txt
        [root@localhost /]# ls -l /sgiddir/
        total 0
        -rw-r--r--. 1 root root  0 Oct 10 03:38 1.txt
        -rw-r--r--. 1 root caiwu 0 Oct 10 03:40 2.txt
    ```
    

3. sticky bit
    针对目录设置，目录拥有此权限时，此目录下面的文件，只有目录的属主用户，文件的属主用户，管理员可以删除，其他用户都不可以删除
    用于此目录的权限：
    ```javascript
        [root@localhost /]# ls -ldh /tmp/
        drwxrwxrwt. 17 root root 4.0K Oct 10 03:40 /tmp/

    ```
    设置此权限的方法：chmod 0+t 文件名称

    例1：用下面创建的文件，虽然两个用户不能互相删除，但也不能互相编辑修改，若要互相编辑，则需要给文件的其他用户添加w权限
    ```javascript
    1.在root用户下创建stickybit目录 ，并给此目录的其他权限添加w权限，方便其他用户在此目录下创建文件
        [root@localhost ~]# mkdir /stickybit
        [root@localhost /]# ls -ldh /stickybit/
        drwxr-xr-x. 2 root root 6 10月 10 10:52 /stickybit/
        [root@localhost /]# chmod o+w /stickybit/
        [root@localhost /]# ls -ldh /stickybit/
        drwxr-xrwx. 2 root root 6 10月 10 10:52 /stickybit/

    2.切换到tom用户，并在/stickybit/目录下创建一个1.txt的文件
        [root@localhost /]# su - tom
        上一次登录：四 10月 10 10:53:17 CST 2019pts/0 上
        [tom@localhost ~]$ touch /stickybit/1.txt
        [tom@localhost ~]$ ls -l /stickybit/用量 0
        总
        -rw-rw-r--. 1 tom tom 0 10月 10 10:54 1.txt

    3.切换到user1用户，并在/stickybit/目录下创建一个2.txt的文件
        [tom@localhost ~]$ su - user1
        密码：
        上一次登录：四 10月 10 09:30:15 CST 2019pts/0 上
        [user1@localhost ~]$ touch /stickybit/2.txt
        [user1@localhost ~]$ ls -l /stickybit/
        总用量 0
        -rw-rw-r--. 1 tom   tom   0 10月 10 10:54 1.txt
        -rw-rw-r--. 1 user1 user1 0 10月 10 10:55 2.txt

    4.在user1用户下，删除1.txt文件，删除成功，此处有危险，删除了别人创建的文件
        [user1@localhost ~]$ rm -rf /stickybit/1.txt
        [user1@localhost ~]$ ls -l /stickybit/
        总用量 0
        -rw-rw-r--. 1 user1 user1 0 10月 10 10:55 2.txt

    5.为避免上述情况发生，切换到root用户，并给目录/stickybit/添加一个sticky bit权限
        [user1@localhost ~]$ su - root
        密码：：
        上一次登录：四 10月 10 10:27:39 CST 2019pts/0 上
        [root@localhost ~]# chmod o+t /stickybit/

    6.然后切换到tom用户，在目录下面创建一个3.txt的文件
        [root@localhost ~]# su - tom
        上一次登录：四 10月 10 10:56:45 CST 2019pts/0 上
        [tom@localhost ~]$ touch /stickybit/3.txt
        [tom@localhost ~]$ ls -l /stickybit/
        总用量 0
        -rw-rw-r--. 1 user1 user1 0 10月 10 10:55 2.txt
        -rw-rw-r--. 1 tom   tom   0 10月 10 10:57 3.txt

    7.切换到user1用户下，删除tom用户创建3.txt文件，删除失败，不允许删除
        [tom@localhost ~]$ su - user1
        密码：
        上一次登录：四 10月 10 10:55:23 CST 2019pts/0 上
        [user1@localhost ~]$ ls -l /stickybit/
        总用量 0
        -rw-rw-r--. 1 user1 user1 0 10月 10 10:55 2.txt
        -rw-rw-r--. 1 tom   tom   0 10月 10 10:57 3.txt
        [user1@localhost ~]$ rm -rf /stickybit/3.txt
        rm: 无法删除"/stickybit/3.txt": 不允许的操作
    ``` 
    例2：创建一个工程目录，三个用户,用户jl对该目录拥有所有权限，用户usertom跟用户usertom，只能在该目录下创建并互相查看编辑文件，但是不能删除对方创建的文件，
    ```javascript
    1.创建目录 并创建三个用户
        [root@localhost ~]# mkdir /project
        [root@localhost ~]# useradd jl
        [root@localhost ~]# useradd usertom
        [root@localhost ~]# useradd usermike

    2.将目录的属主修改为jl用户，属主权限为rwx
        [root@localhost ~]# chown jl /project/
        [root@localhost ~]# ls -ldh /project/
        drwxr-xr-x. 2 jl root 6 10月 10 11:24 /project/

    3.将用户usertom 和用户usermike添加到用户组jl
        [root@localhost ~]# usermod -G jl usertom
        [root@localhost ~]# usermod -G jl usermike

    4.修改目录的属组为jl,并给属组添加w权限，
        [root@localhost ~]# chgrp jl /project/
        [root@localhost ~]# chmod g+w /project/
        [root@localhost ~]# ls -ldh /project/
        drwxrwxr-x. 2 jl jl 6 10月 10 11:24 /project/

    5.给目录添加sgid权限，保证在此目录下创建的文件继承目录的属组权限，两个用户创建的文件都继承了属组jl对应的权限rw
        [root@localhost ~]# chmod g+s /project/

    6.给目录添加sticky bit权限，保证此目录下的文件只有文件的属主，目录的属主，和管理员可以删除，即不能互相删除
        [root@localhost ~]# chmod o+t /project/
        [root@localhost ~]# ls -ldh /project/
        drwxrwsr-t. 2 jl jl 6 10月 10 11:24 /project/
    ```
        
### chmod chown chgrp setfacl  
> 共同选项  -R 递归修改
```javascript
    如：chown -R user.caicu /sh/
    chmod -R 777 /sh/
``` 
    
## 用户环境配置文件
> 创建用户时，系统会将/etc/skel/ 下面的文件拷贝一份到用户的家目录，主要是bash_logout,bash_profile,bashrc三个文件，是一些脚本，家目录中的脚本文件值对当前登录的用户其作用，要使全部用户都其作用，则需要在/etc/.bashrc
```javascript
    ls -a /etc/skel/
    .  ..  .bash_logout  .bash_profile  .bashrc  .mozilla

    [root@localhost ~]# ls -a /home/user1/
    .  ..  .bash_history  .bash_logout  .bash_profile  .bashrc  .cache  .config  .mozilla  .Xauthority

```
1. \.bashrc
> 此文件中的脚本会在 打开一个终端时执行， 
2. \.bash_profile
> 此文件中的脚本会在 用户登录系统时执行
3. \.bash_logout
>  此文件中的脚本会在 用户退出系统时执行，如执行exit命令时执行此脚本文件 

### 设置命令别名
    alias 命令别名="命令"  如果直接在终端执行此命令后，创建的别名在系统重启后就会失效
    如 alias ipshow="cat /etc/sysconfig/network-scripts/ifcfg-eth0"
    因此可以在用户的家目录的.bashrc  或者/etc/.bashrc中添加此命令
    

