import Header from '@/components/HeaderV3'
import Footer from '../components/Footer'
import s from './index.module.css'
import Intro from '@/assets/intro.svg?react'


function Index() {

  return (
    <div className={s.container}>
        <Header />
        <div className={s.content}>
            <div className={s.box}>
              <Intro />
            </div>
          </div>
        <Footer />  
    </div>
  )
}

export default Index
