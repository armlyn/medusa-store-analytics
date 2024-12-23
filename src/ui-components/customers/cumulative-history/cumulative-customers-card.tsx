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

import { Heading } from "@medusajs/ui";
import { Users } from "@medusajs/icons";
import { Grid } from "@mui/material";
import type { DateRange } from "../../utils/types";
import { CumulativeCustomersChart } from "./cumulative-customers-chart";

export const CumulativeCustomersCard = ({
  dateRange,
  dateRangeCompareTo,
  compareEnabled,
}: {
  dateRange?: DateRange;
  dateRangeCompareTo?: DateRange;
  compareEnabled: boolean;
}) => {
  return (
    <Grid container paddingBottom={2} spacing={3}>
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          <Grid item>
            <Users />
          </Grid>
          <Grid item>
            <Heading level="h2">Clientes acumulados</Heading>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <CumulativeCustomersChart
          dateRange={dateRange}
          dateRangeCompareTo={dateRangeCompareTo}
          compareEnabled={compareEnabled}
        />
      </Grid>
    </Grid>
  );
};
