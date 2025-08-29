import express from "express";
import { authRouter } from "./router/auth";
import { userRouter } from "./router/user";
import { adminRouter } from "./router/admin";
import spaceRouter from "./router/space";

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/space", spaceRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});