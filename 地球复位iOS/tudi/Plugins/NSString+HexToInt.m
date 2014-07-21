//
//  NSString+HexToInt.m
//  iOS_Tudi
//
//  Created by 郑伟 on 14-7-16.
//  Copyright (c) 2014年 郑伟. All rights reserved.
//

#import "NSString+HexToInt.h"

@implementation NSString (HexToInt)

// 十六进制转换为普通字符串的。
+(NSString *)stringFromHexString:(NSString *)hexString
{
    int j=0;
    ///3ds key的Byte 数组， 128位
    int total = 0;
    for(int i=0;i<[hexString length];i++)
    {
        int int_ch; /// 两位16进制数转化后的10进制数
        
        unichar hex_char1 = [hexString characterAtIndex:i]; ////两位16进制数中的第一位(高位*16)
        int int_ch1;
        if(hex_char1 >= '0' && hex_char1 <='9')
            int_ch1 = (hex_char1-48)*16; //// 0 的Ascll - 48
        else if(hex_char1 >= 'A' && hex_char1 <='F')
            int_ch1 = (hex_char1-55)*16; //// A 的Ascll - 65
        else
            int_ch1 = (hex_char1-87)*16; //// a 的Ascll - 97
        i++;
        
        unichar hex_char2 = [hexString characterAtIndex:i]; ///两位16进制数中的第二位(低位)
        int int_ch2;
        if(hex_char2 >= '0' && hex_char2 <='9')
            int_ch2 = (hex_char2-48); //// 0 的Ascll - 48
        else if(hex_char1 >= 'A' && hex_char1 <='F')
            int_ch2 = hex_char2-55; //// A 的Ascll - 65
        else
            int_ch2 = hex_char2-87; //// a 的Ascll - 97
        
        int_ch = int_ch1+int_ch2;
        total = total + int_ch;
        j++;
    }
    NSString *intString = [NSString stringWithFormat:@"%d",total];
    return intString;
}
//byte数组转换为16进制数
+(NSString *)hexStringFromByte:(NSData *)lengthData
{
    Byte *lengthByte = (Byte *)[lengthData bytes];
    NSString *length = @"";
    for (int i = 0; i < [lengthData length]; i++)
    {
        NSString *newHexStr = [NSString stringWithFormat:@"%x",lengthByte[i]&0xff]; ///16进制数
        if([newHexStr length]==1)
            length = [NSString stringWithFormat:@"%@0%@",length,newHexStr];
        else
            length = [NSString stringWithFormat:@"%@%@",length,newHexStr];
    }
    return length;
}
@end
