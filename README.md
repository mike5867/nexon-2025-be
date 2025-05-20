- MSA 구조

  - Gateway 서버에서 모든 API 수신
  - 도메인에 맞게 Gateway 서버에서 Auth 서버 혹은 Event 서버로 RPC로 통신하도록 구현
  - DB는 3서버 모두 같은 DB를 참조

- DB Schema

  - User
    - 유저 정보 관리
    - token 관리는 별도로 기능구현하지 않음
    - Role도 단일 Role만 부여가능하며 User schema에서 같이 관리함
  - UserLoginHistory
    - user의 로그인 이력 관리
    - 이벤트 보상 조건 중 로그인 연속 X일, 회원 가입후 X일, 마지막 로그인 후 X일 등으로 설정 가능하여 유저의 로그인 기록을 관리해야해서 추가함
  - Event
    - Event 정보 관리
    - Event간의 중복 체크는 하지 않음
  - EventRewardClaim
    - 유저의 특정 Event에 대한 보상 요청에 대한 기록, 상태 관리

- API

  - [POST] `/sign-up` -> 회원 가입
  - [POST] `/sign-in` -> 로그인
  - [PUT] `/users/:userId/role` -> User에게 권한 변경
    - User document에서 같이 관리되기에 User 리소스 관점에서는 [PATCH] /users/:userId 더 적절해보인다고 생각하였으나 Role 부여 관련 api를 별도로 분리하기 위하여 Role 리소스 자체를 변경하는 걸로 생각하여 PUT 메소드 사용함
  - [POST] `/events` -> event 추가
  - [GET] `/events` -> event 조회
  - [GET] `/events/:eventId` -> 특정 event만 조회
  - [POST] `/events/:eventId/rewards` -> 특정 event에 보상 조건 추가
  - [POST] `/events/:eventId/claim` -> 이벤트 보상 요청
    - 중복 요청 건에 대한 validation은 누락함...
  - [GET] `/events/claims` -> 이벤트 보상 요청 건에 대한 조회
    - 테스트시 에러 발생함. 아래 API와 Event Server에서는 같은 로직을 태우는데 아래 로직은 성공하였고 원인 파악은 하지 못함
  - [GET] `/events/claims/my` -> 본인이 보상 요청한 건에 대한 조회
    - token으로 식별된 user 기반하여 본인의 요청건만 조회

- 문제점

  - Event 서버의 Module이 Auth 서버의 Module, repository를 의존하고 있음
    - 보상 조건 만족 계산 + user invalid 여부 확인을 위해 UserSchema와 UserLoginHistory Schema 접근이 필요했음
    - 시간이 더 있다면 해당 요청도 RPC로 Event Server가 Auth 서버로 요청하는 식으로 개선되어야할 것으로 보임
    - 현재는 직접 참조하고 있기에 Event server를 위한 docker container 생성시 auth 서버의 소스코드도 copy해와야하는 단점이 있음

- 실행 방법
  - `docker-compose up --build`
  - 최초 회원 가입시 `system@nexon.com`으로 가입시 해당 User는 자동으로 Admin Role 부여
