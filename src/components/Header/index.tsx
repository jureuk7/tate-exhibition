
import s from './header.module.css'
import Top from '@assets/top.svg?react'
import Back from '@assets/back.svg?react'
import Button from '@assets/buttonheader.svg?react'
import { useNavigate } from 'react-router-dom'

export default function Header({
  setShow
}:{
  setShow:React.Dispatch<React.SetStateAction<boolean>>
}) {
  const navigate = useNavigate();
  return (
    <div className={s.container}>
        <Back  className={s.clickable} onClick={() => navigate(-1)} />
        <Top />
        <div onClick={() => setShow(true)} className={`
        ${s.button} ${s.clickable}
        `}>
        <Button  />
        </div>
    </div>
  )
}