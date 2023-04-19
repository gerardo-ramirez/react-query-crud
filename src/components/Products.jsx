import React from 'react'
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { getProducts, updateProduct, deleteProduct } from '../api/productsAPI';

export const Products = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["products"], //nombre de nuestra peticion
    queryFn: getProducts, //funcion que hace la llamada fetch
    select: (product) => product.sort((a, b) => b.id - a.id), //trae los datos y los ordena
  });
  //llamamos a useQueryClient pára comparar caché
  const queryClient = useQueryClient();
  //functions:
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products"); //funciona como swr se fija si cambiaron los datos
    },
  });
  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products"); //funciona como swr se fija si cambiaron los datos
    },
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      Products list
      {data.map((product) => {
        return (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={() => deleteProductMutation.mutate(product)}>
              delete
            </button>
            <input
              id={product.id}
              checked={product.inStock}
              type="checkbox"
              onChange={(e) =>
                updateProductMutation.mutate({
                  ...product,
                  inStock: e.target.checked,
                })
              }
            />
            <label htmlFor={product.id}>In stock</label>
          </div>
        );
      })}
    </div>
  );
}
