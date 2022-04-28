# NaARa裸芽羅 :thumbsup:

### 1. **Infomation :eyes:**

- Server: Node.js (expess)
- Database: MongoDB (mongoose)
- OpenAPI - [건강보험심사평가원\_병원정보서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15001698)

### 2. **:star2: Node.js environment**

:heavy_check_mark: To start the node server :heart_eyes:

```
npm run devStart
```

:heavy_check_mark: Needed moudules are...

```
npm install express
npm install --save-dev nodemon
npm install ejs
npm install request-promise-native
npm install mongoose
npm install method-override
npm install http
npm install crypto --save
npm install express-session --save
```

- request-promise-native: used to request to OpenAPI
- mongoose: MongoDB itself. You have to install MongoDB Server in order to use mongoose.
- method-override: enables to use DELETE, PUT, PATCH as well as GET, POST
- crypto: helps to save hashed password (not in plain text)
- express-session: for session processing

### 3. **:file_folder: Directory Structure**

:heavy_check_mark: Follow MVC (model, view, controll) model.

> ##### node_modules (directory)
>
> ##### models (directory)
>
> > comments.js
> >
> > hospitals.js
> >
> > users.js
>
> ##### routes (directory)
>
> > admin.js
> >
> > comments.js
>
> ##### views (directory)
>
> > comments.ejs
> > 
> >  index.ejs
> >
> > mypage.ejs
> >
> > test.ejs (using Kakao map API)
> >
>
> > ###### admin (directory)
> >
> > > hospital.ejs
> > >
> > > hospitals.ejs
> > >
> > > index.ejs
>
> > ###### community (directory)
> >
> > > board.ejs
> > >
> > > post.ejs
> > >
> > > write.ejs
>
> package-lock.json
>
> package.json
>
> README.md
>
> server.js

### 4. **💡 Functions**
##### 1) user
* search hospitals by address or hospital name
* read the details of the searched hospital
* read reviews and cumulative reports of the searched hospital

##### 2) member
* search hospitals by address or hospital name
* read the details of the searched hospital
* read & **make** reviews and cumulative reports of the searched hospital
* check the total activity log in 'mypage'
* read & make community postings: clinincs and questions

##### 3) admin
* search hospitals by address or hospital name
* read the details of the searched hospital
* read & **delete** reviews
* manage member & reviews & community in 'admin page'
* reject and confirm reports by members
