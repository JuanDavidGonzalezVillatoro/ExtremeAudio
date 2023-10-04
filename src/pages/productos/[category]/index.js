import { Category, Producto } from "@/api";

export { default } from "./category";

export async function getServerSideProps(context) {
   const { query, params } = context;
   const { page = 1 } = query;
   const { category } = params; 

    //  params: { category },
    //  query: { page = 1 },

// export async function getServerSideProps(context) {
//   const {
//     params: { category },
//     query: { page = 1 },
//   } = context;


   const categoryCtrl = new Category();
   const responseCategory = await categoryCtrl.getBySlug(category);

   const productoCtrl = new Producto();
   const responseProductos = await productoCtrl.getproductosByCategorySlug(category, page);

return {
     props: {
       category: responseCategory,
       productos: responseProductos.data,
       pagination: responseProductos.meta.pagination,
     },
   };
}