import React from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { v4 as uuidv4 } from "uuid";
import { Swal } from "sweetalert2";
import DataAnak from "../store/DataAnak";

function Pendaftaran() {
  const [gender, setGender] = useState(null);
  const [date, setDate] = useState(new Date());
  const { dataAnak, daftar } = DataAnak();
  const defaultObject = {
    id: "",
    nama: "",
    tanggalLahir: null,
    umur: null,
    jenisKelamin: "",
  };
  const genders = [
    { id: 1, value: "Laki-laki" },
    { id: 2, value: "Perempuan" },
  ];

  const [formData, setFormData] = useState(defaultObject);

  // handling pas submit
  const handleSubmit = () => {
    if (formData.jenisKelamin && formData.nama && formData.tanggalLahir) {
      let payload = formData;
      payload.jenisKelamin = genders.value;

      if (payload.id === "") {
        payload.id = `ID-${Date.now()}-${uuidv4().slice(0, 8)}`;
        const newDataPendaftaran = dataAnak.concat(payload);
        daftar(newDataPendaftaran);
        Swal.fire("Simpan Data Berhasil !", "", "success");
      } else {
        // const newDataPendaftaran = dataAnak.map((item) =>
        //   item.id === payload.id ? payload : item
        // );
        // daftar(newDataPendaftaran);
        // Swal.fire("Updatte Data Berhasil !", "", "success");
      }
      setFormData(defaultObject);
      setGender(null);
    } else {
      Swal.fire("Lengkapi data terlebih dahulu !", "", "warning");
    }
  };

  return (
    <div className="grid mt-5">
      <div className="col-12 md:col-4">
        <Panel header="Pendaftaran">
          <div style={{ display: "flex" }}>
            <label style={{ width: "100px" }}>Nama </label>
            <div style={{ width: "100px" }}>
              <InputText id="nama" />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ width: "100px" }}>Jenis Kelamin </label>
            <div style={{ width: "100px" }}>
              <Dropdown
                value={gender}
                onChange={(e) => setGender(e.value)}
                options={genders}
                optionLabel="value"
                placeholder="Select gender"
                className="w-full md:w-14rem"
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ width: "100px" }}>Tanggal Lahir</label>
            <div style={{ width: "100px" }}>
              <Calendar value={date} onChange={(e) => setDate(e.value)} />
            </div>
          </div>
          {/* <div style={{ display: "flex" }}>
            <label style={{ width: "100px" }}>Nama Orang Tua </label>
            <div style={{ width: "100px" }}>
              <InputText id="namaOrangTua" />
            </div>
          </div> */}
        </Panel>
        <Button icon="pi pi-check" onClick={() => handleSubmit()}></Button>
      </div>
      <div className="col-12 md:col-8">
        <div>
          <DataTable
            value={formData}
            tableStyle={{ minWidth: "50rem", backgroundColor: "beige" }}
          >
            <Column field="nama" header="Nama"></Column>
            <Column field="tanggalLahir" header="Tanggal Lahir"></Column>
            <Column field="jenisKelamin" header="Jenis Kelamin"></Column>
            <Column header="Umur">12 bulan</Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default Pendaftaran;
