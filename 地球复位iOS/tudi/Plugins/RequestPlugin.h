//
//  RequestPlugin.h
//  tudi
//
//  Created by 郑伟 on 14-7-17.
//
//
#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import "DataHelper.h"
#import "Helper.h"
@interface RequestPlugin : CDVPlugin<HelperDelegate>
// Instance Method

@property (nonatomic, copy) NSString* callbackID;
@property (nonatomic,strong) NSDictionary *requestItemsDic;
@property (nonatomic,strong) NSDictionary *responseItemsDic;

- (void) share:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;


@end
