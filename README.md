# semann

![API documentation status](docs/api/badge.svg?raw=true "API documentation") 
![App documentation status](docs/app/badge.svg?raw=true "App documentation") 
![Shared documentation status](docs/shared/badge.svg?raw=true "Shared scripts documentation")

> Enhance your content with semantic information. A Vue.js project

## Usage

You can use semann with any WYSIWYG editor to enhance your content.
We already implement an example for the CKEditor, but there is no
limitation to that.

Before you can start to initialize semann in your application, you need
to start an enhancer service. Currently we support Stanbol. We have
prepared a Docker-Compose file to make it as easy as possible for you.
You can grab on our [semann-adapter](https://github.com/netresearch/semann-adapters) repository.

If your done, you are ready to initialize semann in your backend/CMD/CRS etc.
Here is an example initialisation.

 ### Configuration
 
 ``` javascript
 new Semann(
     {
         target: document.querySelector('#semannContainer'),
         app: {
             config: {
                 connectors: {
                     stanbol: {
                         adapter: 'stanbol',
                         url: 'https://your-adapters.io:9988',
                         features: {
                             chain: [
                                 'dbpedia-disambiguation',
                                 'dbpedia-fst-linking',
                                 'dbpedia-proper-noun',
                                 'dbpedia-spotlight',
                                 'language'
                             ]
                         }
                     }
                 }
             }
         }
     }
 )
 ```
 
- ``target``: Your editable content area
- ``connectors``: Your enhancer
- ``chain``: Enable/Disable Stanbol chains


## Contribute

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

### Issues

Please report issues to [ticket system](https://github.com/netresearch/semann/issues). 
Pull requests are welcome here!

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
