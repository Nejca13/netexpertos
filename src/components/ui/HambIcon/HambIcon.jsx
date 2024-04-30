import hamb from '@/assets/images/hamb.svg'
import Image from 'next/image'

const HambIcon = ({ show }) => {
  return (
    <Image
      onClick={show}
      style={{ cursor: 'pointer' }}
      src={hamb}
      width={68}
      height={80}
      alt='menu'
    />
  )
}

export default HambIcon
