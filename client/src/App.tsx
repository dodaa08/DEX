import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"


const App = ()=>{
  const routes = [
    {
      path : "",
      element : <Landing />
    }
  ]
  return(
    <>
    <BrowserRouter>
      <Routes>
        {
          routes.map((route, index)=>(
            <Route key={index} path={route.path} element={route.element} />
          ))
        }
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;