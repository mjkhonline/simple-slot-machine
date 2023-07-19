<script setup>
import SlotMachine from "@/components/SlotMachine.vue"
</script>

<template>
  <header>
    <h1 class="text-4xl text-indigo-800 my-2 2xl:my-16 text-center fixed w-screen">The Slot Machine Game</h1>
  </header>

  <main class="h-screen w-screen flex flex-col justify-center items-center">
    <SlotMachine />
  </main>

  <footer class="w-screen fixed bottom-0 py-1 flex justify-center">
    <div class="hover:pb-2 transition-all duration-200">
      <p class="text-center text-gray-500">Developed by
        <a href="https://github.com/mjkhonline" target="_blank">
          <img src="/img/github.svg" alt="GitHub logo" width="30" height="30" class="inline-block">
          <span class="text-black">mjkhonline</span>
        </a>
      </p>
    </div>
  </footer>
</template>
