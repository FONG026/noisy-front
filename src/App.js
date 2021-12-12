import{useEffect, useState} from 'react';
import Pusher from 'pusher-js';
import noisy from './ressource/noisy.png';
function App() {
  var monHeure = new Date();
  var heure =  monHeure.getHours()+":"+monHeure.getMinutes();
  const newHeure = heure;
  
  const[pseudo,setPseudo]=useState("Pseudo");
  const[messages,setMessages]=useState([]);
  const[message,setMessage]=useState('');
  let lesMessages=[];
  useEffect(()=>{
    Pusher.logToConsole = true;

    const pusher = new Pusher('91fc9a18db85a7249aab', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('discussion');
    channel.bind('message', function(data) {
      lesMessages.push(data);
      setMessages(lesMessages);
    }) ;

  },[]);
  const submit=async e =>{
    e.preventDefault();
    await fetch("http://localhost:8000/api/messages",{
      method:"POST",
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        pseudo,
        message
      })   
     });
     setMessage('');
  }
  return (
    
    <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white " style={{
      
    }} >
      
    <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none second " style={{
     
    }}>
            <input className="form-control yo1" value={pseudo} onChange={e => setPseudo(e.target.value)} />
            
    </div>
    
    <div className="container">
    <div className="list-group list-group-flush border-bottom scrollarea border" >
      {messages.map(message =>{
        return(   <div className="list-group-item list-group-item-action py-3 lh-tight">
        <div className="d-flex w-100 align-items-center justify-content-between">
          <strong className="mb-1">{message.pseudo}</strong>
            </div>
        <div className="col-10 mb-1 small">{message.message}</div>
        <small class="text-muted">{newHeure}</small>
      </div>)
        
      })}
  
   
     
    </div>
  
  <form onSubmit={e=> submit(e)}>
   
    <input className="form-control yo"  placeholder="Ecrire un message..." value={message}
    
    onChange={e=>setMessage(e.target.value)}
   
    />
      <button className="btn btn-outline-info"> Envoyer</button>
  </form>
  
  </div>
  
  </div>
  );
}

export default App;
<img src={noisy} class="rounded float-left" alt="noisy"></img>