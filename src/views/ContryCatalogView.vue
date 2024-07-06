<template>
  <div v-if="loading" class="loading-spinner grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
    <LoadingPage/>
  </div>
  <div v-if="!loading" class="block p-5">
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3">
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input v-model="search" type="search" id="default-search" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-0 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-blue-500" placeholder="Search Country" />
      </div>
      <div class="relative inline-block text-left">
        <div class="group w-[175px]">
          <button type="button"
              class="inline-flex justify-center items-center rounded-sm w-[175px] px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-500">
              Order By ({{ sortOrder }})
              <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
              </svg>
          </button>
          <div
              class="absolute left-0 w-40 border border-danger-500 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
              <div class="py-1">
                  <a href="#" @click.prevent="setSortOrder('DESC')" :class="{'bg-blue-300': sortOrder === 'DESC'}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">DESC</a>
                  <a href="#" @click.prevent="setSortOrder('ASC')" :class="{'bg-blue-300': sortOrder === 'ASC'}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ASC</a>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block w-full mt-4">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="country in paginatedCountries" :key="country.cca3" class="max-w-sm rounded-lg border hover:shadow-lg transition-shadow duration-200 overflow-hidden">
          <div class="absolute mt-3 ml-3">
              <button class="h-6 bg-[#E74040] text-white px-3 text-sm rounded font-medium">{{ country.cca2 }}</button>
          </div>
          <img class="w-full flag-image" :src="country.flags.png" alt="Flag" />
          <div class="p-6">
            <h3 @click="showDetails(country)" class="text-lg font-bold text-green-600 hover:text-green-500 duration-200 cursor-pointer">{{ country.name.official }}</h3>
            <p class="mt-1 text-gray-500"><strong>Native Name:</strong> {{ truncateText(nativeName(country.name.nativeName), 15) }}</p>
            <p class="mt-1 text-gray-500"><strong>Alternative Names:</strong> {{ truncateText(country.altSpellings.join(', '), 15) }}</p>
            <p class="mt-1 text-gray-500"><strong>Calling Codes:</strong> {{ truncateText(callingCodes(country.idd),100) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="page p-5">
      <div class="flex">
        <a @click="prevPage"
          href="#"
          class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          :class="{ 'cursor-not-allowed opacity-50': isPreDisabled }"
          :disabled="isPreDisabled"
        >
          <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
          Previous
        </a>
        <a href="#" class="flex mr-3 ml-3  items-center justify-center px-3 w-50 h-50 rounded-full text-sm font-medium text-white bg-blue-500 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          {{ page }}
        </a>
        <a 
          @click="nextPage" 
          href="#" 
          class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          :class="{ 'cursor-not-allowed opacity-50': isNextDisabled }"
          :disabled="isNextDisabled"
        >
          Next
          <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </div>
    </div>
    <CountryModal v-if="selectedCountry" :country="selectedCountry" @close="selectedCountry = null"/>
  </div>
</template>

<script>
import axios from 'axios';
import CountryModal from '../components/CountryModal.vue';
import LoadingPage from '../components/LoadingPage.vue';

export default {
  components: { CountryModal, LoadingPage },
  data() {
    return {
      countries: [],
      search: '',
      sortOrder: 'ASC',
      page: 1,
      perPage: 25,
      selectedCountry: null,
      loading: false,
    };
  },
  computed: {
    isNextDisabled() {
      return this.page >= this.totalPages;
    },
    isPreDisabled() {
      return this.page === 1;
    },
    filteredCountries() {
      return this.countries.filter(country =>
        country.name.official.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    sortedCountries() {
      return [...this.filteredCountries].sort((a, b) => {
        let modifier = this.sortOrder === 'ASC' ? 1 : -1;
        if (a.name.official < b.name.official) return -modifier;
        if (a.name.official > b.name.official) return modifier;
        return 0;
      });
    },
    paginatedCountries() {
      const start = (this.page - 1) * this.perPage;
      const end = start + this.perPage;
      return this.sortedCountries.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredCountries.length / this.perPage);
    }
  },
  methods: {
    fetchCountries() {
      this.loading = true;
      axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
          this.countries = response.data;
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    nativeName(nativeNameObj) {
      if (nativeNameObj) {
        return Object.values(nativeNameObj).map(name => name.official).join(', ');
      }
      return 'N/A';
    },
    callingCodes(idd) {
      if (idd && idd.root && idd.suffixes) {
        return `${idd.root}${idd.suffixes.join(', ')}`;
      }
      return 'N/A';
    },
    truncateText(text, maxLength) {
      return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    },
    setSortOrder(order) {
      this.sortOrder = order;
      this.page = 1;
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
      }
    },
    showDetails(country) {
      this.selectedCountry = country;
    },
  },
  mounted() {
    this.fetchCountries();
  }
};
</script>

<style scoped>
  .flag-image {
    height: 170px;
  }
  .page {
    display: flex;
    justify-content: center;
  }
</style>
