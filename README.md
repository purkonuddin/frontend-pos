<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/purkonuddin/frontend-pos/master/src/assets/food-and-restaurant.png" width="200">
  <br>
  D'Jago Frontend React Redux
  <br>
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v12.14.1-success">
  <img src="https://img.shields.io/badge/React-v16.12.0-informational">
  <img src="https://img.shields.io/badge/Axios-v0.19.2-orange">
  <img src="https://img.shields.io/badge/Redux-v4.0.5-orange">
</p>

## Table of Contents

- [Introduction](#introduction)
- [Demo](#demo)
- [How To Install](#how-to-install)
- [Release Website](#release-website)
- [Related Project](#related-project)

## Introduction

POS Frontend is a Point of Sale React Web App. Written in React Js with Redux, it uses Restful API data storage back-end. The main features are:

- Login User, register user by admin.
- CURD User, Categories and Products.
- Add/Reduce Products Order
- File Image Upload on product and user.
- Search product by name.
- Sort product by name, category, date.
- Products page pagination.
- Reporting on income today and orders weekly with chart.

## Demo

![Screenshot](https://user-images.githubusercontent.com/44079569/76099674-0cd77480-5ffe-11ea-9ebb-4ac09f88b1cb.png)
![Screenshot](https://user-images.githubusercontent.com/44079569/76099669-0b0db100-5ffe-11ea-9db5-4e36f569a9ed.png)

## How To Install

1. Clone this repository
   ```
   $ git clone https://github.com/purkonuddin/frontend-pos.git
   ```
2. Install all depedencies on the package.json
   ```
   $ cd frontend-pos
   $ npm install
   ```
3. Create `.env` file with environment variable in line with following:

   ```
   REACT_APP_URL_API = http://{your-url}:{your-port}/api/v1/
   ```

4. Run
   ```
   $ npm start
   ```

## Release Website

<a href="http://18.206.201.80:3000/login">
  <img src="https://img.shields.io/badge/Visit%20on%20the-18.206.61.46-blue.svg?style=popout&logo=amazon-aws"/>
</a>

## Related Project

- [API-backend-pos (Back-end Web App)`](https://github.com/purkonuddin/API-backend-pos) 
