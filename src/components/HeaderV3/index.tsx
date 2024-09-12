
import s from './header.module.css'
import Top from '@assets/top.svg?react'
import Back from '@assets/back.svg?react'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
  return (
    <div className={s.container}>
        <Back className={s.clickable} onClick={() => navigate(-1)} />
        <Top />
        <div className={s.button}>

        </div>
    </div>
  )
}