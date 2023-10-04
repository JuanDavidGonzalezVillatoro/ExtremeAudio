import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { size } from "lodash";
import { BasicLayout } from "@/layouts";
import {
  GridProductos,
  NoResult,
  Pagination,
  Separator,
} from "@/components/Shared";

export default function SearchPage(props) {
  const { productos, pagination, searchText } = props;
  const hasResult = size(productos) > 0;

  useEffect(() => {
    document.getElementById("search-producto").focus();
  }, []);

  return (
    <>
      <BasicLayout relative isOpenSearch>
        <Container>
          <Separator height={50} />

          <h2>Resultados para: {searchText}</h2>
          {hasResult ? (
            <>
              <GridProductos productos={productos} />
              <Separator height={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <NoResult text="No se han encontrado resultados para tu búsqueda" />
          )}

          <Separator height={100} />
        </Container>
      </BasicLayout>
    </>
  );
}