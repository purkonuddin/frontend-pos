<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/purkonuddin/frontend-pos/master/src/assets/food-and-restaurant.png" width="200">
  <br>
  Point of Sale React Web App
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

![Screenshot](https://user-images.githubusercontent.com/44079569/78572759-0ed96100-7852-11ea-8f40-fdcf54875c16.png)
![Screenshot](https://user-images.githubusercontent.com/44079569/78572840-2dd7f300-7852-11ea-821f-b5ca967c77aa.png)
![Screenshot](https://user-images.githubusercontent.com/44079569/78572874-392b1e80-7852-11ea-934f-d7c88453e2f0.png)
![Screenshot](https://user-images.githubusercontent.com/44079569/78572769-139e1500-7852-11ea-8141-1d8b69221953.png)
![Screenshot](https://user-images.githubusercontent.com/44079569/76099675-0d700b00-5ffe-11ea-88af-e36582c4dce0.png)
![Screenshot](https://user-images.githubusercontent.com/44079569/78574384-1ef24000-7854-11ea-9234-7ae915dfb9c2.png)

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
   REACT_APP_URL_API = http://{your-url}:{your-port}/api/
   ```

4. Run
   ```
   $ npm start
   ```

## Release Website

<a href="http://34.238.252.183:3000/login">
  <img src="https://img.shields.io/badge/Visit%20on%20the-34.238.252.183-blue.svg?style=popout&logo=amazon-aws"/>
</a>

## Related Project

- [API-backend-pos (Back-end Web App)](https://github.com/purkonuddin/API-backend-pos)
