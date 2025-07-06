<template>
  <div class="question-form-container">
    <div class="navbar">
      <div class="breadcrumb">Home / Questions / {{ isEditMode ? 'Edit' : 'Add' }}</div>
      <div class="user-info">
        <span class="school-name">School</span>
        <img src="/src/assets/vue.svg" alt="User Icon" class="user-icon" />
      </div>
    </div>

    <h1>{{ isEditMode ? 'Edit Question' : 'Add New Question' }}</h1>

    <div v-if="questionStore.loading" class="loading-indicator">Loading question data...</div>
    <div v-if="questionStore.error && isEditMode" class="error-message">Error loading question: {{ questionStore.error }}</div>

    <form @submit.prevent="saveQuestion" class="question-form" v-if="!questionStore.loading">
      <div class="form-group">
        <label for="questionDescription">Deskripsi Pertanyaan</label>
        <textarea
          id="questionDescription"
          rows="5"
          placeholder="Tulis deskripsi pertanyaan di sini..."
          v-model="question.description"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="levelSelect">Pilih Level</label>
          <select id="levelSelect" v-model="question.level">
            <option value="SD">SD</option>
            <option value="SMP">SMP</option>
            <option value="SMA">SMA</option>
          </select>
        </div>
        <div class="form-group">
          <label for="materialSelect">Pilih Materi</label>
          <select id="materialSelect" v-model="question.material">
            <option value="Aljabar">Aljabar</option>
            <option value="Geometri">Geometri</option>
            <option value="Statistika">Statistika</option>
            <option value="Kalkulus">Kalkulus</option>
            <option value="Aritmatika">Aritmatika</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Options</label>
        <div v-for="(option, index) in question.options" :key="index" class="option-item">
          <input
            type="radio"
            :id="'optionCorrect' + index"
            :value="index"
            v-model="question.correctAnswerIndex"
            class="correct-radio"
          />
          <input
            type="text"
            :placeholder="'Pilihan Jawaban ' + (index + 1)"
            v-model="option.text"
          />
          <button
            type="button"
            @click="removeOption(index)"
            class="remove-option-button"
            v-if="question.options.length > 2"
          >
            &times;
          </button>
        </div>
        <button type="button" @click="addOption" class="add-option-button">Add Option</button>
      </div>

      <button type="submit" class="submit-button" :disabled="questionStore.loading">
        <span v-if="questionStore.loading">Saving...</span>
        <span v-else>{{ isEditMode ? 'Update Question' : 'Save Question' }}</span>
      </button>
      <button type="button" @click="cancel" class="cancel-button" :disabled="questionStore.loading">Cancel</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuestionStore } from '../stores/question';

const route = useRoute();
const router = useRouter();
const questionStore = useQuestionStore();

const isEditMode = ref(false);
const questionId = ref(null);

const question = ref({
  description: '',
  level: 'SMA',
  material: 'Aljabar',
  options: [
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
  ],
  correctAnswerIndex: null, // Stores the 0-based index of the correct option
});

// Function to reset the form
const resetForm = () => {
  question.value = {
    description: '',
    level: 'SMA',
    material: 'Aljabar',
    options: [
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
    ],
    correctAnswerIndex: null,
  };
};

const addOption = () => {
  question.value.options.push({ text: '' });
};

const removeOption = (index) => {
  // If the removed option was the correct answer, reset correct answer
  if (question.value.correctAnswerIndex === index) {
    question.value.correctAnswerIndex = null;
  }
  // If the correct answer index is after the removed item, decrement it
  else if (question.value.correctAnswerIndex > index) {
    question.value.correctAnswerIndex--;
  }
  question.value.options.splice(index, 1);
};

