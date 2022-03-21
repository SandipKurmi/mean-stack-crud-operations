const express = require('express')
const mongoose = require ('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())

const FoodModel = require('./model/Food')


mongoose.connect(dbconect,{
    useNewUrlParser: true,
    
})  
console.log('db connected')
 //for post data to backend
app.post('/insert', async (req, res) => {
    const foodName = req.body.foodName
    const days = req.body.days   //conming from frontend

    const food = new FoodModel({foodName: foodName , daysSinceIAte: days});
    try {
        await food.save();
    } catch (error) {
        console.log(error)
    }
})

app.get('/read', async (req, res) => {
    // FoodModel.find({$where: {foodName: "Apple"}}, )//for find spacific value
    FoodModel.find({}, (err, result) => {
        if (err){
            res.send(err)
        }
        res.send(result);
    })
})


app.put('/update', async (req, res) => {
    const newFoodName = req.body.newFoodName
    const id = req.body.id   //conming from frontend
    try {
        await FoodModel.findById(id, (err, updatedfood) =>{
            updatedfood.foodName = newFoodName;
            updatedfood.save();
            res.send('update');
        })  
    } catch (error) {
        console.log(err);
    }
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    res.send(id)

    await FoodModel.findByIdAndRemove(id).exec();
    res.send('deleted')

})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))