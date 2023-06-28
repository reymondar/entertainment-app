import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import App from '../components/App'

const IndexPage: React.FC<PageProps> = () => {
  return <App />
}

export const Head: HeadFC = () => <title>Entretainment Web App</title>


export default IndexPage
