import './App.css';
import addIcon from './add.png';
import deleteIcon from './bin.png';
import doneIcon from './done.png';
import { useRef, useState, useEffect } from 'react';

function App() {

  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const inputRef = useRef();

  // جلب المهام المخزنة عند تحميل الصفحة
  useEffect(() => {
    fetch('http://localhost:8000/api/notes/')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching notes:', error));
  }, []);
  

  // إضافة مهمة جديدة وإرسالها إلى Django
  const addTask = () => {
    const x = inputRef.current.value;

    if (x === "") {
      setMessage("It can't be an empty task, please enter your task!");
      setMessageClass("error");
    } else {
      const newTask = { text: x, done: false };
      
      fetch('http://localhost:8000/api/notes/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
      .then(response => response.json())
      .then(data => {
        setTasks([...tasks, data]);
        inputRef.current.value = "";
        setMessage("Your task was added successfully.");
        setMessageClass("success");
      });
    }
  };

  // حذف المهمة
  const deleteTask = (index) => {
    const taskToDelete = tasks[index];

    fetch(`http://localhost:8000/api/notes/delete/${taskToDelete.id}/`, {
      method: 'DELETE',
    })   
    .then(() => {
      setMessage("You deleted this task.");
      setMessageClass("error");
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    });
  };

  // تحديد المهمة كمكتملة
  const doneTask = (index) => {
    const taskToUpdate = tasks[index];
    const updatedTask = { ...taskToUpdate, done: !taskToUpdate.done };

    fetch(`http://localhost:8000/api/notes/update/${taskToUpdate.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
    .then(() => {
      const newTasks = [...tasks];
      newTasks[index] = updatedTask;
      setTasks(newTasks);
      setMessage(updatedTask.done ? "Keep going and finish all tasks." : "");
      setMessageClass("success");
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="App">
      <div className='container'>
        <h2>To Do List</h2>
        <div className='list'>
          <input onKeyPress={handleKeyPress} ref={inputRef} placeholder='add your task here'></input>
          <button onClick={addTask}><img src={addIcon} alt='' /></button>
        </div>
        <p className={messageClass}>{message}</p>
        <ul>
          {tasks.map(({ id, text, done }, index) => (
            <div className="listtask" key={id}>
              <li className={done ? 'done' : ''} onClick={() => doneTask(index)}>{text}</li>
              <button onClick={() => doneTask(index)}>
                <img src={doneIcon} alt="" />
              </button>
              <button onClick={() => deleteTask(index)}>
                <img src={deleteIcon} alt="" />
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;





// import './App.css';
// import addIcon from './add.png';
// import deleteIcon from './bin.png';
// import doneIcon from './done.png'
// import { useRef,useState } from 'react';

// function App() {

//   const [tasks,setTasks] = useState([]);
//   const [message, setMessage] = useState("");
//   const [messageClass, setMessageClass] = useState("");

//   const inputRef = useRef();


//   const addTask = () =>{
//     const x = inputRef.current.value;
  
//     if (x === ""){
//       setMessage("It can't be an empty task, please enter your task !");
//       setMessageClass("error"); 
//     }else{
//       const x2 = {done:false,x}
//       setTasks([...tasks,x2]);
//       inputRef.current.value="";
//       setMessage("Your task was added successfully.");
//       setMessageClass("success");
//     }
//   }

//   const deleteTask = (index) => {
//     setMessage("You deleted this task.");
//     setMessageClass("error"); 
//     const x = [...tasks];
//     x.splice(index,1);
//     setTasks(x);
//   }

//   const doneTask = (index) =>{
//     const x = [...tasks];
//     x[index].done = !x[index].done;
//     setTasks(x)
//     if (x[index].done===true){
//       setMessage("Keep going and finish all tasks.");
//       setMessageClass("success");
//     }else{
//       setMessage("");
//     }
//   }

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       addTask();
//     }
//   };

//   return (
//     <div className="App">
//       <div className='container'>
//           <h2>To Do List</h2>
//           <div className='list'>
//             <input onKeyPress={handleKeyPress} ref={inputRef} placeholder='add your task here' ></input>
//             <button onClick={addTask}><img src={addIcon} alt='' /></button>
//           </div>
//           <p className={messageClass}>{message}</p>
//           <ul>
//             {tasks.map(({x,done},index)=>{
//               return (
//                 <div class="listtask">
//                   <li className={done?'done':''} key={index} onClick={()=>doneTask(index)} >{x}</li>
//                   <button onClick={()=>doneTask(index)} >
//                     <img src={doneIcon} alt="" ></img>
//                   </button>
//                   <button onClick={()=>deleteTask(index)}>
//                     <img src={deleteIcon} alt="" ></img>
//                   </button>
//                 </div>
//             );
//             })}
//           </ul>
//       </div>
//     </div>
//   );
// }

// export default App;
