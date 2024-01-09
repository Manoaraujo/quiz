import React, { useRef, useState, useEffect } from "react";

import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogContent,
   AlertDialogHeader,
   AlertDialogOverlay,
   Box,
   Button,
   Grid,
   GridItem,
   Select,
   Text,
   useDisclosure,
} from "@chakra-ui/react";
import QuestionItem from "./components/questionItem";
import questions_en_us from "../src/assets/questions-en-us.json";
import questions_pt_br from "../src/assets/questions-pt-br.json";
import translationsTexts from "../src/assets/translations.json";

function Quiz() {
   const [language, setLanguage] = useState("pt-br");
   const handleLanguageChange = (newLanguage) => {
      setLanguage(newLanguage);
   };
   const translations = translationsTexts;
   const t = translations[language];
   const questionsItems =
      language === "en-us" ? questions_en_us : questions_pt_br;

   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [clicked, setClicked] = useState(false);
   const [resetColor, setResetColor] = useState(false);
   const { isOpen, onOpen, onClose } = useDisclosure();
   const cancelRef = useRef();
   const [score, setScore] = useState(0);

   const currentQuestion = questionsItems[currentQuestionIndex];

   const handleNextQuestion = () => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setClicked(false);
      setResetColor(true);
   };

   const handleFinishQuiz = () => {
      onOpen();
   };

   const handleTryAgain = () => {
      setCurrentQuestionIndex(0);
      setClicked(false);
      setResetColor(true);
      setScore(0);
      onClose();
   };

   useEffect(() => {
      onOpen();
   }, [onOpen]);

   const totalPoints = (newPrev) => {
      setScore((prevPoint) => prevPoint + newPrev);
   };

   return (
      <>
         <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
         >
            <AlertDialogOverlay>
               <AlertDialogContent w={{ base: "300px", lg: "540px" }}>
                  <AlertDialogHeader
                     color="white"
                     bg="blue.500"
                     fontSize="lg"
                     fontWeight="bold"
                  >
                     <Box display="flex" justifyContent="space-around">
                        {currentQuestionIndex < questionsItems.length - 1
                           ? t.welcomeMessage
                           : t.endMessage}
                     </Box>
                  </AlertDialogHeader>

                  <AlertDialogBody>
                     {currentQuestionIndex < questionsItems.length - 1 ? (
                        <Text>{t.quizIntro}</Text>
                     ) : (
                        <>
                           <Text>{t.quizComplete}</Text>
                           <Text>
                              {t.resultMessage
                                 .replace("{score}", score)
                                 .replace(
                                    "{totalQuestions}",
                                    questionsItems.length
                                 )}
                           </Text>
                        </>
                     )}
                  </AlertDialogBody>
                  <Button
                     ref={cancelRef}
                     onClick={() => {
                        if (currentQuestionIndex < questionsItems.length - 1) {
                           onClose();
                        } else {
                           handleTryAgain();
                        }
                     }}
                     m={3}
                  >
                     {currentQuestionIndex < questionsItems.length - 1
                        ? t.startQuiz
                        : t.tryAgain}
                  </Button>
                  <Select
                     mx="12px"
                     mb="5px"
                     value={language}
                     borderRadius={4}
                     color="blue.600"
                     bg="blue.200"
                     size="sm"
                     w="70px"
                     onChange={(e) => handleLanguageChange(e.target.value)}
                  >
                     <option value="pt-br">PT</option>
                     <option value="en-us">EN</option>
                  </Select>
               </AlertDialogContent>
            </AlertDialogOverlay>
         </AlertDialog>

         {/* *** Quiz *** */}
         <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bg="blue.500"
            h="100px"
         >
            <Text fontSize="lg" as="b" color="white">
               {t.question} {currentQuestionIndex + 1} {t.of }{" "}
               {questionsItems.length}.
            </Text>
            <Text
               px="10px"
               py="5px"
               fontSize={{ base: "md", lg: "lg" }}
               as="b"
               color="white"
            >
               {currentQuestion.question}
            </Text>
         </Box>
         <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mb="15px"
         >
            <Grid
               templateColumns={{
                  base: "repeat(1, 1fr)",
                  lg: "repeat(2, 1fr)",
               }}
               m={6}
               gap={4}
            >
               {currentQuestion.options.map((option) => (
                  <GridItem key={option.id} w={{ base: "300px", lg: "400px" }}>
                     <Box
                        onClick={() => {
                           setClicked(true);
                           setResetColor(false);
                        }}
                        pointerEvents={clicked ? "none" : "auto"}
                     >
                        <QuestionItem
                           key={option.id}
                           id={option.id}
                           result={option.result}
                           resetColor={resetColor}
                           points={totalPoints}
                        >
                           {option.text}
                        </QuestionItem>
                     </Box>
                  </GridItem>
               ))}
            </Grid>
            <Button
               isDisabled={!clicked}
               w="150px"
               onClick={() => {
                  if (currentQuestionIndex < questionsItems.length - 1) {
                     handleNextQuestion();
                  } else {
                     handleFinishQuiz();
                  }
               }}
            >
               {currentQuestionIndex < questionsItems.length - 1
                  ? t.nextQuestion
                  : t.finishQuiz}
            </Button>
         </Box>
      </>
   );
}

export default Quiz;
