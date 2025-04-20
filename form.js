import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/database"
import productRoutes from "./routes/product.routes"
import orderRoutes from "./routes/order.routes"
import customerRoutes from "./routes/customer.routes"

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/customers", customerRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))