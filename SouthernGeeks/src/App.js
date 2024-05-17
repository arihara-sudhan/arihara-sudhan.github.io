import React from 'react';
import "./App.css";
import JSONDATA from "./tasks.json";

function App() {
  return (
    <div className="App">
      
      <img src="https://arihara-sudhan.github.io/blog/img/logo.png" alt="" id="logo"/>
      <h1>SOUTHERN GEEKS</h1>
      {JSONDATA.map(task => (
        <div className='TASK'>
          <div className='CHRONA'>
            <span>(WEEK {task.week})-----|||||||||||----({task.date})</span>
          </div>
          <div className='TASKS'>
            {task.topics.map((topic, idx) => (
              <p>{idx+1}.{topic}   <span className='completed'>COMPLETED</span> <span className='refer'>REFERENCE</span></p>
            ))}
          </div>
          </div>
      ))}
    </div>
  );
}

export default App;
