
FROM node:16
# 앱 디렉터리 생성 in container
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

# RUN npm ci
RUN npm install
RUN npm install -g nodemon


# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "nodemon", "app"]
