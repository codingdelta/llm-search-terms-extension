<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-slate-100 to-gray-100 flex items-center justify-center p-4">
    <div class="w-[420px] max-w-full bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden backdrop-blur-sm">
      <!-- Header -->
      <div class="bg-gradient-to-r from-slate-700 via-gray-700 to-slate-800 px-8 py-8 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
        <div class="relative flex items-center space-x-4">
          <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-md">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold tracking-tight drop-shadow">Search Capture</h1>
            <p class="text-gray-200 text-base font-medium">ChatGPT Extension</p>
          </div>
        </div>
        <!-- Decorative elements -->
        <div class="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full"></div>
        <div class="absolute bottom-4 right-8 w-12 h-12 bg-white/3 rounded-full"></div>
      </div>

      <!-- Content -->
      <div class="p-8 space-y-8">
        <!-- Info Card -->
        <div class="bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200/50 rounded-2xl p-6 shadow-sm flex items-center space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-slate-500 to-gray-600 rounded-xl flex items-center justify-center shadow">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke-width="2" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 16v-4m0-4h.01" />
            </svg>
          </div>
          <div class="text-slate-800">
            <p class="font-semibold text-lg mb-2">How to use:</p>
            <ol class="list-decimal list-inside space-y-2 text-slate-700">
              <li class="flex items-center">
                <span class="ml-2">Go to <span class="font-bold text-slate-800 bg-slate-200 px-2 py-1 rounded-lg">chatgpt.com</span></span>
              </li>
              <li class="flex items-center">
                <span class="ml-2">Start a conversation with <span class="font-bold text-slate-800 bg-slate-200 px-2 py-1 rounded-lg">search</span> turned on</span>
              </li>
              <li class="flex items-center">
                <span class="ml-2">We'll capture and display search queries on the conversation page</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "~style.css"

</script>
