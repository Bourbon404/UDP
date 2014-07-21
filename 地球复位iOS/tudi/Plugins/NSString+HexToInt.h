//
//  NSString+HexToInt.h
//  iOS_Tudi
//
//  Created by 郑伟 on 14-7-16.
//  Copyright (c) 2014年 郑伟. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (HexToInt)
// 十六进制转换为普通字符串的。
+(NSString *)stringFromHexString:(NSString *)hexString;

//byte数组转换为16进制数
+(NSString *)hexStringFromByte:(NSData *)lengthData;
@end
