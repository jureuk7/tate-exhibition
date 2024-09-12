
import s from './footer.module.css'
import QrImage from '@assets/qr.svg?react'
import TateImage from '@assets/tate.svg?react'
import Logo from '@assets/logo.svg?react'

export default function Footer() {
  return (
    <div className={s.container}>
                
        <Logo />
        <div className={s.credits}>
        Presented by <br /> <br />
 Kim Seol · Kim Seung Ho · Kim Han Kyo · Shin Woo Jin · Lee Min Jae · Park Seo Hyun <br />
Gang Kun Ho · Choi Seung Hyun · Lee Jeong Woo · Kim Si Woo · Lee Yoon Ah · Lee Ga Kyung · Hong Lu Ha 
        </div>
        <div className={s.right}>

        <QrImage />
        <TateImage />
        </div>
    </div>
  )
}
