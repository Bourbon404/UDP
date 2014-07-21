//
//  DataHelper.m
//  iOS_Tudi
//
//  Created by 郑伟 on 14-7-15.
//  Copyright (c) 2014年 郑伟. All rights reserved.
//

#import "DataHelper.h"
#import "Helper.h"
#import "NSString+HexToInt.h"

@implementation DataHelper

#pragma mark 进制转换
//16进制转换为NSData
+(NSData *)hexToData:(NSString *)string
{
    ///// 将16进制数据转化成Byte 数组
    NSString *hexString = string;
    int j=0;
    Byte bytes[128];
    ///3ds key的Byte 数组， 128位
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
        bytes[j] = int_ch-256; ///将转化后的数放入Byte数组里
        j++;
    }
    NSData *newData = [NSData dataWithBytes:bytes length:string.length];
    return newData;
}
+(NSData *)hexStrToData:(NSString *)string
{

    int tmpid = [string intValue] + 256;
    
    NSString *nLetterValue;
    NSString *str =@"";
    long long int ttmpig;
    for (int i = 0; i<9; i++) {
        ttmpig=tmpid%16;
        tmpid=tmpid/16;
        switch (ttmpig)
        {
            case 10:
                nLetterValue =@"A";break;
            case 11:
                nLetterValue =@"B";break;
            case 12:
                nLetterValue =@"C";break;
            case 13:
                nLetterValue =@"D";break;
            case 14:
                nLetterValue =@"E";break;
            case 15:
                nLetterValue =@"F";break;
            default:nLetterValue=[[NSString alloc]initWithFormat:@"%lli",ttmpig];
                
        }
        str = [nLetterValue stringByAppendingString:str];
        if (tmpid == 0) {
            break;
        }
        
    }
    
    NSData *data = [self hexToData:str];


    return data;

}
//short类型转换为NSData
+(NSData *)shortToData:(short)num
{
    Byte totalByte[2];
    totalByte[0] = (num >> 8);
    totalByte[1] = (num);
    NSData *data = [NSData dataWithBytes:totalByte length:2];
    return data;
}
//NSData转short
+(short)dataToShort:(NSData *)data
{
    Byte *byte = (Byte *)[data bytes];
    return (short) (((byte[1] << 8) | (byte[0] & 0xff)));
}
//int类型转换为NSData
+(NSData *)intToData:(int)num
{
    Byte transaByte[4];
    transaByte[0] = (num >> 24);
    transaByte[1] = (num >> 16);
    transaByte[2] = (num >> 8);
    transaByte[3] = (num);
    NSData *data = [NSData dataWithBytes:transaByte length:4];
    return data;
}

//float类型转换为NSData
+(NSData *)floatToData:(float)value
{
    Byte   *   pb   =   (Byte*)   (&value);

    NSData *data = [NSData dataWithBytes:pb length:4];
    
    return data;
}
//byte转int
+(int)byteToInt:(NSData *)data
{

    Byte *byte = (Byte *)[data bytes];
    if (data.length == 2)
    {
        Byte tmpByte[4];
        tmpByte[0] = '\0';
        tmpByte[1] = '\0';
        tmpByte[2] = byte[0];
        tmpByte[3] = byte[1];
        int b = (int)(tmpByte[0] <<24 | tmpByte[1]<<16| tmpByte[2] << 8 | tmpByte[3]);
        return b;
    }
    else
    {
        int a = (int)(byte[0] <<24 | byte[1]<<16| byte[2] << 8 | byte[3]);
        
        return a;
    }
}


-(int) lBytesToInt:(Byte[]) b
{
    int s = 0;
    for (int i = 0; i < 3; i++)
    {
        if (b[3-i] >= 0)
        {
            s = s + b[3-i];
        } else
        {
            s = s + 256 + b[3-i];
        }
        s = s * 256;
    }
    if (b[0] >= 0)
    {
        s = s + b[0];
    } else {
        s = s + 256 + b[0];
    }
    return s;
}


//byte转float
+(float)byteToFloat:(NSData *)data
{
    Byte *b = (Byte *)[data bytes];
    
    float un =  *(float *)((void *)b);

    return un;
}

