import Header from '@/components/HeaderV2'
import Footer from '../components/Footer'
import s from './index.module.css'

import Button1 from '@assets/button1.svg?react'
import Button2 from '@assets/button2.svg?react'
import { Link } from 'react-router-dom'

function Index() {

  return (
    <div className={s.container}>
        <Header />
        <div className={s.content}>
            <Link to={"/letter"} className={s.button}>
                <Button1 />
            </Link>
            <Link to={"/introduction"} className={s.button}>
                <Button2 />
            </Link>
          </div>
        <Footer />  
    </div>
  )
}

export default Index
