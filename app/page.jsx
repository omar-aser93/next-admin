import Link from "next/link"

const Homepage = () => {
  return (
    <div >
      <div style={{backgroundColor:'#182237',width:'450px',height:'220px',margin:'150px auto',borderRadius:'10px',padding:'20px',fontSize:'28px'}}>
      Welcome to next.js Admin Dashboard , if you are admin <br /><br />
      <Link href={'/login'} style={{color:'#254288',fontSize:'24px'}}> Click to login .. </Link>
      </div>
    </div>
  )
}

export default Homepage