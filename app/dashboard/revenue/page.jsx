import Card from "@/components/dashboard/card/card"

const RevenuePage = () => {
  // DUMMY DATA
  const cards = [
    { id: 1, title: "Total Users", number: 10.928, change: 12, },
    { id: 2, title: "Stock", number: 8.236, change: -2, },
    { id: 3, title: "Revenue", number: 6.642, change: 18,},
  ];

  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', flexWrap:'wrap', margin:'50px auto', width:'85%',}}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
    </div>
  )
}

export default RevenuePage