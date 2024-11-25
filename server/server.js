const express = require("express")
const { connectDB } = require("./config/database")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT

app.use(express.json())


const categoryRouter = require("./router/category.router")
const productRouter = require("./router/product.router")

app.use("/api", categoryRouter)
app.use("/api", productRouter)


app.get("/ot-test", (req, res) => {
    res.send("every thig is fine")
})



connectDB()
    .then(() => {
        console.log(`Database connected successfully!`)
        app.listen(PORT, () => {
            console.log(`Server Started at http://localhost:${PORT} 🚀`)
        })
    })
    .catch(() => {
        console.log(`Error while connecting database!`)
    })

