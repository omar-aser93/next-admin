"use client"

import Link from 'next/link'
import styles from './sidebar.module.css'
import { usePathname } from 'next/navigation'

//Client component for the sidebar links
const MenuLink = ({item}) => {

  const pathname = usePathname();         //get path name using usePathname to change style for active links
  return (
    <Link href={item.path} className={`${styles.menuContainer} ${pathname === item.path && styles.active}`}>
      {item.icon}
      {item.title}
    </Link>
  )
}

export default MenuLink