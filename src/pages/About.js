import { Panel } from 'primereact/panel'
import React from 'react';
import { Image } from 'primereact/image';
import Gambar1 from "../assets/image/playground-outdoor.jpg";
import Gambar2 from "../assets/image/ruang-kelas-belajar.jpg";

function About() {
  return (
    <div>
      <title>AXYZ DAY CARE</title>
      <h3>AXYZ merupakan Day Care yang tidak hanya menjadi tempat anak bermain, namun juga menyediakan pelayanan untuk menjaga anak dalam tumbuh kembangnya.</h3>
      <h4>Fasilitas yang diberikan sangat mendukung anak untuk membangkitkan sikap yang baik, dan meningkatkan kemampuan berpikir pada anak</h4>
      <div className='col-6 md:col-6'>
        <Panel header="Tempat Bermain Outdoor" >
        <div style={{display: 'flex'}}>
            <Image src={Gambar1} alt="Image" width="250" />
        </div>
        </Panel>
      </div>
      <div className='col-6 md:col-6'>
        <Panel header="Tempat Bermain Indoor dan Diskusi " >
          <div style={{display: 'flex'}}>
            <Image src={Gambar2} alt="Image" width="250" />
          </div>
        </Panel>
      </div>
    </div>
  )
}

export default About