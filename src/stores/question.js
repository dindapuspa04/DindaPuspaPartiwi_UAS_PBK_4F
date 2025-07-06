import { defineStore } from 'pinia';
import { nanoid } from 'nanoid'; // Used for unique IDs for new questions

export const useQuestionStore = defineStore('question', {
  state: () => ({
    questions: [],
    loading: false,
    error: null,
  }),
  getters: {
    getQuestionById: (state) => (id) => {
      return state.questions.find(q => q.id === id);
    },
  },
  actions: {
    async fetchQuestions() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('http://localhost:3000/questions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.questions = data; // Update state with fetched questions
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching questions:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchQuestionById(id) {
        this.loading = true;
        this.error = null;
        try {
            const response = await fetch(`http://localhost:3000/questions/${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Question not found.');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data; // Return the fetched question
        } catch (error) {
            this.error = error.message;
            console.error(`Error fetching question ${id}:`, error);
            return null; // Return null if question not found or error
        } finally {
            this.loading = false;
        }
    },

    async addQuestion(questionData) {
      this.loading = true;
      this.error = null;
      try {
        const newQuestion = { ...questionData, id: nanoid() }; // Assign a unique ID
        const response = await fetch('http://localhost:3000/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newQuestion),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const addedQuestion = await response.json();
        this.questions.push(addedQuestion); // Add to local state
        return addedQuestion;
      } catch (error) {
        this.error = error.message;
        console.error('Error adding question:', error);
        throw error; // Re-throw to propagate error to component
      } finally {
        this.loading = false;
      }
    },

    async updateQuestion(id, updatedData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`http://localhost:3000/questions/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedQuestion = await response.json();
        const index = this.questions.findIndex(q => q.id === id);
        if (index !== -1) {
          this.questions[index] = updatedQuestion; // Update in local state
        }
        return updatedQuestion;
      } catch (error) {
        this.error = error.message;
        console.error('Error updating question:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteQuestion(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`http://localhost:3000/questions/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.questions = this.questions.filter(q => q.id !== id); // Remove from local state
        return true; // Indicate successful deletion
      } catch (error) {
        this.error = error.message;
        console.error('Error deleting question:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});