import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useLocation } from 'react-router-dom'


function makeBreadCrumbs() {
  const path = useLocation().pathname
  const parts = path.split('/').filter((part) => part !== '')

  const generateFromParts = (parts: string[]) => {
    const crumbs = parts.map((part, index) => {
      const path = parts.slice(0, index + 1).join('/')
      if (index === parts.length - 1) {
        return (
          <Breadcrumb.Item key={index} active>
            {part}
          </Breadcrumb.Item>
        )
      } else {
        return (
          <Breadcrumb.Item key={index} href={`/${path}`}>
            {part}
          </Breadcrumb.Item>
        )
      }
    })
    return (
      <Breadcrumb>
        {crumbs}
      </Breadcrumb>
    )
  }

  return (
    generateFromParts(parts)
  )
}

export default makeBreadCrumbs