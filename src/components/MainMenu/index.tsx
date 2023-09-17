import React, { useState } from 'react'
import { DesktopOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

// 登录请求到数据之后，就可以跟items这个数组进行匹配
const items: MenuItem[] = [
  {
    label: 'Page1',
    key: '/page1',
    icon: <PieChartOutlined />
  },
  {
    label: 'Page2',
    key: '/page2',
    icon: <DesktopOutlined />
  },
  {
    label: 'Page3',
    key: 'page3',
    icon: <UserOutlined />,
    children: [
      {
        label: 'Page3-1',
        key: '/page3/page3-1'
      },
      {
        label: 'Page3-2',
        key: '/page3/page3-2'
      }
    ]
  },
  {
    label: 'Page4',
    key: 'page4',
    icon: <UserOutlined />,
    children: [
      {
        label: 'Page4-1',
        key: '/page4/page4-1'
      },
      {
        label: 'Page4-2',
        key: '/page4/page4-2'
      }
    ]
  }
]

const Comp: React.FC = () => {
  // 获取当前路由路径
  const currentRoute = useLocation()

  /**
   * @刷新页面，激活菜单栏所在的上级菜单展开
   */
  let firstOpenKey: string = "";
  function findKey(obj: {key: string}) {
    return obj.key === currentRoute.pathname
  }

  for(let i = 0; i < items.length; i++) {
    if(items[i]!['children'] && items[i]!['children'].length > 0 && items[i]!['children'].find(findKey)) {
      firstOpenKey = items[i]!.key as string;
      break;
    }
  }

  // 设置展开项的初始值
  const [openKeys, setOpenKeys] = useState([firstOpenKey])

  const navigateTo = useNavigate()

  /**
   * 如果发现加载两次打印，开发环境才会出现，生产环境不会出现。原因如下：
   * 在入口文件 index.tsx 把严格模式去掉，就不会出现了。至于为什么react要它加载两次
   * 详情见：https://blog.csdn.net/HYHhmbb/article/details/125973790
   */
  console.log(currentRoute.pathname)

  // 左侧菜单栏-点击跳转对应路由
  const menuClick = (e: { key: string }) => {
    // 编程式导航
    navigateTo(e.key)
  }

  /**
   * 菜单栏展开/收缩
   * @param keys 是一个数组，记录了当前哪一项是展开的
   */
  const handleOpenChange = (keys: string[]) => {
    // 设置只能有一个展开项
    setOpenKeys([keys[keys.length - 1]])
  }

  return (
    <Menu theme="dark" defaultSelectedKeys={[currentRoute.pathname]} mode="inline" items={items} onClick={menuClick} onOpenChange={handleOpenChange} openKeys={openKeys} />
  )
}

export default Comp
