const quotesList = [
  {
    quote: 'The night is darkest just before the dawn. And I promise you, the dawn is coming.',
    author: 'Harvey Dent, The Dark Knight'
  },
  {quote: 'I believe what doesn’t kill you simply makes you, stranger.', author: 'The Joker, The Dark Knight'},
  {
    quote: 'Your anger gives you great power. But if you let it, it will destroy you… As it almost did me',
    author: 'Henri Ducard, Batman Begins'
  },
  {
    quote: 'You either die a hero or live long enough to see yourself become the villain.',
    author: 'Harvey Dent, The Dark Knight'
  },
  {
    quote: 'If you’re good at something, never do it for free.',
    author: 'The Joker, The Dark Knight'
  },
]

const initQuote = {quote: '',author: ''}

const {createApp, ref, computed} = Vue;

const app = createApp({
  setup() {

    const showAuthor = ref(false);
    const quotes = ref([...quotesList]);
    const totalQuotes = computed(() => quotes.value.length);
    const newQuote = ref({...initQuote});

    const toggleShowAuthor = () => {
      showAuthor.value = !showAuthor.value
    }

    const addQuote = () => {
      quotes.value.unshift({...newQuote.value});
      newQuote.value = {...initQuote};
    }

    return {
      quotes,
      showAuthor,
      toggleShowAuthor,
      addQuote,
      totalQuotes,
      newQuote
    };
  }
});

app.mount('#myApp');