import Header from '@/components/Header'
import Footer from '../components/Footer'
import s from './index.module.css'
import './letter.css';
import { useEffect, useState } from 'react'
import ModalTop from '@/assets/modalTop.svg?react'
import Close from '@/assets/close.svg?react'
import Letter from '@/components/Letter'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LetterType } from '@/types/letter';


function LetterPage() {
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [splitData, setSplitData] = useState<[LetterType[],LetterType[],LetterType[]]>([[], [], []]); 
  
  const queryClient = useQueryClient();

  const { data } = useQuery<LetterType[]>({
    queryKey: ['letters'],
    queryFn: async (): Promise<LetterType[]> => {
      const res = await fetch('https://tategb.apne2a.algorix.cloud/guestbook');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await res.json();
      return result as LetterType[];  // 명시적으로 데이터 타입을 지정
    }
  });

  // 데이터를 3개의 배열로 나누는 함수
  const splitDataIntoThree = (data: LetterType[]): [LetterType[], LetterType[], LetterType[]] => {
    return data.reduce<[LetterType[], LetterType[], LetterType[]]>((acc, item, index) => {
      acc[index % 3].push(item);  // 인덱스에 따라 3개의 배열에 순차적으로 아이템을 분배
      return acc;
    }, [[], [], []]);  // 초기값은 빈 배열 3개
  };

  // data 상태가 업데이트되면 데이터를 3개의 배열로 나눔
  useEffect(() => {
    if (data && data.length > 0) {
      const split = splitDataIntoThree(data);
      setSplitData(split);  // 3개의 배열로 나눈 데이터를 상태로 저장
    }
  },[data]);

  const submit = async () => {
    if(name === '' || content === '') {
      alert('이름과 내용을 입력해주세요.')
      return
    }
    fetch('https://tategb.apne2a.algorix.cloud/guestbook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        message: content,
      }),
    }).then((res) => {
      if (res.ok) {
        alert('등록되었습니다.')
        setName('')
        setContent('')
        setShow(false)
      } else {
        alert('등록에 실패했습니다.')
      }
    })
  }

  const mutation = useMutation({
    mutationFn: submit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['letters'] })
    },
  })

  return (
    <>
    {show && <div className={s['modal-root']}>
        <div className={s.modal}>
          <div className={s['modal-top']}>
            <ModalTop />
            <div className={s['modal-close']} onClick={() => setShow(false)}>
              <Close />
            </div>
          </div>
          <div className={s['modal-content']}>
            <textarea maxLength={300} placeholder='내용을 입력해주세요' className={s['box-input']} onChange={(e) => setContent(e.target.value)}>
              {content}
            </textarea>
            <div className={s['letter-count']}>
              <span>{content.length}</span>/300자
            </div>
          </div>
          <div className={s['modal-bottom']}>
            <input value={name} onChange={(e) => setName(e.target.value)} className={s['input']} placeholder="Name" />
            <button onClick={() => mutation.mutate()} className={s['submit']}>등록하기</button>
          </div>
        </div>
      </div>}
    <div className={s.container}>
        <Header setShow={setShow} />
        <div className={s.content}>
          <div className="slide-container">
          <div className="slide slide-1">
            {splitData[0].map((letter:LetterType) => (
              <Letter key={letter.id} name={letter.name} message={letter.message} />
            ))  
            }
          </div>
          <div className="slide slide-2">
            {splitData[1].map((letter:LetterType) => (
              <Letter key={letter.id} name={letter.name} message={letter.message} />
            ))    
            }
            </div>
            <div className="slide slide-1">
              {splitData[2].map((letter:LetterType) => (
                <Letter key={letter.id} name={letter.name} message={letter.message} />
              ))      
              }
            </div>
          </div>
        </div>
        <Footer />  
    </div>
    </>
  )
}

export default LetterPage
