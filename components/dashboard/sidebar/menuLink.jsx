"use client"

import Link from 'next/link'
import styles from './sidebar.module.css'
import { usePathname } from 'next/navigation'

//We separated it because sidebar is server component with (async/await) to get NextAuth user, but this is client component as we use usePathname() hook 
const MenuLink = ({item}) => {

  const pathname = usePathname();         //get URL path name using usePathname to change style for active links
  return (
    <Link href={item.path} className={`${styles.menuContainer} ${pathname === item.path && styles.active}`}>
      {item.icon}
      {item.title}
    </Link>
  )
}

export default MenuLink