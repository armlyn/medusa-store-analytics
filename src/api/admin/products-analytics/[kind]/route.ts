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

import type { 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/medusa"
import { OrderStatus } from "@medusajs/medusa";
import { MedusaError, MedusaErrorTypes } from "@medusajs/utils"
import ProductsAnalyticsService from "../../../../services/productsAnalytics";

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {

  const kind = req.params.kind;
  const dateRangeFrom = req.query.dateRangeFrom;
  const dateRangeTo = req.query.dateRangeTo;
  const dateRangeFromCompareTo = req.query.dateRangeFromCompareTo;
  const dateRangeToCompareTo = req.query.dateRangeToCompareTo;
  const orderStatusesFromQuery: string[] = req.query.orderStatuses as string[];

  const orderStatuses: OrderStatus[] = orderStatusesFromQuery !== undefined ? 
    orderStatusesFromQuery.map(status => OrderStatus[status.toUpperCase()]).filter(orderStatus => orderStatus !== undefined): [];

  let result: any;
  const productsAnalyticsService: ProductsAnalyticsService = req.scope.resolve('productsAnalyticsService');

  try {
    switch (kind) {
      case 'popularity-by-count':
        result = await productsAnalyticsService.getTopVariantsByCount(
          orderStatuses,
          dateRangeFrom ? new Date(Number(dateRangeFrom)) : undefined, 
          dateRangeTo ? new Date(Number(dateRangeTo)) : undefined, 
          dateRangeFromCompareTo ? new Date(Number(dateRangeFromCompareTo)) : undefined, 
          dateRangeToCompareTo ? new Date(Number(dateRangeToCompareTo)) : undefined, 
        );
        break;
      case 'returned-by-count':
        result = await productsAnalyticsService.getTopReturnedVariantsByCount(
          dateRangeFrom ? new Date(Number(dateRangeFrom)) : undefined, 
          dateRangeTo ? new Date(Number(dateRangeTo)) : undefined, 
        );
        break;
      case 'sold-count':
        result = await productsAnalyticsService.getProductsSoldCount(
          orderStatuses,
          dateRangeFrom ? new Date(Number(dateRangeFrom)) : undefined, 
          dateRangeTo ? new Date(Number(dateRangeTo)) : undefined, 
          dateRangeFromCompareTo ? new Date(Number(dateRangeFromCompareTo)) : undefined, 
          dateRangeToCompareTo ? new Date(Number(dateRangeToCompareTo)) : undefined, 
        );
        break;
      case 'out-of-the-stock-variants':
        const limit = req.query.limit as string;
        result = await productsAnalyticsService.getOutOfTheStockVariants(limit ? parseInt(limit) : undefined);
        break;
    }
    res.status(200).json({
      analytics: result
    });
  } catch (error) {
    throw new MedusaError(
      MedusaErrorTypes.DB_ERROR,
      error.message
    )
  }
}