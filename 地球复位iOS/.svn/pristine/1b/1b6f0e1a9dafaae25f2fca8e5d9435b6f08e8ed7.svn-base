//
//  PushPlugin.h
//  tudi
//
//  Created by 郑伟 on 14-7-17.
//
//
#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import "DataHelper.h"
#import "Helper.h"
@interface PushPlugin : CDVPlugin<HelperDelegate>
// Instance Method

@property (nonatomic, copy) NSString* callbackID;
@property (nonatomic,strong) NSDictionary *requestItemsDic;
@property (nonatomic,strong) NSDictionary *responseItemsDic;

-(void)start:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

-(void)response:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

-(void)heart:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;


@end
