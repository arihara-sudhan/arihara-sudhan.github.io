import React from 'react';
import "./App.css";
import JSONDATA from "./tasks.json";

function App() {
  return (
    <div className="App">
      
      <img src="https://arihara-sudhan.github.io/blog/img/logo.png" alt="" id="logo"/>
      <h1>ARI LEARNS</h1>
      {JSONDATA.map(task => (
        <div className='TASK'>
          <div className='CHRONA'>
            <span>DAY {task.day} - {task.date}</span>
          </div>
          <div className='TASKS'>
            {task.topics.map((topic, idx) => (
              <p>{idx+1}. {topic}<a href={task.reference[idx]}>
                 <span className='refer'>REFERENCE</span></a></p>
            ))}
          </div>
          </div>
      ))}
    </div>
  );
}

export default App;
