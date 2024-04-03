import { useEffect, useState } from 'react';
import axios from 'axios';
import { Flex, Text, Card, CardBody, Button } from '@chakra-ui/react';

const Rank = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        const data = response.data;
        const sortedData = data.sort((a: any, b: any) => {
          if (a.score === b.score) {
            return a.time - b.time;
          }
          return b.score - a.score;
        });
        setUsers(sortedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(users);
  return (
    <Flex
      w="calc(100wh)"
      h="calc(100vh)"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        height={['100%', '80%', '70%', '60%']}
        width={['100%', '80%', '60%', '50%']}
        variant="filled"
        bg="#faf2ff"
      >
        <CardBody>
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            h="100%"
          >
            <Text
              color="purple"
              fontSize={{ base: '25px', md: '35px', lg: '45px' }}
            >
              랭킹
            </Text>
            {users.map((user: any, index: number) => (
              <div key={index}>
                {user.nickname} - {user.score}점 - {user.time / 1000}초
              </div>
            ))}
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Rank;
