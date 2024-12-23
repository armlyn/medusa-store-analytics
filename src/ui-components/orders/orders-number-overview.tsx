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

import { Heading, Alert } from "@medusajs/ui";
import { CircularProgress, Grid } from "@mui/material";
import { useAdminCustomQuery } from "medusa-react";
import type { DateRange } from "../utils/types";
import { IconComparison } from "../common/icon-comparison";
import { PercentageComparison } from "../common/percentage-comparison";
import { OrderStatus } from "../utils/types";

type AdminOrdersStatisticsQuery = {
  orderStatuses: string[];
  dateRangeFrom?: number;
  dateRangeTo?: number;
  dateRangeFromCompareTo?: number;
  dateRangeToCompareTo?: number;
};

export type OrdersCountResponse = {
  analytics: {
    dateRangeFrom: number;
    dateRangeTo: number;
    dateRangeFromCompareTo?: number;
    dateRangeToCompareTo?: number;
    current: string;
    previous: string;
  };
};

export const OrdersNumber = ({
  orderStatuses,
  dateRange,
  dateRangeCompareTo,
  compareEnabled,
}: {
  orderStatuses: OrderStatus[];
  dateRange?: DateRange;
  dateRangeCompareTo?: DateRange;
  compareEnabled: boolean;
}) => {
  const { data, isLoading, isError, error } = useAdminCustomQuery<
    AdminOrdersStatisticsQuery,
    OrdersCountResponse
  >(`/orders-analytics/count`, [orderStatuses, dateRange, dateRangeCompareTo], {
    orderStatuses: Object.values(orderStatuses),
    dateRangeFrom: dateRange ? dateRange.from.getTime() : undefined,
    dateRangeTo: dateRange ? dateRange.to.getTime() : undefined,
    dateRangeFromCompareTo: dateRangeCompareTo
      ? dateRangeCompareTo.from.getTime()
      : undefined,
    dateRangeToCompareTo: dateRangeCompareTo
      ? dateRangeCompareTo.to.getTime()
      : undefined,
  });

  if (isLoading) {
    return <CircularProgress size={12} />;
  }

  if (isError) {
    const trueError = error as any;
    const errorText = `Error al cargar datos. No debería haber ocurrido. Por favor, plantee un problema. Para desarrolladores: ${trueError?.response?.data?.message}`;
    return <Alert variant="error">{errorText}</Alert>;
  }

  if (data.analytics == undefined) {
    return <Heading level="h3">No puedo recibir pedidos</Heading>;
  }

  return (
    <Grid container alignItems={"center"} spacing={2}>
      <Grid item>
        <Heading level="h1">{data.analytics.current}</Heading>
      </Grid>
      {compareEnabled && dateRangeCompareTo && (
        <Grid item>
          <Grid container alignItems={"center"}>
            <Grid item>
              <IconComparison
                current={parseInt(data.analytics.current)}
                previous={
                  data.analytics.previous
                    ? parseInt(data.analytics.previous)
                    : undefined
                }
              />
            </Grid>
            {data.analytics.previous !== undefined && (
              <Grid item>
                <PercentageComparison
                  current={data.analytics.current}
                  label=""
                  previous={data.analytics.previous}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
