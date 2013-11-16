var fs = require('fs');
var util = require('util');
var path = require('path');
var config =require('./config');
var net = require('net');
var poll_interval = config.poll_interval;
var ingnorePaths = config.ingnorePaths;
var project = config.project;
var extensions = config.extensions;

var extensions = extensions.replace(/,/g, "|");
var fileExtensionPattern = new RegExp("^.*\.(" + extensions + ")$");
function run(oldStat,newStat,filename){
	if( newStat.mtime.getTime() !== oldStat.mtime.getTime())	
	{
		console.log("Change file is: "+filename);
		//hot(filename);
	}
}

function createFunction(pathname)
{
	eval('var fun=function(oldStat,newStat){if( newStat.mtime.getTime() !== oldStat.mtime.getTime()){run(oldStat,newStat,"'+pathname+'")}}');
	return fun;
}


function watch(pathname)
{	
	fs.watchFile(pathname,{persistent:true,interval:poll_interval},createFunction(pathname));
}

function findAllWatchFiles(dir,callback) {
	dir = path.resolve(dir)
	if(ingnorePaths[dir])
		return
	fs.stat(dir,function(err,stats){
		if(err){
			util.error('Error retrieviing stats for file :'+ dir);
		}else{
			if(stats.isDirectory()){
				fs.readdir(dir,function(err,fileNames){
					if(err){
						util.error('Error reading path: '+ dir);
					}
					else{
						for(var i=0;i<fileNames.length;++i){
							var filename = fileNames[i];
							findAllWatchFiles(path.join(dir,filename),callback)
						}
					}
				});
			}else{
				if(dir.match(fileExtensionPattern)){
					callback(dir);
				}
			}
		}
	})
}

findAllWatchFiles(project,watch)



