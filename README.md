﻿# Node.js and MongoDB :thumbsup:

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
> > index.ejs (3 versions: user, member, admin)
> >
> > test.ejs (using Kakao map API)
>
> > ###### admin (directory)
> >
> > > hospital.ejs
> > >
> > > hospitals.ejs
> > >
> > > index.ejs
>
> > ###### comments (directory)
> >
> > > index.ejs (3 versions: user, member, admin)
>
> package-lock.json
>
> package.json
>
> README.md
>
> server.js
