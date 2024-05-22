<template>
    <footer class="footer">
        <p>&copy; {{ new Date().getFullYear() }} Bee Home</p>
        <div class="social-links"></div>
    </footer>
</template>

<style scoped>
.footer {
    /* Style your footer here */
    background-color: #f5f5f5;
    padding: 1rem;
    text-align: center;
}

.social-links {
    /* Style your social links here */
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}
</style>
