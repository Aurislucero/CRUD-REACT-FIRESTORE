import React from 'react'

export const Nosotros = () => {
    const [usuarios, setUsuarios] = React.useState([])
    React.useEffect(() => {
        obtenerData()
    }, [])

    const obtenerData= async ()=>{
      const data =  await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await data.json();
      setUsuarios(users)
    };

    return (
        <div>
            <h1>Nosotros</h1>
            <ul>
                {
                   usuarios.map(item=>(
                       <li key={item.id}>{item.name}</li>
                   )) 
                }
            </ul>
        </div>
    )
}
