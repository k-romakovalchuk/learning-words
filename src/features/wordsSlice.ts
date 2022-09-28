import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Audit, Word } from '../types/types';

let words = [], history = [];

if (localStorage.getItem('words')) {
  words = JSON.parse(localStorage.getItem('words') || '');
}

if (localStorage.getItem('history')) {
  history = JSON.parse(localStorage.getItem('history') || '');
}

export interface InitialState {
  words: Word[],
  history: Audit[],
}

export const initialState: InitialState = {
  words: words || [],
  history: history || [],
};

export const wordsReducer = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<Word>) => {
      state.words.push(action.payload);
      let words = [];

      if (localStorage.getItem('words')) {
        words = JSON.parse(localStorage.getItem('words') || '');
      }

      localStorage.setItem('words', JSON.stringify([
        ...words, action.payload
      ]))
    },
    addAudit: (state, action: PayloadAction<Audit>) => {
      state.history.push(action.payload);
      let history = [];

      if (localStorage.getItem('history')) {
        history = JSON.parse(localStorage.getItem('history') || '');
      }

      localStorage.setItem('history', JSON.stringify([
        ...history, action.payload
      ]))
    },
  },
});

export default wordsReducer.reducer;

export const { addWord, addAudit } = wordsReducer.actions;
