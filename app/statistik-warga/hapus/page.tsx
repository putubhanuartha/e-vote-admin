import DisplayDeleteWarga from '@/components/display-delete-warga'
import React from 'react'
import { dataWarga } from '@/data/data'
const HapusWarga = () => {
  return (
    <div>
        <DisplayDeleteWarga dataWarga={dataWarga}/>
    </div>
  )
}

export default HapusWarga