//nsdata 转 16进制
+(NSString *)dataToHex:(NSData *)data
{
    Byte *bytes = (Byte *)[data bytes];
    //下面是Byte 转换为16进制。
    NSString *hexStr=@"";
    for(int i=0;i<[data length];i++)
        
    {
        NSString *newHexStr = [NSString stringWithFormat:@"%x",bytes[i]&0xff];///16进制数
        
        if([newHexStr length]==1)
            
            hexStr = [NSString stringWithFormat:@"%@0%@",hexStr,newHexStr];
        
        else
            
            hexStr = [NSString stringWithFormat:@"%@%@",hexStr,newHexStr]; 
    } 
    return hexStr;
}
#pragma mark 发送数据
+(NSMutableData *)chansForDataWithDic:(NSDictionary *)dict
{
    NSMutableData *sendData = [[NSMutableData alloc] initWithLength:0];
    
    for (NSDictionary *tmpDict in dict)
    {
        NSData *valueData = [NSData data];
        int length = [[tmpDict objectForKey:@"length"] intValue];
        NSString *type = [tmpDict objectForKey:@"type"];
        if ([type isEqualToString:@"int"])
        {
            int num = [[tmpDict objectForKey:@"value"] intValue];
            valueData = [self intToData:num];
        }
        else if ([type isEqualToString:@"String"])
        {
            NSString *string = [tmpDict objectForKey:@"value"];

            valueData = [string dataUsingEncoding:NSUTF8StringEncoding];
        }
        else if ([type isEqualToString:@"byte"])
        {
            NSString *string = [tmpDict objectForKey:@"value"];
            if ([string rangeOfString:@"0x"].location != NSNotFound)
            {
                string = [string stringByReplacingOccurrencesOfString:@"0x" withString:@""];
                valueData = [self hexToData:string];
            }
            else
            {
                valueData = [self hexStrToData:string];
            }
        }
        else if ([type isEqualToString:@"short"])
        {
            int num = [[tmpDict objectForKey:@"value"] intValue];
            valueData = [self shortToData:num];
        }
        else if ([type isEqualToString:@"float"])
        {
            float num = [[tmpDict objectForKey:@"value"] floatValue];
            valueData = [self floatToData:num];
        }
        if (valueData != nil)
        {
            Byte *dataByte = (Byte *)[valueData bytes];
            [sendData appendBytes:dataByte length:length];
        }        
    }
    
    return sendData;
}
#pragma mark 接收数据
+(NSMutableDictionary *)dictFromData:(NSData *)data andDict:(NSDictionary *)dict
{
    
    NSMutableDictionary *returnDict = [[NSMutableDictionary alloc] initWithCapacity:0];
    int loc = 0;
    for (NSDictionary *tmp in dict)
    {
        int length = [[tmp objectForKey:@"length"] intValue];
        NSString *name = [tmp objectForKey:@"name"];
        NSString *type = [tmp objectForKey:@"type"];
        NSRange range = NSMakeRange(loc, length);
        
        NSData *subData = [data subdataWithRange:range];
        if ([type isEqualToString:@"int"])
        {
            int num = [self byteToInt:subData];
            NSString *intNum = [NSString stringWithFormat:@"%d",num];
            
            [returnDict setObject:intNum forKey:name];
        }
        else if ([type isEqualToString:@"String"])
        {
            Byte *byte = (Byte *)[subData bytes];
            NSString *string = [[NSString alloc] initWithBytes:byte length:length encoding:NSUTF8StringEncoding];
            if (string == nil)
            {
                [returnDict setObject:@"0" forKey:name];
            }
            else
            {
                [returnDict setObject:string forKey:name];
            }
        }
        else if ([type isEqualToString:@"byte"])
        {
            NSString *string = [NSString hexStringFromByte:subData];
            string = [NSString stringFromHexString:string];
            
            [returnDict setObject:string forKey:name];

        }
        else if ([type isEqualToString:@"short"])
        {
            NSString *string = [NSString hexStringFromByte:subData];
            string = [NSString stringFromHexString:string];
            
            [returnDict setObject:string forKey:name];
        }
        else if ([type isEqualToString:@"float"])
        {
            float num = [self byteToFloat:subData];
            NSString *string = [NSString stringWithFormat:@"%f",num];
            [returnDict setObject:string forKey:name];
        }
        
        loc = loc + length;
    }
    
    return returnDict;
}


@end
