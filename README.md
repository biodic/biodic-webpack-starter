# biodic-webpack-starter
**biodic-webpack-starter**는 gulp 명령어를 이용하여, 개발 환경에서 webpack dev server를 실행하고, gulp build 명령어를 이용하여 배포하기 위한 초기 셋팅입니다.
빠르고 편리한 개발을 위해, 개발 환경에서는 webpack-dev-server 실행과 동시에 browser-sync를 통해 소스파일이 변경되면, 변경된 항목만 bundle.js 또는 통합 css로 패키징하고 웹브라우저를 자동으로 새로고침합니다. 
shell상에서 webpack-dev-server 명령어가 아닌 gulp 명령어만을 통해 webpack-dev-server 및 browser-sync가 실행되므로 static 파일들에 대한 자동화된 빌드환경을 구축할 수 있습니다.

## Install
#### [GitHub](https://github.com/biodic/biodic-webpack-starter)
```
$ git clone https://github.com/biodic/biodic-webpack-starter
$ cd biodic-webpack-starter
$ npm install
```

#### [npm](https://www.npmjs.com/package/biodic-webpack-starter)
```
$ npm install biodic-webpack-starter
$ cp -a node_modules/biodic-webpack-starter/* ./; cp node_modules/biodic-webpack-starter/.* ./
$ npm install

```

### Directory structure
```
project
│   .babelrc
│   README.md
│   package.json
│   gulpfile.babel.js
│   webpack.config.js   
│
└───src : webpack-dev-server publicPath로도 사용
│   │   webpack.js  : webpack entry file
│   │   index.html
│   │
│   └───images  : static images
│   │
│   └───modules : custom modules
│   │     *.js
│   │
│   └───scss
│          *.scss
│          │
│          └───images
│
└───dist : 배포시(gulp build) 생성됨
│   │   index.html
│   │
│   └───css
│   │     app.css : bootstrap/custom (s)css bundle
│   │     └───fonts : Glyphicons 웹폰트
│   │
│   └───images
│   │
│   └───js
│          bundle.js
│
└───node_modules
```

### Usage
**개발환경**
- webpack-dev-server와 browser-sync 실행
- 소스파일 변경과 동시에 자동으로 번들링 및 웹브라우저 새로고침됩니다.
```
$ gulp
```
### 

**배포환경**
- 빌드후 dist 디렉토리에 번들링(패키징)된 파일과 Static(Webpack에서 패키징하지 않은 파일등)파일이 저장됩니다.
```
$ gulp build
```

----------

#### gulp plugins
 - **babel** : ES6문법을 ES5형태로 변환 (babel-preset-es2015)
 - **cli-clear** : 터미널 화면을 지움
 - **del** : production 배포시(gulp build) 기존 배포 폴더내 하위 폴더와 파일을 초기화됨

 - **webpack**
 - **webpack-dev-server**
 - **webpack-merge** : 기본 webpack 빌드관련 환경설정 파일(webpack.config.js)을 기반으로, 개발환경(webpack-dev-server) 빌드시 개발환경과 관련된 환경설정을 merge

 - **babel-loader**
 - **style-loader, css-loader, sass-loader, node-sass** : webpack에서 scss를 css로 변환
 - **file-loader, url-loader** : css에 명시된 이미지 파일을 저장(emit) 또는 번들링(app.css)
 - **image-webpack-loader** : webpack에서 이미지를 저장 또는 번들링할때 minify
 - **html-webpack-plugin** : bundle.js 및 app.css(webpack.js에서 정의) 링크를 자동으로 삽입 
 - **extract-text-webpack-plugin** : webpack에서 번들링시, css는 bundle.js에 패키징하지 않고, 별도의 app.css파일에 패키징하여 저장
 - **optimize-css-assets-webpack-plugin** : extract-text-webpack-plugin으로 css를 패키징한후 minify

 - **gulp-clean-css** : webpack으로 번들링 하지 않는 css의 minify
 - **gulp-htmlmin** : webpack으로 번들링 하지 않는 html파일의 minify
 - **gulp-imagemin** : webpack으로 번들링 하지 않는 이미지 파일의 minify
 - **gulp-uglify** : webpack으로 번들링 하지 않는 js파일의 minify

※ 설명이 필요하거나 중요한 플러그인만 기재했습니다. 

----------

#### 기본 레이아웃에는 아래의 라이브러리가 적용되어있습니다.
**Bootstrap 3.3.7**
 + [http://getbootstrap.com/](http://getbootstrap.com/)
 - dropdown menu가 적용된 navigation
 - 로그인 Modal
 - 로그인폼 validation states with icon (success/error)
 - Webpack bundle.js에 패키징
 - Glyphicons 폰트는 패키징하지 않고, font 디렉토리에 저장(emitted)하도록 구성하였습니다.

**jQuery 3.2.1**
+ [https://jquery.com/](https://jquery.com/)
 - External CDN link : CDN 주소를 index.html에 삽입하고, webpack에서 bundle.js로 패키징하지 않게하면서 jQuery를 참조할 수 있도록 webpack의 externals에 정의하였습니다.
 - 한국에서 가장 속도가 빠른 ajax.googleapis.com를 link하였습니다.
 -  https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js

**Font Awesome 4.7.0**
+ [http://fontawesome.io/](http://fontawesome.io/)
- External CDN link : CDN 주소를 index.html에 삽입
- 한국에서 가장 속도가 빠른cdn.jsdelivr.net를 link하였습니다.
+ https://cdn.jsdelivr.net/fontawesome/4.7.0/css/font-awesome.min.css

**toastr 2.1.2**
+ [https://codeseven.github.io/toastr/](https://codeseven.github.io/toastr/)
- 로그인폼 validation check 실패시 오류 메시지등
 
## Comments
자유롭게 수정/배포하셔도 됩니다.  
너무 많이 부족하고 모릅니다. 수정될 부분이나 효율적인 방안등이 있으시면 많이 가르쳐 주세요~

## License
MIT license - http://www.opensource.org/licenses/mit-license.php