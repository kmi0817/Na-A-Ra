## 나아라 NaARa

### 1. Info
 #### 사용자가 입력한 주소 인근 병원들의 자세한 정보 및 다른 사람의 평가를 고려해 본인에게 적합한 병원을 선택할 수 있는 서비스.
 
 공공데이터포털의 [건강보험심사평가원_병원정보서비스](https://www.data.go.kr/data/15001698/openapi.do)에서 제공하는 openAPI를 기반으로 제작되었으며, 
 
 기존 제가 템플릿 엔진과 Express로 만들었던 풀 스택 프로젝트인 [나아라](https://github.com/kmi0817/Na-A-Ra/tree/template-engine)에서 프론트엔드 팀원이 프론트를 React로 변경한 프로젝트입니다.

Field | Tools
--- | ---
Client | React.js
Server ***(ME)*** | Node.js
Database | mongoDB
Co-work | Github, Slack


### 2. Start
- Server Starts (port: 3001)
```shell
git clone -b express-react https://github.com/kmi0817/Na-A-Ra.git
cd Na-A-Ra
npm install
npm start
```

- Client Starts (port: 3000)
```shell
cd design
npm start
```

### 3.Architecture
![나아라](https://user-images.githubusercontent.com/62174395/236385060-05d5cb74-d53e-45dd-8e00-c96b906205d3.svg)


### 4. Main function
1) **병원 정보**
* 주소명/병원명을 이용한 인근 병원 검색 기능
* 검색된 병원의 상세정보 확인 기능
* 병원의 상세페이지를 통한 리뷰 기능

2) **커뮤니티**
* 회원만 이용가능한 질문/상담게시판 운영
* 비회원이라도 게시글 열람 가능(이외의 활동 제한)

3) **로그 추적**
* 회원은 마이페이지를 통해 자신의 기록(리뷰, 신고, 게시글, 댓글) 확인 가능
* 관리자는 관리자페이지를 통해 회원들의 기록(리뷰, 신고, 게시글, 댓글)과 병원 관리 가능
