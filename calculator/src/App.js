import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProgressBar, Table,} from 'react-bootstrap'
import Button from '@restart/ui/esm/Button';
// import { useLocalStorage } from "../src/useLocalStorage";


function App() {
  const [calc,setCalc] = useState("");
  const [res,setRes] = useState([]);
  const [result,setResult] = useState("");
  const ops = ['/','*','+','-','.'];
  
  
  const onDelete = async(id) => {
     await axios.delete(`http://localhost:4000/delete/${id}`).catch(console.log)
    await getData()
  }

  const getData =async () => {
    const res = await axios.get('http://localhost:4000/get-data').catch(console.log)
    setRes(res.data.data)
  }
  useEffect(() => {
   getData()
  }, [])

  // console.log(res[2]?.result);

  // const [name, setName] = useLocalStorage("result", "");

 
  // const [user, setUser] = useState({
  //   inputvalue: "sadasdasdasdasdsa"
  // });
 
  // const { inputvalue} = user;
   
  // const onInputChange = e => {
  //   setUser({ ...updateCalc });
  // };
   
  const onKeyPress1 = async e => {
    console.log('user is typing', e);
    // e.preventDefault();
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      url: "http://localhost:4000/insertValue",
      // data:(eval(calc).toString()),
      data:{calc: eval(calc).toString()},
    }).then(function (response) {
      console.log(response);
    });

    await getData()
   
  }
//    let header = w.Header()
// header.Add("Access-Control-Allow-Origin", "*")
// header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
// header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
//     let result = await axios.post("http://localhost/phpmyadmin/index.php?route=/table/structure&db=calculator&table=inputvalue:3000/posts",{user},header)
//     alert('Data Inserted');
//     console.log('this is resule', result)
//     history.push("/");
//   };
 

  // to input user value
  function InputValue(e) {
    setCalc(e.target.value);
    
  }


// to display Enter Key
  const EnterKeypress = (e) => {
    //it triggers by pressing the enter key
  if (e.which === 13) {
    calculate()
  }
};

// to update value
const updateCalc = value =>{
  if(
    ops.includes(value) && calc === '' ||
    ops.includes(value) && ops.includes(calc.slice(-1)
    )
  ) {
    return;
  }
  setCalc(calc + value);
  if (
    !ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
}

// create Digits
  const createDigits = () =>{
    const digits = [];
  
    for (let i = 1; i < 10; i ++){
      digits.push(
        <button onClick={() => updateCalc(i.toString())}
         key={i}>
         {i}</button>
      )
  
    }
    return digits;
  
  }

// for sum (=) result
  const calculate = () => {
    setCalc(eval(calc).toString());
    // setName(eval(calc).toString());
    onKeyPress1()
  }
// for delete
  const deletelast = () =>{
    if(calc == ''){
      return;

    }
    const value = calc.slice(0, -1);
    setCalc(value);
  }
  return (
    <>

<Table style={{width: 300, height: 200, marginLeft: 650, marginTop: 10}} striped bordered hover>
  <thead>
    <tr>
      <th>id</th>
      <th>result</th>
    </tr>
  </thead>
  <tbody>
    {res.length && res.map((val) => {
      console.log('this is res from state', val)
      return(
      <tr>
        <td>{val.id}</td>
        <td>{val.result}</td>
        <td><Button style={{background:"red" }} onClick={() =>onDelete(val.id)}>delete</Button></td>
      </tr>
      )
    })}
    </tbody>
</Table>


    <div className="App">
    <div className="calculator">

    {/* <div style={{marginLeft: 200}}>
    {res.map((data) => <><p>{data.result}</p><br/></>)}
    </div> */}

    <h1 style={{marginLeft:180, marginTop: -300}}>Calculator</h1>
    <div className="display">
  
    {/* {result ? <span>({result})</span> : ''}
    {calc || "0"} */}
    <input type="text" placeholder="" className="input" value={calc} onChange={InputValue} 
    onKeyPress={EnterKeypress} 
    />
    </div>
  
    <div className="operators">
      <button onClick={() => updateCalc('/')}>/</button>
      <button onClick={() => updateCalc('*')}>*</button>
      <button onClick={() => updateCalc('+')}>+</button>
      <button onClick={() => updateCalc('-')}>-</button>

      <button onClick={deletelast}>DEl</button>
    </div>


    <div className="Digits">
    {createDigits()}
    <button onClick={() => updateCalc('0')}>0</button>
    <button onClick={() => updateCalc('.')}>.</button>
    <button onClick={calculate}>=</button>

    </div>
    </div>
    </div>
  </>
  );

}
export default App;

