import { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';

function App() {

  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const [newFoodName, setNewFoodName] = useState('')

  const [foodList, setFoodList] = useState([]);

  //for get response
  useEffect(() => {
    Axios.get('http://localhost:3000/read').then((response) => {
      setFoodList(response.data)
    });
  }, []);

  //for post response
  const addToList = () => {
    // console.log(foodName + days)
    Axios.post('http://localhost:3000/insert', {
      foodName: foodName,
      days: days,
    })

  }

  //for update response
  const updateFood = (id) => {
    Axios.put('http://localhost:3000/update',{
     id: id,
     newFoodName: newFoodName,
    })
  };
  
 //for delete response
  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3000/delete/${id}`)
     
    }
    
  return (
    <div className="App">
      <h1>CRUD App MERN</h1>

      <labal>Food Name:</labal>
      <input type="text" onChange={(event) => {
        setFoodName(event.target.value);
      }} />
      <labal>Days since you eat it </labal>
      <input type="number" onChange={(event) => {
        setDays(event.target.value);
      }} />
      <button onClick={addToList}>Add to List</button>

      <h1>Food List</h1>

      {foodList.map((val, key) => {
        return (
          <div key={key} className="food">
            <h1>{val.foodName}</h1> <h1>{val.daysSinceIAte}</h1>
            <input type="text" placeholder='New Food Name..' onChange={(event) => {
              setNewFoodName(event.target.value);
            }} />
            <button onClick={()=> updateFood(val._id)}>Update</button>
            <button  onClick={()=> deleteFood(val._id)}>Delete</button>

          </div>
        );
      })}
    </div>
  );
}

export default App;
