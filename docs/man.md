# Manual

## Quick install

*Install the required libraries*
- [Node/NPM](https://nodejs.org/en/)
- [Docker](https://docs.docker.com/engine/installation/)
- [Docker compose](https://docs.docker.com/compose/install/)

*Get the repository*
```bash
git clone https://github.com/projet-aaa/platform
cd platform
```

*Build the interface*
```bash
cd src-hmi
npm install -g gulp # if not already done before, this installs gulp globally
npm install
gulp build
```

*Build the socket server*
```bash
cd src-nodeserver # from the root
npm install -g gulp # if not already done before, this installs gulp globally
npm install
gulp build
```

*Run docker*
```bash
docker-compose up # -d if in daemon mode
```

The server is now accessible at http://localhost

## Administration

An admin page exists at [domain]/admin (http://localhost/admin for example)

It allows you to:
- Change access rights on users
- Add courses, disciplines, tests
- Access to the database

## Usage

Before the interface is useable, you should ensure that the database is provided with 
courses, that each users are given a group and disciplines are assigned their groups.

Once it's done, each user can browse the website as themselves and access to the different 
pages and sessions they have access to.

### Run a class

To run a class session, the following needs to be done:
The database contains information about a given session that you uploaded. See how to import this information in the database by checking out the admin space (mentionned earlier) or by looking into the [back end documentation](/docs/back-end/integration-imports.md)

The teacher logs in and goes to [domain]/#/session/[session name]/[professor login]/tb

The room will open.

The students logs in and goes to [domain]/#/session/[professor login]

The class can then take place. 

During the course, students can click on the different to signal their attention, teacher can monitor and launch quizzes and students can answer said questions.

Once done, everybody can leave. The room can be closed by going on 
[domain]/#/session/[session name]/direct and by closing the correct room, if it hasn't already been closed
(they automatically close after a period of time if no teacher is inside them).

### Website architecture

The website is split into three types of pages:
- Navigation pages: whether you're a student or a teacher, these page allow you to move from the home to the different
session pages, it is fairly intuitive.
- Session pages: These represent the different tabs of a session: for a student, that represents the main session page,
the home quiz, the "currently opened room" page and the FAQ; for a teacher, its the main session page, the stats, the FAQ
and the open rooms.
- Remote/Dashboard pages: represents the live session views of the website

The best way of understanding the architecture is to browse the website as a teacher and as a student, whilst making sure
the database is filled.

For more information on the different pages and the urls, checkout urls.md in the browser-front-end section

# Go further

To understand the front end side of things, go to [the front end documentation](/docs/browser-front-end). For the back end, checkout [the back end documentation](/docs/back-end)
