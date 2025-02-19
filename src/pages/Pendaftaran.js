import React from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState, useRef } from "react";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { v4 as uuidv4 } from "uuid";
import DataAnak from "../store/DataAnak";
import { Toast } from "primereact/toast";

function Pendaftaran() {
  const [gender, setGender] = useState(null);
  const [visible, setVisible] = useState(false);
  const toastBC = useRef(null);
  const { listAnak, daftar } = DataAnak();
  const defaultObject = {
    id: "",
    nama: "",
    tanggalLahir: null,
    umur: null,
    gender: "",
  };
  const genders = [
    { id: 1, value: "Laki-laki" },
    { id: 2, value: "Perempuan" },
  ];

  const [formData, setFormData] = useState(defaultObject);

  const hitungUmur = (tanggalLahir) => {
    const tl = new Date(tanggalLahir);
    const today = new Date();

    let umur = today.getFullYear() - tl.getFullYear();
    const bulan = today.getMonth() - tl.getMonth();

    if (bulan < 0 || (bulan === 0 && today.getDate() < tl.getDate())) {
      umur--;
    }
    console.log("Umur hitungan ", umur);
    //   setUmur(umur);
    return umur;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-sm p-button-info"
          onClick={() => handleEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-sm p-button-danger"
          onClick={() => handleDelete(rowData)}
        />
      </div>
    );
  };

  const handleEdit = (rowData) => {
    console.log("Edit:", rowData);
    setFormData({
      id: rowData.id,
      nama: rowData.nama,
      tanggalLahir: rowData.tanggalLahir,
      gender: rowData.gender,
      umur: rowData.umur,
    });
    // const getGender = genders.find((el) => el.value === rowData.gender);
    // console.log("get gender ", getGender);
    setGender(rowData.gender);
  };

  const toast = useRef(null);

  const clear = (data) => {
    console.log("data ", data)
    toastBC.current.clear();
    setVisible(false);
    const filteredData = listAnak.filter((item) => item.id !== data.id);
    daftar(filteredData);
  };
  const handleDelete = (data) => {
    console.log("data ", data)
    if (!visible) {
      setVisible(true);
      toastBC.current.clear();
      toastBC.current.show({
        severity: "warning",
        summary: "Anda akan menghapus data ",
        sticky: true,
        content: (props) => (
          <div
            className="flex flex-column align-items-left"
            style={{ flex: "1" }}
          >
            <Button
              className="p-button-sm flex"
              label="Lanjutkan"
              severity="success"
              onClick={() => clear(data)}
            ></Button>
          </div>
        ), 
      });
    }
  };

  // handling pas submit
  const handleSubmit = () => {
    console.log("Form Data ", formData);
    if (
      formData.gender != null &&
      formData.nama &&
      formData.tanggalLahir != null
    ) {
      console.log("datanya  ", formData);
      let payload = formData;
      if (formData.tanggalLahir) {
        const umurAnak = hitungUmur(formData.tanggalLahir);
        payload.umur = umurAnak;
        console.log("umur ", payload.umur);
      } else {
        payload.umur = null;
      }

      if (payload.id === "") {
        payload.id = `ID-${Date.now()}-${uuidv4().slice(0, 8)}`;
        const newDataPendaftaran = listAnak.concat(payload);
        console.log("data ", newDataPendaftaran);
        daftar(newDataPendaftaran);
        toast.current.show({
          severity: "info",
          summary: "Info",
          detail: "Data berhasil di simpan",
        });
      } else {
        const newDataPendaftaran = listAnak.map((item) =>
          item.id === payload.id ? payload : item
        );
        daftar(newDataPendaftaran);
        toast.current.show({
          severity: "info",
          summary: "Info",
          detail: "Data berhasil di perbaharui",
        });
      }
      setFormData(defaultObject);
      setGender(null);
    } else {
      toast.current.show({
        severity: "info",
        summary: "Perhatian",
        detail: "Lengkapi data terlebih dahulu",
      });
    }
  };
  return (
    <div className="grid mt-5" style={{zIndex:"0"}}>
      <div className="col-12 md:col-4">
        <Panel header="Pendaftaran">
          <div style={{ display: "flex" }}>
            <label style={{ width: "100px" }}>Nama </label>
            <div style={{ width: "100px" }}>
              <InputText
                id="nama"
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ width: "100px" }}>Jenis Kelamin </label>
            <div style={{ width: "100px" }}>
              <Dropdown
                value={gender}
                id="gender"
                name="gender"
                onChange={(e) => {
                  setFormData({ ...formData, gender: e.target.value });
                  setGender(e.value);
                  console.log("valuee ", e.value);
                }}
                options={genders}
                optionLabel="value"
                placeholder="Select gender"
                className="w-full md:w-14rem"
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ width: "100px" }}>Tanggal Lahir</label>
            <div style={{ width: "230px" }}>
              <Calendar
                dateFormat="dd-mm-yyyy"
                maxDate={new Date()}
                showIcon
                value={
                  formData.tanggalLahir ? new Date(formData.tanggalLahir) : null
                }
                id="tanggalLahir"
                name="tanggalLahir"
                onChange={(e) => {
                  const date = e.value;
                  const formattedDate = `${date.getFullYear()}-${String(
                    date.getMonth() + 1
                  ).padStart(2, "0")}-${String(date.getDate()).padStart(
                    2,
                    "0"
                  )}`;
                  setFormData({ ...formData, tanggalLahir: formattedDate });
                }}
              />
            </div>
          </div>
        </Panel>
        <Button icon="pi pi-check" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div className="col-6 md:col-8">
        <Panel header="Informasi Data Anak">
          <div style={{ display: "flex" }}>
            <DataTable
              value={listAnak}
              tableStyle={{ minWidth: "50rem", backgroundColor: "beige" }}
            >
              <Column field="nama" header="Nama"></Column>
              <Column field="tanggalLahir" header="Tanggal Lahir"></Column>
              <Column field="gender" header="Jenis Kelamin"></Column>
              <Column field="umur" header="Umur"></Column>
              <Column body={actionBodyTemplate} header="Action" />
            </DataTable>
            <Toast ref={toastBC} position="bottom-center" onRemove={clear} />
            <Toast ref={toast} />
          </div>
        </Panel>
      </div>
    </div>
  );
}

export default Pendaftaran;
