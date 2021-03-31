# Full Stack open 2021

## Part 4 - [Testing Express servers, user administration](https://fullstackopen.com/en/part4)

### Bloglist - backend

RESTful API backend created in NodeJS using express. Serves as the endpoints for a blog list application to be implemented in [Part 5](../../part5/bloglist-frontend).

The following environment variables need to be defined first in a .env file in the root directory of the project folder.
* `PORT`
* `MONGODB_URI`
* `TEST_MONGODB_URI`
* `SECRET`

### Routes
The server provides the following routes and their actions
* `/api/blogs` - (GET, POST) for getting all blog resources, and adding new blogs.
* `/api/blogs/:id` - (PUT, DELETE) for updating or deleting individual blog resources.
* `/api/users` - (GET, POSt) for getting all users, and adding new users.
* `/api/login` - (POST) for user authentication and login.

The sever provides an additional testing route `/api/testing/reset` with a POST action for resetting the test database. This route is provided when the server is run with the environment variable `NODE_ENV=test`.

### MongoDB model schemas
The database is configured with the following schemas:
```
blog: {
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: ObjectID
}
```
```
user: {
  username: String,
  name: String,
  passwordHash: String
  blogs: [
    ObjectID
  ]
}
```
