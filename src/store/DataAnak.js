import {create} from "zustand";
import {persist} from "zustand/middleware"

const DataAnak = create (persist((set)=>({
   listAnak : [],

    daftar: (value) => set((state) => ({
        listAnak : value
    })) 
})))

export default DataAnak;