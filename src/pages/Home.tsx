import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Flex,
  Text,
  Box,
  Button,
  Input,
  Card,
  CardBody,
} from "@chakra-ui/react";

const Home = () => {
  type NickName = string;
  type StartTime = number | null;

  const [nickname, setNickname] = useState<NickName>("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [startTime, setStartTime] = useState<StartTime>(null);

  const navigate = useNavigate();

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    validateNickname(event.target.value);
  };

  const validateNickname = (nickname: string) => {
    if (nickname.trim().length > 0) {
      setIsNicknameValid(true);
    } else {
      setIsNicknameValid(false);
    }
  };

  const handleStartButtonClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const startTime = new Date().getTime();
    setStartTime(startTime);
    navigate("/quiz", { state: { startTime: startTime, nickname: nickname } });
  };

  return (
    <Flex
      w="calc(100wh)"
      h="calc(100vh)"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        height={["100%", "80%", "70%", "60%"]}
        width={["100%", "80%", "60%", "50%"]}
        variant="filled"
        bg="#faf2ff"
      >
        <CardBody padding="0">
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            h="100%"
          >
            <Text
              color="#6c23a1"
              fontSize={{ base: "25px", md: "30px", lg: "40px" }}
            >
              🔮 컴퓨터 상식 퀴즈 🔮
            </Text>
            <Box pt="5%" w="100%">
              <form onSubmit={handleStartButtonClick}>
                <Flex
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  w="100%"
                >
                  <Input
                    color="#6c23a1"
                    width={["60%", "50%", "50%", "50%"]}
                    variant="ghost"
                    type="text"
                    mr="2%"
                    fontSize={{ base: "13px", md: "15px", lg: "17px" }}
                    value={nickname}
                    onChange={handleNicknameChange}
                    placeholder="닉네임을 입력해주세요"
                  />
                  <Button
                    fontWeight="medium"
                    fontSize={{ base: "13px", md: "15px", lg: "17px" }}
                    colorScheme="purple"
                    variant="solid"
                    width={["20%", "12%", "12%", "12%"]}
                    type="submit"
                    isDisabled={!isNicknameValid}
                  >
                    퀴즈 풀기
                  </Button>
                </Flex>
              </form>
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Home;
// export { Home }
