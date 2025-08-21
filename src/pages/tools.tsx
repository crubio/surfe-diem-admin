import SiteMapGenerator from "@features/tools/sitemap-gen"
import { Stack } from "react-bootstrap"

const SPOT_URL_PREFIX = "https://www.surfe-diem.com/spot/"
const LOCATION_URL_PREFIX = "https://www.surfe-diem.com/location/"

export const SiteToolsPage = () => {

  return (
    <>
    <div className="py-4">
    <Stack direction="horizontal" gap={3} className="mb-4">
      <div className="p-2">
        <h1>Site tools</h1>
      </div>
      {/* <div className="p-2 ms-auto"></div> */}
    </Stack>
    </div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <SiteMapGenerator />
        </div>
      </div>
    </div>
  </>
  )
}