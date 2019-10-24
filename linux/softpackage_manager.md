# 软件包管理
windows上：
    .exe,.msi
centos/rhel/fedora
    二进制格式的软件(.rpm)(redhat package management)：自己选择不了安装的路径和内容，
    
    源码软件：（*.tar.gz,*.tar.bz2） 此种软件可以选择安装目录，和选择安装的内容


    rpm软件：
        光盘iso镜像文件
        互联网下载 ：pkgs.org网站 rpmfind.net网站
        zabbix软件
    挂载光盘到一个空文件夹
         mount /dev/sr0  /myisod/
         mount /dev/cdrom  /myisod/  软连接  指向sr0

    rpm软件名称的组成
        tomcat6-lib-6.0.24-80.el6.i686.rpm
        tomcat6-lib：软件名 
        6.0.24-80：软件版本 
        el6.i686：系统运行平台  
     umount /dev/sr0    拔出光盘，
## 管理rpm软件
- 查询软件
    1. 查询软件是否安装
        rpm -q 软件名   软件名必须完全相同
        rpm -qa 查询所有已经安装的软件
        rpm -qa | grep vim   因此同过滤配合使用
    2. 查软件的说明信息
        rpm -qi 软件名
        如： rpm -qi bash
    3. 查看软件生成的文件
        rpm -ql 软件名
        如： rpm -ql bash | less
    4. 查看文件由哪个软件生成
        rpm -qf 文件名 
        如：   
        [root@localhost /]# which chmod
        /bin/chmod
        [root@localhost /]# rpm -qf /bin/chmod
        coreutils-8.22-24.el7.x86_64
    5. 查看软件的配置文件
        rpm -qc 软件名          
- 安装软件
    rpm -ivh 软件安装包名 
    i----install
    v----显示安装详细信息verbose
    h----显示安装进度
  如：安装vsftpd dhcp ntfs-3g lftp 
   [root@localhost /]# mount /dev/sr0 /myisod/
    mount: block device /dev/sr0 is write-protected, mounting read-only
    [root@localhost /]# rpm -ivh /myisod/Packages/vsftpd-2.2.2-12.el6_5.1.i686.rpm
    Preparing...                ########################################### [100%]
    1:vsftpd                 ########################################### [100%]


