//
//  Helper.h
//  iOS_Tudi
//
//  Created by 郑伟 on 14-7-15.
//  Copyright (c) 2014年 郑伟. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GCDAsyncUdpSocket.h"
#import "DataHelper.h"
#import "NSString+HexToInt.h"
@protocol HelperDelegate<NSObject>
@optional
//收到错误的信息
-(void)receivedErrorMessage:(NSString *)message;
//收到的返回数据
-(void)receivedDataFromServer:(NSData *)data;
@end
@interface Helper : NSObject<GCDAsyncUdpSocketDelegate,HelperDelegate>
{
    GCDAsyncUdpSocket *_socket;
    id<HelperDelegate>delegate;
}

@property (nonatomic,assign) id<HelperDelegate>delegate;
@property (nonatomic,assign) NSMutableArray *totalArray;
@property (nonatomic,strong) NSTimer *myTimer;

+(Helper *)sharedSocket;
//发送消息
-(void)sendMessage:(NSData *)data timeOut:(NSTimeInterval )timeout tag:(int)tag;
@end
