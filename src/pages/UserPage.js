import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';
import { useFlash } from '../contexts/FlashProvider';
import { useApi } from '../contexts/ApiProvider';
import TimeAgo from '../components/TimeAgo';
import Body from '../components/Body';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

function UserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const api = useApi();
  const [isFollower, setIsFollower] = useState();
  const { user: loggedInUser } = useUser();
  const flash = useFlash();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await api.get('/users/' + userId);
      if (response.ok) {
        setUser(response.body);
        if (response.body.name !== loggedInUser.name) {
          const follower = await api.get(
            '/me/following/' + response.body.id);
          if (follower.status === 204) {
            setIsFollower(true);
          }
          else if (follower.status === 404) {
            setIsFollower(false);
          }
        }
        else {
          setIsFollower(null);
        }
      }
      else {
        setUser(null);
      }
    })();
  }, [userId, api, loggedInUser]);
  
  const edit = () => {
    navigate('/edit');
  };

  const follow = async () => {
    // TODO
  };

  const unfollow = async () => {
    // TODO
  };

  return (
    <Body sidebar>
      {user === undefined ?
        <Spinner animation="border" />
      :
        <>
          {user === null ?
            <p>User not found.</p>
          :
            <>
              <Stack direction="horizontal" gap={4}>
                <Image src={user.avatar_url + '&s=128'} roundedCircle />
                <div>
                  <h1>{user.name}</h1>
                  {user.about_me && <h5>{user.about_me}</h5>}
                  <p>
                    Member since: <TimeAgo isoDate={user.first_seen} />
                    <br />
                    Last seen: <TimeAgo isoDate={user.last_seen} />
                  </p>

                  {isFollower === null &&
                    <Button variant="primary" onClick={edit}>
                      Edit
                    </Button>
                  }
                  {isFollower === false &&
                    <Button variant="primary" onClick={follow}>
                      Follow
                    </Button>
                  }
                  {isFollower === true &&
                    <Button variant="primary" onClick={unfollow}>
                      Unfollow
                    </Button>
                  }
                </div>
              </Stack>
            </>
          }
        </>
      }
    </Body>
  );
}

export default UserPage;