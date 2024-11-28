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

import { Heading, Alert, Tooltip, Badge } from "@medusajs/ui";
import { ArrowRightOnRectangle, InformationCircle } from "@medusajs/icons";
import { CircularProgress, Grid } from "@mui/material";
import { useAdminCustomQuery } from "medusa-react"
import { OutOfTheStockVariantsTable } from "./out-of-the-stock-variants-table";
import { OutOfTheStockVariantsModal } from "./out-of-the-stock-variants-all";
import { AdminOutOfTheStockVariantsStatisticsQuery, OutOfTheStockVariantsCountResponse, transformToVariantTopTable } from "./helpers";

const OutOfTheStockVariants = () => {
  const { data, isError, isLoading, error } = useAdminCustomQuery<
    AdminOutOfTheStockVariantsStatisticsQuery,
    OutOfTheStockVariantsCountResponse
  >(
    `/products-analytics/out-of-the-stock-variants`,
    [],
    {
      limit: 5
    }
  )

  if (isLoading) {
    return <CircularProgress size={12}/>
  }

  if (isError) {
    const trueError = error as any;
    const errorText = `Error when loading data. It shouldn't have happened - please raise an issue. For developer: ${trueError?.response?.data?.message}`
    return <Alert variant="error">{errorText}</Alert>
  }

  if (data.analytics == undefined) {
    return <Heading level="h3">Cannot get variants</Heading>
  }

  return <OutOfTheStockVariantsTable tableRows={transformToVariantTopTable(data.analytics)}/>
}

export const OutOfTheStockVariantsCard = () => {
  return (
    <Grid container paddingBottom={2} spacing={3}>
      <Grid item xs={12} md={12}>
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item>
              <ArrowRightOnRectangle/>
            </Grid>
            <Grid item>
              <Heading level="h2">
                Out of the stock variants
              </Heading>
            </Grid>
            <Grid item>
              <Tooltip content='It includes only published products and not gift cards'>
                <InformationCircle />
              </Tooltip>
            </Grid>
          </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container direction="row" spacing={2} alignItems="center">
          <Grid item>
            <Heading level="h3">
              Last 5 variants
            </Heading>
          </Grid>
          <Grid item>
            <OutOfTheStockVariantsModal/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <OutOfTheStockVariants/>
      </Grid>
    </Grid>
  )
}