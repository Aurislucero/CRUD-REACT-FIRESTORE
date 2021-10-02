import React from 'react';
import {firebase} from './firebase';

function App() {
  const [tareas,setTareas] = React.useState([])
  const [tarea,setTarea] = React.useState("")
  const [modoedicion,setModoedicion] = React.useState(false)
  const [id,setId] = React.useState("")
  React.useEffect(()=>{
        const obtenerDatos= async ()=>{
          try{
             const db = firebase.firestore()
             const data = await db.collection('tareas').get()
             
             const arrayData = data.docs.map(doc=>({id:doc.id,...doc.data()}))
             console.log(arrayData);
             setTareas(arrayData)
          } catch(error){
             console.log(error)
          }
        }

        obtenerDatos();
  },[])

   const agregarTarea = async (e)=>{
     e.preventDefault();
     if(!tarea.trim()){
       console.log("esta vacío");
       return
     }

     try{
      const db = firebase.firestore()
      const nuevaTtarea ={
        name: tarea,
        fecha:Date.now()
      }
      const data = await db.collection('tareas').add(nuevaTtarea)
      setTareas([...tareas,{...nuevaTtarea,id:data.id}])
      setTarea("")
   } catch(error){
      console.log(error)
   }
   }

   const editar= (item)=>{
      setModoedicion(true)
      setTarea(item.name)
      setId(item.id)
  }
  const editarTarea = async (e)=>{
    e.preventDefault();
    if(!tarea.trim()){
      console.log("esta vacío");
      return
    }

    try{
     const db = firebase.firestore()
     await db.collection('tareas').doc(id).update({name:tarea})
     const arrayEditado = tareas.map(item=>(
       item.id === id ? {id:item.id,date:item.id,name:tarea} : item
     )) 
     setTareas(arrayEditado)
     setModoedicion(false)
     setTarea("")
     setId("")  
  } catch(error){
     console.log(error)
  }
}
   const eliminar= async (id)=>{
    try{
     const db = firebase.firestore()
     await db.collection('tareas').doc(id).delete()
     const arrayFiltrado = tareas.filter(item => item.id !== id)
     setTareas(arrayFiltrado)
  } catch(error){
     console.log(error)
  }
  }


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
            <ul className="list-group">
                    {
                      tareas.map(item=>(
                        <li key={item.id} className="d-flex list-group-item justify-content-between" style={{alignItems:'center'}}>
                          <div>{item.name}</div>
                          <div>
                          <button className="btn btn-success btn-sm float-right m-2" onClick={() =>eliminar(item.id)}>Eliminar</button>
                          <button className="btn btn-warning btn-sm float-right" onClick={() =>editar(item)}>Editar</button>                       
                          </div>
                          </li>
                      ))
                    }
            </ul>
        </div>
        <div className="col-md-6">
          <h3>Formulario</h3>
          <form action="" onSubmit={modoedicion?editarTarea:agregarTarea}>
          <input 
                type="text" 
                name="" 
                id=""
                placeholder="Ingrese tarea"
                className="form-control mb-2"
                onChange ={ (e)=> setTarea(e.target.value)}
                value={tarea}
                />
                <div className="row m-0">
                <button className={modoedicion?"col-md-12 btn btn-warning btn-block":"col-md-12 btn btn-outline-info btn-block"} type="submit" >
                {
                  modoedicion?"Editar":"Agregar"
                }
                </button>
                </div>

          </form>
          </div>
      </div>
      {/* <Router>
      <div className="container mt-5">
        <div className="btn-group">
          <Link to="/" className="btn btn-dark">Inicio</Link>
          <Link to="/bla" className="btn btn-dark">Bla bla bla</Link>
          <Link to="/nosotros" className="btn btn-dark">Nosotros</Link>
          <NavLink to="/users" className="btn btn-dark" activeClassName="active">Users</NavLink>
        </div>  
        <hr />
        <Switch>
          <Route path="/" exact>
            <Inicio />
          </Route>
          <Route path="/bla">
            <Bla />
          </Route>
          <Route path="/users/:id" exact>
            <User />
          </Route>
          <Route path="/users">
            <Parametros />
          </Route>
          <Route path="/nosotros">
            <Nosotros />
          </Route>
        </Switch>
      </div>
    </Router> */}
  </div>
  );
}

export default App;
