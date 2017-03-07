# URLS

cf. main.tsx for the code that implements this architecture. Any change in the main.tsx should be 
copied in this document.

- #/ : the root: shows the list of followed disciplines and latest sessions
- #/profil : the profile page, containing the users information, allows some editing
- #/session/:profName : the page for the remote that gives access to [profName]'s room
- #/session/:courseName/:profName/tb : the page for dashboard of [profName]'s room on session [courseName]
- #/session/:courseName/:profName/presentation : the page for presentation of [profName]'s room on session [courseName]
- #/:UE : a disciplines page, displays the list of sessions for that discipline, organized by type (CM, TD, TP)
- #/:UE/:courseName : a session's page
- #/:UE/:courseName/:faq : a session's faq page
- #/:UE/:courseName/statistique : a session's stat menu page
- #/:UE/:courseName/statistique/:profName/quiz : a professor's session's stats view for quiz results ! for now, all results for the session is showed, regardless of teacher, to be fixed !
- #/:UE/:courseName/statistique/:profName/attention : a professor's session's stats view for feedback ! for now, all results for the session is showed, regardless of teacher, to be fixed !
- #/:UE/:courseName/statistique/:profName/timeline : a professor's session's stats view for the courses timeline ! for now, all results for the session is showed, regardless of teacher, to be fixed !
- #/:UE/:courseName/direct : the page displaying the instances of the given session
- #/:UE/:courseName/questionnaires : the page with all the quiz available for students
- #/* : defaults to showing a 404 page if nothing is found

- #/close_room/:profName : obsolete, allows the closing of a given's teacher's room (if he's not in it)
- #/login : allows loging in as any users