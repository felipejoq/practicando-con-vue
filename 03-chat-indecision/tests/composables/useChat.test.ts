import { describe, test, expect, vi, beforeEach } from 'vitest';
import { useChat } from '@/composables/useChat';
import type { IGuestResponse } from '@/interfaces/guest-response.interface.ts';

describe('useChat', () => {
  let chat: ReturnType<typeof useChat>;

  beforeEach(() => {
    chat = useChat();
  });

  test('should initialize with empty messages', () => {
    expect(chat.messages.value).toEqual([]);
  });

  test('should add a message when onMessage is called', async () => {
    await chat.onMessage('Hello');
    expect(chat.messages.value).toHaveLength(1);
    expect(chat.messages.value[0]).toMatchObject({ message: 'Hello', itsMine: true });
  });

  test('should not add a message if text is empty', async () => {
    await chat.onMessage('');
    expect(chat.messages.value).toHaveLength(0);
  });

  test('should not fetch guest response if message does not end with a question mark', async () => {
    await chat.onMessage('Hello');
    expect(chat.messages.value).toHaveLength(1);
  });

  test('should fetch guest response if message ends with a question mark', async () => {
    const mockResponse: IGuestResponse = {
      answer: 'Hi there!',
      image: 'https://example.com/image.jpg',
    };
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    await chat.onMessage('Hello?');
    expect(chat.messages.value).toHaveLength(2);
    expect(chat.messages.value[1]).toMatchObject({
      message: 'Hi there!',
      itsMine: false,
      image: 'https://example.com/image.jpg',
    });
  });

  test('should handle fetch error in getGuestResponse', async () => {
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

    global.fetch = vi.fn().mockRejectedValue(new Error('Fetch error'));

    await chat.onMessage('Hello?');
    expect(chat.messages.value).toHaveLength(2);
    expect(chat.messages.value[1]).toMatchObject({
      message: 'I am sorry, I am not able to respond at the moment.',
      itsMine: false,
      image: 'https://i.pinimg.com/originals/73/9e/51/739e51fc3bcce6d35b0cfd0fce273865.gif',
    });

    consoleErrorMock.mockRestore();
  });
});
