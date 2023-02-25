import axios from "axios";
import { IProd } from "../../models/IProd";

// import { IImage } from "../../models/IImage";

const MYSERVR="http://127.0.0.1:8000/product/"  


export async function productUpload(access: string, formData:any) {
  console.log(formData)
  // const access = useAppSelector(selectAccess);
  return await axios.post('http://127.0.0.1:8000/product/', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${access}`
    }
  });
}
export function deleteProducts(access: string, id:number) {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + access
    }
  }   
  return new Promise((resolve) =>
    axios.delete(`${MYSERVR}${id}`, config).then(() => resolve(true))
  );
}

export function getProducts(access: string) {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + access
    }
  }   

  return new Promise<{ data: IProd[] }>((resolve) =>
    axios.get(MYSERVR, config).then(res=> resolve({ data: res.data }))
  );
}