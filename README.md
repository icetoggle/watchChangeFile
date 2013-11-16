watchChangeFile
===============

一个监控文件修改的程序。

===============
config.js:
`
{
	project:"/Users/ice/Documents/workspace/",  //监控文件夹
	poll_interval:1000,                         
	extensions:".lua",                          //监控文件的后缀
	ingnorePaths:{
	    "/Users/ice/Documents/workspace/server/server_ex/backup":true  //忽略的目录
	},
}
`


