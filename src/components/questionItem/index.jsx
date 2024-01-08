import { Box, Text } from '@chakra-ui/react';
import React, {useEffect, useState} from 'react'

function QuestionItem({result, id, children, resetColor, points}) {
    const [optionColor, setOptionColor] = useState('blue.500')
    // const [score, setScore] = useState(0)

    useEffect(() => {
        if (resetColor) {
            setOptionColor('blue.500')
        }
    }, [resetColor])


    const newPoint = (point) =>{
    
    points(point)
    
    }

    const handleClick = () => {
        if (result) {
            setOptionColor('green.500')
            newPoint(1)
        } else {
            setOptionColor('red.500')
        }
    }

    return (
        <Box
            onClick={handleClick}
            display="flex"
            m="5px"
            borderRadius="5px"
            border="2px"
            borderColor={optionColor}
        >
            <Box py="3px" px="12px" color="white" background={optionColor}>
                {id}
            </Box>
            <Text p="5px">{children}</Text>
        </Box>
    )
}

export default QuestionItem
