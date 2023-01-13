// const express = require('express');
import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/tasks.router';

// Instantiate express app
const app: Express = express();
dotenv.config();

//Parsing incoming request
app.use(bodyParser.json());

//Use CORS install types as well
app.use(cors());

// Create Databse Connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
  logging: true,
});

//Define Server Port
const port = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    // Start listening Request on defined port
    app.listen(port);
    console.log('Data Source has been initialized');
  })
  .catch((err) => console.log(err));

//create a Route
app.use('/', tasksRouter);
