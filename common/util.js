export default {
	//客户端检测升级（热更新）
	update(){
		// #ifdef APP-PLUS  
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
		    uni.request({  
		        url: 'http://www.example.com/update/',  
		        data: {  
		            version: widgetInfo.version,  
		            name: widgetInfo.name  
		        },  
		        success: (result) => {  
		            var data = result.data;  
		            if (data.update && data.wgtUrl) {  
		                uni.downloadFile({  
		                    url: data.wgtUrl,  
		                    success: (downloadResult) => {  
		                        if (downloadResult.statusCode === 200) {  
		                            plus.runtime.install(downloadResult.tempFilePath, {  
		                                force: false  
		                            }, function() {  
		                                console.log('install success...');  
		                                plus.runtime.restart();  
		                            }, function(e) {  
		                                console.error('install fail...');  
		                            });  
		                        }  
		                    }  
		                });  
		            }  
		        }  
		    });  
		});  
		// #endif
	},
	onNetwork(){
		let func = (res) => {
				if(res.networkType === 'none') {
					uni.showToast({
						title: "当前处于断网状态，请连接网络",
						icon: "none",
						duration: 3000
					})
				}
		    }
		uni.getNetworkType({
		    success: func
		});
		uni.onNetworkStatusChange(func);
	}
}