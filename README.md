# Feature Growth - Guidelines

* Word2Vec
* Tables
* Dictionary Smoothing (in progress)

### Installing prerequisites

* **Windows**: We currently only support building on Windows machine.
* [**git**](https://git-scm.com/)
* **Node.js and npm**
  * _v8.8.1_ of NodeJs is required, later versions are not currently compatible with the yarn scripts.
    * [x86](https://nodejs.org/dist/v8.8.1/node-v8.8.1-x86.msi)
    * [x64](https://nodejs.org/dist/v8.8.1/node-v8.8.1-x64.msi)
  * After the installation of nodejs, check npm version if it is _v5.4.2_. If not, run `npm install -g npm@5.4.2`.
* [**Yarn**](https://yarnpkg.com/en/): Install yarn _v1.2.1_ from
  [installer](https://github.com/yarnpkg/yarn/releases/download/v1.2.1/yarn-1.2.1.msi).

### Running the web app

In order to run the web app, follow these steps below:

1. Clone [CHIL.PICL.UI](https://msr-mlg.visualstudio.com/CHIL.PICL.UI) project, install all the prequisits and follow
   the steps to start the selfhost by executing `npm run start:selfhost` in your Command Prompt.

2. In your Command Prompt, execure: `yarn`

3. In your Command Prompt, execure: `npm start`

4. Open your browser and navigate to `localhost:3001`
