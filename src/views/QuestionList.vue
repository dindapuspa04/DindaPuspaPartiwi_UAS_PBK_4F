<template>
  <div class="question-list-container page-container">
    <div class="navbar">
      <div class="breadcrumb">Home / Questions</div>
      <div class="user-info">
        <span class="school-name">School</span>
        <img src="/src/assets/vue.svg" alt="User Icon" class="user-icon" />
      </div>
    </div>

    <h1>Question List</h1>

    <div class="actions">
      <button @click="goToAddQuestion" class="add-button">Add New Question</button>
    </div>

    <div v-if="questionStore.loading" class="loading-indicator">Loading questions...</div>
    <div v-if="questionStore.error" class="error-message">Error: {{ questionStore.error }}</div>

    <div v-if="questionStore.questions.length === 0 && !questionStore.loading && !questionStore.error" class="no-data">
      No questions available. Please add some.
    </div>

    <table v-else class="question-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Description</th>
          <th>Level</th>
          <th>Material</th>
          <th>Options</th>
          <th>Correct Answer</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(question, index) in questionStore.questions" :key="question.id">
          <td>{{ index + 1 }}</td>
          <td>{{ question.description }}</td>
          <td>{{ question.level }}</td>
          <td>{{ question.material }}</td>
          <td>
            <ul class="option-list">
              <li v-for="(option, optIndex) in question.options" :key="optIndex">
                {{ option.text }}
                <span v-if="option.isCorrect" class="correct-badge">&#10003;</span>
              </li>
            </ul>
          </td>
          <td>
            {{ question.correctAnswerIndex !== null && question.options[question.correctAnswerIndex]
                ? question.options[question.correctAnswerIndex].text
                : 'N/A' }}
          </td>
          <td>
            <div class="action-buttons-wrapper"> <button @click="editQuestion(question.id)" class="action-button edit-button">Edit</button>
              <button @click="confirmDelete(question.id)" class="action-button delete-button" :disabled="questionStore.loading">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuestionStore } from '../stores/question';

const router = useRouter();
const questionStore = useQuestionStore();

onMounted(() => {
  questionStore.fetchQuestions(); // Fetch all questions when component is mounted
});

const goToAddQuestion = () => {
  router.push('/questions/add');
};

const editQuestion = (id) => {
  router.push(`/questions/edit/${id}`);
};

const confirmDelete = async (id) => {
  if (confirm('Are you sure you want to delete this question?')) {
    try {
      await questionStore.deleteQuestion(id);
      alert('Question deleted successfully!');
      // State is already updated by the store action
    } catch (error) {
      alert('Failed to delete question: ' + error.message);
    }
  }
};
</script>

<style scoped>
/* Base page-container and navbar styles are in global style.css */
.question-list-container {
  max-width: 1100px; /* Slightly wider than form for table content */
}

h1 {
  color: #343a40;
  margin-bottom: 20px;
}

.actions {
  margin-bottom: 20px;
  text-align: right;
}

.add-button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #218838;
}

.question-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1); /* Subtle shadow for the table */
}

.question-table th, .question-table td {
  border: 1px solid #ddd;
  padding: 12px 15px; /* More padding */
  text-align: left;
  vertical-align: top; /* Align content to top */
}

.question-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #343a40;
}

.question-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.question-table tbody tr:hover {
  background-color: #f1f1f1;
}

.option-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.option-list li {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9em; /* Smaller font for options */
}

.correct-badge {
  color: #28a745;
  font-weight: bold;
  font-size: 1.1em; /* Make checkmark slightly larger */
}

.action-buttons-wrapper { /* === BAGIAN CSS YANG DIUBAH/DITAMBAHKAN DI SINI === */
  display: flex;
  gap: 8px; /* Memberikan jarak 8px antar tombol */
  /* Anda bisa menyesuaikan nilai gap sesuai keinginan (e.g., 5px, 10px) */
}

.action-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0.9em;
  /* margin-right: 5px; <-- Hapus ini jika sebelumnya ada, karena sekarang pakai gap */
}

.edit-button {
  background-color: #007bff;
  color: white;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #dc3545;
  color: white;
}

.delete-button:hover:not(:disabled) {
  background-color: #c82333;
}

.delete-button:disabled {
  background-color: #ffc2c2;
  cursor: not-allowed;
}
</style>