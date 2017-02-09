#Build process

We suppose that you understand the HMI code.

To build the deployment ready version, you can just run docker-compose on the root.

To debug however, you might want to run the more cost effective method of installing the build tools on your machine and running them yourself.

##Install the build tools

Make sure you installed

- Nodejs
- NPM

Next, in the src-hmi folder, run: 

```sh
npm install -g gulp
npm install
```

This will install all the dependencies and create the "node_modules" folder.

##Build manually 

To build a specific "application" (index.tsx in folder src/apps), run:

```sh
gulp build --[The name of the folder of the application]
```

This will create the dist folder in src, adds all the assets necessary, creates a folder for the application in the dist folder and puts index.html and bundle.js inside of it. To test it, you can just run the index.html in your browser. (!!! The fontawesome elements (little icons) won't work because of CORS, nothing to worry about !!!)

To build every applications (can take a while), run:

```sh
gulp build
```

##Deploy manually

The above build process simply creates the application in the src-hmi/dist folder. To actually have it production ready, you can run the same command but replace build by deploy. 
