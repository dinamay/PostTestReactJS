import { Panel } from 'primereact/panel'
import React from 'react';
import { Image } from 'primereact/image';
        

function About() {
  return (
    <div>
      <title>AXYZ DAY CARE</title>
      <h1>AXYZ merupakan Day Care yang tidak hanya menjadi tempat anak bermain, namun juga menyediakan pelayanan untuk menjaga anak dalam tumbuh kembangnya.</h1>
      <h2>Fasilitas yang diberikan sangat mendukung anak untuk membangkitkan sikap yang baik, dan meningkatkan kemampuan berpikir pada anak</h2>
      <div className='col-12 md:col-6'>
        <Panel header="Tempat Bermain Outdoor" style={{display: 'flex'}}>
          <Image src="./assets/image/playground-outdoor.jpg" alt="Image" width="250" preview />
        </Panel>
      </div>
      <div className='col-12 md:col-6'>
        <Panel header="Tempat Bermain Indoor dan Diskusi " style={{display: 'flex'}}>
          <Image src="./assets/image/ruang-kelas-belajar.jpg" alt="Image" width="250" preview />
        </Panel>
      </div>
    </div>
  )
}

export default About