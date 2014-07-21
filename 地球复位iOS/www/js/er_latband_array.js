/**
 *  INT  lMaxLatitude; //该band最大纬度，百万单位
 *  INT  lUnit;        //该band中最小单位经度，一般是一个经度
 *  INT  lLandNum;     //该band中每个单元的land数目
 *  float dLngNum;    //每块land跨经度数
 * */
var ER_LATBAND={lMaxLatitude:"",lUnit:"",lLandNum:"",dLngNum:""};
var ER_LATBAND_ARRAY=[
	{lMaxLatitude:20,lUnit:1,lLandNum:2500,dLngNum:0.000400},
	{lMaxLatitude:30,lUnit:1,lLandNum:2322,dLngNum:0.000431},
	{lMaxLatitude:35,lUnit:1,lLandNum:2140,dLngNum:0.000467},
	{lMaxLatitude:40,lUnit:1,lLandNum:2024,dLngNum:0.000494},
	{lMaxLatitude:45,lUnit:1,lLandNum:1893,dLngNum:0.000528},
	{lMaxLatitude:50,lUnit:1,lLandNum:1747,dLngNum:0.000572},
	{lMaxLatitude:52,lUnit:1,lLandNum:1588,dLngNum:0.000630},
	{lMaxLatitude:54,lUnit:1,lLandNum:1521,dLngNum:0.000657},
	{lMaxLatitude:56,lUnit:1,lLandNum:1452,dLngNum:0.000689},
	{lMaxLatitude:58,lUnit:1,lLandNum:1382,dLngNum:0.000724},
	{lMaxLatitude:60,lUnit:1,lLandNum:1309,dLngNum:0.000764},
	{lMaxLatitude:62,lUnit:1,lLandNum:1235,dLngNum:0.000810},
	{lMaxLatitude:64,lUnit:1,lLandNum:1160,dLngNum:0.000862},
	{lMaxLatitude:66,lUnit:1,lLandNum:1083,dLngNum:0.000923},
	{lMaxLatitude:68,lUnit:1,lLandNum:1005,dLngNum:0.000995},
	{lMaxLatitude:70,lUnit:1,lLandNum:926,dLngNum:0.001080},
	{lMaxLatitude:72,lUnit:1,lLandNum:845,dLngNum:0.001183},
	{lMaxLatitude:73,lUnit:1,lLandNum:764,dLngNum:0.001309},
	{lMaxLatitude:74,lUnit:1,lLandNum:722,dLngNum:0.001385},
	{lMaxLatitude:75,lUnit:1,lLandNum:681,dLngNum:0.001468},
	{lMaxLatitude:76,lUnit:1,lLandNum:640,dLngNum:0.001563},
	{lMaxLatitude:77,lUnit:1,lLandNum:598,dLngNum:0.001672},
	{lMaxLatitude:78,lUnit:1,lLandNum:556,dLngNum:0.001799},
	{lMaxLatitude:79,lUnit:1,lLandNum:514,dLngNum:0.001946},
	{lMaxLatitude:80,lUnit:1,lLandNum:471,dLngNum:0.002123}
];