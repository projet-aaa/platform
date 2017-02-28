# Tests

The Jetpack platform is shipped with some back-end behaviour tests.

These tests are run by [Behat](http://behat.org), a framework to test business expectations.

To run tests, execute 

```bash
# clear cache
docker-compose exec web bin/console cache:clear --env=test

#run tests
docker-compose run --rm web vendor/bin/behat ./features/
```

Behat uses a local sqlite3 database to separate tests data from production data.