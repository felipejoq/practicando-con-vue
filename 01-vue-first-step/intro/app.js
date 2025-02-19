const {createApp, ref} = Vue;

const app = createApp({
  // template: `
  // <h1>{{ hero }}</h1>
  // <p>— {{ author }}</p>
  // `,
  setup() {
    const hero = ref('Batman');
    const author = ref('DC Comics');

    const changeHero = () => {
        hero.value = 'Spider man';
        author.value = 'Marvel';
    }

    // setTimeout(() => {
    //   hero.value = 'Spider man';
    //   author.value = 'Marvel';
    // }, 2000);

    return {
      hero,
      author,
      changeHero,
    }
  }
})

app.mount('#myApp');