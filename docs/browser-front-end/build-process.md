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

Before building, make sure you correctly modified the src-hmi/src/models/consts.ts file: 
It contains three boolean variables that affect the rest of the program build process:
- debug : defines if we are in a local environment of in production (and picks the domain in consequence)
- devtools : defines whether the dev tools are to be added (specific urls...) !! If set to false, you must remove
the dev urls in apps/main.tsx
- log : defines whether logs should be printed or not

To build a specific "application" (index.tsx in folder src/apps), run:

```sh
gulp build --[The name path to the application (ie the .tsx representing your application in the apps folder)]
gulp build --main # for example, to build the main application
```

To build every applications (can take a while), run:

```sh
gulp build
```

These commands will put create the source code for the web pages: it will put the scripts and the styles in web/webassets and it will modify the index.html.twig in src/AppBundle/Resources/views/Default.