import { Container } from "semantic-ui-react";
import { size } from "lodash";
import { BasicLayout } from "@/layouts";
import {
  GridProductos,
  Separator,
  NoResult,
  Pagination,
  Seo
} from "@/components/Shared";

export default function CategoryPage(props) {
  const { productos, category, pagination } = props;
  const hasProducts = size(productos) > 0;

  return (
    <>
      <Seo title={`${category.attributes.title}`} />

      <BasicLayout relative>
        <Container>
          <Separator height={50} />

          <h2>{category.attributes.title}</h2>

          {hasProducts ? (
            <>
              <GridProductos productos={productos} />
              <Separator height={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <NoResult
              text={`La categoría "${category.attributes.title}" aún no tiene productos`}
            />
          )}

          <Separator height={100} />
        </Container>
      </BasicLayout>
    </>
  );
}

// export default function CategoryPage(props) {
//   console.log(props);

//   return(
//     <div>
//       <h2>CATEGORIAAAAA</h2>
//     </div>

//   );
  
// }