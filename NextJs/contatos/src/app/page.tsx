import Image from 'next/image'
import styles from './page.module.css'
import { Contato } from './components/contato'

export default function Home() {
  return (
    <div>
      <Contato />
    </div>
  )
}
