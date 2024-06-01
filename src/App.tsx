import { FunctionComponent } from 'react'
interface AppProps {
  message: string
}

const App: FunctionComponent<AppProps> = ({ message }) => {
  return <div>Hello World!</div>
}

export default App
