<template>
  <div class="page-container">
    <div class="navbar">
      <div class="breadcrumb">Home / Dashboard</div>
      <div class="user-info">
        <span class="school-name">School</span>
        <img src="/src/assets/vue.svg" alt="User Icon" class="user-icon" />
      </div>
    </div>
    <h1>Dashboard</h1>
    <p>Welcome to the CBT Math Dashboard!</p>
    <p v-if="authStore.isAuthenticated">
      You are logged in as: <strong>{{ authStore.user?.username }}</strong> (Role: <strong>{{ authStore.user?.role }}</strong>)
    </p>
    <p v-else>You are not logged in.</p>
    <p>This is where you'll see an overview of your system.</p>

    <div class="dashboard-stats">
        <div class="stat-card">
            <h3>Total Questions</h3>
            <p>{{ questionStore.questions.length }}</p>
        </div>
        <div class="stat-card">
            <h3>Active Users</h3>
            <p>2 (Mock)</p>
        </div>
        <div class="stat-card">
            <h3>Pending Assignments</h3>
            <p>0 (Mock)</p>
        </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useQuestionStore } from '../stores/question';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const questionStore = useQuestionStore();

onMounted(() => {
    // Fetch questions to update count in dashboard
    questionStore.fetchQuestions();
});
</script>

<style scoped>
/* Base page-container and navbar styles are in global style.css */

h1 {
  color: #343a40;
  margin-bottom: 20px;
}
p {
  color: #555;
  margin-bottom: 10px;
}

.dashboard-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 30px;
}

.stat-card {
    background-color: #e9ecef;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    flex: 1; /* Allow cards to grow and shrink */
    min-width: 200px; /* Minimum width before wrapping */
    text-align: center;
}

.stat-card h3 {
    color: #007bff;
    margin-bottom: 10px;
    font-size: 1.2em;
}

.stat-card p {
    font-size: 2em;
    font-weight: bold;
    color: #343a40;
    margin: 0;
}
</style>