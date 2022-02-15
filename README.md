# Node.js and MongoDB :thumbsup:

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

### 4. Functions :dart:

- [x] Mongoose install & test it
- [x] Search hospitals by name
- [x] Create **[Open API Reload]** btn in admin page
- [x] Admin Account (DB)
- [x] Sign in & Sign up (DB) - 로그인 세션 & 아이디 중복 문제 처리, 비밀번호 암호화(솔트) 해야 함
- [ ] Create a normal users' mypage where the user can list up the comments that she/he posted
- [ ] ~~Calculate hospitals' points to recommend hospitals tailored to the symptoms~~
- [x] connect to Kakao map API
- [ ] ~~get a user's addr & search it in DB~~
- [x] comments function
- [x] 댓글 필터링 기능 (욕설 있다면 댓글 등록 불가)
- [ ] 댓글 작성자의 아이디는 앞 3글자만 출력
- [ ] 병원 신고 시 영수증으로 방문 인증을 완료해야 함
- [ ] 관리자 페이지에서 회원의 병원 신고 현황 한눈에 확인 가능