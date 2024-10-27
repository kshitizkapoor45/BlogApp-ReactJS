import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardText } from 'reactstrap';
import { getUserId, isLoggedIn } from '../auth';

const Post = ({ post = { title: "Default Title", content: "Default content", user: { id: -1 } } }) => {
  const [login, setLogin] = useState(false);
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    // Fetching the current user ID and login status
    const userId = getUserId();
    const isLoggedInStatus = isLoggedIn();

    console.log("Current User ID:", userId);
    console.log("Post's User ID:", post.user.id);

    setCurrUser(userId);
    setLogin(isLoggedInStatus);
  }, [post.user.id]); // Added post.user.id as a dependency to ensure this runs when post changes

  // Debugging to ensure state updates
  useEffect(() => {
    console.log("Current User after update:", currUser);
    console.log("Login status:", login);
  }, [currUser, login]);  // Logs when `currUser` or `login` changes

  return (
    <Card className='border-0 shadow-sm mt-3'>
      <CardBody>
        <h2>{post.title}</h2>
        <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 35) + "........." }}></CardText>
        <div>
          <Link className='btn btn-secondary border-0' to={'/posts/' + post.postId}>
            Read More
          </Link>
          {
            login && currUser && (Number(currUser) === post.user.id) && (
              <Button color='danger' className='ms-2'>
                Delete
              </Button>
            )
          }
        </div>
      </CardBody>
    </Card>
  );
};

export default Post;
