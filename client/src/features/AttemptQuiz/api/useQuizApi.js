import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const useFetchQuiz = (quizId, userEmail, onSuccess, onError) => {
    return useQuery({
        queryKey: ["quiz", quizId, userEmail],
        queryFn: async () => {
            try {
                const [quizRes, userResponse] = await Promise.all([
                    axios.get(`${API_BASE_URL}/quiz/getQuiz?id=${quizId}`),
                    axios.get(`${API_BASE_URL}/response/get?userId=${userEmail}&&quizId=${quizId}`)
                ]);
                console.log(quizRes);
                const result = { quiz: quizRes.data.quiz, response: userResponse.data.response };
                onSuccess(result);
                return result;
            } catch (error) {
                console.log(error);
                if (onError) onError(error);
                throw error;
            }
        },
        refetchOnWindowFocus: false
    });
};

export const useUpdateServerResponse = () => {
    return useMutation({
        mutationFn: async ({ updated, responseId }) => {
            try {
                console.log("updating response is : ", updated)
                await axios.post(`${API_BASE_URL}/response/update`, {
                    responseId,
                    updated: { ...updated }
                });
            } catch (error) {
                if (onError) onError(error);
                throw error;
            }
        }
    }); 
}