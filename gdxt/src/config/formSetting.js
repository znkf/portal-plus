// modal form 的样式布局
export const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
export const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
};
export const formItemLayoutS = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};
export const formTailLayoutS = {
  labelCol: { span: 6 },
  wrapperCol: { span: 8, offset: 6 }
};
export const formItemLayoutSL = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};
export const formTailLayoutSL = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
};
// 菜单列表
export const menuTreeData = [
  {
    title: "首页",
    value: "P011",
    key: "首页"
  },
  {
    title: "用户管理",
    value: "用户管理",
    key: "用户管理",
    children: [
      {
        title: "在线用户",
        value: "P001",
        key: "在线用户"
      },
      {
        title: "所有用户",
        value: "P002",
        key: "所有用户"
      },
      {
        title: "用户画像",
        value: "P012",
        key: "用户画像"
      }
    ]
  },
  {
    title: "系统管理",
    value: "系统管理",
    key: "系统管理",
    children: [
      {
        title: "管理员列表",
        value: "P003",
        key: "管理员列表"
      },
      {
        title: "角色列表",
        value: "P004",
        key: "角色列表"
      }
    ]
  },
  {
    title: "证照管理",
    value: "证照管理",
    key: "证照管理",
    children: [
      {
        title: "证照绑定信息",
        value: "P005",
        key: "证照绑定信息"
      },
      {
        title: "亮证统计",
        value: "P006",
        key: "亮证统计"
      }
      // ,
      // {
      //   title: '添加卡证类型',
      //   value: 'P007',
      //   key: '添加卡证类型'
      // }
    ]
  },
  {
    title: "事项管理",
    value: "事项管理",
    key: "事项管理",
    children: [
      {
        title: "事项管理",
        value: "P008",
        key: "事项管理"
      },
      {
        title: "事项移动办设置",
        value: "P014",
        key: "事项移动办设置"
      }
    ]
  },
  {
    title: "公共服务",
    value: "公共服务",
    key: "公共服务",
    children: [
      {
        title: "公告管理",
        value: "P009",
        key: "公告管理"
      },
      {
        title: "消息管理",
        value: "P013",
        key: "消息管理"
      }
      // ,
      // {
      //   title: '缓存管理',
      //   value: '缓存管理',
      //   key: '缓存管理'
      // },
      // {
      //   title: '搜索管理',
      //   value: '搜索管理',
      //   key: '搜索管理'
      // }
    ]
  },
  {
    title: "收藏统计",
    value: "P0010",
    key: "收藏统计"
  }
  // ,
  // {
  //   title: '日志服务',
  //   value: '日志服务',
  //   key: '日志服务'
  // },
  // {
  //   title: '多媒体服务',
  //   value: '多媒体服务',
  //   key: '多媒体服务'
  // }
];

// 证件名称/证件类型
export const formCardName = [
  "身份证",
  "普通护照",
  "港澳居民来往内地通行证",
  "驾驶证",
  "机动车行驶证",
  "住房公积金",
  "社会保障卡",
  "居住证"
];
// 民族
export const formNations = [
  { name: "汉族", value: "汉族", displayName: "汉族" },
  { name: "满族", value: "满族", displayName: "满族" },
  { name: "蒙古族", value: "蒙古族", displayName: "蒙古族" },
  { name: "回族", value: "回族", displayName: "回族" },
  { name: "藏族", value: "藏族", displayName: "藏族" },
  { name: "维吾尔族", value: "维吾尔族", displayName: "维吾尔族" },
  { name: "苗族", value: "苗族", displayName: "苗族" },
  { name: "彝族", value: "彝族", displayName: "彝族" },
  { name: "壮族", value: "壮族", displayName: "壮族" },
  { name: "布依族", value: "布依族", displayName: "布依族" },
  { name: "侗族", value: "侗族", displayName: "侗族" },
  { name: "瑶族", value: "瑶族", displayName: "瑶族" },
  { name: "白族", value: "白族", displayName: "白族" },
  { name: "土家族", value: "土家族", displayName: "土家族" },
  { name: "哈尼族", value: "哈尼族", displayName: "哈尼族" },
  { name: "哈萨克族", value: "哈萨克族", displayName: "哈萨克族" },
  { name: "傣族", value: "傣族", displayName: "傣族" },
  { name: "黎族", value: "黎族", displayName: "黎族" },
  { name: "傈僳族", value: "傈僳族", displayName: "傈僳族" },
  { name: "佤族", value: "佤族", displayName: "佤族" },
  { name: "畲族", value: "畲族", displayName: "畲族" },
  { name: "高山族", value: "高山族", displayName: "高山族" },
  { name: "拉祜族", value: "拉祜族", displayName: "拉祜族" },
  { name: "水族", value: "水族", displayName: "水族" },
  { name: "东乡族", value: "东乡族", displayName: "东乡族" },
  { name: "纳西族", value: "纳西族", displayName: "纳西族" },
  { name: "景颇族", value: "景颇族", displayName: "景颇族" },
  { name: "柯尔克孜族", value: "柯尔克孜族", displayName: "柯尔克孜族" },
  { name: "土族", value: "土族", displayName: "土族" },
  { name: "达斡尔族", value: "达斡尔族", displayName: "达斡尔族" },
  { name: "仫佬族", value: "仫佬族", displayName: "仫佬族" },
  { name: "羌族", value: "羌族", displayName: "羌族" },
  { name: "布朗族", value: "布朗族", displayName: "布朗族" },
  { name: "撒拉族", value: "撒拉族", displayName: "撒拉族" },
  { name: "毛南族", value: "毛南族", displayName: "毛南族" },
  { name: "仡佬族", value: "仡佬族", displayName: "仡佬族" },
  { name: "锡伯族", value: "锡伯族", displayName: "锡伯族" },
  { name: "阿昌族", value: "阿昌族", displayName: "阿昌族" },
  { name: "普米族", value: "普米族", displayName: "普米族" },
  { name: "朝鲜族", value: "朝鲜族", displayName: "朝鲜族" },
  { name: "塔吉克族", value: "塔吉克族", displayName: "塔吉克族" },
  { name: "怒族", value: "怒族", displayName: "怒族" },
  { name: "乌孜别克族", value: "乌孜别克族", displayName: "乌孜别克族" },
  { name: "俄罗斯族", value: "俄罗斯族", displayName: "俄罗斯族" },
  { name: "鄂温克族", value: "鄂温克族", displayName: "鄂温克族" },
  { name: "德昂族", value: "德昂族", displayName: "德昂族" },
  { name: "保安族", value: "保安族", displayName: "保安族" },
  { name: "裕固族", value: "裕固族", displayName: "裕固族" },
  { name: "京族", value: "京族", displayName: "京族" },
  { name: "塔塔尔族", value: "塔塔尔族", displayName: "塔塔尔族" },
  { name: "独龙族", value: "独龙族", displayName: "独龙族" },
  { name: "鄂伦春族", value: "鄂伦春族", displayName: "鄂伦春族" },
  { name: "赫哲族", value: "赫哲族", displayName: "赫哲族" },
  { name: "门巴族", value: "门巴族", displayName: "门巴族" },
  { name: "珞巴族", value: "珞巴族", displayName: "珞巴族" },
  { name: "基诺族", value: "基诺族", displayName: "基诺族" }
];
