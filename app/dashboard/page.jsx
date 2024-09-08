import Card from "@/components/dashboard/card/card";
import Chart from "@/components/dashboard/chart/chart";
import Rightbar from "@/components/dashboard/rightbar/rightbar";
import Transactions from "@/components/dashboard/transactions/transactions";
import styles from "./dashboard.module.css";

// DUMMY DATA
export const cards = [
  { id: 1, title: "Total Users", number: 10.928, change: 12, },
  { id: 2, title: "Stock", number: 8.236, change: -2, },
  { id: 3, title: "Revenue", number: 6.642, change: 18,},
];

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>

        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>

        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}> <Rightbar /> </div>
    </div>
  )
}

export default Dashboard