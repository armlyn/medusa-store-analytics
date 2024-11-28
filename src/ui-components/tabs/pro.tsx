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

import { Container, Heading, Text } from "@medusajs/ui";
import { Grid, Link } from "@mui/material";

const HEIGHT = 330;

const ProTab = () => {
  return (
    <Grid container spacing={2} justifyContent={"center"}>
      <Grid container justifyContent={"center"} marginTop={6}>
        <Grid item>
          <Heading level="h1" style={{ color: "purple" }}>
            Lleva el análisis de tu tienda al siguiente nivel
          </Heading>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} marginTop={1} spacing={5}>
        <Grid item xs={3} md={3} xl={3}>
          <Container
            style={{ borderColor: "purple", borderWidth: 1, height: HEIGHT }}
          >
            <Grid container rowSpacing={3}>
              <Grid item>
                <Heading level="h1">Panel de control personalizado</Heading>
              </Grid>
              <Grid item>
                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    <Text>
                      Crea tu propio panel de control con las estadísticas
                      disponibles
                    </Text>
                  </li>
                  <li style={{ marginTop: 3 }}>
                    <Text>Agregar, eliminar o mover cualquier estadística</Text>
                  </li>
                  <li style={{ marginTop: 3 }}>
                    <Text>
                      Cambie el tamaño de los widgets según sus necesidades
                    </Text>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item xs={3} md={3} xl={3}>
          <Container
            style={{ borderColor: "purple", borderWidth: 1, height: HEIGHT }}
          >
            <Grid container rowSpacing={3}>
              <Grid item>
                <Heading level="h1">Selector de rango de fechas</Heading>
              </Grid>
              <Grid item>
                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    <Text>
                      Olvídate de la semana pasada, del mes pasado, del año
                      pasado
                    </Text>
                  </li>
                  <li style={{ marginTop: 3 }}>
                    <Text>
                      Elija cualquier rango de fechas para ver las estadísticas
                      exactamente para ese rango
                    </Text>
                  </li>
                  <li style={{ marginTop: 3 }}>
                    <Text>
                      Compárese con cualquier rango de fechas, por ejemplo,
                      compare diciembre o Black Friday
                    </Text>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item xs={3} md={3} xl={3}>
          <Container
            style={{ borderColor: "purple", borderWidth: 1, height: HEIGHT }}
          >
            <Grid container rowSpacing={3}>
              <Grid item>
                <Heading level="h1">Estadísticas avanzadas</Heading>
              </Grid>
              <Grid item>
                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    <Text>Más de 15 estadísticas profesionales</Text>
                  </li>
                  <li style={{ marginTop: 3 }}>
                    <Text>
                      Comprueba los embudos relacionados con los carritos y los
                      pagos, y cómo se transforman en compras
                    </Text>
                  </li>
                  <li style={{ marginTop: 3 }}>
                    <Text>Vea sus análisis por canal de venta</Text>
                  </li>
                  <li style={{ marginTop: 3 }}>
                    <Text>
                      Información detallada sobre descuentos, tarjetas de regalo
                      y cómo influyen en los pedidos
                    </Text>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item xs={3} md={3} xl={3}>
          <Container
            style={{ borderColor: "purple", borderWidth: 1, height: HEIGHT }}
          >
            <Grid container rowSpacing={3}>
              <Grid item>
                <Heading level="h1">Soporte profesional</Heading>
              </Grid>
              <Grid item>
                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    <Text>Prioridad para errores</Text>
                  </li>
                  <li style={{ marginTop: 3 }}>
                    <Text>
                      Canal dedicado para sus solicitudes de funciones para
                      evaluación
                    </Text>
                  </li>
                  <li style={{ marginTop: 3 }}>
                    <Text>
                      Establecer una cooperación a largo plazo también para
                      otros complementos
                    </Text>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        direction={"column"}
        alignContent={"center"}
        marginTop={6}
      >
        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          columnSpacing={1}
        >
          <Grid item>
            <Heading level="h1" color="purple">
              Contacto:
            </Heading>
          </Grid>
          <Grid item>
            <Link href="mailto:labs@rsoftcon.com">
              <Heading level="h1" color="purple">
                labs@rsoftcon.com
              </Heading>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProTab;
