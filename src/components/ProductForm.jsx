import React from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import { createProduct,deleteProduct } from '../api/productsAPI';



export const ProductForm = () => {
    //llamamos a useQueryClient pára comparar caché
    const queryClient= useQueryClient(); 

  const addProductMutation  = useMutation({
        mutationFn: createProduct,
        onSuccess:()=>{
            queryClient.invalidateQueries('products') //funciona como swr se fija si cambiaron los datos
        }
        ,
        onError:()=>console.log('error')
    })

  

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target)
        const product =Object.fromEntries(formData);
        
        console.log(product)
        addProductMutation.mutate({...product,
        inStock: true });
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" id="name" name="name" />

        <label>Description</label>
        <input type="text" id="description" name="description" />

        <label>Price</label>
        <input type="number" id="price" name="price" />

        <button>
            Add Product
        </button>
      </form>
    </div>
  );
}
