const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

const app = express()
const port = process.env.port || 3000

app.use(express.json());

const worcesterURL = 'https://umassdining.com/locations-menus/worcester/menu'
const itemList = []

function runScrapper(){
    axios(worcesterURL)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            

            $('.lightbox-nutrition > a', html).each(function(){
                const ingredients = $(this).attr('data-ingredient-list')
                const item = $(this).attr('data-dish-name')

                const ingredientList = ingredients.split(',')

                itemList.push({item, ingredientList})
            })

            const requiredList = itemList.filter(obj => {
                return obj.ingredientList.some(ingredient => ingredient.toLowerCase().includes('beef'));
            });
        })
}

runScrapper()

app.get('/allergy', (req,res) => {
    
    let allergyList = req.body.allergyList
    allergyList = allergyList.split(',')
    let requiredList = itemList

    allergyList.forEach((allergy) => {
        allergy = allergy.trim()
        requiredList = requiredList.filter(obj => {
            return !obj.ingredientList.some(ingredient => ingredient.toLowerCase().includes(allergy));
        });
    })
    

    res.send(requiredList)
});


app.listen(port, () =>{
    console.log(`Application running on port ${port}`)
})