import s from './letter.module.css'
interface LetterProps {
    name: string;
    message: string;
}

const Letter = ({ name, message }: LetterProps) => {
    return (
        <div className={s.letter}>

            <div className={s['letter-message']}>{message}</div>
            <div className={s['letter-name']}>From, {name}</div>
        </div>
    )
}

export default Letter