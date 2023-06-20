import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Flex, Stack, Skeleton, Box, Button, Card, Text, CardBody, Spacer, HStack } from "@chakra-ui/react";

const Quiz = () => {
  const navigate = useNavigate();
  const [backendData, setBackendData] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("init");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);
  const [endTime, setEndTime] = useState(null);

  const location = useLocation();
  const startTime = location.state.startTime;

  const fetchData = async () => {
    setFetchStatus("loading");
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=4&category=18&type=multiple"
      );
      const data = await response.json();
      const newData = data.results.map((question) => {
        const answer = question.correct_answer;
        const random = [
          question.correct_answer,
          ...question.incorrect_answers,
        ].sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: answer,
          options: random,
        };
      });
      setBackendData(newData);
      setFetchStatus("loaded");
    } catch (error) {
      setFetchStatus("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextQuestion = () => {
    if (userAnswer.length === currentQuestionIndex + 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("문항을 선택해주세요");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    if (event.target.checked) {
      if (event.target.value === backendData[currentQuestionIndex].answer) {
        setUserAnswer([
          ...userAnswer,
          {
            question: backendData[currentQuestionIndex].question,
            answer: event.target.value,
            isCorrect: true,
          },
        ]);
      } else {
        setUserAnswer([
          ...userAnswer,
          {
            question: backendData[currentQuestionIndex].question,
            answer: event.target.value,
            isCorrect: false,
          },
        ]);
      }
    }
  };

  const handleSubmitAnswers = () => {
    const numberOfCorrect = userAnswer.filter(
      (answer) => answer.isCorrect === true
    ).length;
    const numberOfIncorrect = backendData.length - numberOfCorrect;
    const endTime = new Date().getTime();
    setEndTime(endTime);
    const timeTaken = (endTime - startTime) / 1000;
    navigate("/result", {
      state: {
        numberOfCorrect: numberOfCorrect,
        numberOfIncorrect: numberOfIncorrect,
        timeTaken: timeTaken,
        nickname: location.state.nickname,
      },
    });
  };

  if (fetchStatus === "loading" || fetchStatus === "init") {
    return (
      <Flex w="calc(100wh)" h="calc(100vh)" alignItems="center" justifyContent="center" p="1%">
        <Card height={['100%', '80%', '70%', '60%']} width={['100%', '80%', '60%', '50%']} variant="filled" bg="#faf2ff">
          <CardBody>
            <Stack>
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </Stack>
          </CardBody>
        </Card>
      </Flex>
    );
  } else if (fetchStatus === "loaded") {
    const currentQuestion = backendData[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === backendData.length - 1;
    const option = currentQuestion.options.map((option, index) => (
      <div key={`${currentQuestionIndex}-${index}`}>
        
        <input
          onChange={handleChange}
          type="radio"
          name="option.question"
          value={option}
          disabled={userAnswer.length !== currentQuestionIndex}
          style={{ margin: "2%", width: "1.25em", height: "1.25em", verticalAlign: "middle"}}
        />
        {index+1}.&nbsp;&nbsp;
        <label
          style={{ fontSize: "1rem" }}
          dangerouslySetInnerHTML={{ __html: option }}
        />
      </div>
    ));

    let message = "";
    if (userAnswer.length === currentQuestionIndex) {
      message = "";
    } else if (userAnswer[currentQuestionIndex].isCorrect) {
      message = "정답입니다🥳";
    } else {
      message = "오답입니다😥";
    }

    return (
      <>
        <Flex w="calc(100wh)" h="calc(100vh)" alignItems="center" justifyContent="center" p="1%">
          <Card height={['100%', '80%', '70%', '60%']} width={['100%', '80%', '60%', '50%']} variant="filled" bg="#faf2ff">
            <CardBody>
              <Flex flexDirection="column" h="100%">
                <form onSubmit={handleSubmit}>
                  <Box ml="2%" color="#7a00d1" h="6rem" display="inline-block" as="b" fontSize={{ base: '17px', md: '20px', lg: '25px' }} dangerouslySetInnerHTML={{ __html: currentQuestion.question }}/>
                  <Box color="#00000" h="15rem" fontSize="lg">
                    {option}
                  </Box>
                  <Flex>
                    <Flex display="column">
                      <Button fontWeight="bold" fontSize="1rem" color="#3a0063" colorScheme="transparent" variant="solid" w="80%">
                        {message} {userAnswer.length === currentQuestionIndex + 1 && !userAnswer[currentQuestionIndex].isCorrect && <Text>&nbsp;&nbsp;(정답: {currentQuestionIndex+1}번)</Text>}
                      </Button>
                    </Flex>
                    <Spacer />
                    <Flex align="right" justifyContent="flex-end">
                    {isLastQuestion ? (
                      <>
                        {userAnswer.length === backendData.length && (
                          <Button 
                            fontWeight="bold" fontSize="1rem" w="100%" colorScheme="green" variant="solid" 
                            onClick={handleSubmitAnswers}
                          >
                            결과 보러 가기
                          </Button>
                        )}
                      </>
                    ) : (
                      <Box w="100%">
                        <Button 
                          fontWeight="medium" fontSize="1rem" colorScheme="purple" variant="solid" w="100%" 
                          type="submit" 
                          onClick={handleNextQuestion}
                        >
                          다음 문제로
                        </Button>
                      </Box>
                    )}
                  </Flex>
                    </Flex>
                </form>
              </Flex>
              
            </CardBody>
          </Card>
        </Flex>
      </>
    );
  }
};

export default Quiz;
