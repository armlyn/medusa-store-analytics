/*
 *
 *
 * MIT License
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Heading, Text, FocusModal, Button, Alert } from "@medusajs/ui";
import { CircularProgress, Grid, Box } from "@mui/material";
import { useAdminCustomQuery } from "medusa-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Table } from "@medusajs/ui";
import { useMemo } from "react";
import {
  AdminOutOfTheStockVariantsStatisticsQuery,
  OutOfTheStockVariantsCountResponse,
  OutOfTheStockVariantsTableRow,
  transformToVariantTopTable,
} from "./helpers";

function TablePaginated({
  variants,
}: {
  variants: OutOfTheStockVariantsTableRow[];
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const pageCount = Math.ceil(variants.length / pageSize);
  const canNextPage = useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = useMemo(() => currentPage - 1 >= 0, [currentPage]);

  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentVariants = useMemo(() => {
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, variants.length);

    return variants.slice(offset, limit);
  }, [currentPage, pageSize, variants]);

  return (
    <div className="flex gap-1 flex-col">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Variante</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentVariants.map((variant) => {
            return (
              <Table.Row
                key={variant.variantId}
                className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap"
              >
                <Table.Cell>
                  <Grid container justifyContent={"space-between"}>
                    <Grid item>
                      <Link to={`../products/${variant.productId}`}>
                        <Grid container alignItems={"center"} spacing={2}>
                          {variant.thumbnail && (
                            <Grid item>
                              <Box
                                sx={{
                                  width: 30,
                                  height: 40,
                                }}
                                component="img"
                                alt={`Miniatura para ${variant.productTitle}`}
                                src={variant.thumbnail}
                              />
                            </Grid>
                          )}
                          <Grid item>
                            {variant.productTitle} - {variant.variantTitle}
                          </Grid>
                        </Grid>
                      </Link>
                    </Grid>
                  </Grid>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Table.Pagination
        count={variants.length}
        pageSize={pageSize}
        pageIndex={currentPage}
        pageCount={variants.length}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </div>
  );
}

const OutOfTheStockVariantsModalContent = () => {
  const { data, isError, isLoading, error } = useAdminCustomQuery<
    AdminOutOfTheStockVariantsStatisticsQuery,
    OutOfTheStockVariantsCountResponse
  >(`/products-analytics/out-of-the-stock-variants`, [], {
    limit: 0,
  });

  if (isLoading) {
    return (
      <FocusModal.Body>
        <CircularProgress />
      </FocusModal.Body>
    );
  }

  if (isError) {
    const trueError = error as any;
    const errorText = `Error al cargar datos. No debería haber ocurrido. Por favor, plantee un problema. Para desarrolladores: ${trueError?.response?.data?.message}`;
    return (
      <FocusModal.Body>
        <Alert variant="error">{errorText}</Alert>
      </FocusModal.Body>
    );
  }

  return (
    <FocusModal.Body>
      <Grid
        container
        direction={"column"}
        alignContent={"center"}
        paddingTop={8}
      >
        <Grid item>
          <Heading>Todas las variantes fuera de stock</Heading>
        </Grid>
        <Grid item>
          <Text>Puede hacer clic en la fila para ir al producto.</Text>
        </Grid>
        <Grid item paddingTop={5}>
          <TablePaginated
            variants={transformToVariantTopTable(data.analytics)}
          />
        </Grid>
      </Grid>
    </FocusModal.Body>
  );
};

export const OutOfTheStockVariantsModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <FocusModal open={open} onOpenChange={setOpen}>
      <FocusModal.Trigger asChild>
        <Button size="small" variant="secondary">
          Ver todo
        </Button>
      </FocusModal.Trigger>
      <FocusModal.Content>
        <FocusModal.Header />
        <OutOfTheStockVariantsModalContent />
      </FocusModal.Content>
    </FocusModal>
  );
};
