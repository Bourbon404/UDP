//
//  RequestPlugin.m
//  tudi
//
//  Created by 郑伟 on 14-7-17.
//
//

#import "RequestPlugin.h"

@implementation RequestPlugin
@synthesize callbackID;
@synthesize requestItemsDic,responseItemsDic;
-(void)share:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    
    // 这是classid,在下面的PluginResult进行数据的返回时,将会用到它
    self.callbackID = [arguments pop];

    //解析收到的json数据
    requestItemsDic = [options objectForKey:@"requestItems"];
    //保存数据
    [self saveData:options];
    
    NSMutableData *sendData = [DataHelper chansForDataWithDic:requestItemsDic];
    Helper *helper = [Helper sharedSocket];
    [helper setDelegate:self];
    if (sendData.length != 0)
    {
        NSLog(@"需要发送的json数据:%@",options);
        NSLog(@"发送数据Normal内容:%@",sendData);
        [helper sendMessage:sendData timeOut:-1 tag:kNormal];
    }
}
//存储数据
-(void)saveData:(NSMutableDictionary *)options
{
    NSDictionary *tmp  = [options objectForKey:@"responseItems"];
    [[NSUserDefaults standardUserDefaults] setObject:tmp forKey:@"dict"];
    //处理是否为多次接受
    if ([options objectForKey:@"flag"] != nil)
    {
        //解析收到的json数据
        
        NSString *offset = [options objectForKey:@"offset"];
        [[NSUserDefaults standardUserDefaults] setObject:@"1" forKey:@"flag"];
        [[NSUserDefaults standardUserDefaults] setObject:offset forKey:@"offset"];
    }
    else
    {
        //解析收到的json数据
        [[NSUserDefaults standardUserDefaults] setObject:@"0" forKey:@"flag"];
        [[NSUserDefaults standardUserDefaults] setObject:@"0" forKey:@"offset"];
        
    }
    [[NSUserDefaults standardUserDefaults] synchronize];
}
#pragma mark HelperDelegate
//收到消息
-(void)receivedDataFromServer:(NSData *)data
{
    NSDictionary *dict = [[NSUserDefaults standardUserDefaults] objectForKey:@"dict"];
    NSDictionary *returnDict = [NSDictionary dictionaryWithDictionary:[DataHelper dictFromData:data andDict:dict]];
    NSLog(@"%@",returnDict);
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:returnDict options:NSJSONWritingPrettyPrinted error:nil];
    
    NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    
    //返回给html5
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:jsonString];

    NSString *offset = [[NSUserDefaults standardUserDefaults] objectForKey:@"flag"];
    if ([offset isEqualToString:@"1"])
    {
        [pluginResult setKeepCallbackAsBool:YES];
    }

    [self writeJavascript:[pluginResult toSuccessCallbackString:self.callbackID]];
}
//收到错误信息
-(void)receivedErrorMessage:(NSString *)message
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString: message];
    [self writeJavascript: [pluginResult toErrorCallbackString:self.callbackID]];
}

@end
