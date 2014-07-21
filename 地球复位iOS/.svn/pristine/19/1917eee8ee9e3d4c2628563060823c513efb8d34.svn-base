//
//  Helper.m
//  iOS_Tudi
//
//  Created by 郑伟 on 14-7-15.
//  Copyright (c) 2014年 郑伟. All rights reserved.
//

#import "Helper.h"
static Helper *helper;
@implementation Helper
@synthesize totalArray;
@synthesize myTimer;

+(Helper *)sharedSocket
{
    if (helper == nil)
    {
        helper = [[Helper alloc] init];
        [helper connectToHost];
    }
    return helper;
}

-(void)connectToHost
{
    _socket = [[GCDAsyncUdpSocket alloc] initWithDelegate:self delegateQueue:dispatch_get_main_queue()];
    NSError *error = nil;
    if (![_socket bindToPort:kSERVER_PORT error:&error])
    {
        NSLog(@"Error binding :%@",error);
    }
    if (![_socket connectToHost:kSERVER_URL onPort:kSERVER_PORT error:&error])
    {
        NSLog(@"connect error:%@",error);
    }
    if (![_socket beginReceiving:&error])
    {
        NSLog(@"Error receiving:%@",error);
    }
    //消息中心接受发送失败时的调用
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendMessageFail:) name:@"fail" object:nil];
}
//发送数据
-(void)sendMessage:(NSData *)data timeOut:(NSTimeInterval )timeout tag:(int)tag
{
    if (totalArray == nil)
    {
        totalArray = [[NSMutableArray alloc] initWithCapacity:0];
    }
    [totalArray addObject:data];
    
    if (totalArray.count == 1)
    {
        NSData *sendData = [totalArray firstObject];
        NSLog(@"%@",data);
        if (sendData != nil)
        {
           [_socket sendData:data withTimeout:-1 tag:1];
        }
    }
    //创建timer
    myTimer = [NSTimer scheduledTimerWithTimeInterval:15.0f target:self selector:@selector(didNotSendMessage) userInfo:nil repeats:NO];
}
#pragma GCDUDPSocket Delegate
-(void)udpSocket:(GCDAsyncUdpSocket *)sock didConnectToAddress:(NSData *)address
{
    NSLog(@"链接上服务器");
}
-(void)udpSocket:(GCDAsyncUdpSocket *)sock didNotConnect:(NSError *)error
{
    NSLog(@"没有链接上服务器");
    if (self.delegate != nil)
    {
        [self.delegate receivedErrorMessage:@"链接服务器失败,请重试"];
    }
}
-(void)udpSocket:(GCDAsyncUdpSocket *)sock didNotSendDataWithTag:(long)tag dueToError:(NSError *)error
{
    NSLog(@"发送数据失败");
    if (self.delegate != nil)
    {
        [self.delegate receivedErrorMessage:@"信息发送失败,请重试"];
    }
}
-(void)udpSocket:(GCDAsyncUdpSocket *)sock didReceiveData:(NSData *)data fromAddress:(NSData *)address withFilterContext:(id)filterContext
{
    NSLog(@"从哪里接收到数据:%@",data);

    //获取分次接收的位置和标识
    NSString *flag = [[NSUserDefaults standardUserDefaults] objectForKey:@"flag"];
    NSString *offset = [[NSUserDefaults standardUserDefaults] objectForKey:@"offset"];
    int dataNum = 1;
    int currtNum = 0;
    //判断是否为推送消息
    NSRange isReqRange = NSMakeRange(7, 1);
    NSData *isReqData = [data subdataWithRange:isReqRange];
    int isReq = [DataHelper byteToInt:isReqData];
    
    
    if ([flag isEqualToString:@"1"] && isReq == 0)
    {
        NSRange subRange = NSMakeRange([offset intValue], 2);
        NSData *lengthData = [data subdataWithRange:subRange];
        NSRange currentRange = NSMakeRange([offset intValue] + 2, 2);
        NSData *currentData = [data subdataWithRange:currentRange];
        
        dataNum = [DataHelper byteToInt:lengthData];
        currtNum = [DataHelper byteToInt:currentData];
    }
    

    NSRange lengthRange = NSMakeRange(10, 2);
    NSData *lengthData = [data subdataWithRange:lengthRange];
    //获取长度
    NSString *length = [NSString hexStringFromByte:lengthData];
    length = [NSString stringFromHexString:length];
    
    if (data.length == [length intValue])
    {
        if (self.delegate != nil)
        {
            [self.delegate receivedDataFromServer:data];
        }
    }
    //接受到消息然后定时器取消
    //取消定时器
    [myTimer invalidate];
    myTimer = nil;
    
    //收到数据后发送下一条数据
    if (dataNum == currtNum + 1)
    {
        if (totalArray.count != 0)
        {
            NSMutableArray *tmpArray = [NSMutableArray arrayWithArray:totalArray];
            [tmpArray removeObjectAtIndex:0];
            if (tmpArray.count > 0)
            {
                NSData *data = [tmpArray firstObject];
                if (data != nil)
                {
                    [_socket sendData:data withTimeout:-1 tag:1];
                    //创建timer
                    myTimer = [NSTimer scheduledTimerWithTimeInterval:15.0f target:self selector:@selector(didNotSendMessage) userInfo:nil repeats:NO];
                }
                totalArray = tmpArray;
            }
        }
    }
}
-(void)udpSocket:(GCDAsyncUdpSocket *)sock didSendDataWithTag:(long)tag
{
    NSLog(@"发送数据");
    //获取分次接收的位置和标识
    if (totalArray.count != 0)
    {
        [totalArray removeObjectAtIndex:0];
    }

}
-(void)udpSocketDidClose:(GCDAsyncUdpSocket *)sock withError:(NSError *)error
{
    NSLog(@"socket 关闭");
    if (self.delegate != nil)
    {
        [self.delegate receivedErrorMessage:@"网络错误,请重试"];
    }
}
#pragma mark  
//发送失败
-(void)sendMessageFail:(NSNotification *)notify
{
    NSLog(@"消息发送失败");
    if (self.delegate != nil)
    {
        [self.delegate receivedErrorMessage:@"消息发送失败,请重试"];
    }
}
//发送超时
-(void)didNotSendMessage
{
    NSLog(@"消息发送超时");
    if (self.delegate != nil)
    {
        [self.delegate receivedErrorMessage:@"消息发送超时,请重试"];
    }

}
@end
