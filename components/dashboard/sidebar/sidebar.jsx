import styles from './sidebar.module.css'
import Image from 'next/image';
import MenuLink from './menuLink';
import { MdDashboard, MdSupervisedUserCircle, MdShoppingBag, MdAttachMoney, MdWork, MdAnalytics, MdPeople, MdOutlineSettings, MdHelpCenter, MdLogout } from "react-icons/md";
import { logout } from '@/lib/server_actions/user.actions';
import { auth } from "@/app/auth";                       //function we got from NextAuth lib


//Array of objects to store the sidebar menu items data
const menuItems = [
  { title: "Pages",
    list: [
      { title: "Dashboard", path: "/dashboard", icon: <MdDashboard />, },
      { title: "Users", path: "/dashboard/users", icon: <MdSupervisedUserCircle />, },
      { title: "Products", path: "/dashboard/products", icon: <MdShoppingBag />, },
      { title: "Transactions", path: "/dashboard/transactions", icon: <MdAttachMoney />, },
    ] },
  { title: "Analytics",
    list: [
      { title: "Revenue", path: "/dashboard/revenue", icon: <MdWork />, },
      { title: "Reports", path: "/dashboard/reports", icon: <MdAnalytics />, },      
    ] },
  { title: "User",
    list: [
      { title: "Settings", path: "/dashboard/settings", icon: <MdOutlineSettings />, },
      { title: "Help", path: "/dashboard/help", icon: <MdHelpCenter />, },
    ] },
];


const Sidebar = async () => {

  const { user } = await auth();            //get the user data of the session using NextAuth (auth.js file)
  
  return (
    <div className={styles.container}>
       <div className={styles.user}>
        <Image className={styles.userImage} src={ user?.img || "/noavatar.png"} alt="" width="50" height="50" />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user?.username}</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>

      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
             {/* client component for menue links */}
             {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />               
            ))}
          </li>
        ))}
      </ul>
      
      <form action={logout}>       {/* logout server action */}           
        <button className={styles.logout} >
          <MdLogout /> Logout
        </button>
      </form>

    </div>
  )
}

export default Sidebar



