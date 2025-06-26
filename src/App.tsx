import { useEffect, useRef } from "react";
import { APITester } from "./APITester";
import "./index.css";

export function App() {

  const ref = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const interval = 1000;
    const curr = ref.current;
    console.log(curr?.children);
    for (const [index,val] of Array(...curr?.children|| []).entries() ){
      setTimeout(()=>{
        val.classList.add('test');
      },index*interval)

    }
  })

  return (
    <div className="app" ref={ref}>
      <h1>You&apos;re Invited!</h1>
      <p>To the Wedding of:</p>
      <p>Samuel Jarvis</p>
      <p>&</p>
      <p>Claudine Richardson</p>
      <APITester/>
    </div>
  );
}

export default App;
