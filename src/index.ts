import experess from "express";
import cors from "cors";

import eventRoutes from "./routes/eventRoute";
import categoryRoutes from "./routes/categoryRoute";
import pembicaraRoutes from "./routes/pembicaraRoute";

const app = experess();
const port = 3000;

app.use(cors());
app.use(experess.json());

app.get("/", (req, res) => {
    res.send("Ini adalah api untuk aplikasi Invofest!");
});

app.use("/events", eventRoutes);
app.use("/categories", categoryRoutes);
app.use("/pembicara", pembicaraRoutes);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});