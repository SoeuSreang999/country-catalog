<template>
  <transition name="fade">
    <div class="modal" @click.self="$emit('close')">
      <div class="modal-content">
        <span class="close" @click="$emit('close')">&times;</span>
        <h2 class="text-center font-semibold uppercase text-green-700">{{ country.name?.official || 'N/A' }}</h2>
        <img :src="country.flags?.png" alt="Flag" class="mb-5 rounded-lg h-full w-full">
        <p class="text-green-900 bg-blue-100 mt-1 p-[5px] rounded-sm border-l-4 border-green-700">
          <strong class="px-3 text-sm rounded font-medium">2 char Code:</strong> {{ country.cca2 || 'N/A' }}
        </p>
        <p class="text-green-900 bg-blue-100 mt-1 p-[5px] rounded-sm border-l-4 border-green-700">
          <strong class="px-3 text-sm rounded font-medium">3 char Code:</strong> {{ country.cca3 || 'N/A' }}
        </p>
        <p class="text-green-900 bg-blue-100 mt-1 p-[5px] rounded-sm border-l-4 border-green-700">
          <strong class="px-3 text-sm rounded font-medium">Native Name:</strong> {{ nativeName(country.name?.nativeName) || 'N/A' }}
        </p>
        <p class="text-green-900 bg-blue-100 mt-1 p-[5px] rounded-sm border-l-4 border-green-700">
          <strong class="px-3 text-sm rounded font-medium">Alternative Names:</strong> {{ country.altSpellings?.join(', ') || 'N/A' }}
        </p>
        <p class="text-green-900 bg-blue-100 mt-1 p-[5px] rounded-sm border-l-4 border-green-700">
          <strong class="px-3 text-sm rounded font-medium">Calling Codes:</strong> {{ callingCodes(country.idd) || 'N/A' }}
        </p>
        <p class="text-green-900 bg-blue-100 mt-1 p-[5px] rounded-sm border-l-4 border-green-700">
          <strong class="px-3 text-sm rounded font-medium">Region:</strong> {{ country.region || 'N/A' }}
        </p>
        <p class="text-green-900 bg-blue-100 mt-1 p-[5px] rounded-sm border-l-4 border-green-700">
          <strong class="px-3 text-sm rounded font-medium">Subregion:</strong> {{ country.subregion || 'N/A' }}
        </p>
        <p class="text-green-900 bg-blue-100 mt-1 p-[5px] rounded-sm border-l-4 border-green-700">
          <strong class="px-3 text-sm rounded font-medium">Population:</strong> {{ country.population ? country.population.toLocaleString() : 'N/A' }}
        </p>
        <p class="text-green-900 bg-blue-100 mt-1 p-[5px] rounded-sm border-l-4 border-green-700">
          <strong class="px-3 text-sm rounded font-medium">Capital:</strong> {{ country.capital?.join(', ') || 'N/A' }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['country'],
  methods: {
    nativeName(nativeNameObj) {
      if (!nativeNameObj) return 'N/A';
      return Object.values(nativeNameObj).map(name => name.official).join(', ') || 'N/A';
    },
    callingCodes(idd) {
      if (!idd) return 'N/A';
      return `${idd.root}${idd.suffixes?.join(', ') || ''}` || 'N/A';
    }
  }
};
</script>

<style scoped>
  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 1;
    transition: opacity 0.5s ease;
  }
  .modal-content {
    background-color: #fefefe;
    margin: 3% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
    border-radius: 8px;
    opacity: 1;
    transform: translateY(0);
    transition: all 0.5s ease;
  }
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
