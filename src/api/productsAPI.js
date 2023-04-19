import axios from 'axios';

const poductsApi = axios.create({
  baseURL: "http://localhost:3000/products",
});

export const getProducts=async ()=>{
  const res=  await poductsApi.get("/");
  return res.data
}
export const createProduct = async (product) => await poductsApi.post("/", product);
export const deleteProduct =async (product)=>{
  await poductsApi.delete(`/${product.id}`);
};
export const updateProduct = async (product) =>await poductsApi.put(`/${product.id}`, product);
