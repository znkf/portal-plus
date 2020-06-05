export const barOption = {
  title: {
    text: '年龄分布'
  },
  color: ['#1771fb'],
  tooltip: {
    trigger: 'item',
    formatter: a => {
      return a.name + ':' + a.value + '人'
    }
  },
  xAxis: {
    type: 'category',
    data: ['未知', '17岁以下', '18-24岁', '25-39岁', '30-39岁', '40-49岁', '50岁以上']
  },
  yAxis: {
    type: 'value',
    name: '人数（人）'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
}
export const pieOption = {
  title: {
    text: '性别分布'
  },
  tooltip: {
    trigger: 'item',
    formatter: a => {
      return a.name + ':' + a.value + '人'
    }
  },
  label: {
    show: false,
    position: 'center'
  },
  color: ['#ccc', '#1771fb', '#60c539'],
  legend: {
    type: 'scroll',
    orient: 'horizontal',
    right: 10,
    bottom: 20,
    data: ['男', '女', '未知']
  },
  series: [
    {
      name: '性别分布',
      type: 'pie',
      radius: '55%',
      center: ['40%', '50%'],
      data: [
        {
          name: '男',
          value: 11111
        },
        {
          name: '女',
          value: 22222
        },
        {
          name: '未知',
          value: 10
        }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
