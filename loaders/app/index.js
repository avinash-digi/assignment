import express from "express";
import { privateKey } from "../../config/privateKeys.js";
import morgan from "morgan";
import cors from "cors";
import path from "path";

const PORT = Number(privateKey.PORT) || 3000;

const appLoader = async (app, router) =>
  new Promise((resolve) => {
    app.use(express.json());
    const __dirname = path.resolve(path.dirname(""));
    app.use(express.static(__dirname + "/public"));
    app.use("/public", express.static("public"));
    app.use("/uploads/", express.static("uploads/"));
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use(cors());
    app.use("/v1/", router);

    app.listen(PORT, () => {
      console.log(`App is running on port: ${PORT}`);
    });
    resolve();
  });

export { appLoader };
