import { ref } from 'vue';
import type { IChatMessage } from '@/interfaces/chat-message.interface.ts';
import type { IGuestResponse } from '@/interfaces/guest-response.interface.ts';
import { sleep } from '@/helpers/sleep.ts';

export const useChat = () => {
  const messages = ref<IChatMessage[]>([]);

  const getGuestResponse = async (): Promise<IGuestResponse> => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_URL_API}`);
      return (await resp.json()) as IGuestResponse;
    } catch (error) {
      console.error('Error fetching guest response:', error);
      return {
        answer: 'I am sorry, I am not able to respond at the moment.',
        image: 'https://i.pinimg.com/originals/73/9e/51/739e51fc3bcce6d35b0cfd0fce273865.gif',
      };
    }
  };

  const onMessage = async (text: string) => {
    if (text.length === 0) return;
    messages.value.push({ id: new Date().getTime(), message: text, itsMine: true });

    if (!text.endsWith('?')) return;

    // await sleep(1);
    const { answer, image } = await getGuestResponse();

    messages.value.push({ id: new Date().getTime(), message: answer, itsMine: false, image });
  };

  return {
    messages,
    onMessage,
  };
};