const loadQuestionForEdit = async (id) => {
  try {
    const existingQuestion = await questionStore.fetchQuestionById(id);
    if (existingQuestion) {
      question.value.description = existingQuestion.description;
      question.value.level = existingQuestion.level;
      question.value.material = existingQuestion.material;
      // Map options to ensure they are reactive and simple text objects
      question.value.options = existingQuestion.options.map(opt => ({ text: opt.text }));
      question.value.correctAnswerIndex = existingQuestion.correctAnswerIndex;
    } else {
      alert('Question not found or could not be loaded!');
      router.push('/questions'); // Redirect if not found
    }
  } catch (error) {
    console.error("Failed to load question for edit:", error);
    alert('Failed to load question for editing: ' + error.message);
    router.push('/questions');
  }
};

const saveQuestion = async () => {
  // Basic validation
  if (!question.value.description.trim()) {
    alert('Question description cannot be empty!');
    return;
  }
  if (question.value.options.length < 2) {
    alert('At least 2 answer options are required!');
    return;
  }
  if (question.value.options.some(opt => !opt.text.trim())) {
    alert('All answer options must be filled!');
    return;
  }
  if (question.value.correctAnswerIndex === null || question.value.correctAnswerIndex < 0 || question.value.correctAnswerIndex >= question.value.options.length) {
    alert('You must select a valid correct answer!');
    return;
  }

  // Prepare data to be sent
  const dataToSave = {
    description: question.value.description.trim(),
    level: question.value.level,
    material: question.value.material,
    options: question.value.options.map((opt, index) => ({
      text: opt.text.trim(),
      isCorrect: index === question.value.correctAnswerIndex,
    })),
    correctAnswerIndex: question.value.correctAnswerIndex,
  };

  try {
    if (isEditMode.value) {
      await questionStore.updateQuestion(questionId.value, dataToSave);
      alert('Question updated successfully!');
    } else {
      await questionStore.addQuestion(dataToSave);
      alert('Question saved successfully!');
      resetForm(); // Reset form for new entry after successful add
    }
    router.push('/questions'); // Redirect to list after success
  } catch (error) {
    console.error('Error saving question:', error);
    alert('Failed to save question: ' + error.message);
  }
};

const cancel = () => {
  router.push('/questions');
};

// Handle initial load (on component mount)
onMounted(() => {
  if (route.params.id) {
    isEditMode.value = true;
    questionId.value = route.params.id;
    loadQuestionForEdit(questionId.value);
  } else {
    isEditMode.value = false;
    questionId.value = null;
    resetForm(); // Ensure form is clean when adding new
  }
});

// Watch for route changes, especially when navigating between add and edit forms
watch(() => route.params.id, (newId, oldId) => {
  if (newId && newId !== oldId) { // Check for actual ID change
    isEditMode.value = true;
    questionId.value = newId;
    loadQuestionForEdit(questionId.value);
  } else if (!newId && oldId) { // Navigating from edit to add
    isEditMode.value = false;
    questionId.value = null;
    resetForm();
  }
}, { immediate: true }); // Run immediately on mount as well

</script>

<style scoped>
/* Base container and navbar styles are in global style.css */
.question-form-container {
  width: 100%;
  max-width: 900px;
  padding: 20px 40px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-sizing: border-box;
}

h1 {
  color: #343a40;
  margin-bottom: 30px;
}

.question-form .form-group {
  margin-bottom: 20px;
}

.question-form .form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #343a40;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.question-form .form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.question-form .form-row .form-group {
  flex: 1;
  margin-bottom: 0;
}

.option-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
}

.option-item input[type="text"] {
  flex-grow: 1;
  margin-bottom: 0;
}

.option-item .correct-radio {
  width: auto;
  margin-right: 5px;
}

.remove-option-button {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.remove-option-button:hover {
  background-color: #c82333;
}

.add-option-button {
  background-color: #28a745;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.add-option-button:hover {
  background-color: #218838;
}

.submit-button, .cancel-button {
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  margin-right: 10px;
}

.submit-button {
  background-color: #007bff;
  color: white;
}

.submit-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
}

.cancel-button:hover:not(:disabled) {
  background-color: #5a6268;
}

.submit-button:disabled, .cancel-button:disabled {
  background-color: #a0c9ed;
  cursor: not-allowed;
}
</style>