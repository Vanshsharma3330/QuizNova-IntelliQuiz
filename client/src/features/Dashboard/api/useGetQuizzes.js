import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useGetQuizzes = (mutationConfig = {}) => {
    return useMutation({
        mutationFn: async ({ workspaceId, creatorEmail }) => {
            const res = await axios.get(`http://localhost:5000/quiz/get?workspace=${workspaceId}&creator=${creatorEmail}`);
            console.log("Resoinse from getting quizzes : " , res.data);
            return res.data;
        },
        ...mutationConfig,
    });
};