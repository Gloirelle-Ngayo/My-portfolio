'use client'

//import { motion } from 'framer-motion'
import AcceuilSec from '@/components/sections/AcceuilSec'
import FormationsSec from '@/components/sections/FormationsSec'
import ProjetsSec from '@/components/sections/ProjetsSec'
import ContactSec from '@/components/sections/ContactSec'


export default function Home() {
  return (
    <>
      <div className="min-h-screen">
          <AcceuilSec/>
          <ProjetsSec/>
          <FormationsSec/>
          <ContactSec/>
      </div>
    </>
  )
}


