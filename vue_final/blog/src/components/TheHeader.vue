<script setup></script>
<template>
  <header>
    <div>
      <h1><RouterLink to="/">로고</RouterLink></h1>
      <nav>
        <RouterLink to="/about">내소개</RouterLink>
        <RouterLink to="/postsList">글목록</RouterLink>
        <RouterLink to="/postWrite">글쓰기</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  padding: 10px;
  background-color: #333;
  color: #fff;
}
header > div {
  max-width: 900px;
  width: calc(100% - 2rem);
  margin: auto;
  /* border: 1px solid red; */

  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav {
  display: flex;
  gap: 1rem;
}
nav > a {
  display: block;
  padding: 1rem;
}
nav > a:hover {
  background-color: #444;
}
</style>
